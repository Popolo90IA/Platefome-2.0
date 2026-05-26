/**
 * Deterministic CSS-only placeholder gradients used when a dish has no
 * image. Selected by index modulo length so the same dish always gets the
 * same gradient.
 */
export const PLACEHOLDER_GRADIENTS = [
  // 0 — hummus cream
  "radial-gradient(ellipse 14% 8% at 38% 44%, hsl(20,75%,38%) 0%, transparent 70%), radial-gradient(ellipse 18% 10% at 62% 56%, hsl(20,75%,38%) 0%, transparent 70%), radial-gradient(circle at 50% 50%, hsl(36,55%,72%) 0%, hsl(36,45%,62%) 35%, hsl(28,40%,40%) 60%, hsl(24,35%,28%) 100%)",
  // 1 — red stew
  "radial-gradient(circle at 30% 35%, hsl(15,50%,28%) 6%, transparent 9%), radial-gradient(circle at 65% 30%, hsl(15,50%,28%) 7%, transparent 10%), radial-gradient(circle at 50% 50%, hsl(8,65%,42%) 0%, hsl(5,55%,32%) 70%, hsl(5,40%,22%) 100%)",
  // 2 — greens with tomato
  "radial-gradient(circle at 25% 30%, hsl(0,75%,52%) 5%, transparent 7%), radial-gradient(circle at 70% 28%, hsl(0,75%,52%) 4%, transparent 6%), radial-gradient(circle at 50% 60%, hsl(0,75%,52%) 6%, transparent 8%), linear-gradient(135deg, hsl(95,45%,32%), hsl(110,40%,38%))",
  // 3 — golden flatbread
  "radial-gradient(ellipse 18% 18% at 50% 48%, hsl(48,90%,72%) 0%, hsl(40,80%,58%) 60%, transparent 75%), radial-gradient(circle at 50% 50%, hsl(36,75%,55%) 0%, hsl(32,65%,42%) 55%, hsl(28,55%,32%) 100%)",
  // 4 — falafel on parsley
  "radial-gradient(circle at 28% 35%, hsl(28,55%,32%) 7%, transparent 9%), radial-gradient(circle at 60% 30%, hsl(28,55%,32%) 8%, transparent 10%), radial-gradient(circle at 35% 65%, hsl(28,55%,32%) 8%, transparent 10%), linear-gradient(135deg, hsl(85,40%,35%), hsl(95,35%,42%))",
  // 5 — orange shredded pastry
  "repeating-linear-gradient(135deg, transparent 0 6px, hsl(28,80%,48%,.25) 6px 7px), radial-gradient(ellipse 30% 18% at 50% 50%, hsl(45,90%,68%) 0%, hsl(38,75%,55%) 65%, transparent 75%), radial-gradient(circle at 50% 50%, hsl(28,55%,42%) 0%, hsl(24,45%,28%) 100%)",
];

export function dishPlaceholder(idx: number): string {
  return PLACEHOLDER_GRADIENTS[idx % PLACEHOLDER_GRADIENTS.length];
}
