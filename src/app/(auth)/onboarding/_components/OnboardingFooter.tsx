"use client";

import { S, STEPS } from "../_lib/constants";

/* ── Sticky footer (step counter + back/skip/next buttons) ── */
export function OnboardingFooter({
  step,
  loading,
  onBack,
  onSkip,
  onNext,
}: {
  step: number;
  loading: boolean;
  onBack: () => void;
  onSkip: () => void;
  onNext: () => void;
}) {
  return (
    <footer
      style={{
        position: "sticky",
        bottom: 0,
        background: "hsl(28,15%,4%)",
        borderTop: `1px solid ${S.line}`,
        padding: "18px 36px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 24,
      }}
    >
      <div
        className="font-mono"
        style={{
          fontSize: 11,
          letterSpacing: ".06em",
          textTransform: "uppercase",
          color: S.dim,
        }}
      >
        שלב{" "}
        <strong style={{ color: S.accent, fontWeight: 500 }}>
          {String(step).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
        </strong>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        {step > 1 && (
          <button
            onClick={onBack}
            className="font-sans"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 26px",
              borderRadius: 10,
              background: "transparent",
              border: `1px solid ${S.line}`,
              color: S.fog,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            חזור
          </button>
        )}
        {step < STEPS.length && (
          <button
            onClick={onSkip}
            className="font-sans"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 26px",
              borderRadius: 10,
              background: "transparent",
              border: "none",
              color: S.subtle,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            דלג שלב זה
          </button>
        )}
        <button
          onClick={onNext}
          disabled={loading}
          className="btn-primary"
          style={{ padding: "12px 26px", fontSize: 14 }}
        >
          {step === STEPS.length ? "סיים" : "המשך לשלב הבא"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M19 12H5M11 5l-7 7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
