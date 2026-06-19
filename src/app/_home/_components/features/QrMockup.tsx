"use client";

import { MOCKUP } from "./styles";

/**
 * QrMockup — petite tuile QR + "תפריט נפתח · 0.8s · ✓ פעיל".
 */
export function QrMockup() {
  return (
    <div
      style={{
        ...MOCKUP,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          background: "hsl(var(--deep))",
          borderRadius: 8,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 3,
          padding: 7,
          flexShrink: 0,
        }}
      >
        <div style={{ background: "hsl(36,28%,80%)", borderRadius: 2 }} />
        <div style={{ background: "hsl(36,28%,80%)", borderRadius: 2 }} />
        <div style={{ background: "hsl(36,28%,80%)", borderRadius: 2 }} />
        <div style={{ background: "hsl(var(--accent-bright))", borderRadius: 2 }} />
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: ".8rem",
            fontWeight: 600,
            color: "hsl(var(--fog))",
          }}
        >
          תפריט נפתח
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: ".7rem",
            color: "hsl(var(--dim))",
          }}
        >
          0.8s · ללא הורדה
        </div>
      </div>
      <div
        style={{
          background: "hsl(var(--accent-bright) / .15)",
          border: "1px solid hsl(var(--accent-bright) / .3)",
          borderRadius: 6,
          padding: "3px 8px",
          fontFamily: "var(--font-body)",
          fontSize: ".7rem",
          color: "hsl(var(--accent-bright))",
          flexShrink: 0,
        }}
      >
        ✓ פעיל
      </div>
    </div>
  );
}
