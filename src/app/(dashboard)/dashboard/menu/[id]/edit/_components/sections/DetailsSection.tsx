import type { Category } from "@/types/database.types";
import { SectionCard } from "../_ui/SectionCard";
import { FieldLabel } from "../_ui/FieldLabel";
import { FieldInput } from "../_ui/FieldInput";
import { FieldTextarea } from "../_ui/FieldTextarea";
import type { FormState } from "../../_lib/types";

type DetailsSectionProps = {
  form: FormState;
  categories: Category[];
  onChange: (patch: Partial<FormState>) => void;
};

export function DetailsSection({
  form,
  categories,
  onChange,
}: DetailsSectionProps) {
  return (
    <SectionCard title="פרטי המנה" badge="חובה">
      <div style={{ marginBottom: 16 }}>
        <FieldLabel>שם המנה (עברית) *</FieldLabel>
        <FieldInput
          value={form.name}
          onChange={(v) => onChange({ name: v })}
          placeholder="חומוס מסבחה"
          required
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          marginBottom: 16,
        }}
      >
        <div>
          <FieldLabel>קטגוריה *</FieldLabel>
          <select
            value={form.category_id}
            onChange={(e) => onChange({ category_id: e.target.value })}
            className="font-sans"
            style={{
              width: "100%",
              fontSize: 14,
              padding: "11px 14px",
              background: "hsl(var(--void))",
              border: "1px solid hsl(var(--line))",
              borderRadius: 8,
              color: "hsl(var(--fog))",
              outline: "none",
            }}
          >
            <option value="">בחר קטגוריה</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel>מחיר (₪) *</FieldLabel>
          <FieldInput
            value={form.price}
            onChange={(v) => onChange({ price: v })}
            type="number"
            dir="ltr"
            placeholder="38"
          />
        </div>
      </div>

      <div>
        <FieldLabel>תיאור קצר</FieldLabel>
        <FieldTextarea
          value={form.description}
          onChange={(v) => onChange({ description: v })}
          placeholder="תאר את המנה, רכיבים, מרקם, הגשה..."
          rows={3}
        />
        <span
          className="font-sans"
          style={{
            fontSize: 12,
            color: "hsl(var(--dim))",
            marginTop: 5,
            display: "block",
          }}
        >
          תרגום אוטומטי לשפות הפעילות. ניתן לערוך כל תרגום בנפרד.
        </span>
      </div>
    </SectionCard>
  );
}
