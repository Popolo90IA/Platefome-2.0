import type { RestaurantWithStats } from "./types";

/** Filtre restaurants par requête (nom, slug, email). */
export function filterRestaurants(
  list: RestaurantWithStats[],
  search: string
): RestaurantWithStats[] {
  const q = search.trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.slug.toLowerCase().includes(q) ||
      (r.email && r.email.toLowerCase().includes(q))
  );
}
