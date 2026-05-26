import type { Category, Dish } from "@/types/database.types";

/**
 * Case-insensitive search across name/name_en/name_fr/description.
 * Returns the input array unchanged when the query is empty.
 */
export function filterDishesBySearch(dishes: Dish[], query: string): Dish[] {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return dishes;
  return dishes.filter((d) => {
    const rec = d as unknown as Record<string, unknown>;
    const name = (d.name || "").toLowerCase();
    const nameEn = ((rec.name_en as string) || "").toLowerCase();
    const nameFr = ((rec.name_fr as string) || "").toLowerCase();
    const desc = (d.description || "").toLowerCase();
    return (
      name.includes(q) ||
      nameEn.includes(q) ||
      nameFr.includes(q) ||
      desc.includes(q)
    );
  });
}

/**
 * Groups dishes by category, preserving the order of `categories`.
 * Empty categories are kept (caller decides whether to display them).
 */
export function groupDishesByCategory(
  categories: Category[],
  dishes: Dish[],
): { category: Category; dishes: Dish[] }[] {
  return categories.map((cat) => ({
    category: cat,
    dishes: dishes.filter((d) => d.category_id === cat.id),
  }));
}

/**
 * Picks the best media badge label for a dish, in priority order:
 * AR > 3D > Video > 360 > null.
 */
export function pickDishBadge(
  dish: Pick<
    Dish,
    "model_3d_url" | "video_url" | "photos_360" | "ar_enabled"
  >,
): "3D" | "Video" | "AR" | "360" | null {
  const has3d = !!dish.model_3d_url;
  const hasVideo = !!dish.video_url;
  const has360 = Array.isArray(dish.photos_360) && dish.photos_360.length > 0;
  if (has3d) return dish.ar_enabled ? "AR" : "3D";
  if (hasVideo) return "Video";
  if (has360) return "360";
  return null;
}
