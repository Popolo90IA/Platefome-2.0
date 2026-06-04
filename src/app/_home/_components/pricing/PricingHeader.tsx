"use client";

/**
 * PricingHeader — eyebrow "מחירים" + titre + badge "חודש ראשון מתנה".
 */
export function PricingHeader() {
  return (
    <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "hsl(var(--accent-bright) / .08)",
          border: "1px solid hsl(var(--accent-bright) / .18)",
          borderRadius: 99,
          padding: "6px 18px",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "hsl(var(--accent-bright))",
          }}
        />
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: ".1em",
            textTransform: "uppercase" as const,
            color: "hsl(var(--accent-bright))",
          }}
        >
          מחירים
        </span>
      </div>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(2.2rem,4.5vw,3.5rem)",
          fontWeight: 700,
          color: "hsl(var(--fog))",
          lineHeight: 1.05,
          letterSpacing: "-.02em",
          margin: "0 0 20px",
        }}
      >
        שלוש תוכניות.{" "}
        <em style={{ color: "hsl(var(--accent-bright))", fontStyle: "italic" }}>
          אפס הפתעות.
        </em>
      </h2>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "hsl(var(--accent-bright) / .07)",
          border: "1px solid hsl(var(--accent-bright) / .2)",
          borderRadius: 99,
          padding: "8px 20px",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "hsl(var(--accent-bright))",
            boxShadow: "0 0 8px hsl(var(--accent-bright) / .35)",
            animation: "pulseGlow 2.5s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: ".82rem",
            fontWeight: 600,
            color: "hsl(var(--accent-bright))",
          }}
        >
          חודש ראשון מתנה לכל תוכנית
        </span>
      </div>
    </div>
  );
}
