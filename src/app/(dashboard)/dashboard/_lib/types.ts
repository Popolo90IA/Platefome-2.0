import type { Restaurant } from "@/types/database.types";

export type { Restaurant };

export interface Stats {
  dishes: number;
  categories: number;
  views: number;
  scans: number;
}

export interface Deltas {
  dishesThisWeek: number;
  viewsDelta: number | null;
  scansDelta: number | null;
}

export interface ChecklistItem {
  done: boolean;
  text: string;
  href: string;
}
