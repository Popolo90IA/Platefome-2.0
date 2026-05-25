"use client";

import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/upload/ImageUpload";
import { UPLOAD_FOLDERS } from "@/lib/constants";
import type { Category, Restaurant } from "@/types/database.types";
import type { FormState } from "../../_lib/types";
import { DishFormBasics } from "./DishFormBasics";
import { DishFormBadges } from "./DishFormBadges";
import { DishFormMedia } from "./DishFormMedia";
import { DishFormI18n } from "./DishFormI18n";

type DishFormProps = {
  form: FormState;
  categories: Category[];
  restaurant: Restaurant;
  editingId: string | null;
  saving: boolean;
  formErrors: Record<string, string>;
  onChange: (patch: Partial<FormState>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onOpen360Capture: () => void;
};

export function DishForm({
  form,
  categories,
  restaurant,
  editingId,
  saving,
  formErrors,
  onChange,
  onSubmit,
  onCancel,
  onOpen360Capture,
}: DishFormProps) {
  const [showI18n, setShowI18n] = useState(false);

  const availableLangs = restaurant.languages ?? ["he"];
  const hasEn = availableLangs.includes("en");
  const hasFr = availableLangs.includes("fr");

  return (
    <Card className="shadow-premium animate-scale-in border-[hsl(var(--gold))]/20">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="font-serif-display text-xl">
          {editingId ? "עריכת מנה" : "מנה חדשה"}
        </CardTitle>
        <button
          onClick={onCancel}
          className="p-1 rounded-md hover:bg-secondary transition-colors"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-5">
          <DishFormBasics
            form={form}
            categories={categories}
            formErrors={formErrors}
            onChange={onChange}
          />

          <DishFormBadges form={form} onChange={onChange} />

          <ImageUpload
            label="תמונת המנה"
            folder={UPLOAD_FOLDERS.DISHES}
            currentImage={form.image_url}
            onUploadComplete={(url) => onChange({ image_url: url })}
          />

          <DishFormMedia
            form={form}
            onChange={onChange}
            onOpen360Capture={onOpen360Capture}
          />

          {(hasEn || hasFr) && (
            <DishFormI18n
              form={form}
              hasEn={hasEn}
              hasFr={hasFr}
              open={showI18n}
              onToggle={() => setShowI18n((v) => !v)}
              onChange={onChange}
            />
          )}

          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              disabled={saving}
              className="bg-gold-gradient hover:opacity-90"
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
