"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { filterRestaurants } from "../helpers";
import {
  DEFAULT_THEME_DARK,
  DEFAULT_THEME_PRIMARY,
} from "../constants";
import type { RestaurantWithStats, ThemeForm } from "../types";

export function useAdminRestaurants() {
  const [restaurants, setRestaurants] = useState<RestaurantWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [themeEdit, setThemeEdit] = useState<string | null>(null);
  const [themeForm, setThemeForm] = useState<ThemeForm>({
    primary: DEFAULT_THEME_PRIMARY,
    dark: DEFAULT_THEME_DARK,
  });
  const [themeSaving, setThemeSaving] = useState(false);
  const supabase = createClient();

  const loadData = async () => {
    setLoading(true);
    const { data: list } = await supabase
      .from("restaurants")
      .select("*")
      .order("created_at", { ascending: false });

    if (!list) {
      setRestaurants([]);
      setLoading(false);
      return;
    }

    const enriched = await Promise.all(
      list.map(async (r) => {
        const [dishRes, viewRes] = await Promise.all([
          supabase
            .from("dishes")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", r.id),
          supabase
            .from("menu_events")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", r.id)
            .eq("event_type", "menu_view"),
        ]);
        return {
          ...r,
          dish_count: dishRes.count ?? 0,
          view_count: viewRes.count ?? 0,
        };
      })
    );

    setRestaurants(enriched);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(
    () => filterRestaurants(restaurants, search),
    [restaurants, search]
  );

  const toggleActive = async (id: string, current: boolean) => {
    setBusy(id);
    const { error } = await supabase.rpc("admin_set_restaurant_active", {
      target_restaurant_id: id,
      new_active: !current,
    });
    setBusy(null);
    if (error) {
      alert("שגיאה: " + error.message);
      return;
    }
    setRestaurants((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_active: !current } : r))
    );
  };

  const deleteRestaurant = async (id: string) => {
    setBusy(id);
    const { error } = await supabase.rpc("admin_delete_restaurant", {
      target_restaurant_id: id,
    });
    setBusy(null);
    setConfirmDelete(null);
    if (error) {
      alert("שגיאה: " + error.message);
      return;
    }
    setRestaurants((prev) => prev.filter((r) => r.id !== id));
  };

  const openThemeEdit = (r: RestaurantWithStats) => {
    setThemeForm({
      primary: r.theme_primary ?? DEFAULT_THEME_PRIMARY,
      dark: r.theme_dark_mode ?? DEFAULT_THEME_DARK,
    });
    setThemeEdit(r.id);
  };

  const saveTheme = async () => {
    if (!themeEdit) return;
    setThemeSaving(true);
    const { error } = await supabase
      .from("restaurants")
      .update({
        theme_primary: themeForm.primary,
        theme_dark_mode: themeForm.dark,
      })
      .eq("id", themeEdit);
    setThemeSaving(false);
    if (error) {
      alert("שגיאה: " + error.message);
      return;
    }
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === themeEdit
          ? {
              ...r,
              theme_primary: themeForm.primary,
              theme_dark_mode: themeForm.dark,
            }
          : r
      )
    );
    setThemeEdit(null);
  };

  return {
    restaurants,
    loading,
    search,
    setSearch,
    filtered,
    busy,
    confirmDelete,
    setConfirmDelete,
    themeEdit,
    setThemeEdit,
    themeForm,
    setThemeForm,
    themeSaving,
    toggleActive,
    deleteRestaurant,
    openThemeEdit,
    saveTheme,
  };
}
