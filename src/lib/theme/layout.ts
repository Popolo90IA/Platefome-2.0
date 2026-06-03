/* ─────────────────────────────────────────────────
   LAYOUT OPTIONS
   ───────────────────────────────────────────────── */

export type MenuLayout = "grid" | "list";
export type MenuHeroStyle = "default" | "centered" | "minimal";
export type MenuCategoryStyle = "pills" | "underline" | "sidebar";

export const MENU_LAYOUTS: { key: MenuLayout; label: string; desc: string }[] = [
  { key: "grid",  label: "רשת",   desc: "תמונה קטנה משמאל, טקסט ומחיר מימין" },
  { key: "list",  label: "רשימה", desc: "שורה קומפקטית — שם · מחיר, ללא תמונה" },
];

export const MENU_HERO_STYLES: { key: MenuHeroStyle; label: string; desc: string }[] = [
  { key: "default",  label: "קלאסי",   desc: "תמונה עם כיתוב בתחתית" },
  { key: "centered", label: "ממורכז",  desc: "שם מסעדה במרכז ה-hero" },
  { key: "minimal",  label: "מינימלי", desc: "ללא banner — רק צבע רקע וכיתוב" },
];

export const MENU_CATEGORY_STYLES: { key: MenuCategoryStyle; label: string; desc: string }[] = [
  { key: "pills",     label: "עגול",     desc: "כפתורים עגולים (ברירת מחדל)" },
  { key: "underline", label: "קו תחתון", desc: "קטגוריות עם קו תחתון פעיל" },
  { key: "sidebar",   label: "צד",       desc: "רשימה אנכית משמאל/ימין" },
];

/** Préréglages rapides pour l'interface admin/settings */
export const THEME_PRESETS: { label: string; color: string }[] = [
  { label: "Bronze (défaut)", color: "hsl(28,62%,42%)" },
  { label: "Indigo",          color: "hsl(245,60%,50%)" },
  { label: "Vert forêt",      color: "hsl(152,50%,35%)" },
  { label: "Rouge cerise",    color: "hsl(350,65%,45%)" },
  { label: "Bleu marine",     color: "hsl(214,70%,40%)" },
  { label: "Ocre",            color: "hsl(38,75%,42%)" },
  { label: "Prune",           color: "hsl(290,55%,38%)" },
  { label: "Ardoise",         color: "hsl(210,25%,40%)" },
];
