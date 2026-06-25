"use client";

export function HeroTitle() {
  return (
    <h1
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        lineHeight: 1.08,
        margin: "0 0 20px",
      }}
    >
      {/* Ligne 1 — masque overflow : le reveal "slide up" est piloté par le rideau (.hero-fade-b) */}
      <span style={{ display: "block", overflow: "hidden" }}>
        <span
          className="hero-fade-b"
          style={{
            display: "block",
            fontSize: "clamp(44px, 5.2vw, 88px)",
            letterSpacing: "-.03em",
            padding: "0.14em 0 0.1em",
            color: "hsl(var(--fog))",
          }}
        >
          תפריט שגורם
        </span>
      </span>

      {/* Ligne 2 — mot signature en italique bronze (gradient de marque, statique ;
          fallback `color` solide si background-clip:text non supporté) */}
      <span style={{ display: "block", overflow: "hidden" }}>
        <span
          className="hero-fade-c"
          style={{
            display: "block",
            fontStyle: "italic",
            fontSize: "clamp(38px, 4.6vw, 74px)",
            letterSpacing: "-.02em",
            padding: "0.14em 0 0.12em",
            color: "hsl(var(--gold))",
            background: "var(--grad-gold-shimmer)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ללקוחות להזמין יותר
        </span>
      </span>
    </h1>
  );
}
