import type { ChecklistItem, Stats } from "./types";

/** Calcule le pourcentage de delta (ou null si pas de base). */
export function computeDelta(cur: number, prev: number): number | null {
  if (prev > 0) return Math.round(((cur - prev) / prev) * 100);
  return null;
}

/** Date formatée en hébreu (long form). */
export function formatTodayHe(): string {
  return new Date().toLocaleDateString("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/** Liste des étapes onboarding. */
export function buildChecklist(
  hasRestaurant: boolean,
  stats: Stats
): ChecklistItem[] {
  return [
    {
      done: hasRestaurant,
      text: "יצירת פרופיל מסעדה",
      href: "/dashboard/settings",
    },
    {
      done: stats.categories > 0,
      text: "הוספת קטגוריות",
      href: "/dashboard/categories",
    },
    {
      done: stats.dishes > 0,
      text: "הוספת מנות",
      href: "/dashboard/dishes",
    },
    { done: false, text: "הורדת QR קוד", href: "/dashboard/qrcode" },
    {
      done: stats.views > 0,
      text: "הצפייה הראשונה מלקוח",
      href: "/dashboard/analytics",
    },
  ];
}
