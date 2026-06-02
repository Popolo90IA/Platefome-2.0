import type { Dish, Language } from "@/types/database.types";
import type { MenuLayout } from "@/lib/theme";

export type BadgeType = "3D" | "Video" | "AR" | "360";

export interface DishCardCommonProps {
  dish: Dish;
  lang: Language;
  menuLayout: MenuLayout;
  headingFont: string;
  bodyFont: string;
}
