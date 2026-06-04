"use client";

import { CARD_STYLE } from "../_lib/constants";
import type { ChartPaths, DayBucket, RangeDays } from "../_lib/types";

type Props = {
  totalScans: number;
  totalViews: number;
  buckets: DayBucket[];
  chart: ChartPaths;
  deltaPct: number | null;
  range: RangeDays;
};

/**
 * LineChartCard — carte avec total scans+views + delta + SVG line/area chart.
 */
export function LineChartCard({
  totalScans,
  totalViews,
  buckets,
  chart,
  deltaPct,
  range,
}: Props) {
  const totalCurrent = totalScans + totalViews;
  const showGrowthBadge = totalCurrent > 0;
  const positive = deltaPct === null ? true : deltaPct >= 0;
  const color = positive ? "hsl(var(--accent-bright))" : "hsl(0, 60%, 55%)";
  const bg = positive ? "hsl(28,62%,42%,.1)" : "hsl(0, 60%, 55%, .1)";

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
          סריקות לאורך זמן
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
          Live
        </span>
      </div>

      <div
        className="font-sans"
        style={{
          fontSize: 64,
          lineHeight: 1,
          fontWeight: 800,
          letterSpacing: "-.04em",
          color: "hsl(var(--fog))",
        }}
      >
        {totalCurrent.toLocaleString()}
      </div>

      {showGrowthBadge && (
        <div
          className="font-mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            padding: "4px 10px",
            borderRadius: 99,
            background: bg,
            color,
            marginTop: 12,
            letterSpacing: ".04em",
          }}
        >
          {deltaPct === null ? (
            <>↑ {totalCurrent.toLocaleString()} אירועים ב-{range} ימים</>
          ) : (
            <>
              {positive ? "↑" : "↓"} {Math.abs(deltaPct)}% vs. ה-{range} ימים
              הקודמים
            </>
          )}
        </div>
      )}

      <svg
        viewBox="0 0 600 260"
        preserveAspectRatio="none"
        style={{ width: "100%", height: 280, marginTop: 20 }}
      >
        <defs>
          <linearGradient id="fillg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="hsl(28,62%,42%)" stopOpacity="0.35" />
            <stop offset="1" stopColor="hsl(28,62%,42%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="hsl(28,62%,42%)" />
            <stop offset="1" stopColor="hsl(22,70%,50%)" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1="60"
          x2="600"
          y2="60"
          stroke="hsl(30,18%,82%)"
          strokeDasharray="2 4"
        />
        <line
          x1="0"
          y1="130"
          x2="600"
          y2="130"
          stroke="hsl(30,18%,82%)"
          strokeDasharray="2 4"
        />
        <line
          x1="0"
          y1="200"
          x2="600"
          y2="200"
          stroke="hsl(30,18%,82%)"
          strokeDasharray="2 4"
        />
        {buckets.length > 1 && chart.lastPoint ? (
          <>
            <path d={chart.area} fill="url(#fillg)" />
            <path
              d={chart.line}
              fill="none"
              stroke="url(#lineg)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx={chart.lastPoint.x}
              cy={chart.lastPoint.y}
              r="5"
              fill="hsl(22,70%,50%)"
            />
            <circle
              cx={chart.lastPoint.x}
              cy={chart.lastPoint.y}
              r="11"
              fill="hsl(22,70%,50%)"
              opacity="0.2"
            />
          </>
        ) : (
          <text
            x="300"
            y="130"
            textAnchor="middle"
            fontFamily="var(--font-body)"
            fontSize="14"
            fill="hsl(24,12%,38%)"
          >
            אין עדיין נתונים
          </text>
        )}
      </svg>
    </div>
  );
}
