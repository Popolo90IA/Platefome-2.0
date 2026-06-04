"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { AuthError } from "../../_shared/AuthError";
import { AuthInput } from "../../_shared/AuthInput";
import { AuthSubmitButton } from "../../_shared/AuthSubmitButton";
import { PasswordField } from "../../_shared/PasswordField";

function ForgotPasswordLink() {
  return (
    <Link
      href="/forgot-password"
      className="font-sans"
      style={{
        fontSize: 12,
        color: "hsl(var(--subtle))",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "hsl(var(--accent-bright))";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "hsl(var(--subtle))";
      }}
    >
      שכחת סיסמה?
    </Link>
  );
}

export function LoginForm() {
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

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .maybeSingle();

      router.push(roleData?.role === "super_admin" ? "/admin" : "/dashboard");
      router.refresh();
      return;
    }

    setLoading(false);
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
        placeholder="••••••••"
        labelExtra={<ForgotPasswordLink />}
      />
      {error && <AuthError message={error} />}
      <AuthSubmitButton loading={loading} label="כניסה לחשבון" />
    </form>
  );
}
