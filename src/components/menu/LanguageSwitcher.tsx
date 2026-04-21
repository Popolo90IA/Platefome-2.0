"use client";

import { useState } from "react";
import { Check, Globe } from "lucide-react";
import { LANGUAGE_META } from "@/lib/i18n";
import type { Language } from "@/types/database.types";

interface LanguageSwitcherProps {
  value: Language;
  available: Language[];
  onChange: (lang: Language) => void;
}

export function LanguageSwitcher({
  value,
  available,
  onChange,
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const current = LANGUAGE_META[value];

  if (available.length <= 1) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-sm font-medium text-[hsl(var(--charcoal))] shadow-sm border border-[hsl(var(--gold))]/30 transition-colors"
      >
        <Globe className="h-4 w-4 text-[hsl(var(--gold-dark))]" />
        <span className="text-lg leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
      </button>
      {open && (
        <div className="absolute top-full end-0 mt-2 min-w-[170px] bg-card border border-border rounded-lg shadow-premium overflow-hidden z-30 animate-scale-in">
          {available.map((lang) => {
            const meta = LANGUAGE_META[lang];
            const active = lang === value;
            return (
              <button
                key={lang}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(lang);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold-dark))] font-medium"
                    : "hover:bg-secondary"
                }`}
                dir={meta.dir}
              >
                <span className="text-lg leading-none">{meta.flag}</span>
                <span className="flex-1 text-start">{meta.label}</span>
                {active && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
