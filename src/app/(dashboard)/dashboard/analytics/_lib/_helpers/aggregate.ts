import type {
  AnalyticsTotals,
  Dish,
  LangRow,
  MenuEvent,
  MenuEventType,
  TopDishRow,
} from "../types";
import { LANG_META, LANG_ROWS_LIMIT, TOP_DISHES_LIMIT } from "../constants";

/** Count events by type. */
export function countBy(events: MenuEvent[], type: MenuEventType): number {
  return events.filter((e) => e.event_type === type).length;
}

/** Aggregate totals from event list. */
export function computeTotals(events: MenuEvent[]): AnalyticsTotals {
  const scans = countBy(events, "qr_scan");
  const views = countBy(events, "menu_view");
  const d3 = countBy(events, "dish_view");
  const ar = countBy(events, "ar_view");
  const video = countBy(events, "video_play");
  return { scans, views, d3, ar, video, engaged: d3 + ar + video };
}

/** Build language rows. */
export function buildLangRows(events: MenuEvent[]): LangRow[] {
  const counts = new Map<string, number>();
  let total = 0;
  for (const e of events) {
    if (!e.language) continue;
    counts.set(e.language, (counts.get(e.language) ?? 0) + 1);
    total++;
  }
  const denom = total || 1;
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, LANG_ROWS_LIMIT)
    .map(([code, count]) => ({
      flag: LANG_META[code]?.flag ?? "🌐",
      label: LANG_META[code]?.label ?? code,
      pct: Math.round((count / denom) * 100),
    }));
}

/** Build top dishes (top N by dish_view count). */
export function buildTopDishes(
  events: MenuEvent[],
  dishes: Dish[],
): TopDishRow[] {
  const counts = new Map<string, number>();
  for (const e of events) {
    if (e.event_type !== "dish_view" || !e.dish_id) continue;
    counts.set(e.dish_id, (counts.get(e.dish_id) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([id, count]) => ({
      dish: dishes.find((d) => d.id === id),
      count,
    }))
    .filter((x): x is TopDishRow => Boolean(x.dish))
    .sort((a, b) => b.count - a.count)
    .slice(0, TOP_DISHES_LIMIT);
}

/** Period-over-period delta %. */
export function computeDelta(
  currentTotal: number,
  prevEvents: MenuEvent[],
): number | null {
  const prevTotal = prevEvents.filter(
    (e) => e.event_type === "menu_view" || e.event_type === "qr_scan",
  ).length;
  if (prevTotal <= 0) return null;
  return Math.round(((currentTotal - prevTotal) / prevTotal) * 100);
}
