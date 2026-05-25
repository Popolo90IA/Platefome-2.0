"use client";

import { Award, Sparkles, Flame, CircleOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ToggleChip } from "../_ui/ToggleChip";
import type { FormState } from "../../_lib/types";

type DishFormBadgesProps = {
  form: FormState;
  onChange: (patch: Partial<FormState>) => void;
};

export function DishFormBadges({ form, onChange }: DishFormBadgesProps) {
  return (
    <div className="space-y-3">
      <Label>תגיות ותצוגה</Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <ToggleChip
          active={form.is_signature}
          onChange={(v) => onChange({ is_signature: v })}
          icon={<Award className="h-3.5 w-3.5" />}
          color="gold"
        >
          מנת השף
        </ToggleChip>
        <ToggleChip
          active={form.is_new}
          onChange={(v) => onChange({ is_new: v })}
          icon={<Sparkles className="h-3.5 w-3.5" />}
          color="emerald"
        >
          חדש
        </ToggleChip>
        <ToggleChip
          active={form.is_featured}
          onChange={(v) => onChange({ is_featured: v })}
          icon={<Flame className="h-3.5 w-3.5" />}
          color="rose"
        >
          מומלץ
        </ToggleChip>
        <ToggleChip
          active={!form.is_available}
          onChange={(v) => onChange({ is_available: !v })}
          icon={<CircleOff className="h-3.5 w-3.5" />}
          color="muted"
        >
          אזל
        </ToggleChip>
      </div>
    </div>
  );
}
