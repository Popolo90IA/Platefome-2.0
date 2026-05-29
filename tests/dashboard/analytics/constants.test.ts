import { describe, expect, it } from "vitest";
import {
  CARD_STYLE,
  CHART_AREA_CLOSE_Y,
  CHART_BASE_Y,
  CHART_H,
  CHART_USABLE_H,
  CHART_W,
  DAY_MS,
  DAYS_HE,
  DONUT_CIRC,
  DONUT_COLORS,
  EVENTS_QUERY_LIMIT,
  HEATMAP_COLS,
  HEATMAP_ROWS,
  LANG_META,
  LANG_ROWS_LIMIT,
  RANGE_LABEL,
  RANGES,
  TOP_DISHES_LIMIT,
} from "@/app/(dashboard)/dashboard/analytics/_lib/constants";

describe("analytics constants", () => {
  it("DAYS_HE has 7 entries starting with ראשון", () => {
    expect(DAYS_HE).toHaveLength(7);
    expect(DAYS_HE[0]).toBe("ראשון");
    expect(DAYS_HE[6]).toBe("שבת");
  });

  it("RANGES = [14, 30, 90]", () => {
    expect([...RANGES]).toEqual([14, 30, 90]);
  });

  it("RANGE_LABEL covers all ranges in Hebrew", () => {
    expect(RANGE_LABEL[14]).toBe("14 ימים");
    expect(RANGE_LABEL[30]).toBe("חודש");
    expect(RANGE_LABEL[90]).toBe("רבעון");
  });

  it("CARD_STYLE has expected base props", () => {
    expect(CARD_STYLE.borderRadius).toBe(16);
    expect(CARD_STYLE.overflow).toBe("hidden");
    expect(CARD_STYLE.position).toBe("relative");
  });

  it("LANG_META covers he/en/fr/ar/ru", () => {
    expect(LANG_META.he.label).toBe("עברית");
    expect(LANG_META.en.label).toBe("English");
    expect(LANG_META.fr.label).toBe("Français");
    expect(LANG_META.ar.label).toBe("العربية");
    expect(LANG_META.ru.label).toBe("Русский");
  });

  it("DONUT_COLORS has 4 segments", () => {
    expect(DONUT_COLORS.d3).toMatch(/^hsl\(/);
    expect(DONUT_COLORS.video).toMatch(/^hsl\(/);
    expect(DONUT_COLORS.ar).toMatch(/^hsl\(/);
    expect(DONUT_COLORS.d2).toMatch(/^hsl\(/);
  });

  it("DONUT_CIRC = 238.76", () => {
    expect(DONUT_CIRC).toBeCloseTo(238.76, 2);
  });

  it("CHART dims: 600x260, base=250, usable=220", () => {
    expect(CHART_W).toBe(600);
    expect(CHART_H).toBe(260);
    expect(CHART_BASE_Y).toBe(250);
    expect(CHART_USABLE_H).toBe(220);
    expect(CHART_AREA_CLOSE_Y).toBe(260);
  });

  it("HEATMAP: 7 rows x 24 cols", () => {
    expect(HEATMAP_ROWS).toBe(7);
    expect(HEATMAP_COLS).toBe(24);
  });

  it("DAY_MS = 86_400_000", () => {
    expect(DAY_MS).toBe(86400000);
  });

  it("limits sane", () => {
    expect(TOP_DISHES_LIMIT).toBe(5);
    expect(LANG_ROWS_LIMIT).toBe(5);
    expect(EVENTS_QUERY_LIMIT).toBe(5000);
  });
});
