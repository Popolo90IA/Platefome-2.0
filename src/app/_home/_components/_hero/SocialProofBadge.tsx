"use client";

export function SocialProofBadge() {
  return (
    <div
      className="hero-fade-a"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 16px 6px 12px",
        background: "hsl(var(--accent-bright) / .1)",
        border: "1px solid hsl(var(--accent-bright) / .22)",
        borderRadius: 99,
        marginBottom: 36,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "hsl(var(--sage))",
          flexShrink: 0,
          animation: "badgeDot 2.2s ease-in-out infinite",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: ".8125rem",
          color: "hsl(var(--accent-warm))",
          fontWeight: 500,
        }}
      >
        תפריט חי · כל מנה בתלת-מימד
      </span>
    </div>
  );
}
