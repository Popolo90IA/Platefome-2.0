import type { Dish } from "@/types/database.types";

/* ─── Allergen icons ─────────────────────────────────────── */
export const ALLERGEN_ICONS: Record<string, { label: string; emoji: string }> = {
  gluten: { label: "גלוטן", emoji: "🌾" },
  dairy: { label: "חלב", emoji: "🥛" },
  eggs: { label: "ביצים", emoji: "🥚" },
  nuts: { label: "אגוזים", emoji: "🥜" },
  sesame: { label: "שומשום", emoji: "🌰" },
  fish: { label: "דגים", emoji: "🐟" },
  shellfish: { label: "פירות ים", emoji: "🦐" },
  soy: { label: "סויה", emoji: "🫘" },
};

/* ─── Keyframes + responsive ─────────────────────────────── */
export const KF = `
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes goldShimmer { 0%{background-position:100% 0} 50%{background-position:0% 0} 100%{background-position:100% 0} }
  .dish-fade-a { animation: fadeUp .7s cubic-bezier(.16,1,.3,1) both }
  .dish-fade-b { animation: fadeUp .7s cubic-bezier(.16,1,.3,1) .1s both }
  .dish-fade-c { animation: fadeUp .7s cubic-bezier(.16,1,.3,1) .2s both }
  .dish-fade-d { animation: fadeUp .7s cubic-bezier(.16,1,.3,1) .3s both }
  @media (max-width:900px) { .dish-layout { flex-direction: column !important } .dish-visual { width: 100% !important; max-width: 100% !important } }
`;

export type DishBadge = { label: string; color: string; bg: string };

/* Build the badge list from dish flags. */
export function buildBadges(dish: Dish): DishBadge[] {
  return [
    ...(dish.is_new ? [{ label: "חדש", color: "hsl(var(--accent-vivid))", bg: "hsl(var(--accent-vivid) / .08)" }] : []),
    ...(dish.is_signature ? [{ label: "מנת שף", color: "hsl(36,28%,92%)", bg: "hsl(36,28%,92%,.06)" }] : []),
    ...(dish.is_featured ? [{ label: "מובלט", color: "hsl(28,90%,58%)", bg: "hsl(28,90%,58%,.08)" }] : []),
    ...(dish.ar_enabled ? [{ label: "AR", color: "hsl(var(--accent-vivid))", bg: "hsl(var(--accent-vivid) / .08)" }] : []),
    ...(dish.model_3d_url ? [{ label: "3D", color: "hsl(36,28%,92%)", bg: "hsl(36,28%,92%,.06)" }] : []),
    ...(!dish.is_available ? [{ label: "לא זמין", color: "hsl(var(--ember))", bg: "hsl(var(--ember) / .08)" }] : []),
  ];
}
