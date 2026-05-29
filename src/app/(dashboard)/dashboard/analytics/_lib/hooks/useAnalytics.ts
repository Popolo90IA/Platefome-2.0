"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  buildChartPaths,
  buildCsvFilename,
  buildDayBuckets,
  buildDonutEls,
  buildDonutSegments,
  buildEventsCsv,
  buildHeatmap,
  buildLangRows,
  buildTopDishes,
  computeDelta,
  computeTotals,
  heatmapMax,
} from "../helpers";
import { DAY_MS, EVENTS_QUERY_LIMIT } from "../constants";
import type {
  AnalyticsTotals,
  ChartPaths,
  DayBucket,
  Dish,
  DonutSegment,
  DonutSegmentEl,
  LangRow,
  MenuEvent,
  RangeDays,
  Restaurant,
  TopDishRow,
} from "../types";

export interface UseAnalyticsResult {
  loading: boolean;
  restaurant: Restaurant | null;
  range: RangeDays;
  setRange: (r: RangeDays) => void;
  totals: AnalyticsTotals;
  buckets: DayBucket[];
  chart: ChartPaths;
  heatmap: number[][];
  heatMax: number;
  segments: DonutSegment[];
  segmentEls: DonutSegmentEl[];
  topDishes: TopDishRow[];
  langRows: LangRow[];
  deltaPct: number | null;
  dishesMissing3d: number;
  eventsCount: number;
  exportCsv: () => void;
}

/**
 * useAnalytics — charge resto + événements + plats Supabase et expose
 * les valeurs dérivées (totaux, buckets, chart paths, heatmap, donut,
 * top plats, langues, delta) + handler exportCsv.
 */
export function useAnalytics(): UseAnalyticsResult {
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [events, setEvents] = useState<MenuEvent[]>([]);
  const [prevEvents, setPrevEvents] = useState<MenuEvent[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [range, setRange] = useState<RangeDays>(14);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        if (!cancelled) setLoading(false);
        return;
      }

      const { data: r } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (!r) {
        if (!cancelled) setLoading(false);
        return;
      }
      if (cancelled) return;
      setRestaurant(r);

      const now = Date.now();
      const since = new Date(now - range * DAY_MS).toISOString();
      const prevSince = new Date(now - range * 2 * DAY_MS).toISOString();
      const prevUntil = since;

      const [{ data: ev }, { data: prev }, { data: dsh }] = await Promise.all([
        supabase
          .from("menu_events")
          .select("*")
          .eq("restaurant_id", r.id)
          .gte("created_at", since)
          .order("created_at", { ascending: false })
          .limit(EVENTS_QUERY_LIMIT),
        supabase
          .from("menu_events")
          .select("event_type")
          .eq("restaurant_id", r.id)
          .gte("created_at", prevSince)
          .lt("created_at", prevUntil)
          .limit(EVENTS_QUERY_LIMIT),
        supabase.from("dishes").select("*").eq("restaurant_id", r.id),
      ]);

      if (cancelled) return;
      setEvents(ev ?? []);
      setPrevEvents((prev ?? []) as MenuEvent[]);
      setDishes(dsh ?? []);
      setLoading(false);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [supabase, range]);

  const totals = useMemo(() => computeTotals(events), [events]);
  const buckets = useMemo(
    () => buildDayBuckets(events, range),
    [events, range],
  );
  const chart = useMemo(() => buildChartPaths(buckets), [buckets]);
  const heatmap = useMemo(() => buildHeatmap(events), [events]);
  const heatMax = useMemo(() => heatmapMax(heatmap), [heatmap]);
  const segments = useMemo(() => buildDonutSegments(totals), [totals]);
  const segmentEls = useMemo(() => buildDonutEls(segments), [segments]);
  const topDishes = useMemo(
    () => buildTopDishes(events, dishes),
    [events, dishes],
  );
  const langRows = useMemo(() => buildLangRows(events), [events]);
  const deltaPct = useMemo(
    () => computeDelta(totals.scans + totals.views, prevEvents),
    [totals, prevEvents],
  );
  const dishesMissing3d = useMemo(
    () => dishes.filter((d) => !d.model_3d_url).length,
    [dishes],
  );

  const exportCsv = useCallback(() => {
    const csv = buildEventsCsv(events);
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = buildCsvFilename(range);
    a.click();
    URL.revokeObjectURL(url);
  }, [events, range]);

  return {
    loading,
    restaurant,
    range,
    setRange,
    totals,
    buckets,
    chart,
    heatmap,
    heatMax,
    segments,
    segmentEls,
    topDishes,
    langRows,
    deltaPct,
    dishesMissing3d,
    eventsCount: events.length,
    exportCsv,
  };
}
