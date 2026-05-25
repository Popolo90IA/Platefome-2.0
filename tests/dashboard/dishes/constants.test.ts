import { describe, it, expect } from "vitest";
import { EMPTY_FORM } from "@/app/(dashboard)/dashboard/dishes/_lib/constants";

describe("EMPTY_FORM", () => {
  it("has all string fields empty", () => {
    expect(EMPTY_FORM.name).toBe("");
    expect(EMPTY_FORM.name_en).toBe("");
    expect(EMPTY_FORM.name_fr).toBe("");
    expect(EMPTY_FORM.category_id).toBe("");
    expect(EMPTY_FORM.description).toBe("");
    expect(EMPTY_FORM.description_en).toBe("");
    expect(EMPTY_FORM.description_fr).toBe("");
    expect(EMPTY_FORM.price).toBe("");
  });

  it("has all media fields null by default", () => {
    expect(EMPTY_FORM.image_url).toBeNull();
    expect(EMPTY_FORM.video_url).toBeNull();
    expect(EMPTY_FORM.model_3d_url).toBeNull();
    expect(EMPTY_FORM.photos_360).toBeNull();
  });

  it("has is_available true by default (new dish should be available)", () => {
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

  it("matches the FormState shape (all 17 fields present)", () => {
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
    ];
    expect(Object.keys(EMPTY_FORM).sort()).toEqual(expectedKeys.sort());
  });
});
