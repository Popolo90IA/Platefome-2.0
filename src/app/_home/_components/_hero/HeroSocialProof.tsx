"use client";

const AVATAR_COLORS = [
  "hsl(28,60%,55%)",
  "hsl(200,60%,55%)",
  "hsl(140,50%,50%)",
  "hsl(280,50%,60%)",
  "hsl(0,60%,60%)",
];

export function HeroSocialProof() {
  return (
    <div
      className="hero-fade-f"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginTop: 28,
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex" }}>
        {AVATAR_COLORS.map((c, i) => (
          <div
            key={i}
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: c,
              border: "2px solid hsl(38,28%,94%)",
              marginLeft: i === 0 ? 0 : -7,
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      <div
        style={{
          width: 1,
          height: 24,
          background: "hsl(32,20%,100%,.1)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 2,
        }}
      >
        <div style={{ display: "flex", gap: 2 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="hsl(22,70%,50%)"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: ".75rem",
            color: "hsl(24,12%,38%)",
          }}
        >
          מדורג 4.9/5 על ידי 200+ מסעדות
        </span>
      </div>
    </div>
  );
}
