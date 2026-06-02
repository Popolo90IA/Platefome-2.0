"use client";

export function HeroTitle() {
  return (
    <div style={{ overflow: "visible", marginBottom: 20 }}>
      <div style={{ overflow: "hidden" }}>
        <h1
          className="hero-fade-b"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: "clamp(48px, 7vw, 108px)",
            lineHeight: 0.92,
            letterSpacing: "-.03em",
            margin: 0,
            padding: "4px 0 6px",
            color: "hsl(24,18%,16%)",
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
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "clamp(40px, 6vw, 92px)",
            lineHeight: 0.92,
            letterSpacing: "-.02em",
            margin: 0,
            padding: "4px 0 6px",
            background:
              "linear-gradient(135deg, hsl(28,62%,42%), hsl(22,70%,56%), hsl(28,58%,42%))",
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
