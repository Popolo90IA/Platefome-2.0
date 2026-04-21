"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Eye,
  Scan,
  Cuboid,
  PlayCircle,
  Utensils,
  TrendingUp,
  Building2,
  ArrowLeft,
} from "lucide-react";

type TopRestaurant = {
  restaurant_id: string;
  name: string;
  slug: string;
  views: number;
};

type DayPoint = { date: string; views: number; scans: number };

const RANGE_OPTIONS = [
  { value: 7, label: "7 ימים" },
  { value: 30, label: "30 ימים" },
  { value: 90, label: "90 ימים" },
];

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState(30);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({
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
        (["menu_view", "qr_scan", "dish_view", "ar_view", "video_play"] as const).map(
          async (type) => {
            const { count } = await supabase
              .from("menu_events")
              .select("*", { count: "exact", head: true })
              .eq("event_type", type)
              .gte("created_at", sinceIso);
            return [type, count ?? 0] as const;
          }
        )
      );
      const t = Object.fromEntries(typeCounts) as typeof totals;
      setTotals(t);

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
      setByDay(
        Array.from(dayMap.entries()).map(([date, v]) => ({ date, ...v }))
      );

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
          (restaurantCounts.get(e.restaurant_id) ?? 0) + 1
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
            topIds.map(([id]) => id)
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
          })
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

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-4xl font-bold">
            <span className="text-gold-gradient">סטטיסטיקות גלובליות</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            נתוני הפעילות בכל הפלטפורמה
          </p>
        </div>
        <div className="flex gap-1 p-1 bg-secondary/60 rounded-lg">
          {RANGE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setRange(opt.value)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                range === opt.value
                  ? "bg-gold-gradient text-white shadow-gold-glow"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="h-8 w-8 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
        </div>
      ) : (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            <BigStat
              icon={<Eye className="h-4 w-4" />}
              label="צפיות בתפריט"
              value={totals.menu_view}
              color="from-blue-500/20 to-transparent"
            />
            <BigStat
              icon={<Scan className="h-4 w-4" />}
              label="סריקות QR"
              value={totals.qr_scan}
              color="from-purple-500/20 to-transparent"
            />
            <BigStat
              icon={<Utensils className="h-4 w-4" />}
              label="צפיות במנות"
              value={totals.dish_view}
              color="from-amber-500/20 to-transparent"
            />
            <BigStat
              icon={<Cuboid className="h-4 w-4" />}
              label="צפיות 3D/AR"
              value={totals.ar_view}
              color="from-emerald-500/20 to-transparent"
            />
            <BigStat
              icon={<PlayCircle className="h-4 w-4" />}
              label="ניגונים וידאו"
              value={totals.video_play}
              color="from-rose-500/20 to-transparent"
            />
          </div>

          {/* Bar chart */}
          <Card className="shadow-premium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif-display text-xl font-bold">
                  פעילות יומית
                </h2>
                <div className="flex gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-sm bg-gold-gradient" />
                    <span className="text-muted-foreground">צפיות</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-sm bg-[hsl(var(--gold-dark))]/60" />
                    <span className="text-muted-foreground">סריקות</span>
                  </div>
                </div>
              </div>

              <div className="flex items-end gap-0.5 h-40 w-full">
                {byDay.map((d, i) => {
                  const total = d.views + d.scans;
                  const pct = (total / maxDay) * 100;
                  const viewH = total > 0 ? (d.views / total) * pct : 0;
                  const scanH = total > 0 ? (d.scans / total) * pct : 0;
                  return (
                    <div
                      key={i}
                      className="flex-1 flex flex-col justify-end group relative"
                      title={`${d.date}: ${d.views} צפיות · ${d.scans} סריקות`}
                    >
                      <div
                        className="w-full bg-[hsl(var(--gold-dark))]/60 transition-all"
                        style={{ height: `${scanH}%` }}
                      />
                      <div
                        className="w-full bg-gold-gradient transition-all"
                        style={{ height: `${viewH}%` }}
                      />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-charcoal-gradient text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                        {total}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                <span>{byDay[0]?.date.slice(5)}</span>
                <span>{byDay[byDay.length - 1]?.date.slice(5)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Top restaurants */}
          <Card className="shadow-premium">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-[hsl(var(--gold-dark))]" />
                <h2 className="font-serif-display text-xl font-bold">
                  מובילי הצפיות
                </h2>
              </div>
              {topRestaurants.length === 0 ? (
                <p className="text-muted-foreground text-sm">אין נתונים עדיין</p>
              ) : (
                <div className="space-y-2">
                  {topRestaurants.map((r, i) => (
                    <Link
                      key={r.restaurant_id}
                      href={`/admin/restaurants/${r.restaurant_id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/60 transition-colors group"
                    >
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          i === 0
                            ? "bg-gold-gradient text-white shadow-gold-glow"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="font-medium truncate">{r.name}</span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full bg-gold-gradient"
                            style={{ width: `${(r.views / maxTop) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-left flex-shrink-0">
                        <div className="font-serif-display text-xl font-bold">
                          {r.views}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          צפיות
                        </div>
                      </div>
                      <ArrowLeft className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground transition-colors" />
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function BigStat({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <Card className="relative overflow-hidden shadow-premium">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} pointer-events-none`}
      />
      <CardContent className="relative p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium text-muted-foreground">
            {label}
          </span>
          <div className="h-7 w-7 rounded-md bg-gold-gradient flex items-center justify-center text-white shadow-gold-glow">
            {icon}
          </div>
        </div>
        <div className="font-serif-display text-2xl font-bold">
          {value.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
