"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Category, Dish, Restaurant } from "@/types/database.types";

type DishesDataState = {
  restaurant: Restaurant | null;
  categories: Category[];
  dishes: Dish[];
  loading: boolean;
};

/**
 * Loads the current user's restaurant, its categories and dishes.
 * Exposes setters so callers can do optimistic UI updates (drag reorder,
 * toggle availability) without refetching.
 */
export function useDishesData() {
  const supabase = createClient();
  const [state, setState] = useState<DishesDataState>({
    restaurant: null,
    categories: [],
    dishes: [],
    loading: true,
  });

  const load = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }

    const { data: r } = await supabase
      .from("restaurants")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!r) {
      setState({ restaurant: null, categories: [], dishes: [], loading: false });
      return;
    }

    const [{ data: cats }, { data: dsh }] = await Promise.all([
      supabase
        .from("categories")
        .select("*")
        .eq("restaurant_id", r.id)
        .order("display_order"),
      supabase
        .from("dishes")
        .select("*")
        .eq("restaurant_id", r.id)
        .order("created_at", { ascending: false }),
    ]);

    setState({
      restaurant: r,
      categories: cats ?? [],
      dishes: dsh ?? [],
      loading: false,
    });
  }, [supabase]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setDishes = useCallback(
    (updater: Dish[] | ((prev: Dish[]) => Dish[])) => {
      setState((s) => ({
        ...s,
        dishes: typeof updater === "function" ? updater(s.dishes) : updater,
      }));
    },
    [],
  );

  return {
    restaurant: state.restaurant,
    categories: state.categories,
    dishes: state.dishes,
    loading: state.loading,
    reload: load,
    setDishes,
  };
}
