import type { Dish, Language } from "@/types/database.types";
import { pickLocalized } from "@/lib/i18n";
import type { BadgeType } from "./types";

export function computeBadgeType(
  dish: Dish,
  has3d: boolean,
  has360: boolean,
  hasVideo: boolean
): BadgeType | null {
  if (has3d) return dish.ar_enabled ? "AR" : "3D";
  if (hasVideo) return "Video";
  if (has360) return "360";
  return null;
}

export function localizedName(dish: Dish, lang: Language): string {
  return (
    pickLocalized(dish as unknown as Record<string, unknown>, "name", lang) ||
    dish.name
  );
}

export function localizedDesc(dish: Dish, lang: Language): string | undefined {
  return pickLocalized(
    dish as unknown as Record<string, unknown>,
    "description",
    lang
  );
}
