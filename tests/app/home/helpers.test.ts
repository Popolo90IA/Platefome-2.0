import { describe, it, expect } from "vitest";
import {
  buildSparklinePoints,
  cyclicIndex,
  extractStatNumber,
} from "@/app/_home/_lib/helpers";

describe("extractStatNumber", () => {
  it("extracts an integer from a stat label", () => {
    expect(extractStatNumber("200%")).toBe(200);
    expect(extractStatNumber("12K+")).toBe(12);
  });

  it("extracts and rounds a float", () => {
    expect(extractStatNumber("12.5K")).toBe(13);
    expect(extractStatNumber("3.2x")).toBe(3);
  });

  it("returns 0 when no number is found", () => {
    expect(extractStatNumber("—")).toBe(0);
    expect(extractStatNumber("")).toBe(0);
    expect(extractStatNumber("abc")).toBe(0);
  });
});

describe("cyclicIndex", () => {
  it("returns the next index when delta is +1", () => {
    expect(cyclicIndex(0, 1, 3)).toBe(1);
    expect(cyclicIndex(2, 1, 3)).toBe(0);
  });

  it("returns the previous index when delta is -1", () => {
    expect(cyclicIndex(0, -1, 3)).toBe(2);
    expect(cyclicIndex(2, -1, 3)).toBe(1);
  });

  it("wraps around for large deltas", () => {
    expect(cyclicIndex(0, 4, 3)).toBe(1);
    expect(cyclicIndex(0, -4, 3)).toBe(2);
  });
});

describe("buildSparklinePoints", () => {
  it("returns space-separated x,y pairs spanning the viewBox width", () => {
    const pts = buildSparklinePoints([0, 5, 10], 80, 28);
    const pairs = pts.split(" ");
    expect(pairs).toHaveLength(3);
    expect(pairs[0]).toMatch(/^0,/);
    expect(pairs[2]).toMatch(/^80,/);
  });

  it("flips the y axis (max value lands near y=0)", () => {
    const pts = buildSparklinePoints([0, 5, 10], 80, 28);
    const last = pts.split(" ")[2];
    const y = parseFloat(last.split(",")[1]);
    expect(y).toBeLessThan(1); // ~0
  });

  it("handles constant data without divide-by-zero", () => {
    expect(() => buildSparklinePoints([3, 3, 3], 80, 28)).not.toThrow();
  });
});
