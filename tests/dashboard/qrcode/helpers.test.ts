import { describe, it, expect } from "vitest";
import {
  isDarkBackground,
  pricePerUnit,
  totalPrice,
  buildMenuUrl,
  clampTableCount,
} from "@/app/(dashboard)/dashboard/qrcode/_lib/helpers";

describe("isDarkBackground", () => {
  it("flags index 1 (dark) and 2 (bronze) as dark", () => {
    expect(isDarkBackground(1)).toBe(true);
    expect(isDarkBackground(2)).toBe(true);
  });

  it("flags index 0 (beige) and 3 (white) as light", () => {
    expect(isDarkBackground(0)).toBe(false);
    expect(isDarkBackground(3)).toBe(false);
  });
});

describe("pricePerUnit", () => {
  it("returns 28 for ≤ 10 tables", () => {
    expect(pricePerUnit(1)).toBe(28);
    expect(pricePerUnit(10)).toBe(28);
  });

  it("returns 18 for 11..30 tables", () => {
    expect(pricePerUnit(11)).toBe(18);
    expect(pricePerUnit(30)).toBe(18);
  });

  it("returns 14 for > 30 tables", () => {
    expect(pricePerUnit(31)).toBe(14);
    expect(pricePerUnit(200)).toBe(14);
  });
});

describe("totalPrice", () => {
  it("multiplies by per-unit price", () => {
    expect(totalPrice(5)).toBe(5 * 28);
    expect(totalPrice(20)).toBe(20 * 18);
    expect(totalPrice(100)).toBe(100 * 14);
  });
});

describe("buildMenuUrl", () => {
  it("returns empty string when slug missing", () => {
    expect(buildMenuUrl(null)).toBe("");
    expect(buildMenuUrl(undefined)).toBe("");
    expect(buildMenuUrl("")).toBe("");
  });

  it("appends slug under /menu/", () => {
    // jsdom: window.location.origin is http://localhost:3000
    const url = buildMenuUrl("acme");
    expect(url.endsWith("/menu/acme")).toBe(true);
  });
});

describe("clampTableCount", () => {
  it("clamps to [1, max]", () => {
    expect(clampTableCount(0, 200)).toBe(1);
    expect(clampTableCount(-5, 200)).toBe(1);
    expect(clampTableCount(500, 200)).toBe(200);
    expect(clampTableCount(50, 200)).toBe(50);
  });

  it("floors floats", () => {
    expect(clampTableCount(12.9, 200)).toBe(12);
  });

  it("handles NaN", () => {
    expect(clampTableCount(NaN, 200)).toBe(1);
  });
});
