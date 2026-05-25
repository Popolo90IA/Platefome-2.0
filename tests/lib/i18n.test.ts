import { describe, it, expect } from "vitest";
import { t, pickLocalized, formatCurrency, T, ALL_LANGUAGES } from "@/lib/i18n";

describe("t (translation lookup)", () => {
  it("returns the hebrew label by default", () => {
    expect(t("he", "menu")).toBe("תפריט");
  });

  it("returns the english label for english", () => {
    expect(t("en", "menu")).toBe("Menu");
  });

  it("returns the french label for french", () => {
    expect(t("fr", "menu")).toBe("Menu");
  });

  it("covers all 3 expected languages", () => {
    expect(ALL_LANGUAGES).toEqual(["he", "en", "fr"]);
  });

  it("provides hebrew strings for every key", () => {
    const keys = Object.keys(T.he);
    for (const key of keys) {
      expect(T.he[key]).toBeTruthy();
    }
  });
});

describe("pickLocalized", () => {
  const dish = {
    name: "סלט קיסר",
    name_en: "Caesar salad",
    name_fr: "Salade César",
  };

  it("returns the hebrew base value for he", () => {
    expect(pickLocalized(dish, "name", "he")).toBe("סלט קיסר");
  });

  it("returns the english variant for en", () => {
    expect(pickLocalized(dish, "name", "en")).toBe("Caesar salad");
  });

  it("returns the french variant for fr", () => {
    expect(pickLocalized(dish, "name", "fr")).toBe("Salade César");
  });

  it("falls back to hebrew base when localized variant is missing", () => {
    const partial = { name: "סלט קיסר", name_en: null, name_fr: undefined };
    expect(pickLocalized(partial, "name", "en")).toBe("סלט קיסר");
    expect(pickLocalized(partial, "name", "fr")).toBe("סלט קיסר");
  });

  it("falls back when the localized variant is an empty string", () => {
    const partial = { name: "סלט קיסר", name_en: "   ", name_fr: "" };
    expect(pickLocalized(partial, "name", "en")).toBe("סלט קיסר");
    expect(pickLocalized(partial, "name", "fr")).toBe("סלט קיסר");
  });

  it("returns empty string if everything is missing", () => {
    const empty = { name: null };
    expect(pickLocalized(empty, "name", "he")).toBe("");
    expect(pickLocalized(empty, "name", "en")).toBe("");
  });
});

describe("formatCurrency", () => {
  it("formats ILS for hebrew locale", () => {
    const out = formatCurrency(48, "ILS", "he");
    // Locale-specific formatting; we just assert the digits and currency are present
    expect(out).toMatch(/48/);
    expect(out).toMatch(/₪|ILS/);
  });

  it("formats EUR for french locale", () => {
    const out = formatCurrency(12.5, "EUR", "fr");
    expect(out).toMatch(/12[.,]5/);
    expect(out).toMatch(/€|EUR/);
  });

  it("formats USD for english locale", () => {
    const out = formatCurrency(9.99, "USD", "en");
    expect(out).toMatch(/9\.99/);
    expect(out).toMatch(/\$|USD/);
  });

  it("falls back gracefully on invalid currency", () => {
    const out = formatCurrency(10, "NOTACURRENCY", "en");
    expect(out).toContain("10");
  });
});
