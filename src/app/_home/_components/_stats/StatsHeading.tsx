"use client";

/* ── StatsHeading — eyebrow rule + Cormorant title for the stats block ── */
export function StatsHeading() {
  return (
    <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
      <h2
        style={{
          fontFamily: "var(--font-hebrew)",
          fontSize: "clamp(2rem,4vw,2.75rem)",
          fontWeight: 600,
          color: "hsl(var(--fog))",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        כל מה שהופך תפריט ל
        <em style={{ color: "hsl(var(--accent-bright))", fontStyle: "italic" }}>חוויה</em>
      </h2>
    </div>
  );
}
