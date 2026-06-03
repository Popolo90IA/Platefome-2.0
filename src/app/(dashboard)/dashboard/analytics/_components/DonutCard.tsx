"use client";

import { CARD_STYLE } from "../_lib/constants";
import type { DonutSegment, DonutSegmentEl } from "../_lib/types";
import { DonutHeader } from "./_donut/DonutHeader";
import { DonutChart } from "./_donut/DonutChart";
import { DonutLegend } from "./_donut/DonutLegend";

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
      <DonutHeader />

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
        <DonutChart segmentEls={segmentEls} total3d={total3d} />
        <DonutLegend segments={segments} totalEngaged={totalEngaged} />
      </div>
    </div>
  );
}
