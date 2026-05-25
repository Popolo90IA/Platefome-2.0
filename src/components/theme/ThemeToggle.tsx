"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Minimal icon button: switches between light and dark.
 * Hidden until mounted to avoid hydration mismatch on the icon.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "עבור למצב בהיר" : "עבור למצב כהה"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={
        "inline-flex items-center justify-center h-7 w-7 rounded-sm transition-opacity duration-150 hover:opacity-70 " +
        (className ?? "")
      }
      style={{ color: "hsl(var(--subtle))" }}
    >
      {isDark ? (
        <Sun style={{ width: 16, height: 16 }} strokeWidth={1.5} />
      ) : (
        <Moon style={{ width: 16, height: 16 }} strokeWidth={1.5} />
      )}
    </button>
  );
}
