import type {
  AnalyticsTotals,
  ChartPaths,
  DayBucket,
  DonutSegment,
  DonutSegmentEl,
  MenuEvent,
  RangeDays,
} from "../types";
import {
  CHART_AREA_CLOSE_Y,
  CHART_BASE_Y,
  CHART_USABLE_H,
  CHART_W,
  DAY_MS,
  DONUT_CIRC,
  DONUT_COLORS,
  HEATMAP_COLS,
  HEATMAP_ROWS,
} from "../constants";

/** Build daily buckets for the current range (now-range..now). */
export function buildDayBuckets(
  events: MenuEvent[],
  range: RangeDays,
  now: number = Date.now(),
): DayBucket[] {
  const buckets: DayBucket[] = [];
  for (let i = range - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const start = d.getTime();
    const end = start + DAY_MS;
    let views = 0;
    let scans = 0;
    for (const e of events) {
      const t = new Date(e.created_at).getTime();
      if (t < start || t >= end) continue;
      if (e.event_type === "menu_view") views++;
      else if (e.event_type === "qr_scan") scans++;
    }
    buckets.push({
      label: `${d.getDate()}/${d.getMonth() + 1}`,
      views,
      scans,
    });
  }
  return buckets;
}

/** Build chart paths (area + line) from day buckets. */
export function buildChartPaths(buckets: DayBucket[]): ChartPaths {
  if (buckets.length < 2) {
    return { area: "", line: "", lastPoint: null };
  }
  const maxDay = Math.max(1, ...buckets.map((b) => b.views + b.scans));
  const pts = buckets
    .map((b, i) => {
      const x = (i / (buckets.length - 1)) * CHART_W;
      const y = CHART_BASE_Y - ((b.views + b.scans) / maxDay) * CHART_USABLE_H;
      return `${x},${y}`;
    })
    .join(" L ");
  const line = `M ${pts}`;
  const area = `M ${pts} L ${CHART_W},${CHART_AREA_CLOSE_Y} L 0,${CHART_AREA_CLOSE_Y} Z`;
  const last = buckets[buckets.length - 1];
  const lastY =
    CHART_BASE_Y - ((last.views + last.scans) / maxDay) * CHART_USABLE_H;
  return { area, line, lastPoint: { x: CHART_W, y: lastY } };
}

/** Build heatmap [7][24] from menu_view events. */
export function buildHeatmap(events: MenuEvent[]): number[][] {
  const grid: number[][] = Array.from({ length: HEATMAP_ROWS }, () =>
    Array(HEATMAP_COLS).fill(0),
  );
  for (const e of events) {
    if (e.event_type !== "menu_view") continue;
    const d = new Date(e.created_at);
    grid[d.getDay()][d.getHours()]++;
  }
  return grid;
}

/** Max value of heatmap grid (min 1). */
export function heatmapMax(grid: number[][]): number {
  return Math.max(1, ...grid.flat());
}

/** Compute donut segments from totals. */
export function buildDonutSegments(totals: AnalyticsTotals): DonutSegment[] {
  const t = totals.engaged || 1;
  const pct3d = totals.d3 / t;
  const pctAr = totals.ar / t;
  const pctVid = totals.video / t;
  const pct2d = Math.max(0, 1 - pct3d - pctAr - pctVid);
  return [
    { color: DONUT_COLORS.d3, pct: pct3d, label: "3D", count: totals.d3 },
    { color: DONUT_COLORS.video, pct: pctVid, label: "Video", count: totals.video },
    { color: DONUT_COLORS.ar, pct: pctAr, label: "AR", count: totals.ar },
    {
      color: DONUT_COLORS.d2,
      pct: pct2d,
      label: "2D",
      count: Math.max(0, totals.engaged - totals.d3 - totals.ar - totals.video),
    },
  ];
}

/** Compute donut element dash arrays/offsets. */
export function buildDonutEls(segments: DonutSegment[]): DonutSegmentEl[] {
  let off = 0;
  return segments.map((s) => {
    const da = (s.pct * DONUT_CIRC).toFixed(1);
    const cur = off;
    off += s.pct * DONUT_CIRC;
    return { ...s, da, off: -cur };
  });
}
