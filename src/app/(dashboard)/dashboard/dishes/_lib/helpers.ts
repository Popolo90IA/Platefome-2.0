interface CategoryLite {
  id: string;
  name: string;
}

interface DishLite {
  category_id: string;
}

export function getCategoryName(
  categories: CategoryLite[],
  categoryId: string,
): string {
  return categories.find((c) => c.id === categoryId)?.name ?? "—";
}

export function filterDishesByCategory<T extends DishLite>(
  dishes: T[],
  filterCat: string,
): T[] {
  return filterCat === "all"
    ? dishes
    : dishes.filter((d) => d.category_id === filterCat);
}
