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
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { categorySchema } from "@/lib/validations/category";
import type { Category, Restaurant } from "@/types/database.types";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function CategoriesPage() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", display_order: 0 });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = categories.findIndex((c) => c.id === active.id);
    const newIndex = categories.findIndex((c) => c.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(categories, oldIndex, newIndex);
    setCategories(reordered);
    await Promise.all(
      reordered.map((c, i) =>
        supabase.from("categories").update({ display_order: i }).eq("id", c.id)
      )
    );
  };

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

    const parsed = categorySchema.safeParse({
      name: form.name,
      display_order: Number(form.display_order),
    });

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) errors[String(err.path[0])] = err.message;
      });
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
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

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await supabase.from("categories").delete().eq("id", deleteId);
    setDeleteId(null);
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
          <FolderTree className="h-12 w-12 mx-auto mb-4" style={{ color: "hsl(var(--accent-bright))" }} />
          <p className="mb-5 text-muted-foreground">צור תחילה פרופיל מסעדה</p>
          <Link href="/dashboard/settings">
            <Button className="text-white hover:opacity-90" style={{ background: "var(--grad-bronze)" }}>
              צור פרופיל
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-up">
      <ConfirmDialog
        open={!!deleteId}
        title="למחוק את הקטגוריה?"
        description="כל המנות בקטגוריה זו יימחקו. פעולה זו אינה הפיכה."
        confirmLabel="מחק"
        cancelLabel="ביטול"
        danger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-display text-4xl font-bold">
            <span className="text-gold-gradient">קטגוריות</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            ארגן את המנות בקטגוריות מסודרות ·{" "}
            <span style={{ color: "hsl(var(--accent-bright))" }}>
              {categories.length} קטגוריות
            </span>
          </p>
        </div>
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="text-white hover:opacity-90"
            style={{ background: "var(--grad-bronze)", boxShadow: "0 2px 12px hsl(28 62% 38% / .30)" }}
          >
            <Plus className="h-4 w-4" />
            קטגוריה חדשה
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <Card className="shadow-premium animate-scale-in" style={{ borderColor: "hsl(var(--gold) / .25)" }}>
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
                  placeholder="לדוגמה: מנות ראשונות, עיקריות, קינוחים..."
                  required
                  autoFocus
                />
                {formErrors.name && (
                  <p className="text-xs" style={{ color: "hsl(0 72% 51%)" }}>{formErrors.name}</p>
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

      {/* List */}
      {categories.length === 0 ? (
        <Card className="shadow-premium">
          <CardContent className="pt-16 pb-16 text-center">
            <div
              className="h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "hsl(var(--accent-bright) / .1)" }}
            >
              <FolderTree className="h-8 w-8" style={{ color: "hsl(var(--accent-bright))" }} />
            </div>
            <p className="font-serif-display text-xl font-bold mb-1">אין קטגוריות עדיין</p>
            <p className="text-muted-foreground text-sm mb-6">
              קטגוריות עוזרות ללקוחות למצוא מנות בקלות
            </p>
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="text-white hover:opacity-90"
                style={{ background: "var(--grad-bronze)" }}
              >
                <Plus className="h-4 w-4" />
                צור קטגוריה ראשונה
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={categories.map((c) => c.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {categories.map((cat, idx) => (
                <SortableCategoryRow
                  key={cat.id}
                  cat={cat}
                  idx={idx}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

/* ── Sortable row ──────────────────────────────────────────── */
function SortableCategoryRow({
  cat,
  idx,
  onEdit,
  onDelete,
}: {
  cat: Category;
  idx: number;
  onEdit: (cat: Category) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: cat.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : ("auto" as const),
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        className="group shadow-sm hover:shadow-premium transition-all animate-fade-up"
        style={{
          animationDelay: `${idx * 40}ms`,
          borderColor: isDragging ? "hsl(var(--gold) / .4)" : "transparent",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(var(--gold) / .25)";
        }}
        onMouseLeave={(e) => {
          if (!isDragging)
            (e.currentTarget as HTMLDivElement).style.borderColor = "transparent";
        }}
      >
        <CardContent className="py-4 flex items-center gap-4">
          {/* Drag handle */}
          <button
            {...attributes}
            {...listeners}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "grab",
              color: "hsl(var(--dim))",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
              touchAction: "none",
            }}
          >
            <GripVertical className="h-5 w-5" />
          </button>

          {/* Order badge */}
          <div
            className="h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold text-white"
            style={{ background: "var(--grad-bronze)" }}
          >
            {cat.display_order}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <div className="font-semibold truncate">{cat.name}</div>
          </div>

          {/* Actions */}
          <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(cat)}
              className="h-8 w-8 hover:bg-[hsl(var(--gold))]/10"
            >
              <Edit className="h-4 w-4" style={{ color: "hsl(var(--gold-dark))" }} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 hover:bg-[hsl(var(--ember))]/10"
              onClick={() => onDelete(cat.id)}
            >
              <Trash2 className="h-4 w-4" style={{ color: "hsl(var(--ember))" }} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
