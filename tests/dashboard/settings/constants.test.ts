import { describe, it, expect } from "vitest";
import {
  LANGUAGES,
  CURRENCIES,
  DEFAULT_FORM,
  DEFAULT_PW_FORM,
  DEFAULT_PW_VISIBILITY,
  MIN_PASSWORD_LENGTH,
  DEACTIVATE_TIMEOUT_MS,
} from "@/app/(dashboard)/dashboard/settings/_lib/constants";

describe("LANGUAGES", () => {
  it("exposes he/en/fr", () => {
    const codes = LANGUAGES.map((l) => l.code);
    expect(codes).toEqual(["he", "en", "fr"]);
  });

  it("each option has flag + label", () => {
    LANGUAGES.forEach((l) => {
      expect(l.flag.length).toBeGreaterThan(0);
      expect(l.label.length).toBeGreaterThan(0);
    });
  });
});

describe("CURRENCIES", () => {
  it("includes ILS as primary", () => {
    expect(CURRENCIES[0].code).toBe("ILS");
  });

  it("contains ILS/EUR/USD/GBP", () => {
    const codes = CURRENCIES.map((c) => c.code);
    expect(codes).toContain("ILS");
    expect(codes).toContain("EUR");
    expect(codes).toContain("USD");
    expect(codes).toContain("GBP");
  });
});

describe("DEFAULT_FORM", () => {
  it("starts with 'he' as default language", () => {
    expect(DEFAULT_FORM.default_language).toBe("he");
    expect(DEFAULT_FORM.languages).toEqual(["he"]);
  });

  it("defaults currency to ILS", () => {
    expect(DEFAULT_FORM.currency).toBe("ILS");
  });

  it("starts in dark mode", () => {
    expect(DEFAULT_FORM.theme_dark_mode).toBe(true);
  });
});

describe("DEFAULT_PW_FORM", () => {
  it("starts with empty fields", () => {
    expect(DEFAULT_PW_FORM).toEqual({ current: "", next: "", confirm: "" });
  });
});

describe("DEFAULT_PW_VISIBILITY", () => {
  it("starts with all toggles off", () => {
    expect(DEFAULT_PW_VISIBILITY).toEqual({
      current: false,
      next: false,
      confirm: false,
    });
  });
});

describe("constants", () => {
  it("MIN_PASSWORD_LENGTH is 8", () => {
    expect(MIN_PASSWORD_LENGTH).toBe(8);
  });

  it("DEACTIVATE_TIMEOUT_MS is positive", () => {
    expect(DEACTIVATE_TIMEOUT_MS).toBeGreaterThan(0);
  });
});
