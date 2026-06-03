"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { DayPoint, Totals, TopRestaurant } from "./types";

const EVENT_TYPES = [
  "menu_view",
  "qr_scan",
  "dish_view",
  "ar_view",
  "video_play",
] as const;

/**
 * useAdminAnalytics — loads platform-wide menu_events stats for a date range:
 * per-type totals, daily views/scans series, and top-10 restaurants by views.
 */
export function useAdminAnalytics(range: number) {
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState<Totals>({
    menu_view: 0,
    qr_scan: 0,
    dish_view: 0,
    ar_view: 0,
    video_play: 0,
  });
  const [byDay, setByDay] = useState<DayPoint[]>([]);
  const [topRestaurants, setTopRestaurants] = useState<TopRestaurant[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const since = new Date();
      since.setDate(since.getDate() - range);
      const sinceIso = since.toISOString();

      // Counts par event_type
      const typeCounts = await Promise.all(
        EVENT_TYPES.map(async (type) => {
          const { count } = await supabase
            .from("menu_events")
            .select("*", { count: "exact", head: true })
            .eq("event_type", type)
            .gte("created_at", sinceIso);
          return [type, count ?? 0] as const;
        }),
      );
      setTotals(Object.fromEntries(typeCounts) as Totals);

      // Série par jour (views + scans)
      const { data: events } = await supabase
        .from("menu_events")
        .select("event_type, created_at")
        .in("event_type", ["menu_view", "qr_scan"])
        .gte("created_at", sinceIso)
        .limit(10000);

      const dayMap = new Map<string, { views: number; scans: number }>();
      for (let i = 0; i < range; i++) {
        const d = new Date();
        d.setDate(d.getDate() - (range - 1 - i));
        const key = d.toISOString().slice(0, 10);
        dayMap.set(key, { views: 0, scans: 0 });
      }
      (events ?? []).forEach((e) => {
        const key = (e.created_at as string).slice(0, 10);
        const current = dayMap.get(key);
        if (!current) return;
        if (e.event_type === "menu_view") current.views++;
        else if (e.event_type === "qr_scan") current.scans++;
      });
      setByDay(Array.from(dayMap.entries()).map(([date, v]) => ({ date, ...v })));

      // Top restaurants (par menu_view)
      const { data: viewEvents } = await supabase
        .from("menu_events")
        .select("restaurant_id")
        .eq("event_type", "menu_view")
        .gte("created_at", sinceIso)
        .limit(50000);
      const restaurantCounts = new Map<string, number>();
      (viewEvents ?? []).forEach((e) => {
        if (!e.restaurant_id) return;
        restaurantCounts.set(
          e.restaurant_id,
          (restaurantCounts.get(e.restaurant_id) ?? 0) + 1,
        );
      });
      const topIds = Array.from(restaurantCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      if (topIds.length > 0) {
        const { data: restos } = await supabase
          .from("restaurants")
          .select("id, name, slug")
          .in(
            "id",
            topIds.map(([id]) => id),
          );
        const byId = new Map(restos?.map((r) => [r.id, r]) ?? []);
        setTopRestaurants(
          topIds.map(([id, views]) => {
            const r = byId.get(id);
            return {
              restaurant_id: id,
              name: r?.name ?? "(נמחק)",
              slug: r?.slug ?? "",
              views,
            };
          }),
        );
      } else {
        setTopRestaurants([]);
      }

      setLoading(false);
    };
    load();
  }, [range, supabase]);

  const maxDay = Math.max(1, ...byDay.map((d) => d.views + d.scans));
  const maxTop = Math.max(1, ...topRestaurants.map((r) => r.views));

  return { loading, totals, byDay, topRestaurants, maxDay, maxTop };
}
