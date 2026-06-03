/* ── Step definitions ─────────────────────────────────── */
export const STEPS = [
  { id: 1, label: "פרטי המסעדה" },
  { id: 2, label: "המנה הראשונה" },
  { id: 3, label: "QR לשולחנות" },
  { id: 4, label: "הזמנת צוות" },
] as const;

/* ── Style aliases (CSS vars) ─────────────────────────── */
export const S = {
  void: "hsl(var(--void))",
  deep: "hsl(var(--card))",
  abyss: "hsl(var(--secondary))",
  fog: "hsl(var(--foreground))",
  subtle: "hsl(var(--muted-foreground))",
  dim: "hsl(var(--dim))",
  line: "hsl(var(--line))",
  accent: "hsl(var(--primary))",
} as const;

/* ── Per-step header subtitles ────────────────────────── */
export const STEP_SUBTITLES: Record<number, string> = {
  1: "כמה פרטים בסיסיים ואנחנו מוכנים להתחיל. זה לוקח כ-2 דקות.",
  2: "העלה מודל 3D, תמונות, או צלם 12 צילומים מהפלאפון — ה-AI שלנו יבנה את ההמרה.",
  3: "הלקוחות יסרקו ויראו את המנות שלך בתלת מימד. אין צורך באפליקציה.",
  4: "הוסף חברי צוות שיוכלו לנהל את התפריט איתך.",
};

export type RestaurantData = { name: string; slug: string; city: string };
