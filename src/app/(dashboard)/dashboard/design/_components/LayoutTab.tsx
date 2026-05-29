"use client";

import { ImageOff, LayoutGrid, List, Palette } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  MENU_CATEGORY_STYLES,
  MENU_HERO_STYLES,
  MENU_LAYOUTS,
} from "@/lib/theme";

type Props = {
  layout: string;
  heroStyle: string;
  categoryStyle: string;
  onChangeLayout: (key: string) => void;
  onChangeHero: (key: string) => void;
  onChangeCategory: (key: string) => void;
};

/**
 * LayoutTab — onglet layout : pile (layout/hero/categories).
 */
export function LayoutTab({
  layout,
  heroStyle,
  categoryStyle,
  onChangeLayout,
  onChangeHero,
  onChangeCategory,
}: Props) {
  return (
    <div className="space-y-5">
      {/* Layout */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <Label>פריסת מנות</Label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {MENU_LAYOUTS.map((opt) => {
            const isActive = layout === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => onChangeLayout(opt.key)}
                className="flex items-center gap-2.5 py-3 px-3 rounded-lg border transition-all text-start"
                style={{
                  borderColor: isActive
                    ? "hsl(var(--gold))"
                    : "hsl(var(--border))",
                  background: isActive ? "hsl(var(--gold),.08)" : "transparent",
                }}
              >
                {opt.key === "grid" ? (
                  <LayoutGrid
                    className="h-4 w-4 flex-shrink-0"
                    style={{
                      color: isActive
                        ? "hsl(var(--gold))"
                        : "hsl(var(--muted-foreground))",
                    }}
                  />
                ) : (
                  <List
                    className="h-4 w-4 flex-shrink-0"
                    style={{
                      color: isActive
                        ? "hsl(var(--gold))"
                        : "hsl(var(--muted-foreground))",
                    }}
                  />
                )}
                <div>
                  <div className="text-sm font-medium">{opt.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                    {opt.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero style */}
      <div className="space-y-2 pt-3 border-t border-border/50">
        <div className="flex items-center gap-2">
          <ImageOff className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <Label>סגנון כותרת</Label>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {MENU_HERO_STYLES.map((opt) => {
            const isActive = heroStyle === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => onChangeHero(opt.key)}
                className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg border transition-all text-center"
                style={{
                  borderColor: isActive
                    ? "hsl(var(--gold))"
                    : "hsl(var(--border))",
                  background: isActive ? "hsl(var(--gold),.08)" : "transparent",
                }}
              >
                <span
                  className="text-sm font-medium"
                  style={{
                    color: isActive
                      ? "hsl(var(--gold))"
                      : "hsl(var(--foreground))",
                  }}
                >
                  {opt.label}
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight">
                  {opt.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category style */}
      <div className="space-y-2 pt-3 border-t border-border/50">
        <div className="flex items-center gap-2">
          <Palette className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <Label>סגנון קטגוריות</Label>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {MENU_CATEGORY_STYLES.map((opt) => {
            const isActive = categoryStyle === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => onChangeCategory(opt.key)}
                className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg border transition-all text-center"
                style={{
                  borderColor: isActive
                    ? "hsl(var(--gold))"
                    : "hsl(var(--border))",
                  background: isActive ? "hsl(var(--gold),.08)" : "transparent",
                }}
              >
                <span
                  className="text-sm font-medium"
                  style={{
                    color: isActive
                      ? "hsl(var(--gold))"
                      : "hsl(var(--foreground))",
                  }}
                >
                  {opt.label}
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight">
                  {opt.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
