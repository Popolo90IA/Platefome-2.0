"use client";

import { Download } from "lucide-react";
import { RANGES, RANGE_LABEL } from "../_lib/constants";
import type { RangeDays } from "../_lib/types";

type Props = {
  range: RangeDays;
  onRangeChange: (r: RangeDays) => void;
  onExport: () => void;
  exportDisabled: boolean;
};

/**
 * AnalyticsHeader — eyebrow + h1 + sous-titre + filtres range + bouton CSV.
 */
export function AnalyticsHeader({
  range,
  onRangeChange,
  onExport,
  exportDisabled,
}: Props) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p
        className="font-sans uppercase"
        style={{
          fontSize: "12px",
          letterSpacing: ".05em",
          color: "hsl(var(--accent-bright))",
          marginBottom: 10,
        }}
      >
        Analytics · {range} ימים
      </p>
      <h1
        className="font-display"
        style={{
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: "-.02em",
          color: "hsl(var(--fog))",
          margin: "0 0 8px",
        }}
      >
        סריקות זה רק{" "}
        <em
          style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}
        >
          ההתחלה
        </em>
        .
      </h1>
      <p
        className="font-sans"
        style={{
          fontSize: 15,
          color: "hsl(var(--subtle))",
          margin: "0 0 24px",
        }}
      >
        איפה הלקוחות מבלים. מה הם פותחים. מה גורם להם להזמין.
      </p>

      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {RANGES.map((v) => (
          <button
            key={v}
            onClick={() => onRangeChange(v)}
            className="font-sans"
            aria-pressed={range === v}
            style={{
              padding: "7px 16px",
              borderRadius: 99,
              background:
                range === v ? "hsl(var(--fog))" : "hsl(var(--abyss))",
              border: `1px solid ${range === v ? "hsl(var(--fog))" : "hsl(var(--line))"}`,
              color: range === v ? "#fff" : "hsl(var(--subtle))",
              fontSize: 12.5,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all .15s",
            }}
          >
            {RANGE_LABEL[v]}
          </button>
        ))}
        <button
          onClick={onExport}
          disabled={exportDisabled}
          className="font-sans"
          aria-label="Export analytics as CSV"
          style={{
            marginInlineStart: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 14px",
            borderRadius: 99,
            background: "transparent",
            border: "1px solid hsl(var(--line))",
            color: exportDisabled
              ? "hsl(var(--dim))"
              : "hsl(var(--subtle))",
            fontSize: 12.5,
            fontWeight: 500,
            cursor: exportDisabled ? "not-allowed" : "pointer",
            transition: "all .15s",
          }}
        >
          <Download style={{ width: 13, height: 13 }} strokeWidth={1.5} />
          CSV
        </button>
      </div>
    </div>
  );
}
