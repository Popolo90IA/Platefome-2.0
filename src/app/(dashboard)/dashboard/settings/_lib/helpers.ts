import { MIN_PASSWORD_LENGTH } from "./constants";

/**
 * validatePassword — vérifie longueur min + correspondance next/confirm.
 * Retourne `null` si valide, sinon message d'erreur (hébreu).
 */
export function validatePassword(next: string, confirm: string): string | null {
  if (next.length < MIN_PASSWORD_LENGTH) {
    return `הסיסמה חייבת להכיל לפחות ${MIN_PASSWORD_LENGTH} תווים`;
  }
  if (next !== confirm) {
    return "הסיסמאות אינן תואמות";
  }
  return null;
}

/**
 * toggleLanguage — ajoute/retire une langue, garantit non-vide,
 * et recale `default_language` s'il n'est plus dans la liste.
 */
export function toggleLanguage(
  langs: string[],
  defaultLang: string,
  code: string,
): { languages: string[]; default_language: string } {
  const has = langs.includes(code);
  let nextLangs = has ? langs.filter((x) => x !== code) : [...langs, code];
  if (nextLangs.length === 0) nextLangs = ["he"];
  const nextDefault = nextLangs.includes(defaultLang) ? defaultLang : nextLangs[0];
  return { languages: nextLangs, default_language: nextDefault };
}

/**
 * languageLabel — libellé hébreu/anglais d'un code langue.
 */
export function languageLabel(code: string): string {
  if (code === "he") return "עברית";
  if (code === "en") return "English";
  if (code === "fr") return "Français";
  return code;
}

/**
 * formatJoinDate — format date inscription en hébreu (he-IL).
 */
export function formatJoinDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  try {
    return d.toLocaleDateString("he-IL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}
