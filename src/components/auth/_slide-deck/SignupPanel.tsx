"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PanelHeading } from "./PanelHeading";
import { EmailField } from "./EmailField";
import { PasswordToggleField } from "./PasswordToggleField";
import { PasswordStrengthBar } from "./PasswordStrengthBar";
import { ErrorBox } from "./ErrorBox";
import { SubmitButton } from "./SubmitButton";
import { SwitchPrompt } from "./SwitchPrompt";
import { labelStyle } from "./styles";

export function SignupPanel({ onSwitch }: { onSwitch: () => void }) {
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
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div style={{ width: "100%", maxWidth: 380 }}>
      <PanelHeading
        eyebrow="הצטרפות חינמית"
        title={
          <>
            צור חשבון,{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "hsl(var(--accent-bright))",
              }}
            >
              בחינם.
            </em>
          </>
        }
        subtitle="התחל לבנות את התפריט הדיגיטלי שלך בדקות"
      />

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 18 }}
      >
        <EmailField id="signup-email" value={email} onChange={setEmail} />

        <PasswordToggleField
          id="signup-password"
          value={password}
          onChange={setPassword}
          placeholder="מינימום 6 תווים"
          labelSlot={
            <label
              htmlFor="signup-password"
              className="font-sans uppercase"
              style={labelStyle}
            >
              סיסמה
            </label>
          }
        >
          <PasswordStrengthBar value={password} />
        </PasswordToggleField>

        {error && <ErrorBox message={error} />}

        <SubmitButton loading={loading} label="הירשם בחינם" />
      </form>

      <SwitchPrompt
        divider="כבר רשום?"
        label="התחבר לחשבון קיים ←"
        onSwitch={onSwitch}
      />
    </div>
  );
}
