import { describe, expect, it } from "vitest";
import {
  BRONZE_GRADIENT,
  BRONZE_GRADIENT_ICON,
  CARD_BG,
  DOT_ACTIVE_W,
  DOT_W,
  FRAME_CORNERS,
  HALO_BG,
  MINI_SPECS,
  QR_CARD_BG,
  QR_PATTERN_CELLS,
  QR_SIZE,
  RESPONSIVE_BREAKPOINT_PX,
} from "@/components/landing/_lib/constants";

describe("landing constants", () => {
  it("gradients are valid CSS strings", () => {
    expect(BRONZE_GRADIENT).toMatch(/linear-gradient/);
    expect(BRONZE_GRADIENT_ICON).toMatch(/linear-gradient/);
    expect(CARD_BG).toMatch(/linear-gradient/);
    expect(QR_CARD_BG).toMatch(/linear-gradient/);
    expect(HALO_BG).toMatch(/radial-gradient/);
  });

  it("FRAME_CORNERS has 4 entries with rotations 0/90/180/270", () => {
    expect(FRAME_CORNERS).toHaveLength(4);
    expect(FRAME_CORNERS.map((c) => c.rot)).toEqual([0, 90, 180, 270]);
  });

  it("MINI_SPECS has 2 entries", () => {
    expect(MINI_SPECS).toHaveLength(2);
    expect(MINI_SPECS[0].label).toBe("טעינה");
    expect(MINI_SPECS[1].label).toBe("WebXR");
  });

  it("layout dimensions", () => {
    expect(RESPONSIVE_BREAKPOINT_PX).toBe(900);
    expect(DOT_ACTIVE_W).toBe(22);
    expect(DOT_W).toBe(6);
    expect(QR_SIZE).toBe(120);
    expect(QR_PATTERN_CELLS).toBe(18);
  });
});
