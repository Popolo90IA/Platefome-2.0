import { Award, Sparkles, Flame, CircleOff } from "lucide-react";
import { SectionCard } from "../_ui/SectionCard";
import { FieldLabel } from "../_ui/FieldLabel";
import { ChipToggle } from "../_ui/ChipToggle";
import { ALLERGEN_OPTIONS, MENU_TAGS } from "../../_lib/constants";
import type { FormState } from "../../_lib/types";

type TagsSectionProps = {
  form: FormState;
  onChange: (patch: Partial<FormState>) => void;
  onToggleAllergen: (key: string) => void;
  onToggleTag: (key: string) => void;
};

const DISPLAY_BADGES = [
  {
    key: "is_signature" as const,
    label: "מנת השף",
    icon: <Award style={{ width: 12, height: 12 }} />,
  },
  {
    key: "is_new" as const,
    label: "חדש",
    icon: <Sparkles style={{ width: 12, height: 12 }} />,
  },
  {
    key: "is_featured" as const,
    label: "מומלץ",
    icon: <Flame style={{ width: 12, height: 12 }} />,
  },
];

export function TagsSection({
  form,
  onChange,
  onToggleAllergen,
  onToggleTag,
}: TagsSectionProps) {
  return (
    <SectionCard title="תגיות ודיאטה" badge="אופציונלי">
      {/* Display badges */}
      <div style={{ marginBottom: 20 }}>
        <FieldLabel>תגיות תצוגה</FieldLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {DISPLAY_BADGES.map((b) => (
            <ChipToggle
              key={b.key}
              active={form[b.key]}
              onClick={() => onChange({ [b.key]: !form[b.key] } as Partial<FormState>)}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {b.icon}
                {b.label}
              </span>
            </ChipToggle>
          ))}
          <ChipToggle
            active={!form.is_available}
            onClick={() => onChange({ is_available: !form.is_available })}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <CircleOff style={{ width: 12, height: 12 }} />
              אזל מהמלאי
            </span>
          </ChipToggle>
        </div>
      </div>

      {/* Menu tags */}
      <div style={{ marginBottom: 20 }}>
        <FieldLabel>תגיות תפריט</FieldLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {MENU_TAGS.map((t) => (
            <ChipToggle
              key={t.key}
              active={form.tags.includes(t.key)}
              onClick={() => onToggleTag(t.key)}
              variant="diet"
            >
              {t.label}
            </ChipToggle>
          ))}
        </div>
      </div>

      {/* Allergens */}
      <div>
        <FieldLabel>אלרגנים</FieldLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {ALLERGEN_OPTIONS.map((a) => (
            <ChipToggle
              key={a.key}
              active={form.allergens.includes(a.key)}
              onClick={() => onToggleAllergen(a.key)}
              variant="allergen"
            >
              {a.emoji} {a.label}
            </ChipToggle>
          ))}
        </div>
        {form.allergens.length > 0 && (
          <p
            className="font-sans"
            style={{
              fontSize: 12,
              color: "hsl(var(--dim))",
              marginTop: 8,
            }}
          >
            יוצג ללקוח כאזהרת אלרגן בתפריט
          </p>
        )}
      </div>
    </SectionCard>
  );
}
