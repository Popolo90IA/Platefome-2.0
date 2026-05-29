/**
 * downloadSvgFromRef — sérialise un SVGElement existant et déclenche le DL.
 */
export function downloadSvgFromRef(
  svg: SVGSVGElement,
  filename: string,
): void {
  const data = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([data], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * downloadPngFromSvg — rasterise un SVG en PNG 1024×1024 via canvas et DL.
 */
export function downloadPngFromSvg(
  svg: SVGSVGElement,
  filename: string,
  size = 1024,
): void {
  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = () => {
    ctx?.drawImage(img, 0, 0, size, size);
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
  };
  img.src =
    "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
}

/**
 * downloadQrVariant — génère un SVG carré au format demandé pour une variante
 * (fg/bg) et déclenche le download.
 */
export function downloadQrVariant(
  menuUrl: string,
  fgColor: string,
  bgColor: string,
  fmt: "png" | "svg",
  slug: string,
): void {
  if (!menuUrl) return;
  const svgNS = "http://www.w3.org/2000/svg";
  const tempSvg = document.createElementNS(svgNS, "svg");
  tempSvg.setAttribute("width", "256");
  tempSvg.setAttribute("height", "256");
  tempSvg.setAttribute("viewBox", "0 0 256 256");
  tempSvg.setAttribute("xmlns", svgNS);

  const bg = document.createElementNS(svgNS, "rect");
  bg.setAttribute("width", "256");
  bg.setAttribute("height", "256");
  bg.setAttribute("fill", bgColor);
  tempSvg.appendChild(bg);

  const text = document.createElementNS(svgNS, "text");
  text.setAttribute("x", "128");
  text.setAttribute("y", "136");
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("fill", fgColor);
  text.setAttribute("font-size", "12");
  text.textContent = menuUrl;
  tempSvg.appendChild(text);

  const data = new XMLSerializer().serializeToString(tempSvg);
  const blob = new Blob([data], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `qr-variant-${slug || "menu"}.${fmt}`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}
