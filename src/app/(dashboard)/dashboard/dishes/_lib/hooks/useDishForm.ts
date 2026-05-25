"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { dishSchema } from "@/lib/validations/dish";
import type { Dish, Restaurant } from "@/types/database.types";
import { EMPTY_FORM } from "../constants";
import type { FormState } from "../types";

type UseDishFormOptions = {
  restaurant: Restaurant | null;
  onSaved: () => void | Promise<void>;
};

/**
 * Encapsulates the dish creation/edition form state and persistence.
 * Owns: form values, validation errors, editing id, show/hide form,
 * saving flag. Exposes change/submit/edit/reset handlers.
 */
export function useDishForm({ restaurant, onSaved }: UseDishFormOptions) {
  const supabase = createClient();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = useCallback((patch: Partial<FormState>) => {
    setForm((f) => ({ ...f, ...patch }));
  }, []);

  const resetForm = useCallback(() => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  }, []);

  const startCreate = useCallback(() => {
    setShowForm(true);
  }, []);

  const startEdit = useCallback((dish: Dish) => {
    setEditingId(dish.id);
    setForm({
      name: dish.name,
      name_en: dish.name_en ?? "",
      name_fr: dish.name_fr ?? "",
      category_id: dish.category_id,
      description: dish.description ?? "",
      description_en: dish.description_en ?? "",
      description_fr: dish.description_fr ?? "",
      price: String(dish.price),
      image_url: dish.image_url,
      video_url: dish.video_url,
      model_3d_url: dish.model_3d_url,
      photos_360: dish.photos_360 ?? null,
      ar_enabled: dish.ar_enabled,
      is_available: dish.is_available,
      is_featured: dish.is_featured,
      is_new: dish.is_new,
      is_signature: dish.is_signature,
    });
    setShowForm(true);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!restaurant) return;

      const parsed = dishSchema.safeParse({
        name: form.name,
        category_id: form.category_id,
        description: form.description || undefined,
        price: parseFloat(form.price) || 0,
        image_url: form.image_url,
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
        category_id: form.category_id,
        name: form.name,
        name_en: form.name_en || null,
        name_fr: form.name_fr || null,
        description: form.description || null,
        description_en: form.description_en || null,
        description_fr: form.description_fr || null,
        price: parseFloat(form.price),
        image_url: form.image_url,
        video_url: form.video_url,
        model_3d_url: form.model_3d_url,
        photos_360: form.photos_360,
        ar_enabled: form.ar_enabled,
        is_available: form.is_available,
        is_featured: form.is_featured,
        is_new: form.is_new,
        is_signature: form.is_signature,
      };

      if (editingId) {
        await supabase.from("dishes").update(payload).eq("id", editingId);
      } else {
        await supabase.from("dishes").insert(payload);
      }

      await onSaved();
      resetForm();
      setSaving(false);
    },
    [restaurant, form, editingId, supabase, onSaved, resetForm],
  );

  return {
    form,
    setForm,
    formErrors,
    editingId,
    showForm,
    saving,
    handleChange,
    startCreate,
    startEdit,
    resetForm,
    handleSubmit,
  };
}
