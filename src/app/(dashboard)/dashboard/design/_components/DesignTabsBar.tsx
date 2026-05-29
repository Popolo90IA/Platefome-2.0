"use client";

import { ImageIcon, LayoutGrid, Palette, Type } from "lucide-react";
import type { DesignTab } from "../_lib/types";

type Props = {
  active: DesignTab;
  onSelect: (tab: DesignTab) => void;
};

const TABS: { key: DesignTab; label: string; icon: React.ReactNode }[] = [
  { key: "color", label: "צבע", icon: <Palette className="h-3.5 w-3.5" /> },
  { key: "font", label: "גופן", icon: <Type className="h-3.5 w-3.5" /> },
  {
    key: "layout",
    label: "פריסה",
    icon: <LayoutGrid className="h-3.5 w-3.5" />,
  },
  {
    key: "images",
    label: "תמונות",
    icon: <ImageIcon className="h-3.5 w-3.5" />,
  },
];

/**
 * DesignTabsBar — barre 4 onglets (couleur/font/layout/images).
 */
export function DesignTabsBar({ active, onSelect }: Props) {
  return (
    <div
      className="flex gap-1 p-1 rounded-lg"
      style={{ background: "hsl(var(--secondary))" }}
    >
      {TABS.map((t) => {
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onSelect(t.key)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-md text-xs font-medium transition-all"
            style={
              isActive
                ? {
                    background: "hsl(var(--card))",
                    color: "hsl(var(--gold))",
                    boxShadow: "0 1px 4px rgba(0,0,0,.12)",
                  }
                : { color: "hsl(var(--muted-foreground))" }
            }
          >
            {t.icon}
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
