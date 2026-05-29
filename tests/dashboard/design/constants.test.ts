import { describe, it, expect } from "vitest";
import {
  DEFAULT_FORM,
  DEFAULT_THEME_PRIMARY,
  DEFAULT_PANEL_SIZE,
  MOBILE_DIM,
  TABLET_PORTRAIT_DIM,
  TABLET_LANDSCAPE_DIM,
  SAVED_TOAST_MS,
  IFRAME_READY_FALLBACK_MS,
} from "@/app/(dashboard)/dashboard/design/_lib/constants";

describe("DEFAULT_FORM", () => {
  it("uses DEFAULT_THEME_PRIMARY", () => {
    expect(DEFAULT_FORM.theme_primary).toBe(DEFAULT_THEME_PRIMARY);
  });
  it("dark mode enabled by default", () => {
    expect(DEFAULT_FORM.theme_dark_mode).toBe(true);
  });
  it("font pack is elegant by default", () => {
    expect(DEFAULT_FORM.theme_font_pack).toBe("elegant");
  });
  it("layout grid + pills + default hero", () => {
    expect(DEFAULT_FORM.menu_layout).toBe("grid");
    expect(DEFAULT_FORM.menu_hero_style).toBe("default");
    expect(DEFAULT_FORM.menu_category_style).toBe("pills");
  });
});

describe("device dimensions", () => {
  it("MOBILE_DIM 390x844", () => {
    expect(MOBILE_DIM).toEqual({ w: 390, h: 844 });
  });
  it("TABLET_PORTRAIT_DIM 768x1024", () => {
    expect(TABLET_PORTRAIT_DIM).toEqual({ w: 768, h: 1024 });
  });
  it("landscape is transposed portrait", () => {
    expect(TABLET_LANDSCAPE_DIM.w).toBe(TABLET_PORTRAIT_DIM.h);
    expect(TABLET_LANDSCAPE_DIM.h).toBe(TABLET_PORTRAIT_DIM.w);
  });
});

describe("timing", () => {
  it("DEFAULT_PANEL_SIZE positive", () => {
    expect(DEFAULT_PANEL_SIZE.w).toBeGreaterThan(0);
    expect(DEFAULT_PANEL_SIZE.h).toBeGreaterThan(0);
  });
  it("SAVED_TOAST_MS positive", () => {
    expect(SAVED_TOAST_MS).toBeGreaterThan(0);
  });
  it("IFRAME_READY_FALLBACK_MS positive", () => {
    expect(IFRAME_READY_FALLBACK_MS).toBeGreaterThan(0);
  });
});
