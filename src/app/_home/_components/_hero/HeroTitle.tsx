"use client";

export function HeroTitle() {
  return (
    <div style={{ overflow: "visible", marginBottom: 20 }}>
      <div style={{ overflow: "hidden" }}>
        <h1
          className="hero-fade-b"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(44px, 5.2vw, 88px)",
            lineHeight: 0.94,
            letterSpacing: "-.03em",
            margin: 0,
            padding: "4px 0 6px",
            color: "hsl(var(--fog))",
            display: "block",
          }}
        >
          תפריט שגורם
        </h1>
      </div>

      <div style={{ overflow: "hidden" }}>
        <h1
          className="hero-fade-c"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "clamp(38px, 4.6vw, 74px)",
            lineHeight: 0.94,
            letterSpacing: "-.02em",
            margin: 0,
            padding: "4px 0 6px",
            background: "var(--grad-gold-shimmer)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation:
              "fadeUp .7s cubic-bezier(.16,1,.3,1) .3s both, goldShimmer 6s ease-in-out 1s infinite",
            display: "block",
          }}
        >
          ללקוחות להזמין יותר
        </h1>
      </div>
    </div>
  );
}
