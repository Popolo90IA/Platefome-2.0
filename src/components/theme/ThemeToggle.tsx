"use client";

import { ThemePill } from "./ThemePill";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Toggle jour/nuit câblé au ThemeProvider maison (admin + dashboard).
 * Rendu = ThemePill partagé, même visuel que la home.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  return (
    <ThemePill
      isDark={resolvedTheme === "dark"}
      onToggle={toggleTheme}
      className={className}
    />
  );
}
