import { describe, it, expect } from "vitest";
import {
  filterDishesBySearch,
  groupDishesByCategory,
  pickDishBadge,
} from "@/components/menu/_lib/helpers";
import { dishPlaceholder, PLACEHOLDER_GRADIENTS } from "@/components/menu/_lib/placeholders";
import type { Category, Dish } from "@/types/database.types";

const mkDish = (overrides: Partial<Dish> = {}): Dish =>
  ({
    id: "d1",
    restaurant_id: "r1",
    category_id: "c1",
    name: "חומוס",
    name_en: "Hummus",
    name_fr: "Houmous",
    description: "Crémeux",
    price: 30,
    image_url: null,
    video_url: null,
    model_3d_url: null,
    photos_360: null,
    ar_enabled: false,
    is_available: true,
    is_featured: false,
    is_new: false,
    is_signature: false,
    allergens: null,
    tags: null,
    display_order: 0,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    ...overrides,
  }) as unknown as Dish;

describe("filterDishesBySearch", () => {
  const dishes = [
    mkDish({ id: "d1", name: "חומוס", name_en: "Hummus" }),
    mkDish({ id: "d2", name: "סלט", name_en: "Salad" }),
    mkDish({ id: "d3", name: "פלאפל", name_en: "Falafel", description: "Crispy chickpea" }),
  ];

  it("returns the input array unchanged when the query is empty", () => {
    expect(filterDishesBySearch(dishes, "")).toBe(dishes);
    expect(filterDishesBySearch(dishes, "   ")).toBe(dishes);
  });

  it("filters by Hebrew name", () => {
    const r = filterDishesBySearch(dishes, "חומוס");
    expect(r).toHaveLength(1);
    expect(r[0].id).toBe("d1");
  });

  it("filters by English name (case-insensitive)", () => {
    const r = filterDishesBySearch(dishes, "SALAD");
    expect(r).toHaveLength(1);
    expect(r[0].id).toBe("d2");
  });

  it("filters by description match", () => {
    const r = filterDishesBySearch(dishes, "chickpea");
    expect(r).toHaveLength(1);
    expect(r[0].id).toBe("d3");
  });

  it("returns an empty array when nothing matches", () => {
    expect(filterDishesBySearch(dishes, "pizza")).toEqual([]);
  });
});

describe("groupDishesByCategory", () => {
  const categories = [
    { id: "c1", name: "ראשונות" },
    { id: "c2", name: "עיקריות" },
    { id: "c3", name: "קינוחים" },
  ] as Category[];

  it("groups dishes under their category", () => {
    const dishes = [
      mkDish({ id: "d1", category_id: "c1" }),
      mkDish({ id: "d2", category_id: "c2" }),
      mkDish({ id: "d3", category_id: "c1" }),
    ];
    const grouped = groupDishesByCategory(categories, dishes);
    expect(grouped).toHaveLength(3);
    expect(grouped[0].dishes.map((d) => d.id)).toEqual(["d1", "d3"]);
    expect(grouped[1].dishes.map((d) => d.id)).toEqual(["d2"]);
    expect(grouped[2].dishes).toEqual([]);
  });

  it("preserves the order of categories", () => {
    const grouped = groupDishesByCategory(categories, []);
    expect(grouped.map((g) => g.category.id)).toEqual(["c1", "c2", "c3"]);
  });
});

describe("pickDishBadge", () => {
  it("returns AR when 3D + ar_enabled", () => {
    expect(
      pickDishBadge({
        model_3d_url: "m.glb",
        ar_enabled: true,
        photos_360: null,
        video_url: null,
      }),
    ).toBe("AR");
  });

  it("returns 3D when model present but ar disabled", () => {
    expect(
      pickDishBadge({
        model_3d_url: "m.glb",
        ar_enabled: false,
        photos_360: null,
        video_url: null,
      }),
    ).toBe("3D");
  });

  it("returns Video when no 3D but has video", () => {
    expect(
      pickDishBadge({
        model_3d_url: null,
        ar_enabled: false,
        photos_360: null,
        video_url: "v.mp4",
      }),
    ).toBe("Video");
  });

  it("returns 360 when only 360 photos exist", () => {
    expect(
      pickDishBadge({
        model_3d_url: null,
        ar_enabled: false,
        photos_360: ["a", "b"],
        video_url: null,
      }),
    ).toBe("360");
  });

  it("returns null when nothing is present", () => {
    expect(
      pickDishBadge({
        model_3d_url: null,
        ar_enabled: false,
        photos_360: null,
        video_url: null,
      }),
    ).toBeNull();
  });

  it("returns null when photos_360 is an empty array", () => {
    expect(
      pickDishBadge({
        model_3d_url: null,
        ar_enabled: false,
        photos_360: [],
        video_url: null,
      }),
    ).toBeNull();
  });
});

describe("dishPlaceholder", () => {
  it("returns a gradient for any non-negative index", () => {
    for (let i = 0; i < 20; i++) {
      expect(dishPlaceholder(i)).toBe(
        PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length],
      );
    }
  });

  it("cycles through gradients deterministically", () => {
    expect(dishPlaceholder(0)).toBe(dishPlaceholder(PLACEHOLDER_GRADIENTS.length));
  });

  it("has exactly 6 gradients", () => {
    expect(PLACEHOLDER_GRADIENTS).toHaveLength(6);
  });
});
