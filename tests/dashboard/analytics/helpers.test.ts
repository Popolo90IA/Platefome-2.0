import { describe, expect, it } from "vitest";
import {
  buildChartPaths,
  buildCsvFilename,
  buildDayBuckets,
  buildDonutEls,
  buildDonutSegments,
  buildEventsCsv,
  buildHeatmap,
  buildLangRows,
  buildTopDishes,
  computeDelta,
  computeTotals,
  countBy,
  heatmapMax,
} from "@/app/(dashboard)/dashboard/analytics/_lib/helpers";
import type {
  Dish,
  MenuEvent,
} from "@/app/(dashboard)/dashboard/analytics/_lib/types";

const ev = (over: Partial<MenuEvent>): MenuEvent =>
  ({
    id: "x",
    restaurant_id: "r",
    event_type: "menu_view",
    dish_id: null,
    language: null,
    created_at: new Date().toISOString(),
    ...over,
  }) as MenuEvent;

describe("countBy / computeTotals", () => {
  it("counts events by type", () => {
    const list = [
      ev({ event_type: "qr_scan" }),
      ev({ event_type: "qr_scan" }),
      ev({ event_type: "menu_view" }),
      ev({ event_type: "dish_view" }),
      ev({ event_type: "ar_view" }),
      ev({ event_type: "video_play" }),
    ];
    expect(countBy(list, "qr_scan")).toBe(2);
    expect(countBy(list, "menu_view")).toBe(1);
    const t = computeTotals(list);
    expect(t).toEqual({ scans: 2, views: 1, d3: 1, ar: 1, video: 1, engaged: 3 });
  });

  it("zero events → zero totals", () => {
    const t = computeTotals([]);
    expect(t.engaged).toBe(0);
    expect(t.scans).toBe(0);
  });
});

describe("buildDayBuckets", () => {
  it("returns range buckets with date labels", () => {
    const now = new Date("2026-01-15T12:00:00Z").getTime();
    const buckets = buildDayBuckets([], 14, now);
    expect(buckets).toHaveLength(14);
    expect(buckets[buckets.length - 1].views).toBe(0);
  });

  it("aggregates views vs scans per day", () => {
    const now = new Date("2026-01-15T12:00:00Z").getTime();
    const dayStart = new Date(now);
    dayStart.setHours(8, 0, 0, 0);
    const list: MenuEvent[] = [
      ev({ event_type: "menu_view", created_at: dayStart.toISOString() }),
      ev({ event_type: "menu_view", created_at: dayStart.toISOString() }),
      ev({ event_type: "qr_scan", created_at: dayStart.toISOString() }),
      ev({ event_type: "dish_view", created_at: dayStart.toISOString() }),
    ];
    const buckets = buildDayBuckets(list, 14, now);
    const today = buckets[buckets.length - 1];
    expect(today.views).toBe(2);
    expect(today.scans).toBe(1);
  });
});

describe("buildChartPaths", () => {
  it("empty when < 2 buckets", () => {
    const p = buildChartPaths([{ label: "1/1", views: 0, scans: 0 }]);
    expect(p.area).toBe("");
    expect(p.line).toBe("");
    expect(p.lastPoint).toBeNull();
  });

  it("builds line + area + lastPoint when ≥ 2", () => {
    const p = buildChartPaths([
      { label: "1/1", views: 1, scans: 1 },
      { label: "2/1", views: 4, scans: 0 },
    ]);
    expect(p.line.startsWith("M ")).toBe(true);
    expect(p.area).toContain(" L 600,260 L 0,260 Z");
    expect(p.lastPoint?.x).toBe(600);
  });
});

describe("buildHeatmap / heatmapMax", () => {
  it("returns 7x24 grid", () => {
    const grid = buildHeatmap([]);
    expect(grid).toHaveLength(7);
    expect(grid[0]).toHaveLength(24);
    expect(heatmapMax(grid)).toBe(1);
  });

  it("increments correct cell from event date", () => {
    const date = new Date("2026-01-15T10:30:00Z"); // day+hour depend on tz
    const d = date.getDay();
    const h = date.getHours();
    const grid = buildHeatmap([
      ev({ event_type: "menu_view", created_at: date.toISOString() }),
      ev({ event_type: "menu_view", created_at: date.toISOString() }),
      ev({ event_type: "qr_scan", created_at: date.toISOString() }),
    ]);
    expect(grid[d][h]).toBe(2);
    expect(heatmapMax(grid)).toBe(2);
  });
});

