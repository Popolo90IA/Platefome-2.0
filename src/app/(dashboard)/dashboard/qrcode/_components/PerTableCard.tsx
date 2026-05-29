"use client";

import { CARD, MAX_TABLE_COUNT } from "../_lib/constants";
import { clampTableCount } from "../_lib/helpers";

type Props = {
  tableCount: number;
  onChange: (n: number) => void;
};

/**
 * PerTableCard — sidebar : input number tables + double pastille (codes/mעקב).
 */
export function PerTableCard({ tableCount, onChange }: Props) {
  return (
    <div style={CARD}>
      <div
        className="font-sans uppercase"
        style={{
          fontSize: "11.5px",
          letterSpacing: ".05em",
          color: "hsl(var(--subtle))",
          marginBottom: 14,
        }}
      >
        QR ייחודי לכל שולחן
      </div>
      <div style={{ marginBottom: 14 }}>
        <span
          className="font-sans uppercase"
          style={{
            fontSize: 11,
            letterSpacing: ".08em",
            color: "hsl(var(--dim))",
            display: "block",
            marginBottom: 6,
          }}
        >
          מספר שולחנות
        </span>
        <input
          type="number"
          min="1"
          max={MAX_TABLE_COUNT}
          value={tableCount}
          onChange={(e) =>
            onChange(clampTableCount(Number(e.target.value), MAX_TABLE_COUNT))
          }
          className="font-sans"
          style={{
            width: "100%",
            boxSizing: "border-box",
            fontSize: 13,
            padding: "9px 12px",
            background: "hsl(var(--void))",
            border: "1px solid hsl(var(--line))",
            borderRadius: 8,
            color: "hsl(var(--fog))",
            outline: "none",
          }}
        />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div
          className="font-mono"
          style={{
            flex: 1,
            padding: "10px 12px",
            background: "hsl(var(--abyss))",
            borderRadius: 8,
            fontSize: 12,
            color: "hsl(var(--accent-bright))",
          }}
        >
          {tableCount} קודים
        </div>
        <div
          className="font-mono"
          style={{
            flex: 1,
            padding: "10px 12px",
            background: "hsl(var(--abyss))",
            borderRadius: 8,
            fontSize: 12,
            color: "hsl(var(--fog))",
          }}
        >
          מעקב נפרד
        </div>
      </div>
    </div>
  );
}
