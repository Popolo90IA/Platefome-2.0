"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/* ── Step definitions ─────────────────────────────────── */
const STEPS = [
  { id: 1, label: "פרטי המסעדה" },
  { id: 2, label: "המנה הראשונה" },
  { id: 3, label: "QR לשולחנות" },
  { id: 4, label: "הזמנת צוות" },
];

/* ── Styles ───────────────────────────────────────────── */
const S = {
  void:  "hsl(38 28% 94%)",
  deep:  "hsl(38 30% 97%)",
  abyss: "hsl(36 22% 90%)",
  fog:   "hsl(24 18% 16%)",
  subtle: "hsl(24 12% 38%)",
  dim:    "hsl(24 10% 55%)",
  line:   "hsl(30 18% 85%)",
  accent: "hsl(28 62% 42%)",
} as const;

/* ── Step 1: Restaurant details ─────────────────────── */
function Step1({
  values, onChange,
}: {
  values: { name: string; slug: string; city: string };
  onChange: (k: string, v: string) => void;
}) {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      {[
        { key: "name",  label: "שם המסעדה",      placeholder: "מיזרחי תל אביב", type: "text" },
        { key: "slug",  label: "כתובת URL (slug)", placeholder: "mizrahi-tlv",    type: "text" },
        { key: "city",  label: "עיר / אזור",      placeholder: "תל אביב",         type: "text" },
      ].map(f => (
        <div key={f.key} style={{ marginBottom: 20 }}>
          <label className="font-mono uppercase" style={{ display: "block", fontSize: 10, letterSpacing: ".15em", color: S.dim, marginBottom: 8 }}>
            {f.label}
          </label>
          <input
            type={f.type}
            value={values[f.key as keyof typeof values]}
            onChange={e => onChange(f.key, e.target.value)}
            placeholder={f.placeholder}
            className="font-sans"
            style={{ width: "100%", boxSizing: "border-box", fontSize: 15, padding: "13px 16px", background: S.void, border: `1px solid ${S.line}`, borderRadius: 10, color: S.fog, outline: "none" }}
          />
        </div>
      ))}
    </div>
  );
}

