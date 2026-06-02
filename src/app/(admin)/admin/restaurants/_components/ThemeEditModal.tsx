"use client";

import { Check, Moon, Palette, Sun, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { hslToHex, hexToHsl, THEME_PRESETS } from "@/lib/theme";
import type { ThemeForm } from "../_lib/types";

interface Props {
  form: ThemeForm;
  saving: boolean;
  onChange: (f: ThemeForm | ((prev: ThemeForm) => ThemeForm)) => void;
  onClose: () => void;
  onSave: () => void;
}

/**
 * ThemeEditModal — modal édition couleur primaire + dark/light.
 */
export function ThemeEditModal({
  form,
  saving,
  onChange,
  onClose,
  onSave,
}: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <Card
        className="max-w-sm w-full shadow-premium"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-display text-xl font-bold flex items-center gap-2">
              <Palette
                className="h-5 w-5"
                style={{ color: "hsl(var(--gold))" }}
              />
              עיצוב תפריט
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-secondary transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-3">
            <Label>צבע ראשי</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={hslToHex(form.primary)}
                onChange={(e) =>
                  onChange((f) => ({
                    ...f,
                    primary: hexToHsl(e.target.value),
                  }))
                }
                className="h-10 w-10 rounded-lg cursor-pointer border border-border p-0.5 bg-transparent flex-shrink-0"
              />
              <div
                className="flex-1 text-xs text-muted-foreground font-mono bg-secondary rounded-lg px-3 py-2 truncate"
                dir="ltr"
              >
                {form.primary}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.color}
                  type="button"
                  title={preset.label}
                  onClick={() =>
                    onChange((f) => ({ ...f, primary: preset.color }))
                  }
                  className="h-6 w-6 rounded-full transition-all flex-shrink-0"
                  style={{
                    backgroundColor: hslToHex(preset.color),
                    outline:
                      form.primary === preset.color
                        ? `2px solid ${hslToHex(preset.color)}`
                        : "2px solid transparent",
                    outlineOffset: "2px",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              {form.dark ? (
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
              <span className="text-sm font-medium">
                {form.dark ? "מצב כהה" : "מצב בהיר"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onChange((f) => ({ ...f, dark: !f.dark }))}
              className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-[hsl(var(--gold))]/40 transition-colors"
            >
              החלף
            </button>
          </div>

          <div className="flex gap-2 justify-end pt-1">
            <Button variant="outline" onClick={onClose} disabled={saving}>
              ביטול
            </Button>
            <Button
              onClick={onSave}
              disabled={saving}
              className="text-white hover:opacity-90"
              style={{ background: "var(--grad-bronze)" }}
            >
              {saving ? (
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  שמור
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
