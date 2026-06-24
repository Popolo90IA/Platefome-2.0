"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemePillProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

/**
 * Pill jour/nuit — composant PRÉSENTATIONNEL (pas de hook). Utilisé partout :
 * via ThemeToggle (admin/dashboard, câblé useTheme) et directement par la home.
 * Couleurs en tokens (--surface/--line/bronze) → s'accorde à la page en
 * jour ET nuit, au lieu d'un blanc fixe. dir="ltr" pour le slide en RTL.
 */
export function ThemePill({ isDark, onToggle, className }: ThemePillProps) {
  return (
    <button
      type="button"
      dir="ltr"
      onClick={onToggle}
      aria-label={isDark ? "עבור למצב בהיר" : "עבור למצב כהה"}
      aria-pressed={isDark}
      title={isDark ? "Light mode" : "Dark mode"}
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-colors duration-300",
        className,
      )}
      style={{
        background: "hsl(var(--surface))",
        border: "1px solid hsl(var(--line))",
      }}
    >
      <div className="flex justify-between items-center w-full">
        {/* Knob actif — bronze */}
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 text-white",
            isDark ? "translate-x-0" : "translate-x-8",
          )}
          style={{
            background: "var(--grad-bronze)",
            boxShadow: "0 2px 8px hsl(var(--accent-bright) / 0.4)",
          }}
        >
          {isDark ? (
            <Moon className="w-4 h-4" strokeWidth={1.5} />
          ) : (
            <Sun className="w-4 h-4" strokeWidth={1.5} />
          )}
        </div>
        {/* Icône inactive — atténuée */}
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark ? "" : "-translate-x-8",
          )}
          style={{ color: "hsl(var(--subtle))" }}
        >
          {isDark ? (
            <Sun className="w-4 h-4" strokeWidth={1.5} />
          ) : (
            <Moon className="w-4 h-4" strokeWidth={1.5} />
          )}
        </div>
      </div>
    </button>
  );
}
