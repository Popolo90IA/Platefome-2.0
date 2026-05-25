import type { ReactNode } from "react";

type TinyBadgeColor = "gold" | "emerald" | "rose";

interface TinyBadgeProps {
  color: TinyBadgeColor;
  children: ReactNode;
}

const styles: Record<TinyBadgeColor, string> = {
  gold: "bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold-dark))] border-[hsl(var(--gold))]/30",
  emerald:
    "bg-[hsl(var(--accent-bright))]/12 text-[hsl(var(--gold-dark))] border-[hsl(var(--accent-bright))]/28",
  rose: "bg-[hsl(var(--ember))]/12 text-[hsl(var(--ember))] border-[hsl(var(--ember))]/28",
};

export function TinyBadge({ color, children }: TinyBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border ${styles[color]}`}
    >
      {children}
    </span>
  );
}
