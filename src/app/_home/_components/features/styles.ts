import type { CSSProperties } from "react";

/** Tuile mockup interne d'une FeatureCard — surface en retrait, highlight inset. */
export const MOCKUP: CSSProperties = {
  background: "linear-gradient(160deg, hsl(var(--void)), hsl(var(--abyss)))",
  border: "1px solid hsl(var(--white) / .06)",
  borderRadius: 14,
  padding: "14px 16px",
  boxShadow: "inset 0 1px 0 hsl(var(--white) / .05)",
};
