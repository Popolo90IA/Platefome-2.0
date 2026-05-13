"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Loader2, AlertCircle, Eye, EyeOff, Check } from "lucide-react";
import { LogoMark } from "@/components/brand";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "hsl(var(--void))",
      }}
    >
      {/* ── Left panel — brand visual ──────────────────────────────── */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(160deg, hsl(28,25%,12%) 0%, hsl(28,18%,7%) 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 52px",
        }}
      >
        {/* Noise grain */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />
        {/* Ambient glow top-left */}
        <div
          aria-hidden
          style={{
            position: "absolute", top: -100, left: -80,
            width: 400, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, hsl(22,70%,50%,.14) 0%, transparent 70%)",
            pointerEvents: "none", zIndex: 0,
          }}
        />
        {/* Ambient glow bottom-right */}
        <div
          aria-hidden
          style={{
            position: "absolute", bottom: -100, right: -60,
            width: 360, height: 360, borderRadius: "50%",
            background: "radial-gradient(circle, hsl(28,62%,42%,.12) 0%, transparent 70%)",
            pointerEvents: "none", zIndex: 0,
          }}
        />
        {/* Dot grid */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,.035) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Logo */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Link href="/" className="logo-hover" style={{ display: "inline-block" }}>
            <img
              src="/brand/logo-lockup-light.svg"
              width={160}
              height={44}
              alt="Plateform — Every dish, in 360°"
              draggable={false}
              style={{ display: "block" }}
            />
          </Link>
        </div>

        {/* Center content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            className="font-sans uppercase"
            style={{ fontSize: 11, letterSpacing: ".08em", fontWeight: 600, color: "hsl(28,62%,52%)", marginBottom: 20 }}
          >
            הצטרפות חינמית
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 3vw, 2.8rem)",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-.025em",
              color: "hsl(36,30%,88%)",
              margin: "0 0 32px",
            }}
          >
            התפריט שלך<br />
            <em style={{ fontStyle: "italic", color: "hsl(28,62%,52%)" }}>מוכן תוך דקות.</em>
          </h2>

          {/* Benefits */}
          {[
            { text: "הקמה מיידית, ללא הגדרות" },
            { text: "עיצוב מקצועי מובנה" },
            { text: "QR קוד מוכן להדפסה" },
            { text: "אנליטיקס בזמן אמת" },
          ].map((b) => (
            <div
              key={b.text}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}
            >
              <div
                style={{
                  width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg, hsl(28,62%,38%), hsl(22,70%,50%))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Check style={{ width: 10, height: 10, color: "#fff", strokeWidth: 3 }} />
              </div>
              <span
                className="font-sans"
                style={{ fontSize: 14, color: "hsl(36,20%,65%)", lineHeight: 1.4 }}
              >
                {b.text}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          style={{
            position: "relative", zIndex: 1,
            borderTop: "1px solid rgba(255,255,255,.07)",
            paddingTop: 24,
          }}
        >
          <div className="font-sans" style={{ fontSize: 12, color: "hsl(36,20%,45%)", letterSpacing: ".02em", fontWeight: 500 }}>
            חינמי לתמיד · ללא כרטיס אשראי
          </div>
        </div>
      </div>

      {/* ── Right panel — form ─────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "48px 52px",
          background: "hsl(var(--sand))",
          position: "relative",
        }}
      >
        {/* Mobile logo mark */}
        <div style={{ position: "absolute", top: 32, left: 32, display: "none" }}>
          <LogoMark size={32} />
        </div>

        <div style={{ width: "100%", maxWidth: 380 }}>

          {/* Heading */}
          <div style={{ marginBottom: 36, textAlign: "right" }}>
            <div
              className="font-sans uppercase"
              style={{ fontSize: 11, letterSpacing: ".08em", fontWeight: 600, color: "hsl(var(--accent-bright))", marginBottom: 10 }}
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
              <em style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}>בחינם.</em>
            </h1>
            <p
              className="font-sans"
              style={{ fontSize: 14, color: "hsl(var(--subtle))", marginTop: 10 }}
            >
              התחל לבנות את התפריט הדיגיטלי שלך בדקות
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <label
                htmlFor="email"
                className="font-sans uppercase"
                style={{ fontSize: 12, letterSpacing: ".06em", fontWeight: 600, color: "hsl(var(--dim))" }}
              >
                אימייל
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir="ltr"
                className="font-sans"
                style={{
                  width: "100%", boxSizing: "border-box",
                  fontSize: 14, padding: "11px 14px",
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--line))",
                  borderRadius: 10,
                  color: "hsl(var(--fog))",
                  outline: "none",
                  transition: "border-color .15s, box-shadow .15s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "hsl(28,62%,42%,.6)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px hsl(28,62%,42%,.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "hsl(var(--line))";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <label
                htmlFor="password"
                className="font-sans uppercase"
                style={{ fontSize: 12, letterSpacing: ".06em", fontWeight: 600, color: "hsl(var(--dim))" }}
              >
                סיסמה
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="מינימום 6 תווים"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  dir="ltr"
                  className="font-sans"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    fontSize: 14, padding: "11px 40px 11px 14px",
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--line))",
                    borderRadius: 10,
                    color: "hsl(var(--fog))",
                    outline: "none",
                    transition: "border-color .15s, box-shadow .15s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "hsl(28,62%,42%,.6)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px hsl(28,62%,42%,.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "hsl(var(--line))";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", padding: 0,
                    color: "hsl(var(--dim))", display: "flex", alignItems: "center",
                  }}
                >
                  {showPassword ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                </button>
              </div>
              {/* Password strength */}
              {password.length > 0 && (
                <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        height: 3, flex: 1, borderRadius: 99,
                        background: password.length > i * 3
                          ? password.length < 6
                            ? "hsl(0,72%,51%)"
                            : password.length < 10
                            ? "hsl(38,92%,50%)"
                            : "hsl(158,45%,52%)"
                          : "hsl(var(--line))",
                        transition: "background .2s",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  fontSize: 13, color: "hsl(0,72%,51%)",
                  background: "hsl(0,72%,51%,.08)",
                  padding: "12px 14px", borderRadius: 10,
                  border: "1px solid hsl(0,72%,51%,.2)",
                }}
              >
                <AlertCircle style={{ width: 15, height: 15, flexShrink: 0, marginTop: 1 }} />
                <span className="font-sans">{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="font-sans"
              style={{
                width: "100%", padding: "13px 20px",
                background: loading ? "hsl(var(--line))" : "linear-gradient(135deg, hsl(28,62%,38%) 0%, hsl(22,70%,50%) 100%)",
                border: "none", borderRadius: 10,
                color: "#fff", fontSize: 14, fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "opacity .15s",
                boxShadow: loading ? "none" : "0 4px 16px -4px hsl(28,62%,42%,.4)",
                marginTop: 4,
              }}
              onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.opacity = ".9"; }}
              onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            >
              {loading ? (
                <Loader2 style={{ width: 18, height: 18, animation: "spin 1s linear infinite" }} />
              ) : (
                "הירשם בחינם"
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, background: "hsl(var(--line))" }} />
            <span className="font-sans" style={{ fontSize: 12, letterSpacing: ".04em", fontWeight: 500, color: "hsl(var(--dim))" }}>
              כבר רשום?
            </span>
            <div style={{ flex: 1, height: 1, background: "hsl(var(--line))" }} />
          </div>

          {/* Login link */}
          <Link
            href="/login"
            style={{
              display: "block", width: "100%", boxSizing: "border-box",
              padding: "12px 20px", borderRadius: 10,
              border: "1px solid hsl(var(--line))",
              background: "transparent",
              color: "hsl(var(--fog))", fontSize: 14, fontWeight: 500,
              textAlign: "center", textDecoration: "none",
              transition: "border-color .15s, background .15s",
            }}
            className="font-sans"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(28,62%,42%,.5)";
              (e.currentTarget as HTMLAnchorElement).style.background = "hsl(28,62%,42%,.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(var(--line))";
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            התחבר לחשבון קיים ←
          </Link>
        </div>
      </div>
    </div>
  );
}
