import { describe, it, expect } from "vitest";
import {
  FORMATS,
  COASTER_IDX,
  BG_SWATCHES,
  DARK_BG_INDEXES,
  QR_STYLES,
  QR_VARIANTS,
  CANVAS_TABS,
  DEFAULT_CTA,
  DEFAULT_DESC,
  DEFAULT_TABLE_COUNT,
  MAX_TABLE_COUNT,
  MAX_PRINT_GRID,
  COPIED_TOAST_MS,
} from "@/app/(dashboard)/dashboard/qrcode/_lib/constants";

describe("FORMATS", () => {
  it("exposes 4 presets", () => {
    expect(FORMATS).toHaveLength(4);
  });

  it("includes a square coaster at COASTER_IDX", () => {
    const c = FORMATS[COASTER_IDX];
    expect(c.width).toBe(c.height);
    expect(c.label).toContain("Coaster");
  });

  it("each format has positive width/height", () => {
    FORMATS.forEach((f) => {
      expect(f.width).toBeGreaterThan(0);
      expect(f.height).toBeGreaterThan(0);
    });
  });
});

describe("BG_SWATCHES", () => {
  it("has 4 swatches", () => {
    expect(BG_SWATCHES).toHaveLength(4);
  });

  it("only white needs border", () => {
    const withBorder = BG_SWATCHES.filter((s) => s.border);
    expect(withBorder).toHaveLength(1);
  });
});

describe("DARK_BG_INDEXES", () => {
  it("references indexes 1 and 2", () => {
    expect(DARK_BG_INDEXES).toEqual([1, 2]);
  });
});

describe("QR_STYLES", () => {
  it("has 3 styles", () => {
    expect(QR_STYLES).toHaveLength(3);
  });
});

describe("QR_VARIANTS", () => {
  it("has 4 downloadable variants", () => {
    expect(QR_VARIANTS).toHaveLength(4);
  });
});

describe("CANVAS_TABS", () => {
  it("has 4 tabs (3D, front, back, print)", () => {
    expect(CANVAS_TABS).toHaveLength(4);
  });
});

describe("defaults", () => {
  it("DEFAULT_CTA and DEFAULT_DESC are non-empty", () => {
    expect(DEFAULT_CTA.length).toBeGreaterThan(0);
    expect(DEFAULT_DESC.length).toBeGreaterThan(0);
  });

  it("DEFAULT_TABLE_COUNT in [1, MAX_TABLE_COUNT]", () => {
    expect(DEFAULT_TABLE_COUNT).toBeGreaterThanOrEqual(1);
    expect(DEFAULT_TABLE_COUNT).toBeLessThanOrEqual(MAX_TABLE_COUNT);
  });

  it("MAX_PRINT_GRID is positive", () => {
    expect(MAX_PRINT_GRID).toBeGreaterThan(0);
  });

  it("COPIED_TOAST_MS is positive", () => {
    expect(COPIED_TOAST_MS).toBeGreaterThan(0);
  });
});
