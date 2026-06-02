/**
 * Compresse une image dataURL → Blob JPEG avec maxWidth + quality.
 */
export async function compressImage(
  dataUrl: string,
  maxWidth = 1024,
  quality = 0.75
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const w = img.width * scale;
      const h = img.height * scale;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("canvas ctx null"));
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("toBlob null"))),
        "image/jpeg",
        quality
      );
    };
    img.onerror = () => reject(new Error("image load failed"));
    img.src = dataUrl;
  });
}
