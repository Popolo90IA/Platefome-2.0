import type { ReactNode } from "react";
import { D } from "../_lib/constants";

export type DishTagColor = "gold" | "orange" | "muted";

type DishTagProps = {
  color: DishTagColor;
  children: ReactNode;
};

const STYLES: Record<DishTagColor, { bg: string; border: string; text: string }> = {
  gold: {
    bg: "hsl(36,80%,62%,.08)",
    border: "hsl(36,80%,62%,.18)",
    text: D.goldLt,
  },
  orange: {
    bg: "hsl(28,62%,52%,.1)",
    border: "hsl(28,62%,52%,.25)",
    text: D.gold,
  },
  muted: {
    bg: "rgba(255,255,255,.04)",
    border: "rgba(255,255,255,.1)",
    text: D.textDim,
  },
};

/**
 * Compact uppercase pill badge used on dish cards (signature, new, soldout, etc.).
 */
export function DishTag({ color, children }: DishTagProps) {
  const s = STYLES[color];
  return (
    <span
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "9.5px",
        letterSpacing: ".18em",
        textTransform: "uppercase",
        padding: "3px 9px",
        borderRadius: 99,
        color: s.text,
        background: s.bg,
        border: `1px solid ${s.border}`,
      }}
    >
      {children}
    </span>
  );
}
