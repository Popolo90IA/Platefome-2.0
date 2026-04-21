"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  X,
  FolderTree,
  GripVertical,
} from "lucide-react";
import type { Category, Restaurant } from "@/types/database.types";

export default function CategoriesPage() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", display_order: 0 });
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const load = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: r } = await supabase
      .from("restaurants")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    setRestaurant(r);

    if (r) {
      const { data: cats } = await supabase
        .from("categories")
        .select("*")
        .eq("restaurant_id", r.id)
        .order("display_order", { ascending: true });
      setCategories(cats ?? []);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setForm({ name: "", display_order: 0 });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setForm({ name: cat.name, display_order: cat.display_order });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurant) return;
    setSaving(true);

    const payload = {
      restaurant_id: restaurant.id,
      name: form.name,
      display_order: Number(form.display_order),
    };

    if (editingId) {
      await supabase.from("categories").update(payload).eq("id", editingId);
    } else {
      await supabase.from("categories").insert(payload);
    }

    await load();
    resetForm();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("האם אתה בטוח? כל המנות בקטגוריה יימחקו.")) return;
    await supabase.from("categories").delete().eq("id", id);
    await load();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <Card className="max-w-md mx-auto shadow-premium">
        <CardContent className="pt-8 pb-8 text-center">
          <FolderTree className="h-12 w-12 mx-auto text-[hsl(var(--gold))] mb-4" />
          <p className="mb-5 text-muted-foreground">צור תחילה פרופיל מסעדה</p>
          <Link href="/dashboard/settings">
            <Button className="bg-gold-gradient hover:opacity-90">
              צור פרופיל
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-display text-4xl font-bold">קטגוריות</h1>
          <p className="text-muted-foreground mt-2">
            ארגן את המנות בקטגוריות מסודרות
          </p>
        </div>
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gold-gradient hover:opacity-90 shadow-gold-glow"
          >
            <Plus className="h-4 w-4" />
            קטגוריה חדשה
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="shadow-premium animate-scale-in border-[hsl(var(--gold))]/20">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="font-serif-display text-xl">
              {editingId ? "עריכת קטגוריה" : "קטגוריה חדשה"}
            </CardTitle>
            <button
              onClick={resetForm}
              className="p-1 rounded-md hover:bg-secondary transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">שם הקטגוריה *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                  autoFocus
                />
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
                  מספר נמוך יופיע קודם
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-gold-gradient hover:opacity-90"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "שמור"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  ביטול
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {categories.length === 0 ? (
        <Card className="shadow-premium">
          <CardContent className="pt-10 pb-10 text-center">
            <FolderTree className="h-12 w-12 mx-auto text-[hsl(var(--gold))] opacity-50 mb-4" />
            <p className="text-muted-foreground mb-5">אין קטגוריות עדיין</p>
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gold-gradient hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
                צור קטגוריה ראשונה
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {categories.map((cat, idx) => (
            <Card
              key={cat.id}
              className="group shadow-sm hover:shadow-premium hover:border-[hsl(var(--gold))]/30 transition-all animate-fade-up"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <CardContent className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <GripVertical className="h-5 w-5 text-muted-foreground/40 flex-shrink-0" />
                  <div className="h-10 w-10 rounded-lg bg-[hsl(var(--gold))]/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-[hsl(var(--gold-dark))]">
                      {cat.display_order}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{cat.name}</div>
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(cat)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(cat.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
