import { describe, it, expect } from "vitest";
import {
  getCategoryName,
  filterDishesByCategory,
} from "@/app/(dashboard)/dashboard/dishes/_lib/helpers";

describe("getCategoryName", () => {
  const categories = [
    { id: "c1", name: "ראשונות" },
    { id: "c2", name: "עיקריות" },
    { id: "c3", name: "קינוחים" },
  ];

  it("returns the category name when id matches", () => {
    expect(getCategoryName(categories, "c2")).toBe("עיקריות");
  });

  it("returns the fallback dash when id is unknown", () => {
    expect(getCategoryName(categories, "missing")).toBe("—");
  });

  it("returns the fallback dash when categories array is empty", () => {
    expect(getCategoryName([], "c1")).toBe("—");
  });

  it("returns the fallback dash when id is an empty string", () => {
    expect(getCategoryName(categories, "")).toBe("—");
  });
});

describe("filterDishesByCategory", () => {
  const dishes = [
    { id: "d1", category_id: "c1" },
    { id: "d2", category_id: "c2" },
    { id: "d3", category_id: "c1" },
    { id: "d4", category_id: "c3" },
  ];

  it("returns all dishes when filterCat is 'all'", () => {
    const result = filterDishesByCategory(dishes, "all");
    expect(result).toHaveLength(4);
    expect(result).toBe(dishes); // same reference (no copy)
  });

  it("filters dishes by category id", () => {
    const result = filterDishesByCategory(dishes, "c1");
    expect(result).toHaveLength(2);
    expect(result.map((d) => d.id)).toEqual(["d1", "d3"]);
  });

  it("returns empty array when no dish matches", () => {
    expect(filterDishesByCategory(dishes, "c99")).toEqual([]);
  });

  it("returns empty array when input dishes is empty", () => {
    expect(filterDishesByCategory([], "c1")).toEqual([]);
  });

  it("preserves additional dish fields via generic", () => {
    const richDishes = [
      { id: "d1", category_id: "c1", name: "Salade", price: 50 },
      { id: "d2", category_id: "c2", name: "Steak", price: 120 },
    ];
    const result = filterDishesByCategory(richDishes, "c1");
    expect(result[0].name).toBe("Salade");
    expect(result[0].price).toBe(50);
  });
});
