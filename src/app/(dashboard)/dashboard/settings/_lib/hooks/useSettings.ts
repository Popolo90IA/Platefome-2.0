"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Restaurant } from "@/types/database.types";
import type { FormState, PasswordForm, PasswordVisibility } from "../types";
import {
  DEFAULT_FORM,
  DEFAULT_PW_FORM,
  DEFAULT_PW_VISIBILITY,
} from "../constants";
import { formatJoinDate } from "../helpers";
import {
  restaurantToForm,
  nameToFormPatch,
  submitProfile,
  changePassword,
  deactivateRestaurant,
} from "./settingsActions";

/**
 * useSettings — hook orchestrant tout l'état de la page settings.
 * State + wiring ici, logique async dans settingsActions.ts.
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
  const [showPw, setShowPw] = useState<PasswordVisibility>(DEFAULT_PW_VISIBILITY);

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
        setForm(restaurantToForm(data));
      }
      setLoading(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(nameToFormPatch(e.target.value, !!restaurant));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitProfile({
      supabase,
      form,
      isActive,
      restaurant,
      setSaving,
      setError,
      setSaved,
      setRestaurant,
    });
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    await changePassword({
      supabase,
      pwForm,
      setPwError,
      setPwSaving,
      setPwSaved,
      setPwForm,
    });
  };

  const handleDeactivate = () =>
    deactivateRestaurant({
      supabase,
      restaurant,
      setDeactivating,
      setIsActive,
      setDangerConfirm,
      setDeactivateSuccess,
      timerRef: deactivateTimerRef,
    });

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
