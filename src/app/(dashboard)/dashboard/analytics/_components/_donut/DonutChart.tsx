import { DONUT_CIRC } from "../../_lib/constants";
import type { DonutSegmentEl } from "../../_lib/types";

/* ── DonutChart — SVG donut with center total ── */
export function DonutChart({
  segmentEls,
  total3d,
}: {
  segmentEls: DonutSegmentEl[];
  total3d: number;
}) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: 160, height: 160, flexShrink: 0 }}>
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke="hsl(30,18%,88%)"
        strokeWidth="14"
      />
      {segmentEls.map((s, i) => (
        <circle
          key={i}
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke={s.color}
          strokeWidth="14"
          strokeDasharray={`${s.da} ${DONUT_CIRC}`}
          strokeDashoffset={s.off}
          transform="rotate(-90 50 50)"
        />
      ))}
      <text
        x="50"
        y="48"
        textAnchor="middle"
        fontFamily="var(--font-body)"
        fontWeight="800"
        fontSize="18"
        fill="hsl(24,18%,16%)"
        letterSpacing="-0.02em"
      >
        {total3d}
      </text>
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="0.18em"
        fill="hsl(24,12%,38%)"
      >
        VIEWS
      </text>
    </svg>
  );
}
