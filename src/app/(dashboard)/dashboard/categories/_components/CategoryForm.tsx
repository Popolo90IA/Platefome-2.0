"use client";

import type { Dispatch, FormEvent, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, X } from "lucide-react";
import type { CategoryFormData } from "../_lib/types";

interface Props {
  editingId: string | null;
  form: CategoryFormData;
  setForm: Dispatch<SetStateAction<CategoryFormData>>;
  formErrors: Record<string, string>;
  saving: boolean;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
}

export function CategoryForm({
  editingId,
  form,
  setForm,
  formErrors,
  saving,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <Card
      className="shadow-premium animate-scale-in"
      style={{ borderColor: "hsl(var(--gold) / .25)" }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="font-serif-display text-xl">
          {editingId ? "עריכת קטגוריה" : "קטגוריה חדשה"}
        </CardTitle>
        <button
          onClick={onCancel}
          className="p-1 rounded-md hover:bg-secondary transition-colors"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">שם הקטגוריה *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
              placeholder="לדוגמה: מנות ראשונות, עיקריות, קינוחים..."
              required
              autoFocus
            />
            {formErrors.name && (
              <p className="text-xs" style={{ color: "hsl(0 72% 51%)" }}>
                {formErrors.name}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="display_order">סדר תצוגה</Label>
            <Input
              id="display_order"
              type="number"
              value={form.display_order}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  display_order: Number(e.target.value),
                }))
              }
            />
            <p className="text-xs text-muted-foreground">
              מספר נמוך יופיע קודם בתפריט
            </p>
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              disabled={saving}
              className="text-white hover:opacity-90"
              style={{ background: "var(--grad-bronze)" }}
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "שמור"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              ביטול
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
