"use client";

import type { Category, Dish } from "@/types/database.types";
import { FilterChip } from "./_ui/FilterChip";

type CategoryFilterProps = {
  categories: Category[];
  dishes: Dish[];
  filterCat: string;
  onChange: (value: string) => void;
};

export function CategoryFilter({ categories, dishes, filterCat, onChange }: CategoryFilterProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <FilterChip
        active={filterCat === "all"}
        onClick={() => onChange("all")}
        count={dishes.length}
      >
        הכל
      </FilterChip>
      {categories.map((cat) => {
        const count = dishes.filter((d) => d.category_id === cat.id).length;
        return (
          <FilterChip
            key={cat.id}
            active={filterCat === cat.id}
            onClick={() => onChange(cat.id)}
            count={count}
          >
            {cat.name}
          </FilterChip>
        );
      })}
    </div>
  );
}
