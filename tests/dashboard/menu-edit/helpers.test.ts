import { describe, it, expect } from "vitest";
import {
  toggleListItem,
  getCategoryName,
  pickInitialMediaTab,
} from "@/app/(dashboard)/dashboard/menu/[id]/edit/_lib/helpers";

describe("toggleListItem", () => {
  it("adds the key when not present", () => {
    expect(toggleListItem(["a", "b"], "c")).toEqual(["a", "b", "c"]);
  });

  it("removes the key when present", () => {
    expect(toggleListItem(["a", "b", "c"], "b")).toEqual(["a", "c"]);
  });

  it("returns a new array (does not mutate)", () => {
    const list = ["a", "b"];
    const result = toggleListItem(list, "c");
    expect(result).not.toBe(list);
    expect(list).toEqual(["a", "b"]);
  });

  it("starts an empty list with the key when adding", () => {
    expect(toggleListItem([], "x")).toEqual(["x"]);
  });

  it("returns an empty list when removing the last item", () => {
    expect(toggleListItem(["x"], "x")).toEqual([]);
  });
});

describe("getCategoryName", () => {
  const categories = [
    { id: "c1", name: "ראשונות" },
    { id: "c2", name: "עיקריות" },
  ];

  it("returns the category name when id matches", () => {
    expect(getCategoryName(categories, "c2")).toBe("עיקריות");
  });

  it("returns empty string when id is unknown", () => {
    expect(getCategoryName(categories, "missing")).toBe("");
  });

  it("returns empty string when categories array is empty", () => {
    expect(getCategoryName([], "c1")).toBe("");
  });
});

describe("pickInitialMediaTab", () => {
  it("prioritizes 3D model when present", () => {
    expect(
      pickInitialMediaTab({
        model_3d_url: "model.glb",
        photos_360: ["a"],
        image_url: "img.jpg",
        video_url: "v.mp4",
      }),
    ).toBe("3d");
  });

  it("falls back to 360 when no 3D model but photos_360 exist", () => {
    expect(
      pickInitialMediaTab({
        model_3d_url: null,
        photos_360: ["a", "b"],
        image_url: "img.jpg",
      }),
    ).toBe("360");
  });

  it("falls back to photo when only image_url is set", () => {
    expect(
      pickInitialMediaTab({
        model_3d_url: null,
        photos_360: null,
        image_url: "img.jpg",
        video_url: null,
      }),
    ).toBe("photo");
  });

  it("falls back to video when only video is set", () => {
    expect(
      pickInitialMediaTab({
        model_3d_url: null,
        photos_360: [],
        image_url: null,
        video_url: "v.mp4",
      }),
    ).toBe("video");
  });

  it("defaults to photo when nothing is set", () => {
    expect(
      pickInitialMediaTab({
        model_3d_url: null,
        photos_360: null,
        image_url: null,
        video_url: null,
      }),
    ).toBe("photo");
  });

  it("treats empty photos_360 array as no 360 content", () => {
    expect(
      pickInitialMediaTab({
        model_3d_url: null,
        photos_360: [],
        image_url: "img.jpg",
      }),
    ).toBe("photo");
  });
});
