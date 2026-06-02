import type { Restaurant } from "@/types/database.types";

export type RestaurantWithStats = Restaurant & {
  dish_count?: number;
  view_count?: number;
};

export interface ThemeForm {
  primary: string;
  dark: boolean;
}
