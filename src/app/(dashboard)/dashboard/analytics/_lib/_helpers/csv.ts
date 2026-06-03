import type { MenuEvent, RangeDays } from "../types";

/** Build CSV string from events list. */
export function buildEventsCsv(events: MenuEvent[]): string {
  const rows: string[][] = [
    ["created_at", "event_type", "dish_id", "language"],
    ...events.map((e) => [
      e.created_at,
      e.event_type,
      e.dish_id ?? "",
      e.language ?? "",
    ]),
  ];
  return rows
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
}

/** Build CSV filename. */
export function buildCsvFilename(range: RangeDays, now: Date = new Date()): string {
  const stamp = now.toISOString().slice(0, 10);
  return `plateform-analytics-${range}d-${stamp}.csv`;
}
