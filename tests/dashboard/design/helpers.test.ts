import { describe, it, expect } from "vitest";
import {
  deviceDim,
  deviceBorder,
  deviceRadius,
  computeFrameMetrics,
  buildPreviewUrl,
} from "@/app/(dashboard)/dashboard/design/_lib/helpers";
import {
  MOBILE_DIM,
  TABLET_LANDSCAPE_DIM,
  TABLET_PORTRAIT_DIM,
  MOBILE_BORDER_W,
  TABLET_BORDER_W,
  MOBILE_RADIUS,
  TABLET_RADIUS,
} from "@/app/(dashboard)/dashboard/design/_lib/constants";

describe("deviceDim", () => {
  it("returns mobile dim for mobile mode", () => {
    expect(deviceDim("mobile", false)).toEqual(MOBILE_DIM);
  });
  it("returns tablet portrait when not landscape", () => {
    expect(deviceDim("tablet", false)).toEqual(TABLET_PORTRAIT_DIM);
  });
  it("returns tablet landscape when landscape true", () => {
    expect(deviceDim("tablet", true)).toEqual(TABLET_LANDSCAPE_DIM);
  });
});

describe("deviceBorder", () => {
  it("mobile border", () => {
    expect(deviceBorder("mobile")).toBe(MOBILE_BORDER_W);
  });
  it("tablet border", () => {
    expect(deviceBorder("tablet")).toBe(TABLET_BORDER_W);
  });
});

describe("deviceRadius", () => {
  it("mobile radius", () => {
    expect(deviceRadius("mobile")).toBe(MOBILE_RADIUS);
  });
  it("tablet radius", () => {
    expect(deviceRadius("tablet")).toBe(TABLET_RADIUS);
  });
});

describe("computeFrameMetrics", () => {
  it("produces positive scale and dimensions for mobile", () => {
    const m = computeFrameMetrics("mobile", false, 900, 700);
    expect(m.scale).toBeGreaterThan(0);
    expect(m.frameW).toBeGreaterThan(0);
    expect(m.frameH).toBeGreaterThan(0);
    expect(m.iW).toBe(MOBILE_DIM.w);
    expect(m.iH).toBe(MOBILE_DIM.h);
  });

  it("scale fits within available area", () => {
    const m = computeFrameMetrics("mobile", false, 900, 700);
    // scale * iH should not exceed available height
    expect(m.scale * m.iH).toBeLessThanOrEqual(900);
  });

  it("tablet landscape swaps dimensions", () => {
    const p = computeFrameMetrics("tablet", false, 900, 700);
    const l = computeFrameMetrics("tablet", true, 900, 700);
    expect(p.iW).toBe(TABLET_PORTRAIT_DIM.w);
    expect(l.iW).toBe(TABLET_LANDSCAPE_DIM.w);
  });

  it("clamps to minimum available area when window too small", () => {
    const m = computeFrameMetrics("mobile", false, 80, 80);
    expect(m.scale).toBeGreaterThan(0);
  });
});

describe("buildPreviewUrl", () => {
  it("returns null when slug missing", () => {
    expect(buildPreviewUrl(null)).toBeNull();
    expect(buildPreviewUrl(undefined)).toBeNull();
    expect(buildPreviewUrl("")).toBeNull();
  });
  it("builds /menu/<slug>?preview=1", () => {
    expect(buildPreviewUrl("acme")).toBe("/menu/acme?preview=1");
  });
});
