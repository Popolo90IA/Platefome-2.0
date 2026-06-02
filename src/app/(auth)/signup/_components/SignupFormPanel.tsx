"use client";

import { AuthSkewLink } from "@/components/auth/AuthSkewTransition";
import { AuthMobileHeader } from "../../_shared/AuthMobileHeader";
import { SignupForm } from "./SignupForm";

export function SignupFormPanel() {
  return (
    <div className="auth-form-panel">
      <AuthMobileHeader />

      <div className="auth-form-inner" style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ marginBottom: 36, textAlign: "right" }}>
          <div
            className="font-sans uppercase"
            style={{
              fontSize: 11,
              letterSpacing: ".08em",
              fontWeight: 600,
              color: "hsl(var(--accent-bright))",
              marginBottom: 10,
            }}
          >
            הצטרפות חינמית
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
              fontWeight: 600,
              letterSpacing: "-.025em",
              lineHeight: 1.1,
              color: "hsl(var(--fog))",
              margin: 0,
            }}
          >
            צור חשבון,{" "}
            <em
              style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}
            >
              בחינם.
            </em>
          </h1>
          <p
            className="font-sans"
            style={{
              fontSize: 14,
              color: "hsl(var(--subtle))",
              marginTop: 10,
            }}
          >
            התחל לבנות את התפריט הדיגיטלי שלך בדקות
          </p>
        </div>

        <SignupForm />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            margin: "24px 0",
          }}
        >
          <div style={{ flex: 1, height: 1, background: "hsl(var(--line))" }} />
          <span
            className="font-sans"
            style={{
              fontSize: 12,
              letterSpacing: ".04em",
              fontWeight: 500,
              color: "hsl(var(--dim))",
            }}
          >
            כבר רשום?
          </span>
          <div style={{ flex: 1, height: 1, background: "hsl(var(--line))" }} />
        </div>

        <AuthSkewLink
          href="/login"
          style={{
            display: "block",
            width: "100%",
            boxSizing: "border-box",
            padding: "12px 20px",
            borderRadius: 10,
            border: "1px solid hsl(var(--line))",
            background: "transparent",
            color: "hsl(var(--fog))",
            fontSize: 14,
            fontWeight: 500,
            textAlign: "center",
            textDecoration: "none",
            transition: "border-color .15s, background .15s",
            cursor: "pointer",
          }}
          className="font-sans"
        >
          התחבר לחשבון קיים ←
        </AuthSkewLink>
      </div>
    </div>
  );
}
