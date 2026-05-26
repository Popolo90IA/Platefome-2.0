/**
 * Extract a numeric value (the first integer or float) from a string like
 * "12.5K+" → 12, "200%" → 200. Returns 0 if no number is found.
 * Used by the count-up animation in `StatNumber`.
 */
export function extractStatNumber(value: string): number {
  const m = value.match(/([\d]+(?:\.[\d]+)?)/);
  return m ? Math.round(parseFloat(m[1])) : 0;
}

/**
 * Compute the polyline points string for a sparkline.
 * Maps data into a fixed `w × h` viewBox.
 */
export function buildSparklinePoints(
  data: number[],
  w: number,
  h: number,
): string {
  const max = Math.max(...data);
  const min = Math.min(...data);
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min + 0.001)) * h;
      return `${x},${y}`;
    })
    .join(" ");
}

/**
 * Cyclic next/prev index for arrays — used by the hero model carousel.
 */
export function cyclicIndex(current: number, delta: number, length: number): number {
  return ((current + delta) % length + length) % length;
}
