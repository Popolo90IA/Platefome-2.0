import type { SupabaseClient } from "@supabase/supabase-js";
import type { Category, Dish, Restaurant } from "@/types/database.types";
import type { FormState } from "../types";

type SB = SupabaseClient;

export type EditorData =
  | { kind: "redirect"; to: string }
  | { kind: "ok"; restaurant: Restaurant; dish: Dish; categories: Category[] };

/* ── Load user → restaurant → dish + categories (or a redirect target) ── */
export async function loadEditorData(
  supabase: SB,
  dishId: string,
): Promise<EditorData> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { kind: "redirect", to: "/login" };

  const { data: r } = await supabase
    .from("restaurants")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!r) return { kind: "redirect", to: "/dashboard/settings" };

  const [{ data: d }, { data: cats }] = await Promise.all([
    supabase.from("dishes").select("*").eq("id", dishId).maybeSingle(),
    supabase
      .from("categories")
      .select("*")
      .eq("restaurant_id", r.id)
      .order("display_order"),
  ]);

  if (!d) return { kind: "redirect", to: "/dashboard/dishes" };
  return { kind: "ok", restaurant: r, dish: d, categories: cats ?? [] };
}

/* ── Map a dish row → editable form state ── */
export function dishToForm(d: Dish): FormState {
  return {
    name: d.name,
    name_en: d.name_en ?? "",
    name_fr: d.name_fr ?? "",
    category_id: d.category_id,
    description: d.description ?? "",
    description_en: d.description_en ?? "",
    description_fr: d.description_fr ?? "",
    price: String(d.price),
    image_url: d.image_url,
    video_url: d.video_url,
    model_3d_url: d.model_3d_url,
    photos_360: d.photos_360 ?? null,
    ar_enabled: d.ar_enabled,
    is_available: d.is_available,
    is_featured: d.is_featured,
    is_new: d.is_new,
    is_signature: d.is_signature,
    allergens: (d.allergens as string[]) ?? [],
    tags: (d.tags as string[]) ?? [],
  };
}

/* ── Map form state → dishes-table update payload ── */
export function formToPayload(form: FormState, restaurantId: string) {
  return {
    restaurant_id: restaurantId,
    category_id: form.category_id,
    name: form.name,
    name_en: form.name_en || null,
    name_fr: form.name_fr || null,
    description: form.description || null,
    description_en: form.description_en || null,
    description_fr: form.description_fr || null,
    price: parseFloat(form.price) || 0,
    image_url: form.image_url,
    video_url: form.video_url,
    model_3d_url: form.model_3d_url,
    photos_360: form.photos_360,
    ar_enabled: form.ar_enabled,
    is_available: form.is_available,
    is_featured: form.is_featured,
    is_new: form.is_new,
    is_signature: form.is_signature,
    allergens: form.allergens.length ? form.allergens : null,
    tags: form.tags.length ? form.tags : null,
  };
}

/* ── Persist dish ── */
export async function saveDish(
  supabase: SB,
  dishId: string,
  payload: ReturnType<typeof formToPayload>,
): Promise<boolean> {
  const { error } = await supabase.from("dishes").update(payload).eq("id", dishId);
  return !error;
}

/* ── Delete dish ── */
export async function deleteDish(supabase: SB, dishId: string) {
  await supabase.from("dishes").delete().eq("id", dishId);
}