/* ── Step 2: First dish / file upload ───────────────── */
function Step2() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 36, marginTop: 0, alignItems: "stretch" }}>

      {/* Upload card */}
      <div style={{ background: "hsl(var(--deep))", border: `1px solid ${S.line}`, borderRadius: 18, padding: 40, display: "flex", flexDirection: "column" }}>
        {/* Upload zone */}
        <div style={{
          flex: 1, border: `2px dashed hsl(28,62%,42%,.4)`, borderRadius: 14,
          background: "linear-gradient(160deg, hsl(28,62%,42%,.05), transparent)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14,
          padding: "40px 30px", textAlign: "center", minHeight: 280,
        }}>
          <div style={{ width: 64, height: 64, borderRadius: 99, background: "hsl(28,62%,42%,.12)", display: "grid", placeItems: "center", color: S.accent }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <div className="font-display" style={{ fontSize: 26, fontWeight: 500, color: S.fog, letterSpacing: "-.01em" }}>
            גרור קובץ <em style={{ fontStyle: "italic", color: S.accent }}>3D</em> או תמונות
          </div>
          <p className="font-sans" style={{ fontSize: 14, color: S.subtle, maxWidth: 380, lineHeight: 1.55, margin: 0 }}>
            המרה אוטומטית של .glb / .usdz / .obj. או 12 תמונות JPG מזוויות שונות וה-AI שלנו יבנה את המודל.
          </p>
          <span className="font-mono" style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: S.dim, marginTop: 6 }}>
            .GLB · .USDZ · .OBJ · JPG · MAX 80MB
          </span>

          {/* Hidden file input trigger */}
          <label style={{ cursor: "pointer", marginTop: 4 }}>
            <span className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", fontSize: 13.5, borderRadius: 10, cursor: "pointer" }}>
              בחר קובץ
            </span>
            <input type="file" accept=".glb,.usdz,.obj,.jpg,.jpeg,.png" style={{ display: "none" }} />
          </label>
        </div>

        {/* Alt: phone scan */}
        <div style={{ marginTop: 18, padding: 18, background: S.abyss, borderRadius: 12, display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: S.accent, color: "white", display: "grid", placeItems: "center", flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
              <circle cx="12" cy="14" r="3"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div className="font-sans" style={{ fontSize: 14, fontWeight: 600, color: S.fog }}>סרוק מהפלאפון תוך כדי</div>
            <div className="font-sans" style={{ fontSize: 12.5, color: S.subtle, marginTop: 3, lineHeight: 1.5 }}>
              קוד QR יישלח לטלפון שלך. צלם 12 תמונות בהנחייה חיה.
            </div>
          </div>
          <span style={{ color: S.dim, fontSize: 18 }}>←</span>
        </div>
      </div>

      {/* Preview card */}
      <div style={{
        background: "linear-gradient(170deg, hsl(28,55%,28%) 0%, hsl(28,30%,15%) 50%, hsl(28,15%,8%) 100%)",
        borderRadius: 18, padding: "40px 30px",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22,
        position: "relative", overflow: "hidden", minHeight: 460,
      }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 100%, hsl(28,62%,55%,.15), transparent 60%)", pointerEvents: "none" }}/>
        <div className="font-mono" style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "hsl(28,62%,65%)", position: "relative" }}>
          איך זה יראה ללקוח
        </div>

        {/* Demo phone */}
        <div style={{ width: 220, height: 360, background: "#1a1614", borderRadius: 28, padding: 8, boxShadow: "0 30px 80px -20px rgba(0,0,0,.6)", position: "relative", zIndex: 1 }}>
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(180deg, hsl(28,12%,18%), hsl(28,12%,10%))", borderRadius: 22, padding: "18px 14px", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
            {/* Mini plate */}
            <div style={{ width: 130, height: 130, margin: "22px auto 14px", borderRadius: "50%", background: "radial-gradient(circle at 50% 30%, hsl(28,5%,90%), hsl(28,8%,70%))", position: "relative", boxShadow: "0 18px 30px -10px rgba(0,0,0,.5)" }}>
              <div style={{ position: "absolute", top: 18, left: 18, right: 18, bottom: 18, borderRadius: "50%", background: "radial-gradient(circle at 50% 30%, hsl(38,55%,68%), hsl(32,40%,48%))" }}/>
            </div>
            {/* Orbit */}
            <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, calc(-50% - 28px)) scaleY(.3)", width: 170, height: 170, border: "1px dashed hsl(28,62%,55%,.5)", borderRadius: "50%", pointerEvents: "none" }}/>
            <div className="font-display" style={{ fontSize: 18, fontWeight: 600, color: "hsl(36,40%,92%)", textAlign: "center" }}>
              חומוס <em style={{ fontStyle: "italic", color: "hsl(28,62%,65%)" }}>מסבחה</em>
            </div>
            <div className="font-mono" style={{ color: "hsl(28,62%,65%)", textAlign: "center", marginTop: 4, fontSize: 13 }}>₪38</div>
            <div className="font-sans" style={{ margin: "18px 6px 0", padding: 10, background: "linear-gradient(135deg, hsl(28,62%,42%), hsl(22,70%,50%))", borderRadius: 10, textAlign: "center", fontSize: 11.5, fontWeight: 600, color: "white" }}>
              הוסף להזמנה
            </div>
          </div>
        </div>

        <p className="font-sans" style={{ fontSize: 12, color: "hsl(28,30%,75%)", textAlign: "center", maxWidth: 220, lineHeight: 1.5, position: "relative", margin: 0 }}>
          תצוגה מקדימה תתעדכן ברגע שהקובץ מועלה — בלי המתנה.
        </p>
      </div>
    </div>
  );
}

/* ── Step 3: QR ─────────────────────────────────────── */
function Step3() {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
      <div style={{ width: 120, height: 120, background: "white", borderRadius: 16, padding: 14, margin: "0 auto 24px", boxShadow: "0 8px 32px rgba(0,0,0,.1)", display: "grid", placeItems: "center" }}>
        <svg viewBox="0 0 24 24" width="80" height="80">
          <rect x="2" y="2" width="6" height="6" fill="hsl(28,15%,18%)"/>
          <rect x="16" y="2" width="6" height="6" fill="hsl(28,15%,18%)"/>
          <rect x="2" y="16" width="6" height="6" fill="hsl(28,15%,18%)"/>
          <rect x="10" y="10" width="3" height="3" fill="hsl(28,62%,42%)"/>
          <rect x="14" y="10" width="2" height="2" fill="hsl(28,15%,18%)"/>
          <rect x="18" y="10" width="2" height="2" fill="hsl(28,15%,18%)"/>
          <rect x="10" y="16" width="2" height="2" fill="hsl(28,15%,18%)"/>
          <rect x="14" y="18" width="2" height="2" fill="hsl(28,15%,18%)"/>
        </svg>
      </div>
      <p className="font-sans" style={{ fontSize: 15, color: S.subtle, lineHeight: 1.6 }}>
        קוד ה-QR שלך מוכן. הורד, הדפס והדבק על כל שולחן.
        <br/>הלקוחות יסרקו ויראו את המנות שלך בתלת מימד.
      </p>
    </div>
  );
}

