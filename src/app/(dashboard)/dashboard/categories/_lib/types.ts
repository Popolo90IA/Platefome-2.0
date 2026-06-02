import type { Category, Restaurant } from "@/types/database.types";

export type { Category, Restaurant };

export interface CategoryFormData {
  name: string;
  display_order: number;
}
