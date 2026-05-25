import { describe, it, expect } from "vitest";
import { dishSchema } from "@/lib/validations/dish";

const validDish = {
  name: "סלט קיסר",
  category_id: "11111111-2222-3333-4444-555555555555",
  description: "סלט קיסר קלאסי עם רוטב ביתי",
  price: 48,
  image_url: "https://example.com/caesar.jpg",
};

describe("dishSchema", () => {
  it("accepts a valid dish payload", () => {
    const result = dishSchema.safeParse(validDish);
    expect(result.success).toBe(true);
  });

  it("rejects an empty name", () => {
    const result = dishSchema.safeParse({ ...validDish, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a name longer than 160 chars", () => {
    const result = dishSchema.safeParse({ ...validDish, name: "x".repeat(161) });
    expect(result.success).toBe(false);
  });

  it("rejects a non-UUID category_id", () => {
    const result = dishSchema.safeParse({ ...validDish, category_id: "not-a-uuid" });
    expect(result.success).toBe(false);
  });

  it("rejects a negative price", () => {
    const result = dishSchema.safeParse({ ...validDish, price: -10 });
    expect(result.success).toBe(false);
  });

  it("rejects a zero price (must be strictly positive)", () => {
    const result = dishSchema.safeParse({ ...validDish, price: 0 });
    expect(result.success).toBe(false);
  });

  it("rejects a price above 100000", () => {
    const result = dishSchema.safeParse({ ...validDish, price: 100001 });
    expect(result.success).toBe(false);
  });

  it("accepts an absent (optional) description", () => {
    const { description: _omit, ...payload } = validDish;
    void _omit;
    const result = dishSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("accepts image_url as null", () => {
    const result = dishSchema.safeParse({ ...validDish, image_url: null });
    expect(result.success).toBe(true);
  });
});
