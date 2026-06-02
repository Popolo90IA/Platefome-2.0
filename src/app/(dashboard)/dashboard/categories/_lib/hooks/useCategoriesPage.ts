"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { categorySchema } from "@/lib/validations/category";
import {
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type { Category, CategoryFormData, Restaurant } from "../types";

export function useCategoriesPage() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CategoryFormData>({
    name: "",
    display_order: 0,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const load = useCallback(async () => {
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
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

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

  const resetForm = () => {
    setForm({ name: "", display_order: 0 });
    setEditingId(null);
    setShowForm(false);
    setFormErrors({});
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

  const handleDelete = (id: string) => setDeleteId(id);

  const confirmDelete = async () => {
    if (!deleteId) return;
    await supabase.from("categories").delete().eq("id", deleteId);
    setDeleteId(null);
    await load();
  };

  return {
    restaurant,
    categories,
    loading,
    showForm,
    setShowForm,
    editingId,
    form,
    setForm,
    formErrors,
    deleteId,
    setDeleteId,
    saving,
    sensors,
    handleDragEnd,
    resetForm,
    handleEdit,
    handleSubmit,
    handleDelete,
    confirmDelete,
  };
}
