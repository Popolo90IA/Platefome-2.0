"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * useResetPassword — handles PKCE token detection, link-error params,
 * password validation, and the Supabase updateUser call.
 */
export function useResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  // Check for error params in the URL (e.g. expired link)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errCode = params.get("error_code");
    if (errCode === "otp_expired") {
      setLinkError("הקישור פג תוקף. אנא בקש קישור חדש.");
    } else if (params.get("error")) {
      setLinkError("הקישור אינו תקין. אנא בקש קישור חדש.");
    }
  }, []);

  // Supabase sends a PKCE / implicit hash token in the URL.
  // onAuthStateChange fires with type "PASSWORD_RECOVERY" once consumed.
  useEffect(() => {
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      setLinkError("הקישור אינו תקין או שפג תוקף. אנא בקש קישור חדש.");
    }, 6000);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" && !timedOut) {
        clearTimeout(timer);
        setReady(true);
      }
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("הסיסמה חייבת להכיל לפחות 6 תווים");
      return;
    }
    if (password !== confirm) {
      setError("הסיסמאות אינן תואמות");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);

    setTimeout(() => router.push("/dashboard"), 2000);
  };

  return {
    password,
    setPassword,
    confirm,
    setConfirm,
    showPassword,
    setShowPassword,
    loading,
    error,
    done,
    ready,
    linkError,
    handleSubmit,
  };
}
