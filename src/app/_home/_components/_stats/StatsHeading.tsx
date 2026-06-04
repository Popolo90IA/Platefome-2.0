"use client";

/* ── StatsHeading — eyebrow rule + Cormorant title for the stats block ── */
export function StatsHeading() {
  return (
    <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ width: 32, height: 1, background: "hsl(var(--accent-bright) / .35)" }} />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: ".6875rem",
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "hsl(var(--accent-bright))",
            fontWeight: 500,
          }}
        >
          מספרים שמדברים
        </span>
        <div style={{ width: 32, height: 1, background: "hsl(var(--accent-bright) / .35)" }} />
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem,4vw,2.75rem)",
          fontWeight: 600,
          color: "hsl(var(--fog))",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        המסעדות שבחרו{" "}
        <em style={{ color: "hsl(var(--accent-bright))", fontStyle: "italic" }}>PLATFORME</em>{" "}
        מרוויחות יותר
      </h2>
    </div>
  );
}