describe("buildDonutSegments / buildDonutEls", () => {
  it("computes 4 segments summing to ~100%", () => {
    const segs = buildDonutSegments({ scans: 0, views: 0, d3: 5, ar: 3, video: 2, engaged: 10 });
    const sum = segs.reduce((s, x) => s + x.pct, 0);
    expect(sum).toBeCloseTo(1, 5);
    expect(segs.find((s) => s.label === "3D")?.count).toBe(5);
  });

  it("zero engaged → 2D = 100%", () => {
    const segs = buildDonutSegments({ scans: 0, views: 0, d3: 0, ar: 0, video: 0, engaged: 0 });
    expect(segs.find((s) => s.label === "2D")?.pct).toBeCloseTo(1, 5);
  });

  it("buildDonutEls produces cumulative offsets", () => {
    const segs = buildDonutSegments({ scans: 0, views: 0, d3: 1, ar: 1, video: 1, engaged: 3 });
    const els = buildDonutEls(segs);
    expect(els[0].off).toBe(-0);
    expect(parseFloat(els[1].da)).toBeGreaterThan(0);
    expect(els[1].off).toBeLessThan(0); // negative cumulative
  });
});

describe("buildLangRows", () => {
  it("returns sorted top-N rows with flags", () => {
    const rows = buildLangRows([
      ev({ language: "he" }),
      ev({ language: "he" }),
      ev({ language: "en" }),
      ev({ language: "fr" }),
    ]);
    expect(rows[0].label).toBe("עברית");
    expect(rows[0].pct).toBe(50);
  });

  it("unknown lang → globe fallback", () => {
    const rows = buildLangRows([ev({ language: "xx" })]);
    expect(rows[0].flag).toBe("🌐");
    expect(rows[0].label).toBe("xx");
  });

  it("empty → []", () => {
    expect(buildLangRows([])).toEqual([]);
  });
});

describe("buildTopDishes", () => {
  const dishes: Dish[] = [
    { id: "a", name: "Pizza" } as Dish,
    { id: "b", name: "Burger" } as Dish,
  ];

  it("returns top dishes sorted desc, limit 5", () => {
    const list = [
      ev({ event_type: "dish_view", dish_id: "a" }),
      ev({ event_type: "dish_view", dish_id: "a" }),
      ev({ event_type: "dish_view", dish_id: "b" }),
    ];
    const top = buildTopDishes(list, dishes);
    expect(top).toHaveLength(2);
    expect(top[0].dish.name).toBe("Pizza");
    expect(top[0].count).toBe(2);
  });

  it("skips dish_view without dish_id", () => {
    const list = [ev({ event_type: "dish_view", dish_id: null })];
    expect(buildTopDishes(list, dishes)).toEqual([]);
  });

  it("skips ids not in dish list", () => {
    const list = [ev({ event_type: "dish_view", dish_id: "ghost" })];
    expect(buildTopDishes(list, dishes)).toEqual([]);
  });
});

describe("computeDelta", () => {
  it("returns null when no prev events", () => {
    expect(computeDelta(10, [])).toBeNull();
  });

  it("returns rounded % delta", () => {
    const prev = [
      ev({ event_type: "menu_view" }),
      ev({ event_type: "qr_scan" }),
    ];
    expect(computeDelta(4, prev)).toBe(100); // (4-2)/2 = 100%
  });

  it("ignores non-view/scan events in prev", () => {
    const prev = [
      ev({ event_type: "menu_view" }),
      ev({ event_type: "dish_view" }),
    ];
    expect(computeDelta(2, prev)).toBe(100); // prev count = 1
  });
});

describe("buildEventsCsv / buildCsvFilename", () => {
  it("includes header row + data rows escaping quotes", () => {
    const csv = buildEventsCsv([
      ev({
        event_type: "menu_view",
        dish_id: "d",
        language: 'he"',
        created_at: "2026-01-01T00:00:00Z",
      }),
    ]);
    const lines = csv.split("\n");
    expect(lines[0]).toBe(`"created_at","event_type","dish_id","language"`);
    expect(lines[1]).toContain(`"he"""`);
  });

  it("nullable dish_id/language → empty strings", () => {
    const csv = buildEventsCsv([
      ev({
        event_type: "qr_scan",
        dish_id: null,
        language: null,
        created_at: "2026-01-01T00:00:00Z",
      }),
    ]);
    expect(csv.split("\n")[1]).toBe(
      `"2026-01-01T00:00:00Z","qr_scan","",""`,
    );
  });

  it("filename includes range + date stamp", () => {
    const f = buildCsvFilename(30, new Date("2026-05-29T12:00:00Z"));
    expect(f).toBe("plateform-analytics-30d-2026-05-29.csv");
  });
});
