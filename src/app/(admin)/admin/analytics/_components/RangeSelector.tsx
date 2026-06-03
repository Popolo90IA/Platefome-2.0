"use client";

import { RANGE_OPTIONS } from "../_lib/types";

/* ── RangeSelector — 7/30/90-day range toggle ── */
export function RangeSelector({
  range,
  onChange,
}: {
  range: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex gap-1 p-1 bg-secondary/60 rounded-lg">
      {RANGE_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            range === opt.value
              ? "text-white"
              : "text-foreground/70 hover:text-foreground"
          }`}
          style={
            range === opt.value
              ? {
                  background: "var(--grad-bronze)",
                  boxShadow: "0 2px 8px hsl(28 62% 38% / .30)",
                }
              : {}
          }
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
