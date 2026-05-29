"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Globe } from "lucide-react";
import { SectionIcon } from "./SectionIcon";
import { LANGUAGES, CURRENCIES } from "../_lib/constants";
import { toggleLanguage, languageLabel } from "../_lib/helpers";
import type { FormState } from "../_lib/types";

type Props = {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
};

/**
 * LanguagesCurrencyCard — sélecteur multi-langues + devise + descriptions traduites.
 */
export function LanguagesCurrencyCard({ form, setForm }: Props) {
  return (
    <Card className="shadow-premium">
      <CardHeader>
        <CardTitle className="font-serif-display text-xl flex items-center gap-2.5">
          <SectionIcon>
            <Globe className="h-3.5 w-3.5" />
          </SectionIcon>
          שפות ומטבע
        </CardTitle>
        <p className="text-sm text-muted-foreground pt-1">
          בחר אילו שפות יוצגו ללקוח ובאיזה מטבע
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>שפות זמינות</Label>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((l) => {
              const active = form.languages.includes(l.code);
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setForm((f) => {
                      const r = toggleLanguage(
                        f.languages,
                        f.default_language,
                        l.code,
                      );
                      return {
                        ...f,
                        languages: r.languages,
                        default_language: r.default_language,
                      };
                    });
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    active
                      ? "text-white border-transparent"
                      : "bg-card text-foreground/70 border-border hover:border-[hsl(var(--gold))]/40"
                  }`}
                  style={active ? { background: "var(--grad-bronze)" } : {}}
                >
                  <span className="text-lg leading-none">{l.flag}</span>
                  {l.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>שפת ברירת מחדל</Label>
            <select
              value={form.default_language}
              onChange={(e) =>
                setForm((f) => ({ ...f, default_language: e.target.value }))
              }
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
            >
              {form.languages.map((code) => (
                <option key={code} value={code}>
                  {languageLabel(code)}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>מטבע</Label>
            <select
              value={form.currency}
              onChange={(e) =>
                setForm((f) => ({ ...f, currency: e.target.value }))
              }
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
              dir="ltr"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.symbol} {c.code} — {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {form.languages.includes("en") && (
          <div className="space-y-2">
            <Label htmlFor="desc_en" dir="ltr">
              🇬🇧 Description (English)
            </Label>
            <Textarea
              id="desc_en"
              dir="ltr"
              rows={2}
              value={form.description_en}
              onChange={(e) =>
                setForm((f) => ({ ...f, description_en: e.target.value }))
              }
              placeholder="A short description in English"
            />
          </div>
        )}
        {form.languages.includes("fr") && (
          <div className="space-y-2">
            <Label htmlFor="desc_fr" dir="ltr">
              🇫🇷 Description (Français)
            </Label>
            <Textarea
              id="desc_fr"
              dir="ltr"
              rows={2}
              value={form.description_fr}
              onChange={(e) =>
                setForm((f) => ({ ...f, description_fr: e.target.value }))
              }
              placeholder="Une courte description en français"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