/* ── Step 4: Invite team ────────────────────────────── */
function Step4({ email, onChange }: { email: string; onChange: (v: string) => void }) {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <label className="font-mono uppercase" style={{ display: "block", fontSize: 10, letterSpacing: ".15em", color: S.dim, marginBottom: 8 }}>
          כתובת אימייל לצוות
        </label>
        <input
          type="email"
          value={email}
          onChange={e => onChange(e.target.value)}
          placeholder="adi@restaurant.co.il"
          className="font-sans"
          style={{ width: "100%", boxSizing: "border-box", fontSize: 15, padding: "13px 16px", background: S.void, border: `1px solid ${S.line}`, borderRadius: 10, color: S.fog, outline: "none" }}
        />
      </div>
      <p className="font-sans" style={{ fontSize: 13, color: S.subtle }}>
        הם יקבלו גישה לניהול התפריט ללא גישה לחיוב.
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN ONBOARDING WIZARD
   ══════════════════════════════════════════════════════ */
export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [restaurantData, setRestaurantData] = useState({ name: "", slug: "", city: "" });
  const [teamEmail, setTeamEmail] = useState("");

  const goNext = async () => {
    if (step === STEPS.length) {
      // Final step — redirect to dashboard
      setLoading(true);
      if (restaurantData.name && restaurantData.slug) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("restaurants").upsert({
            user_id: user.id,
            name: restaurantData.name,
            slug: restaurantData.slug.toLowerCase().replace(/\s+/g, "-"),
            is_active: true,
          }, { onConflict: "user_id" });
        }
      }
      router.push("/dashboard");
      return;
    }
    setStep(s => s + 1);
  };

  const goBack = () => setStep(s => Math.max(1, s - 1));

  const STEP_LABELS: Record<number, string> = {
    1: "מלא פרטי מסעדה",
    2: "העלה את המנה הראשונה",
    3: "הורד את קוד ה-QR שלך",
    4: "הזמן את הצוות שלך",
  };

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: S.void, fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── Top nav ────────────────────────────────────── */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 36px", borderBottom: `1px solid ${S.line}` }}>
        <div className="font-display" style={{ fontSize: 17, fontWeight: 600, letterSpacing: ".14em", color: S.fog, display: "flex", alignItems: "center", gap: 10 }} dir="ltr">
          <svg width="28" height="28" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="28" fill="#f6f4ef" stroke="hsl(28,15%,18%)" strokeWidth="1.5"/>
            <circle cx="40" cy="40" r="20" fill="none" stroke="hsl(28,15%,18%)" strokeWidth=".5" strokeDasharray="1.5 2"/>
            <text x="40" y="49" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontWeight="500" fontSize="32" fill="hsl(28,62%,38%)">P</text>
          </svg>
          PLATE<em style={{ fontStyle: "italic", color: S.accent, fontWeight: 500 }}>FORM</em>
        </div>
        <div className="font-mono" style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: S.dim }}>
          {restaurantData.name && <span style={{ color: S.subtle }}>{restaurantData.name}</span>}
          {restaurantData.name && <span style={{ opacity: .4 }}>·</span>}
          <Link href="/dashboard" style={{ color: S.subtle, textDecoration: "none" }}>דלג בינתיים</Link>
          <Link href="/login" style={{ color: S.subtle, textDecoration: "none" }}>צא</Link>
        </div>
      </nav>

      {/* ── Progress strip ────────────────────────────── */}
      <div style={{ padding: "28px 36px 0", maxWidth: 1200, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "flex", alignItems: "center", maxWidth: 720, margin: "0 auto" }}>
          {STEPS.map((s, i) => {
            const state = s.id < step ? "done" : s.id === step ? "now" : "pending";
            return (
              <>
                {/* Step */}
                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, flex: i === STEPS.length - 1 ? "0 0 auto" : 1 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 99, display: "grid", placeItems: "center",
                    flexShrink: 0,
                    background: state === "done" ? S.accent : state === "now" ? S.fog : S.abyss,
                    color: state === "done" ? "white" : state === "now" ? "hsl(28,15%,12%)" : S.dim,
                    border: state === "pending" ? `1px solid ${S.line}` : "none",
                    boxShadow: state === "now" ? `0 0 0 5px hsl(28,15%,30%,.3)` : "none",
                  }}>
                    {state === "done" ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                    ) : (
                      <span className="font-mono" style={{ fontSize: 12, fontWeight: 600 }}>{s.id}</span>
                    )}
                  </div>
                  <span className="font-sans" style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", color: state === "done" ? S.subtle : state === "now" ? S.fog : S.dim }}>
                    {s.label}
                  </span>
                </div>

                {/* Line between steps */}
                {i < STEPS.length - 1 && (
                  <div key={`line-${i}`} style={{ flex: 1, height: 1, background: s.id < step ? S.accent : S.line, margin: "0 14px", minWidth: 30 }}/>
                )}
              </>
            );
          })}
        </div>
      </div>

      {/* ── Stage content ─────────────────────────────── */}
      <main style={{ flex: 1, padding: "50px 36px 60px", maxWidth: 1200, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".18em", color: S.accent, marginBottom: 14 }}>
            שלב {step} מתוך {STEPS.length}
          </p>
          <h1 className="font-display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 600, lineHeight: 1, letterSpacing: "-.02em", color: S.fog, margin: "0 0 16px" }}>
            {step === 1 && <>ספר לנו על <em style={{ fontStyle: "italic", color: S.accent }}>המסעדה שלך</em></>}
            {step === 2 && <>בוא נמיר את <em style={{ fontStyle: "italic", color: S.accent }}>המנה הראשונה</em> שלך</>}
            {step === 3 && <>הQR שלך <em style={{ fontStyle: "italic", color: S.accent }}>מוכן</em></>}
            {step === 4 && <>הזמן את <em style={{ fontStyle: "italic", color: S.accent }}>הצוות</em> שלך</>}
          </h1>
          <p className="font-sans" style={{ fontSize: 16, color: S.subtle, maxWidth: 540, margin: "0 auto", lineHeight: 1.55 }}>
            {step === 1 && "כמה פרטים בסיסיים ואנחנו מוכנים להתחיל. זה לוקח כ-2 דקות."}
            {step === 2 && "העלה מודל 3D, תמונות, או צלם 12 צילומים מהפלאפון — ה-AI שלנו יבנה את ההמרה."}
            {step === 3 && "הלקוחות יסרקו ויראו את המנות שלך בתלת מימד. אין צורך באפליקציה."}
            {step === 4 && "הוסף חברי צוות שיוכלו לנהל את התפריט איתך."}
          </p>

          {/* Live help pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, background: "hsl(28,62%,42%,.08)", border: "1px solid hsl(28,62%,42%,.2)", fontSize: 12, color: S.fog, marginTop: 22 }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: S.accent, animation: "pulse 2s infinite", flexShrink: 0 }}/>
            <span className="font-sans">צוות הקליטה זמין בצ׳אט · ממוצע מענה 90 שניות</span>
          </div>
        </div>

        {/* Step content */}
        {step === 1 && <Step1 values={restaurantData} onChange={(k, v) => setRestaurantData(d => ({ ...d, [k]: v }))} />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 email={teamEmail} onChange={setTeamEmail} />}
      </main>

      {/* ── Sticky footer ─────────────────────────────── */}
      <footer style={{ position: "sticky", bottom: 0, background: "hsl(28,15%,4%)", borderTop: `1px solid ${S.line}`, padding: "18px 36px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
        <div className="font-mono" style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: S.dim }}>
          שלב <strong style={{ color: S.accent, fontWeight: 500 }}>{String(step).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}</strong>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {step > 1 && (
            <button
              onClick={goBack}
              className="font-sans"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px", borderRadius: 10, background: "transparent", border: `1px solid ${S.line}`, color: S.fog, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              חזור
            </button>
          )}
          {step < STEPS.length && (
            <button
              onClick={() => setStep(s => s + 1)}
              className="font-sans"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px", borderRadius: 10, background: "transparent", border: "none", color: S.subtle, fontSize: 14, cursor: "pointer" }}
            >
              דלג שלב זה
            </button>
          )}
          <button
            onClick={goNext}
            disabled={loading}
            className="btn-primary"
            style={{ padding: "12px 26px", fontSize: 14 }}
          >
            {step === STEPS.length ? "סיים" : "המשך לשלב הבא"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M19 12H5M11 5l-7 7 7 7"/></svg>
          </button>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: .4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
