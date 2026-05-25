"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Category } from "@/types/database.types";
import type { FormState } from "../../_lib/types";

type DishFormBasicsProps = {
  form: FormState;
  categories: Category[];
  formErrors: Record<string, string>;
  onChange: (patch: Partial<FormState>) => void;
};

export function DishFormBasics({ form, categories, formErrors, onChange }: DishFormBasicsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">שם המנה *</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => onChange({ name: e.target.value })}
            required
            autoFocus
          />
          {formErrors.name && (
            <p className="text-xs" style={{ color: "hsl(0 72% 51%)" }}>{formErrors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">קטגוריה *</Label>
          <select
            id="category"
            value={form.category_id}
            onChange={(e) => onChange({ category_id: e.target.value })}
            required
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
          >
            <option value="">בחר קטגוריה</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">תיאור</Label>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={3}
          placeholder="תאר את המנה, רכיבים, רמזים..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">מחיר *</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={(e) => onChange({ price: e.target.value })}
          required
          dir="ltr"
          placeholder="0.00"
        />
        {formErrors.price && (
          <p className="text-xs" style={{ color: "hsl(0 72% 51%)" }}>{formErrors.price}</p>
        )}
      </div>
    </>
  );
}
