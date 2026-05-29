"use client";

import {
  CARD_STYLE,
  DAYS_HE,
  HEATMAP_COLS,
} from "../_lib/constants";

type Props = {
  heatmap: number[][];
  heatMax: number;
};

/**
 * HeatmapCard — grille 7×24 (jours × heures) avec intensité.
 */
export function HeatmapCard({ heatmap, heatMax }: Props) {
  return (
    <div style={{ ...CARD_STYLE, marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <h3
          className="font-display"
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "hsl(var(--fog))",
            margin: 0,
            flex: 1,
          }}
        >
          שעות שיא · השבוע
        </h3>
        <span
          className="font-sans uppercase"
          style={{
            fontSize: "9.5px",
            letterSpacing: ".06em",
            padding: "3px 10px",
            borderRadius: 99,
            background: "hsl(28,62%,42%,.1)",
            color: "hsl(var(--accent-bright))",
            border: "1px solid hsl(28,62%,42%,.2)",
          }}
        >
          Heatmap
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "64px repeat(24, 1fr)",
          gap: 2,
          overflowX: "auto",
        }}
      >
        <div />
        {Array.from({ length: HEATMAP_COLS }, (_, h) => (
          <div
            key={h}
            className="font-mono"
            style={{
              fontSize: 8,
              color: "hsl(var(--dim))",
              textAlign: "center",
              paddingBottom: 4,
            }}
          >
            {h}
          </div>
        ))}
        {DAYS_HE.flatMap((day, d) => [
          <div
            key={`lbl-${d}`}
            className="font-sans uppercase"
            style={{
              fontSize: "9.5px",
              letterSpacing: ".06em",
              color: "hsl(var(--subtle))",
              alignSelf: "center",
              paddingLeft: 2,
            }}
          >
            {day}
          </div>,
          ...Array.from({ length: HEATMAP_COLS }, (_, h) => {
            const intensity = heatmap[d][h] / heatMax;
            const lightness = Math.round(92 - intensity * 50);
            return (
              <div
                key={`cell-${d}-${h}`}
                title={`${day} ${h}:00 · ${heatmap[d][h]} צפיות`}
                style={{
                  aspectRatio: "1/1",
                  borderRadius: 2,
                  background: `hsl(28, 62%, ${lightness}%)`,
                  opacity: intensity > 0 ? 0.6 + intensity * 0.4 : 0.15,
                }}
              />
            );
          }),
        ])}
      </div>
    </div>
  );
}
