"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Category, Dish, Restaurant } from "@/types/database.types";
import { AUTO_SAVE_DEBOUNCE_MS, EMPTY_FORM } from "../constants";
import { pickInitialMediaTab, toggleListItem } from "../helpers";
import type { FormState, MediaTab, SaveState } from "../types";
import {
  loadEditorData,
  dishToForm,
  formToPayload,
  saveDish,
  deleteDish,
} from "./dishEditorActions";

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
    (async () => {
      const res = await loadEditorData(supabase, dishId);
      if (res.kind === "redirect") {
        router.push(res.to);
        return;
      }
      setRestaurant(res.restaurant);
      setDish(res.dish);
      setCategories(res.categories);
      setForm(dishToForm(res.dish));
      setActiveMediaTab(pickInitialMediaTab(res.dish));
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dishId]);

  // ── Save ────────────────────────────────────────────────────────────────
  const doSave = useCallback(async () => {
    if (!restaurant) return;
    setSaving(true);
    const ok = await saveDish(supabase, dishId, formToPayload(form, restaurant.id));
    setSaving(false);
    setSaveState(ok ? "saved" : "error");
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
    await deleteDish(supabase, dishId);
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
