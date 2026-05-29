"use client";

import { Monitor, RotateCcw, Smartphone, Tablet } from "lucide-react";
import type { PreviewMode } from "../_lib/types";

type Props = {
  mode: PreviewMode;
  tabletLandscape: boolean;
  onSelectMode: (m: PreviewMode) => void;
  onToggleLandscape: () => void;
};

const MODE_TITLE: Record<PreviewMode, string> = {
  mobile: "טלפון (390×844)",
  tablet: "טאבלט (768×1024)",
  desktop: "דסקטופ",
};

/**
 * PreviewToolbar — barre supérieure du preview : indicateur live + toggle mode
 * + bouton rotation tablette.
 */
export function PreviewToolbar({
  mode,
  tabletLandscape,
  onSelectMode,
  onToggleLandscape,
}: Props) {
  const modes: PreviewMode[] = ["mobile", "tablet", "desktop"];
  return (
    <div className="flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span
          className="inline-block h-2 w-2 rounded-full animate-pulse"
          style={{ background: "hsl(var(--gold))" }}
        />
        <span className="font-medium text-xs">
          תצוגה חיה — השינויים מופיעים מיד
        </span>
      </div>
      <div
        className="flex gap-1 p-1 rounded-lg"
        style={{ background: "hsl(var(--secondary))" }}
      >
        {modes.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onSelectMode(m)}
            className="p-1.5 rounded-md transition-colors"
            style={
              mode === m
                ? { background: "var(--grad-bronze)", color: "white" }
                : { color: "hsl(var(--muted-foreground))" }
            }
            title={MODE_TITLE[m]}
          >
            {m === "mobile" ? (
              <Smartphone className="h-3.5 w-3.5" />
            ) : m === "tablet" ? (
              <Tablet className="h-3.5 w-3.5" />
            ) : (
              <Monitor className="h-3.5 w-3.5" />
            )}
          </button>
        ))}
        {mode === "tablet" && (
          <button
            type="button"
            onClick={onToggleLandscape}
            className="p-1.5 rounded-md transition-colors"
            style={{ color: "hsl(var(--muted-foreground))" }}
            title={tabletLandscape ? "עבור לפורטרט" : "עבור לנוף"}
          >
            <RotateCcw
              className="h-3.5 w-3.5"
              style={{
                transform: tabletLandscape ? "rotate(90deg)" : "none",
                transition: "transform .3s",
              }}
            />
          </button>
        )}
      </div>
    </div>
  );
}
