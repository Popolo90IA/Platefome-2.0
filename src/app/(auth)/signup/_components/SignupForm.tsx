"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AuthError } from "../../_shared/AuthError";
import { AuthInput } from "../../_shared/AuthInput";
import { AuthSubmitButton } from "../../_shared/AuthSubmitButton";
import { PasswordField } from "../../_shared/PasswordField";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 6) {
      setError("הסיסמה חייבת להכיל לפחות 6 תווים");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 18 }}
    >
      <AuthInput
        id="email"
        type="email"
        label="אימייל"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <PasswordField
        value={password}
        onChange={setPassword}
        placeholder="מינימום 6 תווים"
        showStrength
      />
      {error && <AuthError message={error} />}
      <AuthSubmitButton loading={loading} label="הירשם בחינם" />
    </form>
  );
}
