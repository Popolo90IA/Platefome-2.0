"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Category, Dish, Restaurant } from "@/types/database.types";
import { AUTO_SAVE_DEBOUNCE_MS, EMPTY_FORM } from "../constants";
import { pickInitialMediaTab, toggleListItem } from "../helpers";
import type { FormState, MediaTab, SaveState } from "../types";

type UseDishEditorOptions = {
  dishId: string;
};

/**
 * Owns the dish-edit page state: data load, form values, auto-save debounce,
 * publish/delete, and list toggles. Exposes setters for child components.
 */
export function useDishEditor({ dishId }: UseDishEditorOptions) {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [dish, setDish] = useState<Dish | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeMediaTab, setActiveMediaTab] = useState<MediaTab>("photo");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstLoad = useRef(true);

  // ── Load ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: r } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (!r) {
        router.push("/dashboard/settings");
        return;
      }
      setRestaurant(r);

      const [{ data: d }, { data: cats }] = await Promise.all([
        supabase.from("dishes").select("*").eq("id", dishId).maybeSingle(),
        supabase
          .from("categories")
          .select("*")
          .eq("restaurant_id", r.id)
          .order("display_order"),
      ]);

      if (!d) {
        router.push("/dashboard/dishes");
        return;
      }
      setDish(d);
      setCategories(cats ?? []);

      setForm({
        name: d.name,
        name_en: d.name_en ?? "",
        name_fr: d.name_fr ?? "",
        category_id: d.category_id,
        description: d.description ?? "",
        description_en: d.description_en ?? "",
        description_fr: d.description_fr ?? "",
        price: String(d.price),
        image_url: d.image_url,
        video_url: d.video_url,
        model_3d_url: d.model_3d_url,
        photos_360: d.photos_360 ?? null,
        ar_enabled: d.ar_enabled,
        is_available: d.is_available,
        is_featured: d.is_featured,
        is_new: d.is_new,
        is_signature: d.is_signature,
        allergens: (d.allergens as string[]) ?? [],
        tags: (d.tags as string[]) ?? [],
      });

      setActiveMediaTab(pickInitialMediaTab(d));
      setLoading(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dishId]);

  // ── Save ────────────────────────────────────────────────────────────────
  const doSave = useCallback(async () => {
    if (!restaurant) return;
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
      price: parseFloat(form.price) || 0,
      image_url: form.image_url,
      video_url: form.video_url,
      model_3d_url: form.model_3d_url,
      photos_360: form.photos_360,
      ar_enabled: form.ar_enabled,
      is_available: form.is_available,
      is_featured: form.is_featured,
      is_new: form.is_new,
      is_signature: form.is_signature,
      allergens: form.allergens.length ? form.allergens : null,
      tags: form.tags.length ? form.tags : null,
    };
    const { error } = await supabase
      .from("dishes")
      .update(payload)
      .eq("id", dishId);
    setSaving(false);
    setSaveState(error ? "error" : "saved");
    setTimeout(() => setSaveState("idle"), 3000);
  }, [form, restaurant, dishId, supabase]);

  // ── Auto-save on form change (skip first mount) ────────────────────────
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (loading) return;

    setSaveState("saving");
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      doSave();
    }, AUTO_SAVE_DEBOUNCE_MS);
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  // ── Actions ─────────────────────────────────────────────────────────────
  const handlePublish = useCallback(async () => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    await doSave();
  }, [doSave]);

  const handleDelete = useCallback(async () => {
    await supabase.from("dishes").delete().eq("id", dishId);
    router.push("/dashboard/dishes");
  }, [dishId, supabase, router]);

  const handleChange = useCallback((patch: Partial<FormState>) => {
    setForm((f) => ({ ...f, ...patch }));
  }, []);

  const toggleAllergen = useCallback((key: string) => {
    setForm((f) => ({ ...f, allergens: toggleListItem(f.allergens, key) }));
  }, []);

  const toggleTag = useCallback((key: string) => {
    setForm((f) => ({ ...f, tags: toggleListItem(f.tags, key) }));
  }, []);

  const handle360Complete = useCallback((urls: string[]) => {
    setForm((f) => ({ ...f, photos_360: urls }));
  }, []);

  // dish kept to surface to callers if needed (e.g. timestamps)
  void dish;

  return {
    // data
    loading,
    saving,
    saveState,
    restaurant,
    categories,
    form,
    activeMediaTab,
    // setters / actions
    setActiveMediaTab,
    handleChange,
    toggleAllergen,
    toggleTag,
    handle360Complete,
    handlePublish,
    handleDelete,
  };
}
