"use client";

/* ── StatsHeading — eyebrow rule + Cormorant title for the stats block ── */
export function StatsHeading() {
  return (
    <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ width: 32, height: 1, background: "hsl(28,62%,42%,.35)" }} />
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: ".6875rem",
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "hsl(28,62%,42%)",
            fontWeight: 500,
          }}
        >
          מספרים שמדברים
        </span>
        <div style={{ width: 32, height: 1, background: "hsl(28,62%,42%,.35)" }} />
      </div>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(2rem,4vw,2.75rem)",
          fontWeight: 600,
          color: "hsl(24,18%,16%)",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        המסעדות שבחרו{" "}
        <em style={{ color: "hsl(28,62%,42%)", fontStyle: "italic" }}>PLATFORME</em>{" "}
        מרוויחות יותר
      </h2>
    </div>
  );
}
