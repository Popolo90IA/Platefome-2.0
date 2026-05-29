import type { CSSProperties } from "react";
import type { RangeDays } from "./types";

export const DAYS_HE = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

export const RANGES: readonly RangeDays[] = [14, 30, 90] as const;

export const RANGE_LABEL: Record<RangeDays, string> = {
  14: "14 ימים",
  30: "חודש",
  90: "רבעון",
};

export const CARD_STYLE: CSSProperties = {
  background: "hsl(var(--deep))",
  border: "1px solid hsl(var(--line))",
  borderRadius: 16,
  padding: "24px",
  position: "relative",
  overflow: "hidden",
};

export const LANG_META: Record<string, { flag: string; label: string }> = {
  he: { flag: "🇮🇱", label: "עברית" },
  en: { flag: "🇬🇧", label: "English" },
  fr: { flag: "🇫🇷", label: "Français" },
  ar: { flag: "🇸🇦", label: "العربية" },
  ru: { flag: "🇷🇺", label: "Русский" },
};

export const DONUT_COLORS = {
  d3: "hsl(28,62%,42%)",
  video: "hsl(22,70%,50%)",
  ar: "hsl(36,80%,58%)",
  d2: "hsl(30,18%,88%)",
} as const;

export const DONUT_CIRC = 238.76;

export const CHART_W = 600;
export const CHART_H = 260;
export const CHART_PADDING_TOP = 30;
export const CHART_PADDING_BOTTOM = 10;
export const CHART_USABLE_H = CHART_H - CHART_PADDING_TOP - CHART_PADDING_BOTTOM; // 220
export const CHART_BASE_Y = CHART_H - CHART_PADDING_BOTTOM; // 250
export const CHART_AREA_CLOSE_Y = CHART_H; // 260

export const HEATMAP_ROWS = 7;
export const HEATMAP_COLS = 24;

export const DAY_MS = 86400000;

export const TOP_DISHES_LIMIT = 5;
export const LANG_ROWS_LIMIT = 5;
export const EVENTS_QUERY_LIMIT = 5000;
