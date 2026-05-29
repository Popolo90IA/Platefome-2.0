"use client";

import { CARD_STYLE, DONUT_CIRC } from "../_lib/constants";
import type { DonutSegment, DonutSegmentEl } from "../_lib/types";

type Props = {
  totalEngaged: number;
  totalViews: number;
  total3d: number;
  segments: DonutSegment[];
  segmentEls: DonutSegmentEl[];
};

/**
 * DonutCard — répartition 3D/Video/AR/2D + engagement rate.
 */
export function DonutCard({
  totalEngaged,
  totalViews,
  total3d,
  segments,
  segmentEls,
}: Props) {
  return (
    <div style={CARD_STYLE}>
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
          תצוגות לפי מצב
        </h3>
        <span
          className="font-sans uppercase"
          style={{
            fontSize: "11px",
            letterSpacing: ".08em",
            padding: "3px 10px",
            borderRadius: 99,
            background: "hsl(28,62%,42%,.1)",
            color: "hsl(var(--accent-bright))",
            border: "1px solid hsl(28,62%,42%,.2)",
          }}
        >
          3D · 360 · AR
        </span>
      </div>

      <div
        className="font-sans"
        style={{
          fontSize: 48,
          lineHeight: 1,
          fontWeight: 800,
          letterSpacing: "-.04em",
          color: "hsl(var(--fog))",
        }}
      >
        {totalEngaged.toLocaleString()}
      </div>

      {totalEngaged > 0 && (
        <div
          className="font-mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 12,
            padding: "4px 10px",
            borderRadius: 99,
            background: "hsl(28,62%,42%,.1)",
            color: "hsl(var(--accent-bright))",
            marginTop: 12,
            letterSpacing: ".04em",
          }}
        >
          {Math.round((totalEngaged / Math.max(1, totalViews)) * 100)}%
          engagement rate
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "center",
          padding: "20px 0",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          style={{ width: 160, height: 160, flexShrink: 0 }}
        >
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
            fontFamily="DM Sans"
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
            fontFamily="DM Mono"
            fontSize="6.5"
            letterSpacing="0.18em"
            fill="hsl(24,12%,38%)"
          >
            VIEWS
          </text>
        </svg>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            flex: 1,
          }}
        >
          {segments.map((seg) => (
            <div
              key={seg.label}
              className="font-sans"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 13,
              }}
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
              <span style={{ color: "hsl(var(--fog))", flex: 1 }}>
                {seg.label}
              </span>
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
      </div>
    </div>
  );
}
