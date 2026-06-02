"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { computeDelta } from "../helpers";
import type { Deltas, Restaurant, Stats } from "../types";

const INITIAL_STATS: Stats = { dishes: 0, categories: 0, views: 0, scans: 0 };
const INITIAL_DELTAS: Deltas = {
  dishesThisWeek: 0,
  viewsDelta: null,
  scansDelta: null,
};

export function useDashboardOverview() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [stats, setStats] = useState<Stats>(INITIAL_STATS);
  const [deltas, setDeltas] = useState<Deltas>(INITIAL_DELTAS);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: restaurantData } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      setRestaurant(restaurantData);

      if (restaurantData) {
        const now = new Date();
        const since30 = new Date(now);
        since30.setDate(now.getDate() - 30);
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - 7);
        const prevWeekStart = new Date(now);
        prevWeekStart.setDate(now.getDate() - 14);

        const [
          { count: d },
          { count: c },
          { count: v },
          { count: s },
          { count: vPrev },
          { count: sPrev },
          { count: dishesThisWeek },
        ] = await Promise.all([
          supabase
            .from("dishes")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", restaurantData.id),
          supabase
            .from("categories")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", restaurantData.id),
          supabase
            .from("menu_events")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", restaurantData.id)
            .eq("event_type", "menu_view")
            .gte("created_at", weekStart.toISOString()),
          supabase
            .from("menu_events")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", restaurantData.id)
            .eq("event_type", "qr_scan")
            .gte("created_at", weekStart.toISOString()),
          supabase
            .from("menu_events")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", restaurantData.id)
            .eq("event_type", "menu_view")
            .gte("created_at", prevWeekStart.toISOString())
            .lt("created_at", weekStart.toISOString()),
          supabase
            .from("menu_events")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", restaurantData.id)
            .eq("event_type", "qr_scan")
            .gte("created_at", prevWeekStart.toISOString())
            .lt("created_at", weekStart.toISOString()),
          supabase
            .from("dishes")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", restaurantData.id)
            .gte("created_at", weekStart.toISOString()),
        ]);

        const { count: v30 } = await supabase
          .from("menu_events")
          .select("*", { count: "exact", head: true })
          .eq("restaurant_id", restaurantData.id)
          .eq("event_type", "menu_view")
          .gte("created_at", since30.toISOString());
        const { count: s30 } = await supabase
          .from("menu_events")
          .select("*", { count: "exact", head: true })
          .eq("restaurant_id", restaurantData.id)
          .eq("event_type", "qr_scan")
          .gte("created_at", since30.toISOString());

        setStats({
          dishes: d ?? 0,
          categories: c ?? 0,
          views: v30 ?? 0,
          scans: s30 ?? 0,
        });

        setDeltas({
          dishesThisWeek: dishesThisWeek ?? 0,
          viewsDelta: computeDelta(v ?? 0, vPrev ?? 0),
          scansDelta: computeDelta(s ?? 0, sPrev ?? 0),
        });
      }
      setLoading(false);
    };
    loadData();
  }, [supabase]);

  return { restaurant, stats, deltas, loading };
}
