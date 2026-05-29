"use client";

import { Moon, Sun, ToggleLeft, ToggleRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { hexToHsl, hslToHex, THEME_PRESETS } from "@/lib/theme";
import { DEFAULT_THEME_PRIMARY } from "../_lib/constants";

type Props = {
  themePrimary: string;
  darkMode: boolean;
  onChangePrimary: (color: string) => void;
  onToggleDark: () => void;
};

/**
 * ColorTab — onglet couleur : color picker + presets + toggle dark/light.
 */
export function ColorTab({
  themePrimary,
  darkMode,
  onChangePrimary,
  onToggleDark,
}: Props) {
  return (
    <>
      <div className="space-y-3">
        <Label>צבע ראשי</Label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={hslToHex(themePrimary)}
            onChange={(e) => onChangePrimary(hexToHsl(e.target.value))}
            className="h-10 w-10 rounded-lg cursor-pointer border border-border p-0.5 bg-transparent flex-shrink-0"
            title="בחר צבע"
          />
          <div
            className="flex-1 text-xs text-muted-foreground font-mono bg-secondary rounded-lg px-3 py-2 truncate"
            dir="ltr"
          >
            {themePrimary}
          </div>
          <button
            type="button"
            onClick={() => onChangePrimary(DEFAULT_THEME_PRIMARY)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border hover:border-[hsl(var(--gold))]/40 flex-shrink-0"
          >
            ברירת מחדל
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {THEME_PRESETS.map((preset) => {
            const isActive = themePrimary === preset.color;
            const hex = hslToHex(preset.color);
            return (
              <button
                key={preset.color}
                type="button"
                title={preset.label}
                onClick={() => onChangePrimary(preset.color)}
                className="h-7 w-7 rounded-full transition-all flex-shrink-0"
                style={{
                  backgroundColor: hex,
                  outline: isActive
                    ? `2px solid ${hex}`
                    : "2px solid transparent",
                  outlineOffset: "2px",
                  boxShadow: isActive ? `0 0 8px ${hex}80` : "none",
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pt-1 border-t border-border/50">
        <div className="flex items-center gap-2.5">
          {darkMode ? (
            <Moon
              className="h-4 w-4 flex-shrink-0"
              style={{ color: "hsl(var(--gold))" }}
            />
          ) : (
            <Sun
              className="h-4 w-4 flex-shrink-0"
              style={{ color: "hsl(var(--accent-bright))" }}
            />
          )}
          <div>
            <div className="text-sm font-medium">
              {darkMode ? "מצב כהה" : "מצב בהיר"}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {darkMode
                ? "רקע כהה — מתאים לאווירה יוקרתית"
                : "רקע בהיר — מתאים לאווירה קלה"}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggleDark}
          className="flex-shrink-0 transition-opacity hover:opacity-80"
        >
          {darkMode ? (
            <ToggleRight
              className="h-9 w-9"
              style={{ color: "hsl(var(--gold))" }}
            />
          ) : (
            <ToggleLeft className="h-9 w-9 text-muted-foreground" />
          )}
        </button>
      </div>
    </>
  );
}
