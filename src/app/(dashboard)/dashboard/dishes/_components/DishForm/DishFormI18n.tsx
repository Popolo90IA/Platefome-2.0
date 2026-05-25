"use client";

import { Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CollapsibleSection } from "../_ui/CollapsibleSection";
import type { FormState } from "../../_lib/types";

type DishFormI18nProps = {
  form: FormState;
  hasEn: boolean;
  hasFr: boolean;
  open: boolean;
  onToggle: () => void;
  onChange: (patch: Partial<FormState>) => void;
};

export function DishFormI18n({
  form,
  hasEn,
  hasFr,
  open,
  onToggle,
  onChange,
}: DishFormI18nProps) {
  return (
    <CollapsibleSection
      open={open}
      onToggle={onToggle}
      title="תרגומים"
      subtitle="תרגומים לשפות אחרות. אם ריק — יוצג הטקסט בעברית"
      icon={<Globe className="h-4 w-4" />}
    >
      <div className="space-y-4">
        {hasEn && (
          <div className="space-y-3 p-3 rounded-lg bg-secondary/40">
            <div className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
              🇬🇧 English
            </div>
            <Input
              dir="ltr"
              placeholder="Name"
              value={form.name_en}
              onChange={(e) => onChange({ name_en: e.target.value })}
            />
            <Textarea
              dir="ltr"
              rows={2}
              placeholder="Description"
              value={form.description_en}
              onChange={(e) => onChange({ description_en: e.target.value })}
            />
          </div>
        )}
        {hasFr && (
          <div className="space-y-3 p-3 rounded-lg bg-secondary/40">
            <div className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
              🇫🇷 Français
            </div>
            <Input
              dir="ltr"
              placeholder="Nom"
              value={form.name_fr}
              onChange={(e) => onChange({ name_fr: e.target.value })}
            />
            <Textarea
              dir="ltr"
              rows={2}
              placeholder="Description"
              value={form.description_fr}
              onChange={(e) => onChange({ description_fr: e.target.value })}
            />
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
}
