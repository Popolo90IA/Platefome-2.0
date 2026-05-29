"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import type { Restaurant } from "@/types/database.types";
import type { FormState, PasswordForm, PasswordVisibility } from "../types";
import {
  DEFAULT_FORM,
  DEFAULT_PW_FORM,
  DEFAULT_PW_VISIBILITY,
  DEACTIVATE_TIMEOUT_MS,
  SAVED_TOAST_MS,
} from "../constants";
import { validatePassword, formatJoinDate } from "../helpers";

/**
 * useSettings — hook orchestrant tout l'état de la page settings.
 * - Charge user + restaurant depuis Supabase
 * - Expose form, isActive, password form, danger zone state
 * - Expose handlers handleSubmit, handlePasswordChange, handleDeactivate, handleNameChange
 */
export function useSettings() {
  const supabase = createClient();

  // restaurant + meta
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // account
  const [userEmail, setUserEmail] = useState("");
  const [userCreatedAt, setUserCreatedAt] = useState("");

  // visibility
  const [isActive, setIsActive] = useState(true);

  // profile form
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);

  // password
  const [pwForm, setPwForm] = useState<PasswordForm>(DEFAULT_PW_FORM);
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [showPw, setShowPw] = useState<PasswordVisibility>(
    DEFAULT_PW_VISIBILITY,
  );

  // danger zone
  const [dangerConfirm, setDangerConfirm] = useState("");
  const [deactivating, setDeactivating] = useState(false);
  const [deactivateSuccess, setDeactivateSuccess] = useState(false);
  const deactivateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // notifications
  const [notifWeekly, setNotifWeekly] = useState(false);

  // initial load
  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      setUserEmail(user.email ?? "");
      setUserCreatedAt(formatJoinDate(user.created_at));

      const { data } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setRestaurant(data);
        setIsActive((data as { is_active?: boolean }).is_active !== false);
        setForm({
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
        });
      }
      setLoading(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setForm((f) => ({
      ...f,
      name,
      slug: !restaurant ? slugify(name) : f.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("לא מחובר");
      setSaving(false);
      return;
    }

    const payload = {
      user_id: user.id,
      name: form.name,
      slug: form.slug,
      description: form.description || null,
      description_en: form.description_en || null,
      description_fr: form.description_fr || null,
      address: form.address || null,
      phone: form.phone || null,
      email: form.email || null,
      languages: form.languages.length > 0 ? form.languages : ["he"],
      default_language: form.languages.includes(form.default_language)
        ? form.default_language
        : (form.languages[0] ?? "he"),
      currency: form.currency,
      is_active: isActive,
    };

    const result = restaurant
      ? await supabase
          .from("restaurants")
          .update(payload)
          .eq("id", restaurant.id)
          .select()
          .single()
      : await supabase.from("restaurants").insert(payload).select().single();

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    setRestaurant(result.data);
    setSaved(true);
    setTimeout(() => setSaved(false), SAVED_TOAST_MS);
    setSaving(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);

    const validationError = validatePassword(pwForm.next, pwForm.confirm);
    if (validationError) {
      setPwError(validationError);
      return;
    }

    setPwSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.email) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: pwForm.current,
      });
      if (signInError) {
        setPwError("הסיסמה הנוכחית שגויה");
        setPwSaving(false);
        return;
      }
    }
    const { error: updateError } = await supabase.auth.updateUser({
      password: pwForm.next,
    });
    if (updateError) {
      setPwError(updateError.message);
    } else {
      setPwSaved(true);
      setPwForm(DEFAULT_PW_FORM);
      setTimeout(() => setPwSaved(false), SAVED_TOAST_MS);
    }
    setPwSaving(false);
  };

  const handleDeactivate = async () => {
    if (!restaurant) return;
    setDeactivating(true);
    await supabase
      .from("restaurants")
      .update({ is_active: false })
      .eq("id", restaurant.id);
    setIsActive(false);
    setDeactivating(false);
    setDangerConfirm("");
    setDeactivateSuccess(true);
    if (deactivateTimerRef.current) clearTimeout(deactivateTimerRef.current);
    deactivateTimerRef.current = setTimeout(
      () => setDeactivateSuccess(false),
      DEACTIVATE_TIMEOUT_MS,
    );
  };

  return {
    // state
    restaurant,
    loading,
    saving,
    saved,
    error,
    userEmail,
    userCreatedAt,
    isActive,
    setIsActive,
    form,
    setForm,
    pwForm,
    setPwForm,
    pwSaving,
    pwSaved,
    pwError,
    showPw,
    setShowPw,
    dangerConfirm,
    setDangerConfirm,
    deactivating,
    deactivateSuccess,
    notifWeekly,
    setNotifWeekly,
    // handlers
    handleNameChange,
    handleSubmit,
    handlePasswordChange,
    handleDeactivate,
  };
}
