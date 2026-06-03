import type { SupabaseClient } from "@supabase/supabase-js";
import { slugify } from "@/lib/utils";
import type { Restaurant } from "@/types/database.types";
import type { FormState, PasswordForm } from "../types";
import { DEFAULT_PW_FORM, SAVED_TOAST_MS, DEACTIVATE_TIMEOUT_MS } from "../constants";
import { validatePassword } from "../helpers";

type SB = SupabaseClient;

/* ── restaurantToForm — map a Restaurant row to the editable FormState ── */
export function restaurantToForm(data: Restaurant): FormState {
  return {
    name: data.name,
    slug: data.slug,
    description: data.description ?? "",
    description_en: data.description_en ?? "",
    description_fr: data.description_fr ?? "",
    address: data.address ?? "",
    phone: data.phone ?? "",
    email: data.email ?? "",
    languages: data.languages ?? ["he"],
    default_language: data.default_language ?? "he",
    currency: data.currency ?? "ILS",
    theme_primary: data.theme_primary ?? "hsl(28,62%,42%)",
    theme_dark_mode: data.theme_dark_mode ?? true,
  };
}

/* ── nameToFormPatch — name change patch (auto-slug only when creating) ── */
export function nameToFormPatch(name: string, hasRestaurant: boolean) {
  return (f: FormState): FormState => ({
    ...f,
    name,
    slug: hasRestaurant ? f.slug : slugify(name),
  });
}

type SubmitDeps = {
  supabase: SB;
  form: FormState;
  isActive: boolean;
  restaurant: Restaurant | null;
  setSaving: (v: boolean) => void;
  setError: (v: string | null) => void;
  setSaved: (v: boolean) => void;
  setRestaurant: (r: Restaurant) => void;
};

/* ── submitProfile — upsert restaurant profile from form ── */
export async function submitProfile(d: SubmitDeps) {
  d.setSaving(true);
  d.setError(null);
  d.setSaved(false);

  const {
    data: { user },
  } = await d.supabase.auth.getUser();
  if (!user) {
    d.setError("לא מחובר");
    d.setSaving(false);
    return;
  }

  const f = d.form;
  const payload = {
    user_id: user.id,
    name: f.name,
    slug: f.slug,
    description: f.description || null,
    description_en: f.description_en || null,
    description_fr: f.description_fr || null,
    address: f.address || null,
    phone: f.phone || null,
    email: f.email || null,
    languages: f.languages.length > 0 ? f.languages : ["he"],
    default_language: f.languages.includes(f.default_language)
      ? f.default_language
      : (f.languages[0] ?? "he"),
    currency: f.currency,
    is_active: d.isActive,
  };

  const result = d.restaurant
    ? await d.supabase
        .from("restaurants")
        .update(payload)
        .eq("id", d.restaurant.id)
        .select()
        .single()
    : await d.supabase.from("restaurants").insert(payload).select().single();

  if (result.error) {
    d.setError(result.error.message);
    d.setSaving(false);
    return;
  }

  d.setRestaurant(result.data);
  d.setSaved(true);
  setTimeout(() => d.setSaved(false), SAVED_TOAST_MS);
  d.setSaving(false);
}

type PwDeps = {
  supabase: SB;
  pwForm: PasswordForm;
  setPwError: (v: string | null) => void;
  setPwSaving: (v: boolean) => void;
  setPwSaved: (v: boolean) => void;
  setPwForm: (f: PasswordForm) => void;
};

/* ── changePassword — re-auth then update password ── */
export async function changePassword(d: PwDeps) {
  d.setPwError(null);

  const validationError = validatePassword(d.pwForm.next, d.pwForm.confirm);
  if (validationError) {
    d.setPwError(validationError);
    return;
  }

  d.setPwSaving(true);
  const {
    data: { user },
  } = await d.supabase.auth.getUser();
  if (user?.email) {
    const { error: signInError } = await d.supabase.auth.signInWithPassword({
      email: user.email,
      password: d.pwForm.current,
    });
    if (signInError) {
      d.setPwError("הסיסמה הנוכחית שגויה");
      d.setPwSaving(false);
      return;
    }
  }
  const { error: updateError } = await d.supabase.auth.updateUser({
    password: d.pwForm.next,
  });
  if (updateError) {
    d.setPwError(updateError.message);
  } else {
    d.setPwSaved(true);
    d.setPwForm(DEFAULT_PW_FORM);
    setTimeout(() => d.setPwSaved(false), SAVED_TOAST_MS);
  }
  d.setPwSaving(false);
}

type DeactivateDeps = {
  supabase: SB;
  restaurant: Restaurant | null;
  setDeactivating: (v: boolean) => void;
  setIsActive: (v: boolean) => void;
  setDangerConfirm: (v: string) => void;
  setDeactivateSuccess: (v: boolean) => void;
  timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
};

/* ── deactivateRestaurant — set is_active false + transient success ── */
export async function deactivateRestaurant(d: DeactivateDeps) {
  if (!d.restaurant) return;
  d.setDeactivating(true);
  await d.supabase
    .from("restaurants")
    .update({ is_active: false })
    .eq("id", d.restaurant.id);
  d.setIsActive(false);
  d.setDeactivating(false);
  d.setDangerConfirm("");
  d.setDeactivateSuccess(true);
  if (d.timerRef.current) clearTimeout(d.timerRef.current);
  d.timerRef.current = setTimeout(
    () => d.setDeactivateSuccess(false),
    DEACTIVATE_TIMEOUT_MS,
  );
}
