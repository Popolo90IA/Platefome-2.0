"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  Eye,
  Scan,
  Cuboid,
  PlayCircle,
  TrendingUp,
  Trophy,
  Calendar,
} from "lucide-react";
import type {
  Restaurant,
  Dish,
  MenuEvent,
  MenuEventType,
} from "@/types/database.types";

interface DayBucket {
  label: string;
  views: number;
  scans: number;
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [events, setEvents] = useState<MenuEvent[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [range, setRange] = useState<7 | 30 | 90>(30);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      const { data: r } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!r) {
        setLoading(false);
        return;
      }
      setRestaurant(r);

      const since = new Date();
      since.setDate(since.getDate() - range);

      const [{ data: ev }, { data: dsh }] = await Promise.all([
        supabase
          .from("menu_events")
          .select("*")
          .eq("restaurant_id", r.id)
          .gte("created_at", since.toISOString())
          .order("created_at", { ascending: false })
          .limit(5000),
        supabase.from("dishes").select("*").eq("restaurant_id", r.id),
      ]);

      setEvents(ev ?? []);
      setDishes(dsh ?? []);
      setLoading(false);
    };
    load();
  }, [supabase, range]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <Card className="max-w-md mx-auto shadow-premium">
        <CardContent className="pt-8 pb-8 text-center">
          <BarChart3 className="h-12 w-12 mx-auto text-[hsl(var(--gold))] mb-4" />
          <p className="mb-5 text-muted-foreground">צור תחילה פרופיל מסעדה</p>
          <Link
            href="/dashboard/settings"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gold-gradient text-white font-medium hover:opacity-90"
          >
            צור פרופיל
          </Link>
        </CardContent>
      </Card>
    );
  }

  const countBy = (type: MenuEventType) =>
    events.filter((e) => e.event_type === type).length;

  const totalViews = countBy("menu_view");
  const totalScans = countBy("qr_scan");
  const total3d = countBy("dish_view");
  const totalAr = countBy("ar_view");
  const totalVideo = countBy("video_play");

  // Buckets par jour
  const buckets: DayBucket[] = [];
  for (let i = range - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const start = d.getTime();
    const end = start + 24 * 60 * 60 * 1000;
    const views = events.filter((e) => {
      const t = new Date(e.created_at).getTime();
      return e.event_type === "menu_view" && t >= start && t < end;
    }).length;
    const scans = events.filter((e) => {
      const t = new Date(e.created_at).getTime();
      return e.event_type === "qr_scan" && t >= start && t < end;
    }).length;
    buckets.push({
      label: `${d.getDate()}/${d.getMonth() + 1}`,
      views,
      scans,
    });
  }
  const maxDay = Math.max(1, ...buckets.map((b) => b.views + b.scans));

  // Top plats vus
  const dishViewCounts = new Map<string, number>();
  events
    .filter((e) => e.event_type === "dish_view" && e.dish_id)
    .forEach((e) => {
      dishViewCounts.set(
        e.dish_id!,
        (dishViewCounts.get(e.dish_id!) ?? 0) + 1
      );
    });
  const topDishes = Array.from(dishViewCounts.entries())
    .map(([id, count]) => ({
      dish: dishes.find((d) => d.id === id),
      count,
    }))
    .filter((x) => x.dish)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-4xl font-bold">סטטיסטיקות</h1>
          <p className="text-muted-foreground mt-2">
            ניתוח התנהגות הלקוחות שלך
          </p>
        </div>
        <div className="inline-flex rounded-full bg-card border border-border p-1">
          {[
            { val: 7, label: "7 ימים" },
            { val: 30, label: "30 ימים" },
            { val: 90, label: "90 ימים" },
          ].map((r) => (
            <button
              key={r.val}
              onClick={() => setRange(r.val as 7 | 30 | 90)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                range === r.val
                  ? "bg-gold-gradient text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          icon={<Eye className="h-5 w-5" />}
          label="צפיות תפריט"
          value={totalViews}
          color="gold"
        />
        <StatCard
          icon={<Scan className="h-5 w-5" />}
          label="סריקות QR"
          value={totalScans}
          color="emerald"
        />
        <StatCard
          icon={<Cuboid className="h-5 w-5" />}
          label="צפיות תלת־מימד"
          value={total3d}
          color="rose"
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="צפיות AR"
          value={totalAr}
          color="gold"
        />
        <StatCard
          icon={<PlayCircle className="h-5 w-5" />}
          label="הפעלות וידאו"
          value={totalVideo}
          color="emerald"
        />
      </div>

      {/* Chart */}
      <Card className="shadow-premium">
        <CardHeader>
          <CardTitle className="font-serif-display text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[hsl(var(--gold))]" />
            צפיות וסריקות לפי יום
          </CardTitle>
        </CardHeader>
        <CardContent>
          {buckets.every((b) => b.views + b.scans === 0) ? (
            <div className="py-10 text-center text-muted-foreground text-sm">
              אין עדיין נתונים. שתף את קוד ה־QR ללקוחות כדי להתחיל
            </div>
          ) : (
            <div className="flex items-end gap-1 h-48 overflow-x-auto scrollbar-thin pb-2">
              {buckets.map((b, idx) => {
                const totalH = ((b.views + b.scans) / maxDay) * 100;
                const scansH = b.views + b.scans === 0 ? 0 : (b.scans / (b.views + b.scans)) * 100;
                return (
                  <div
                    key={idx}
                    className="flex-1 min-w-[18px] flex flex-col items-center gap-1 group"
                  >
                    <div className="relative w-full flex-1 flex items-end">
                      <div
                        className="w-full rounded-t bg-gold-gradient group-hover:opacity-90 transition-all"
                        style={{ height: `${totalH}%`, minHeight: totalH > 0 ? "4px" : "0" }}
                      >
                        <div
                          className="w-full rounded-t bg-[hsl(var(--gold-dark))]"
                          style={{ height: `${scansH}%` }}
                        />
                      </div>
                      {b.views + b.scans > 0 && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {b.views + b.scans}
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] text-muted-foreground" dir="ltr">
                      {b.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded bg-gold-gradient" />
              צפיות
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded bg-[hsl(var(--gold-dark))]" />
              סריקות QR
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top plats */}
      <Card className="shadow-premium">
        <CardHeader>
          <CardTitle className="font-serif-display text-xl flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[hsl(var(--gold))]" />
            המנות הפופולריות ביותר
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topDishes.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-6">
              אין עדיין צפיות פרטניות במנות. צפיות במודל תלת־מימדי או AR ייספרו כאן
            </p>
          ) : (
            <div className="space-y-3">
              {topDishes.map((d, idx) => {
                const maxCount = topDishes[0]?.count ?? 1;
                const pct = (d.count / maxCount) * 100;
                return (
                  <div key={d.dish!.id} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold-dark))] text-xs font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    {d.dish!.image_url && (
                      <img
                        src={d.dish!.image_url}
                        alt={d.dish!.name}
                        className="h-10 w-10 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-sm truncate">
                          {d.dish!.name}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {d.count} צפיות
                        </span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-gold-gradient"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: "gold" | "emerald" | "rose";
}) {
  const styles = {
    gold: "from-[hsl(var(--gold))]/20 to-[hsl(var(--gold))]/5 text-[hsl(var(--gold-dark))]",
    emerald: "from-emerald-500/20 to-emerald-500/5 text-emerald-700",
    rose: "from-rose-500/20 to-rose-500/5 text-rose-700",
  };
  return (
    <Card className="relative overflow-hidden shadow-sm hover:shadow-premium transition-all">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${styles[color]} opacity-60 pointer-events-none`}
      />
      <CardContent className="relative p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={styles[color].split(" ").pop()}>{icon}</span>
        </div>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
      </CardContent>
    </Card>
  );
}
