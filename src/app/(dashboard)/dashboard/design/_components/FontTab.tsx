"use client";

import { Label } from "@/components/ui/label";
import { FONT_PACKS } from "@/lib/theme";

type Props = {
  fontPack: string;
  onChange: (key: string) => void;
};

/**
 * FontTab — onglet font : 3 packs avec preview lettre et label.
 */
export function FontTab({ fontPack, onChange }: Props) {
  return (
    <div className="space-y-3">
      <Label>גופן כותרות ותוכן</Label>
      <div className="grid grid-cols-3 gap-2">
        {FONT_PACKS.map((pack) => {
          const isActive = fontPack === pack.key;
          return (
            <button
              key={pack.key}
              type="button"
              onClick={() => onChange(pack.key)}
              className="flex flex-col items-center gap-1.5 py-5 px-2 rounded-lg border transition-all text-center"
              style={{
                borderColor: isActive
                  ? "hsl(var(--gold))"
                  : "hsl(var(--border))",
                background: isActive ? "hsl(var(--gold),.08)" : "transparent",
                boxShadow: isActive ? "0 0 0 1px hsl(var(--gold),.3)" : "none",
              }}
            >
              <span
                className="text-xl leading-none"
                style={{
                  fontFamily: pack.headingFont,
                  color: isActive
                    ? "hsl(var(--gold))"
                    : "hsl(var(--foreground))",
                }}
              >
                {pack.sample}
              </span>
              <span className="text-xs font-medium mt-2">{pack.label}</span>
              <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                {pack.key === "elegant" && "סריף + מודרני"}
                {pack.key === "modern" && "סנס-סריף"}
                {pack.key === "hebrew" && "עברי מסורתי"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
