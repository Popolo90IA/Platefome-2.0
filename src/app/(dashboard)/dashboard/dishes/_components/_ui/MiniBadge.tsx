import type { ReactNode } from "react";

type MiniBadgeColor = "gold" | "dark";

interface MiniBadgeProps {
  color: MiniBadgeColor;
  children: ReactNode;
}

const styles: Record<MiniBadgeColor, string> = {
  gold: "bg-gold-gradient text-white",
  dark: "bg-black/70 text-white",
};

export function MiniBadge({ color, children }: MiniBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center h-6 w-6 rounded-full shadow ${styles[color]}`}
    >
      {children}
    </span>
  );
}
