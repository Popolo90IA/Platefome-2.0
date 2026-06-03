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
          background: "hsl(28,62%,42%,.08)",
          border: "1px solid hsl(28,62%,42%,.18)",
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
            background: "hsl(28,62%,42%)",
          }}
        />
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: ".1em",
            textTransform: "uppercase" as const,
            color: "hsl(28,62%,42%)",
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
          color: "hsl(24,18%,16%)",
          lineHeight: 1.05,
          letterSpacing: "-.02em",
          margin: "0 0 20px",
        }}
      >
        שלוש תוכניות.{" "}
        <em style={{ color: "hsl(28,62%,42%)", fontStyle: "italic" }}>
          אפס הפתעות.
        </em>
      </h2>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "hsl(28,62%,42%,.07)",
          border: "1px solid hsl(28,62%,42%,.2)",
          borderRadius: 99,
          padding: "8px 20px",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "hsl(28,62%,42%)",
            boxShadow: "0 0 8px hsl(28,62%,42%,.35)",
            animation: "pulseGlow 2.5s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: ".82rem",
            fontWeight: 600,
            color: "hsl(28,62%,42%)",
          }}
        >
          חודש ראשון מתנה לכל תוכנית
        </span>
      </div>
    </div>
  );
}
