"use client";

import { CARD_STYLE } from "../_lib/constants";
import type { LangRow } from "../_lib/types";

type Props = {
  langRows: LangRow[];
};

/**
 * LanguagesCard — répartition événements par langue (top 5).
 */
export function LanguagesCard({ langRows }: Props) {
  return (
    <div style={CARD_STYLE}>
      <h3
        className="font-display"
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: "hsl(var(--fog))",
          margin: "0 0 20px",
        }}
      >
        שפות
      </h3>
      {langRows.length === 0 ? (
        <p
          className="font-sans"
          style={{
            fontSize: 13,
            color: "hsl(var(--subtle))",
            textAlign: "center",
            padding: "16px 0",
          }}
        >
          אין עדיין נתוני שפה
        </p>
      ) : (
        langRows.map((lang) => (
          <div key={lang.label} style={{ marginBottom: 14 }}>
            <div
              className="font-sans"
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                color: "hsl(var(--fog))",
                marginBottom: 6,
              }}
            >
              <span>
                {lang.flag} {lang.label}
              </span>
              <span
                className="font-mono"
                style={{ color: "hsl(var(--subtle))" }}
              >
                {lang.pct}%
              </span>
            </div>
            <div
              style={{
                height: 6,
                background: "hsl(var(--line))",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  display: "block",
                  height: "100%",
                  width: `${lang.pct}%`,
                  background: "var(--grad-bronze)",
                  borderRadius: 99,
                }}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
