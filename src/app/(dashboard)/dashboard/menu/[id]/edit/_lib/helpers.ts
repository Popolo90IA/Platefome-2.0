/**
 * Pure list-toggle helpers used by the dish editor (allergens, tags).
 * Returns a new array with the key added if missing, or removed if present.
 */
export function toggleListItem(list: string[], key: string): string[] {
  return list.includes(key) ? list.filter((k) => k !== key) : [...list, key];
}

interface CategoryLite {
  id: string;
  name: string;
}

export function getCategoryName(
  categories: CategoryLite[],
  categoryId: string,
): string {
  return categories.find((c) => c.id === categoryId)?.name ?? "";
}

/**
 * Picks the best media tab to display first based on the dish content.
 * Priority: 3D model > 360° photos > image > video (fallback).
 */
export function pickInitialMediaTab(dish: {
  model_3d_url?: string | null;
  photos_360?: string[] | null;
  image_url?: string | null;
  video_url?: string | null;
}): "3d" | "360" | "photo" | "video" {
  if (dish.model_3d_url) return "3d";
  if (dish.photos_360 && dish.photos_360.length > 0) return "360";
  if (dish.image_url) return "photo";
  if (dish.video_url) return "video";
  return "photo";
}
