"use client";

import { S, STEPS, STEP_SUBTITLES } from "../_lib/constants";

const TITLES: Record<number, React.ReactNode> = {
  1: (
    <>
      ספר לנו על <em style={{ fontStyle: "italic", color: S.accent }}>המסעדה שלך</em>
    </>
  ),
  2: (
    <>
      בוא נמיר את <em style={{ fontStyle: "italic", color: S.accent }}>המנה הראשונה</em> שלך
    </>
  ),
  3: (
    <>
      הQR שלך <em style={{ fontStyle: "italic", color: S.accent }}>מוכן</em>
    </>
  ),
  4: (
    <>
      הזמן את <em style={{ fontStyle: "italic", color: S.accent }}>הצוות</em> שלך
    </>
  ),
};

/* ── Stage header (eyebrow + title + subtitle + help pill) ── */
export function OnboardingHeader({ step }: { step: number }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <p
        className="font-sans uppercase"
        style={{ fontSize: 11, letterSpacing: ".06em", color: S.accent, marginBottom: 14 }}
      >
        שלב {step} מתוך {STEPS.length}
      </p>
      <h1
        className="font-display"
        style={{
          fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
          fontWeight: 600,
          lineHeight: 1,
          letterSpacing: "-.02em",
          color: S.fog,
          margin: "0 0 16px",
        }}
      >
        {TITLES[step]}
      </h1>
      <p
        className="font-sans"
        style={{
          fontSize: 16,
          color: S.subtle,
          maxWidth: 540,
          margin: "0 auto",
          lineHeight: 1.55,
        }}
      >
        {STEP_SUBTITLES[step]}
      </p>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 14px",
          borderRadius: 99,
          background: "hsl(28,62%,42%,.08)",
          border: "1px solid hsl(28,62%,42%,.2)",
          fontSize: 12,
          color: S.fog,
          marginTop: 22,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 99,
            background: S.accent,
            animation: "pulse 2s infinite",
            flexShrink: 0,
          }}
        />
        <span className="font-sans">צוות הקליטה זמין בצ׳אט · ממוצע מענה 90 שניות</span>
      </div>
    </div>
  );
}
