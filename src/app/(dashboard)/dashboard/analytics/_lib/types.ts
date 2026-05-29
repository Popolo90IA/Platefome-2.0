import type {
  Dish,
  MenuEvent,
  MenuEventType,
  Restaurant,
} from "@/types/database.types";

export type RangeDays = 14 | 30 | 90;

export interface DayBucket {
  label: string;
  views: number;
  scans: number;
}

export interface ChartPaths {
  area: string;
  line: string;
  lastPoint: { x: number; y: number } | null;
}

export interface DonutSegment {
  color: string;
  pct: number;
  label: string;
  count: number;
}

export interface DonutSegmentEl extends DonutSegment {
  da: string;
  off: number;
}

export interface LangRow {
  flag: string;
  label: string;
  pct: number;
}

export interface TopDishRow {
  dish: Dish;
  count: number;
}

export interface AnalyticsTotals {
  scans: number;
  views: number;
  d3: number;
  ar: number;
  video: number;
  engaged: number;
}

export type { Dish, MenuEvent, MenuEventType, Restaurant };
