import type { DonutSegment } from "../../_lib/types";

/* ── DonutLegend — per-segment color dot + label + percentage ── */
export function DonutLegend({
  segments,
  totalEngaged,
}: {
  segments: DonutSegment[];
  totalEngaged: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
      {segments.map((seg) => (
        <div
          key={seg.label}
          className="font-sans"
          style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 99,
              background: seg.color,
              flexShrink: 0,
            }}
          />
          <span style={{ color: "hsl(var(--fog))", flex: 1 }}>{seg.label}</span>
          <span
            className="font-mono"
            style={{
              fontSize: 12.5,
              color: "hsl(var(--subtle))",
              letterSpacing: ".04em",
            }}
          >
            {totalEngaged > 0 ? `${Math.round(seg.pct * 100)}%` : "—"}
          </span>
        </div>
      ))}
    </div>
  );
}
