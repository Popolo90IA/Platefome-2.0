"use client";

import { CARD_STYLE } from "../_lib/constants";
import type { TopDishRow } from "../_lib/types";

type Props = {
  topDishes: TopDishRow[];
};

/**
 * TopDishesCard — top 5 plats par dish_view.
 */
export function TopDishesCard({ topDishes }: Props) {
  const top = topDishes[0]?.count ?? 1;
  return (
    <div style={CARD_STYLE}>
      <div style={{ marginBottom: 16 }}>
        <h3
          className="font-display"
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "hsl(var(--fog))",
            margin: 0,
          }}
        >
          המנות הפופולריות
        </h3>
      </div>
      {topDishes.length === 0 ? (
        <p
          className="font-sans"
          style={{
            fontSize: 13,
            color: "hsl(var(--subtle))",
            textAlign: "center",
            padding: "16px 0",
          }}
        >
          אין עדיין צפיות במנות
        </p>
      ) : (
        topDishes.map((d, idx) => (
          <div
            key={d.dish.id}
            style={{
              display: "grid",
              gridTemplateColumns: "28px 1fr auto",
              alignItems: "center",
              gap: 12,
              padding: "12px 0",
              borderTop: idx > 0 ? "1px solid hsl(var(--line))" : "none",
            }}
          >
            <span
              className="font-mono"
              style={{ fontSize: 12, color: "hsl(var(--subtle))" }}
            >
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div>
              <div
                className="font-sans"
                style={{
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "hsl(var(--fog))",
                }}
              >
                {d.dish.name}
              </div>
              <div
                style={{
                  height: 4,
                  background: "hsl(var(--line))",
                  borderRadius: 99,
                  marginTop: 6,
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    display: "block",
                    height: "100%",
                    width: `${(d.count / top) * 100}%`,
                    background: "var(--grad-bronze)",
                    borderRadius: 99,
                  }}
                />
              </div>
            </div>
            <span
              className="font-mono"
              style={{
                fontSize: 12,
                color: "hsl(var(--accent-bright))",
                letterSpacing: ".04em",
              }}
            >
              {d.count}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
