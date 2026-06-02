"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { PanelHeading } from "./PanelHeading";
import { EmailField } from "./EmailField";
import { PasswordToggleField } from "./PasswordToggleField";
import { ErrorBox } from "./ErrorBox";
import { SubmitButton } from "./SubmitButton";
import { SwitchPrompt } from "./SwitchPrompt";
import { labelStyle } from "./styles";

export function LoginPanel({ onSwitch }: { onSwitch: () => void }) {
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
        .single();
      router.push(
        roleData?.role === "super_admin" ? "/admin" : "/dashboard"
      );
      router.refresh();
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: 380 }}>
      <PanelHeading
        eyebrow="כניסה לחשבון"
        title={
          <>
            ברוך שובך,{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "hsl(var(--accent-bright))",
              }}
            >
              שמחים לראותך.
            </em>
          </>
        }
        subtitle="התחבר כדי להמשיך לנהל את המסעדה שלך"
      />

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 18 }}
      >
        <EmailField id="login-email" value={email} onChange={setEmail} />

        <PasswordToggleField
          id="login-password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          labelSlot={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label
                htmlFor="login-password"
                className="font-sans uppercase"
                style={labelStyle}
              >
                סיסמה
              </label>
              <Link
                href="/forgot-password"
                className="font-sans"
                style={{
                  fontSize: 12,
                  color: "hsl(var(--subtle))",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "hsl(28,62%,42%)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "hsl(var(--subtle))";
                }}
              >
                שכחת סיסמה?
              </Link>
            </div>
          }
        />

        {error && <ErrorBox message={error} />}

        <SubmitButton loading={loading} label="כניסה לחשבון" />
      </form>

      <SwitchPrompt
        divider="חדש?"
        label="צור חשבון חדש ←"
        onSwitch={onSwitch}
      />
    </div>
  );
}
