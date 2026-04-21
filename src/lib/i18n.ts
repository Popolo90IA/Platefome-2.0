import type { Language } from "@/types/database.types";

export const LANGUAGE_META: Record<
  Language,
  { label: string; flag: string; dir: "rtl" | "ltr" }
> = {
  he: { label: "עברית", flag: "🇮🇱", dir: "rtl" },
  en: { label: "English", flag: "🇬🇧", dir: "ltr" },
  fr: { label: "Français", flag: "🇫🇷", dir: "ltr" },
};

export const ALL_LANGUAGES: Language[] = ["he", "en", "fr"];

type Dict = Record<Language, Record<string, string>>;

export const T: Dict = {
  he: {
    menu: "תפריט",
    empty_menu: "התפריט עדיין ריק",
    no_dishes_in_cat: "אין מנות בקטגוריה זו",
    soldout: "אזל מהמלאי",
    featured: "מומלץ",
    new: "חדש",
    signature: "מנת השף",
    view_3d: "תצוגה תלת־מימדית",
    view_ar: "צפה במציאות רבודה",
    powered: "מופעל על ידי",
    restaurant: "מסעדה",
  },
  en: {
    menu: "Menu",
    empty_menu: "The menu is still empty",
    no_dishes_in_cat: "No dishes in this category",
    soldout: "Sold out",
    featured: "Featured",
    new: "New",
    signature: "Chef's signature",
    view_3d: "View in 3D",
    view_ar: "View in AR",
    powered: "Powered by",
    restaurant: "Restaurant",
  },
  fr: {
    menu: "Menu",
    empty_menu: "Le menu est encore vide",
    no_dishes_in_cat: "Aucun plat dans cette catégorie",
    soldout: "Épuisé",
    featured: "Recommandé",
    new: "Nouveau",
    signature: "Signature du chef",
    view_3d: "Vue en 3D",
    view_ar: "Voir en réalité augmentée",
    powered: "Propulsé par",
    restaurant: "Restaurant",
  },
};

export function t(lang: Language, key: keyof typeof T.he): string {
  return T[lang]?.[key] ?? T.he[key];
}

export function pickLocalized<
  O extends Record<string, unknown>,
  K extends string & keyof O,
>(obj: O, base: K, lang: Language): string {
  const fallback = obj[base] as string | null | undefined;
  if (lang === "he") return fallback ?? "";
  const key = `${base}_${lang}` as keyof O;
  const val = obj[key] as string | null | undefined;
  return (val && val.trim().length > 0 ? val : fallback) ?? "";
}

export function formatCurrency(amount: number, currency: string, lang: Language): string {
  const locale =
    lang === "he" ? "he-IL" : lang === "fr" ? "fr-FR" : "en-US";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}
