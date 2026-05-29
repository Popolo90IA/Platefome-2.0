import { describe, it, expect } from "vitest";
import {
  validatePassword,
  toggleLanguage,
  languageLabel,
  formatJoinDate,
} from "@/app/(dashboard)/dashboard/settings/_lib/helpers";

describe("validatePassword", () => {
  it("returns null when valid (8+ chars and matching)", () => {
    expect(validatePassword("abcdefgh", "abcdefgh")).toBeNull();
  });

  it("rejects when too short", () => {
    expect(validatePassword("short", "short")).toMatch(/8/);
  });

  it("rejects when next/confirm mismatch", () => {
    expect(validatePassword("abcdefgh", "abcdefgi")).toMatch(/תואמות/);
  });

  it("checks length before match", () => {
    // length error wins over mismatch
    expect(validatePassword("short", "different")).toMatch(/8/);
  });
});

describe("toggleLanguage", () => {
  it("adds a missing language", () => {
    const r = toggleLanguage(["he"], "he", "en");
    expect(r.languages).toEqual(["he", "en"]);
    expect(r.default_language).toBe("he");
  });

  it("removes an existing language", () => {
    const r = toggleLanguage(["he", "en"], "he", "en");
    expect(r.languages).toEqual(["he"]);
    expect(r.default_language).toBe("he");
  });

  it("never empties the list (forces 'he')", () => {
    const r = toggleLanguage(["he"], "he", "he");
    expect(r.languages).toEqual(["he"]);
  });

  it("recalibrates default_language if removed", () => {
    const r = toggleLanguage(["he", "en"], "en", "en");
    expect(r.languages).toEqual(["he"]);
    expect(r.default_language).toBe("he");
  });

  it("returns new array (no mutation)", () => {
    const langs = ["he"];
    const r = toggleLanguage(langs, "he", "en");
    expect(r.languages).not.toBe(langs);
    expect(langs).toEqual(["he"]);
  });
});

describe("languageLabel", () => {
  it("maps known codes", () => {
    expect(languageLabel("he")).toBe("עברית");
    expect(languageLabel("en")).toBe("English");
    expect(languageLabel("fr")).toBe("Français");
  });

  it("falls back to the code itself", () => {
    expect(languageLabel("xx")).toBe("xx");
  });
});

describe("formatJoinDate", () => {
  it("returns empty string on null/undefined", () => {
    expect(formatJoinDate(null)).toBe("");
    expect(formatJoinDate(undefined)).toBe("");
    expect(formatJoinDate("")).toBe("");
  });

  it("formats ISO date as he-IL long month", () => {
    const out = formatJoinDate("2024-03-15T10:00:00Z");
    expect(out).toMatch(/2024/);
  });

  it("returns empty string on invalid input", () => {
    expect(formatJoinDate("not-a-date")).toBe("");
  });
});
