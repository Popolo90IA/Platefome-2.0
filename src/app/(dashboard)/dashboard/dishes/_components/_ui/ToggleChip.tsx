"use client";

import type { ReactNode } from "react";

type ToggleChipColor = "gold" | "emerald" | "rose" | "muted";

interface ToggleChipProps {
  active: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
  icon: ReactNode;
  color: ToggleChipColor;
}

const styles: Record<ToggleChipColor, string> = {
  gold: "bg-[hsl(var(--gold))]/20 text-[hsl(var(--gold-dark))] border-[hsl(var(--gold))]/50",
  emerald:
    "bg-[hsl(var(--accent-bright))]/15 text-[hsl(var(--gold-dark))] border-[hsl(var(--accent-bright))]/40",
  rose: "bg-[hsl(var(--ember))]/15 text-[hsl(var(--ember))] border-[hsl(var(--ember))]/40",
  muted: "bg-muted text-muted-foreground border-border",
};

export function ToggleChip({
  active,
  onChange,
  children,
  icon,
  color,
}: ToggleChipProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!active)}
      className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
        active
          ? styles[color] + " shadow-sm"
          : "bg-card text-muted-foreground border-border hover:border-[hsl(var(--gold))]/30"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
