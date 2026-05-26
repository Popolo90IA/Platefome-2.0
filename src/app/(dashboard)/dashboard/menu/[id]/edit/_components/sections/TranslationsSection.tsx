import { Globe } from "lucide-react";
import { SectionCard } from "../_ui/SectionCard";
import { FieldLabel } from "../_ui/FieldLabel";
import { FieldInput } from "../_ui/FieldInput";
import { FieldTextarea } from "../_ui/FieldTextarea";
import type { FormState } from "../../_lib/types";

type TranslationsSectionProps = {
  form: FormState;
  hasEn: boolean;
  hasFr: boolean;
  onChange: (patch: Partial<FormState>) => void;
};

export function TranslationsSection({
  form,
  hasEn,
  hasFr,
  onChange,
}: TranslationsSectionProps) {
  if (!hasEn && !hasFr) return null;

  return (
    <SectionCard title="תרגומים" badge="אופציונלי" defaultOpen={false}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 18,
        }}
      >
        <Globe
          style={{
            width: 14,
            height: 14,
            color: "hsl(var(--accent-bright))",
          }}
        />
        <span
          className="font-sans"
          style={{ fontSize: 13, color: "hsl(var(--subtle))" }}
        >
          אם ריק — יוצג הטקסט בעברית כברירת מחדל
        </span>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: 18 }}
      >
        {hasEn && (
          <div
            style={{
              padding: "16px 18px",
              borderRadius: 10,
              background: "hsl(var(--abyss))",
              border: "1px solid hsl(var(--line))",
            }}
          >
            <div
              className="font-sans"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "hsl(var(--subtle))",
                marginBottom: 12,
              }}
            >
              🇬🇧 English
            </div>
            <div style={{ marginBottom: 10 }}>
              <FieldLabel>Name</FieldLabel>
              <FieldInput
                dir="ltr"
                value={form.name_en}
                onChange={(v) => onChange({ name_en: v })}
                placeholder="Dish name in English"
              />
            </div>
            <div>
              <FieldLabel>Description</FieldLabel>
              <FieldTextarea
                dir="ltr"
                value={form.description_en}
                onChange={(v) => onChange({ description_en: v })}
                placeholder="Description in English"
                rows={2}
              />
            </div>
          </div>
        )}
        {hasFr && (
          <div
            style={{
              padding: "16px 18px",
              borderRadius: 10,
              background: "hsl(var(--abyss))",
              border: "1px solid hsl(var(--line))",
            }}
          >
            <div
              className="font-sans"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "hsl(var(--subtle))",
                marginBottom: 12,
              }}
            >
              🇫🇷 Français
            </div>
            <div style={{ marginBottom: 10 }}>
              <FieldLabel>Nom</FieldLabel>
              <FieldInput
                dir="ltr"
                value={form.name_fr}
                onChange={(v) => onChange({ name_fr: v })}
                placeholder="Nom du plat en français"
              />
            </div>
            <div>
              <FieldLabel>Description</FieldLabel>
              <FieldTextarea
                dir="ltr"
                value={form.description_fr}
                onChange={(v) => onChange({ description_fr: v })}
                placeholder="Description en français"
                rows={2}
              />
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
