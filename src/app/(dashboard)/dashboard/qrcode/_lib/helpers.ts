import { DARK_BG_INDEXES } from "./constants";

/**
 * isDarkBackground — true si l'index de BG_SWATCHES utilise un fond sombre
 * (texte clair).
 */
export function isDarkBackground(bgIdx: number): boolean {
  return DARK_BG_INDEXES.includes(bgIdx);
}

/**
 * pricePerUnit — barème dégressif selon nombre de tables.
 *  ≤ 10 : 28 ₪/unité
 *  ≤ 30 : 18 ₪/unité
 *   > 30 : 14 ₪/unité
 */
export function pricePerUnit(tableCount: number): number {
  if (tableCount <= 10) return 28;
  if (tableCount <= 30) return 18;
  return 14;
}

/**
 * totalPrice — coût total impression = tableCount × prix unitaire.
 */
export function totalPrice(tableCount: number): number {
  return tableCount * pricePerUnit(tableCount);
}

/**
 * buildMenuUrl — URL publique du menu pour un slug restaurant.
 * SSR-safe (renvoie chemin relatif si window absent).
 */
export function buildMenuUrl(slug: string | null | undefined): string {
  if (!slug) return "";
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/menu/${slug}`;
}

/**
 * clampTableCount — borne tableCount dans [1, MAX_TABLE_COUNT].
 */
export function clampTableCount(value: number, max: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.max(1, Math.min(max, Math.floor(value)));
}
