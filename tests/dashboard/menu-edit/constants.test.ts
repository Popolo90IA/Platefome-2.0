import { describe, it, expect } from "vitest";
import {
  ALLERGEN_OPTIONS,
  MENU_TAGS,
  EMPTY_FORM,
  AUTO_SAVE_DEBOUNCE_MS,
} from "@/app/(dashboard)/dashboard/menu/[id]/edit/_lib/constants";

describe("ALLERGEN_OPTIONS", () => {
  it("contains exactly 8 allergen options", () => {
    expect(ALLERGEN_OPTIONS).toHaveLength(8);
  });

  it("uses the canonical keys", () => {
    const keys = ALLERGEN_OPTIONS.map((a) => a.key);
    expect(keys).toEqual([
      "gluten",
      "dairy",
      "eggs",
      "nuts",
      "sesame",
      "fish",
      "shellfish",
      "soy",
    ]);
  });

  it("provides a non-empty Hebrew label for each allergen", () => {
    for (const a of ALLERGEN_OPTIONS) {
      expect(a.label).toBeTruthy();
      expect(a.label.length).toBeGreaterThan(0);
    }
  });

  it("provides an emoji for each allergen", () => {
    for (const a of ALLERGEN_OPTIONS) {
      expect(a.emoji).toBeTruthy();
    }
  });
});

describe("MENU_TAGS", () => {
  it("contains exactly 9 menu tags", () => {
    expect(MENU_TAGS).toHaveLength(9);
  });

  it("uses the canonical keys", () => {
    const keys = MENU_TAGS.map((t) => t.key);
    expect(keys).toEqual([
      "popular",
      "homemade",
      "hot",
      "cold",
      "spicy",
      "seasonal",
      "vegan",
      "vegetarian",
      "glutenfree",
    ]);
  });

  it("provides a non-empty Hebrew label for each tag", () => {
    for (const t of MENU_TAGS) {
      expect(t.label).toBeTruthy();
      expect(t.label.length).toBeGreaterThan(0);
    }
  });
});

describe("EMPTY_FORM", () => {
  it("has all string fields empty", () => {
    expect(EMPTY_FORM.name).toBe("");
    expect(EMPTY_FORM.name_en).toBe("");
    expect(EMPTY_FORM.name_fr).toBe("");
    expect(EMPTY_FORM.category_id).toBe("");
    expect(EMPTY_FORM.description).toBe("");
    expect(EMPTY_FORM.price).toBe("");
  });

  it("has all media fields null by default", () => {
    expect(EMPTY_FORM.image_url).toBeNull();
    expect(EMPTY_FORM.video_url).toBeNull();
    expect(EMPTY_FORM.model_3d_url).toBeNull();
    expect(EMPTY_FORM.photos_360).toBeNull();
  });

  it("has allergens and tags as empty arrays", () => {
    expect(EMPTY_FORM.allergens).toEqual([]);
    expect(EMPTY_FORM.tags).toEqual([]);
  });

  it("has is_available true by default", () => {
    expect(EMPTY_FORM.is_available).toBe(true);
  });

  it("has ar_enabled true by default", () => {
    expect(EMPTY_FORM.ar_enabled).toBe(true);
  });

  it("has all badges (signature/new/featured) false by default", () => {
    expect(EMPTY_FORM.is_signature).toBe(false);
    expect(EMPTY_FORM.is_new).toBe(false);
    expect(EMPTY_FORM.is_featured).toBe(false);
  });

  it("matches the extended FormState shape (19 fields incl. allergens + tags)", () => {
    const expectedKeys = [
      "name",
      "name_en",
      "name_fr",
      "category_id",
      "description",
      "description_en",
      "description_fr",
      "price",
      "image_url",
      "video_url",
      "model_3d_url",
      "photos_360",
      "ar_enabled",
      "is_available",
      "is_featured",
      "is_new",
      "is_signature",
      "allergens",
      "tags",
    ];
    expect(Object.keys(EMPTY_FORM).sort()).toEqual(expectedKeys.sort());
  });
});

describe("AUTO_SAVE_DEBOUNCE_MS", () => {
  it("matches the 1800ms debounce used in the legacy editor", () => {
    expect(AUTO_SAVE_DEBOUNCE_MS).toBe(1800);
  });
});
