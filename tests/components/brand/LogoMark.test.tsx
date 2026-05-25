import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogoMark } from "@/components/brand/LogoMark";

describe("<LogoMark />", () => {
  it("renders an image with the Plateform alt text", () => {
    render(<LogoMark />);
    const img = screen.getByAltText("Plateform");
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe("IMG");
  });

  it("points to the cloche brand asset", () => {
    render(<LogoMark />);
    const img = screen.getByAltText("Plateform") as HTMLImageElement;
    expect(img.getAttribute("src")).toBe("/brand/cloche.png");
  });

  it("uses the default size 32 (height) with correct 1.587 ratio width", () => {
    render(<LogoMark />);
    const img = screen.getByAltText("Plateform") as HTMLImageElement;
    expect(img.getAttribute("height")).toBe("32");
    expect(img.getAttribute("width")).toBe("51"); // round(32 * 1.587) = 51
  });

  it("respects a custom size", () => {
    render(<LogoMark size={64} />);
    const img = screen.getByAltText("Plateform") as HTMLImageElement;
    expect(img.getAttribute("height")).toBe("64");
    expect(img.getAttribute("width")).toBe("102"); // round(64 * 1.587) = 102
  });

  it("applies the provided className", () => {
    render(<LogoMark className="custom-class" />);
    const img = screen.getByAltText("Plateform");
    expect(img).toHaveClass("custom-class");
  });
});
