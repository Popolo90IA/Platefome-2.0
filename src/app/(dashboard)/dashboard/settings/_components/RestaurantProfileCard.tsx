"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Store } from "lucide-react";
import { slugify } from "@/lib/utils";
import { SectionIcon } from "./SectionIcon";
import type { FormState } from "../_lib/types";

type Props = {
  form: FormState;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
};

/**
 * RestaurantProfileCard — formulaire profil (name/slug/description/address/phone/email).
 */
export function RestaurantProfileCard({ form, onNameChange, setForm }: Props) {
  return (
    <Card className="shadow-premium">
      <CardHeader>
        <CardTitle className="font-serif-display text-xl flex items-center gap-2.5">
          <SectionIcon>
            <Store className="h-3.5 w-3.5" />
          </SectionIcon>
          פרטי מסעדה
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">שם המסעדה *</Label>
          <Input id="name" value={form.name} onChange={onNameChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">כתובת URL *</Label>
          <Input
            id="slug"
            value={form.slug}
            onChange={(e) =>
              setForm((f) => ({ ...f, slug: slugify(e.target.value) }))
            }
            required
            dir="ltr"
          />
          <p className="text-xs text-muted-foreground">
            התפריט זמין ב־
            <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground/80">
              /menu/{form.slug || "..."}
            </code>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">תיאור</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            rows={3}
            placeholder="כמה מילים על המסעדה, אווירה, סגנון..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address">כתובת</Label>
            <Input
              id="address"
              value={form.address}
              onChange={(e) =>
                setForm((f) => ({ ...f, address: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">טלפון</Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              dir="ltr"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">אימייל ליצירת קשר</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            dir="ltr"
          />
        </div>
      </CardContent>
    </Card>
  );
}
