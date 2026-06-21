"use client";

import { MOCKUP } from "./styles";

const BARS = [30, 50, 40, 65, 55, 80, 100];

/**
 * BarChartMockup — mockup illustratif d'un graphe d'analytics (commandes / 7 jours).
 */
export function BarChartMockup() {
  return (
    <div style={MOCKUP}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 5,
          height: 48,
          marginBottom: 8,
        }}
      >
        {BARS.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              background:
                i === 6
                  ? "hsl(var(--accent-bright))"
                  : `hsl(var(--accent-bright) / ${0.15 + i * 0.11})`,
              borderRadius: "3px 3px 0 0",
            }}
          />
        ))}
      </div>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: ".72rem",
          color: "hsl(var(--subtle))",
          textAlign: "center",
        }}
      >
        הזמנות — 7 ימים אחרונים ↑
      </div>
    </div>
  );
}
