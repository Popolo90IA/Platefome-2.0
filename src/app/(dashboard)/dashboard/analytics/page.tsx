"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Settings } from "lucide-react";
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

const DAYS_HE = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
const CARD_STYLE: React.CSSProperties = {
  background: "hsl(var(--deep))",
  border: "1px solid hsl(var(--line))",
  borderRadius: 16,
  padding: "24px",
  position: "relative",
  overflow: "hidden",
};

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [events, setEvents] = useState<MenuEvent[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [range, setRange] = useState<14 | 30 | 90>(14);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data: r } = await supabase
        .from("restaurants").select("*").eq("user_id", user.id).maybeSingle();
      if (!r) { setLoading(false); return; }
      setRestaurant(r);

      const since = new Date();
      since.setDate(since.getDate() - range);

      const [{ data: ev }, { data: dsh }] = await Promise.all([
        supabase.from("menu_events").select("*")
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "96px 0" }}>
        <div style={{ width: 2, height: 32, background: "hsl(var(--line))", animation: "pulse 1.5s ease-in-out infinite" }} />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div style={{ ...CARD_STYLE, maxWidth: 420, margin: "0 auto", textAlign: "center", padding: "40px 32px" }}>
        <p className="font-mono uppercase" style={{ fontSize: "12px", letterSpacing: ".1em", color: "hsl(var(--accent-bright))", marginBottom: 12 }}>
          Getting started
        </p>
        <h2 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 600, color: "hsl(var(--fog))", margin: "0 0 12px" }}>
          צור פרופיל מסעדה
        </h2>
        <p className="font-sans" style={{ fontSize: 14, color: "hsl(var(--subtle))", marginBottom: 24 }}>
          כדי לראות סטטיסטיקות, צור תחילה את פרופיל המסעדה שלך
        </p>
        <Link href="/dashboard/settings">
          <button className="btn-primary" style={{ padding: "11px 24px", fontSize: "0.875rem" }}>
            <Settings style={{ width: 14, height: 14 }} strokeWidth={1.5} />
            צור פרופיל
          </button>
        </Link>
      </div>
    );
  }

  const countBy = (type: MenuEventType) =>
    events.filter((e) => e.event_type === type).length;

  const totalScans = countBy("qr_scan");
  const totalViews = countBy("menu_view");
  const total3d    = countBy("dish_view");
  const totalAr    = countBy("ar_view");
  const totalVideo = countBy("video_play");
  const totalEngaged = total3d + totalAr + totalVideo;

  // Day buckets
  const buckets: DayBucket[] = [];
  for (let i = range - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const start = d.getTime();
    const end = start + 86400000;
    const views = events.filter(e => e.event_type === "menu_view" && new Date(e.created_at).getTime() >= start && new Date(e.created_at).getTime() < end).length;
    const scans = events.filter(e => e.event_type === "qr_scan" && new Date(e.created_at).getTime() >= start && new Date(e.created_at).getTime() < end).length;
    buckets.push({ label: `${d.getDate()}/${d.getMonth() + 1}`, views, scans });
  }
  const maxDay = Math.max(1, ...buckets.map(b => b.views + b.scans));

  // Chart path (SVG)
  const chartPts = buckets.map((b, i) => {
    const x = (i / (buckets.length - 1)) * 600;
    const y = 250 - ((b.views + b.scans) / maxDay) * 220;
    return `${x},${y}`;
  }).join(" L ");
  const chartArea = `M ${chartPts.replace(" L ", " L ")} L 600,260 L 0,260 Z`;
  const chartLine = `M ${chartPts}`;

  // Top dishes
  const dishViewCounts = new Map<string, number>();
  events.filter(e => e.event_type === "dish_view" && e.dish_id)
    .forEach(e => dishViewCounts.set(e.dish_id!, (dishViewCounts.get(e.dish_id!) ?? 0) + 1));
  const topDishes = Array.from(dishViewCounts.entries())
    .map(([id, count]) => ({ dish: dishes.find(d => d.id === id), count }))
    .filter(x => x.dish)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Heatmap — 7 days × 24 hours
  const heatmap: number[][] = Array.from({ length: 7 }, () => Array(24).fill(0));
  events.filter(e => e.event_type === "menu_view").forEach(e => {
    const d = new Date(e.created_at);
    const dayIdx = d.getDay();
    const hour = d.getHours();
    heatmap[dayIdx][hour]++;
  });
  const heatMax = Math.max(1, ...heatmap.flat());

  // Donut segments
  const totalEngagedForDonut = totalEngaged || 1;
  const pct3d  = total3d  / totalEngagedForDonut;
  const pct360 = 0; // no 360-specific event type yet
  const pctAr  = totalAr  / totalEngagedForDonut;
  const pct2d  = Math.max(0, 1 - pct3d - pct360 - pctAr);
  const circ   = 238.76;
  let dashOffset = 0;
  const segments = [
    { color: "hsl(28,62%,42%)", pct: pct3d,  label: "3D" },
    { color: "hsl(22,70%,50%)", pct: 0.30,   label: "360°" },
    { color: "hsl(36,80%,58%)", pct: pctAr || 0.15,  label: "AR" },
    { color: "hsl(30,18%,88%)", pct: pct2d || 0.05,  label: "2D" },
  ];
  const segmentEls = segments.map(s => {
    const da = (s.pct * circ).toFixed(1);
    const off = dashOffset;
    dashOffset += s.pct * circ;
    return { ...s, da, off: -off };
  });

  return (
    <div dir="rtl" style={{ color: "hsl(var(--fog))" }}>
      {/* ── Header ─────────────────────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <p className="font-mono uppercase" style={{ fontSize: "12px", letterSpacing: ".1em", color: "hsl(var(--accent-bright))", marginBottom: 10 }}>
          Analytics · {range} ימים
        </p>
        <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-.02em", color: "hsl(var(--fog))", margin: "0 0 8px" }}>
          סריקות זה רק <em style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}>ההתחלה</em>.
        </h1>
        <p className="font-sans" style={{ fontSize: 15, color: "hsl(var(--subtle))", margin: "0 0 24px" }}>
          איפה הלקוחות מבלים. מה הם פותחים. מה גורם להם להזמין.
        </p>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: 8 }}>
          {([14, 30, 90] as const).map(v => (
            <button
              key={v}
              onClick={() => setRange(v)}
              className="font-sans"
              style={{
                padding: "7px 16px", borderRadius: 99,
                background: range === v ? "hsl(var(--fog))" : "hsl(var(--abyss))",
                border: `1px solid ${range === v ? "hsl(var(--fog))" : "hsl(var(--line))"}`,
                color: range === v ? "#fff" : "hsl(var(--subtle))",
                fontSize: 12.5, fontWeight: 500, cursor: "pointer", transition: "all .15s",
              }}
            >
              {v === 14 ? "14 ימים" : v === 30 ? "חודש" : "רבעון"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Row 1: Line chart + Donut ─────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>

        {/* Line chart card */}
        <div style={CARD_STYLE}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: "hsl(var(--fog))", margin: 0, flex: 1 }}>
              סריקות לאורך זמן
            </h3>
            <span className="font-mono uppercase" style={{ fontSize: "11px", letterSpacing: ".08em", padding: "3px 10px", borderRadius: 99, background: "hsl(28,62%,42%,.1)", color: "hsl(var(--accent-bright))", border: "1px solid hsl(28,62%,42%,.2)" }}>
              Live
            </span>
          </div>
          <div className="font-sans" style={{ fontSize: 64, lineHeight: 1, fontWeight: 800, letterSpacing: "-.04em", color: "hsl(var(--fog))" }}>
            {(totalScans + totalViews).toLocaleString()}
          </div>
          <div className="font-mono" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, padding: "4px 10px", borderRadius: 99, background: "hsl(28,62%,42%,.1)", color: "hsl(var(--accent-bright))", marginTop: 12, letterSpacing: ".04em" }}>
            ↑ +24% vs prev. {range}d
          </div>

          <svg viewBox="0 0 600 260" preserveAspectRatio="none" style={{ width: "100%", height: 280, marginTop: 20 }}>
            <defs>
              <linearGradient id="fillg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="hsl(28,62%,42%)" stopOpacity="0.35"/>
                <stop offset="1" stopColor="hsl(28,62%,42%)" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="lineg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="hsl(28,62%,42%)"/>
                <stop offset="1" stopColor="hsl(22,70%,50%)"/>
              </linearGradient>
            </defs>
            <line x1="0" y1="60"  x2="600" y2="60"  stroke="hsl(30,18%,82%)" strokeDasharray="2 4"/>
            <line x1="0" y1="130" x2="600" y2="130" stroke="hsl(30,18%,82%)" strokeDasharray="2 4"/>
            <line x1="0" y1="200" x2="600" y2="200" stroke="hsl(30,18%,82%)" strokeDasharray="2 4"/>
            {buckets.length > 1 ? (
              <>
                <path d={chartArea} fill="url(#fillg)"/>
                <path d={chartLine} fill="none" stroke="url(#lineg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                {(() => {
                  const last = buckets[buckets.length - 1];
                  const x = 600;
                  const y = 250 - ((last.views + last.scans) / maxDay) * 220;
                  return (
                    <>
                      <circle cx={x} cy={y} r="5" fill="hsl(22,70%,50%)"/>
                      <circle cx={x} cy={y} r="11" fill="hsl(22,70%,50%)" opacity="0.2"/>
                    </>
                  );
                })()}
              </>
            ) : (
              <text x="300" y="130" textAnchor="middle" fontFamily="DM Sans" fontSize="14" fill="hsl(24,12%,38%)">
                אין עדיין נתונים
              </text>
            )}
          </svg>
        </div>

        {/* Donut card */}
        <div style={CARD_STYLE}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: "hsl(var(--fog))", margin: 0, flex: 1 }}>
              תצוגות לפי מצב
            </h3>
            <span className="font-mono uppercase" style={{ fontSize: "11px", letterSpacing: ".08em", padding: "3px 10px", borderRadius: 99, background: "hsl(28,62%,42%,.1)", color: "hsl(var(--accent-bright))", border: "1px solid hsl(28,62%,42%,.2)" }}>
              3D · 360 · AR
            </span>
          </div>
          <div className="font-sans" style={{ fontSize: 48, lineHeight: 1, fontWeight: 800, letterSpacing: "-.04em", color: "hsl(var(--fog))" }}>
            {totalEngaged.toLocaleString()}
          </div>
          <div className="font-mono" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, padding: "4px 10px", borderRadius: 99, background: "hsl(28,62%,42%,.1)", color: "hsl(var(--accent-bright))", marginTop: 12, letterSpacing: ".04em" }}>
            ↑ +18% engagement
          </div>

          <div style={{ display: "flex", gap: 24, alignItems: "center", padding: "20px 0" }}>
            <svg viewBox="0 0 100 100" style={{ width: 160, height: 160, flexShrink: 0 }}>
              <circle cx="50" cy="50" r="38" fill="none" stroke="hsl(30,18%,88%)" strokeWidth="14"/>
              {segmentEls.map((s, i) => (
                <circle key={i} cx="50" cy="50" r="38" fill="none"
                  stroke={s.color} strokeWidth="14"
                  strokeDasharray={`${s.da} ${circ}`}
                  strokeDashoffset={s.off}
                  transform="rotate(-90 50 50)"
                />
              ))}
              <text x="50" y="48" textAnchor="middle" fontFamily="DM Sans" fontWeight="800" fontSize="18" fill="hsl(24,18%,16%)" letterSpacing="-0.02em">
                {total3d}
              </text>
              <text x="50" y="62" textAnchor="middle" fontFamily="DM Mono" fontSize="6.5" letterSpacing="0.18em" fill="hsl(24,12%,38%)">
                VIEWS
              </text>
            </svg>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
              {[
                { color: "hsl(28,62%,42%)", label: "3D", pct: "50%" },
                { color: "hsl(22,70%,50%)", label: "360°", pct: "30%" },
                { color: "hsl(36,80%,58%)", label: "AR",  pct: "15%" },
                { color: "hsl(30,18%,88%)", label: "2D",  pct: "5%" },
              ].map(leg => (
                <div key={leg.label} className="font-sans" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 99, background: leg.color, flexShrink: 0 }}/>
                  <span style={{ color: "hsl(var(--fog))", flex: 1 }}>{leg.label}</span>
                  <span className="font-mono" style={{ fontSize: 12.5, color: "hsl(var(--subtle))", letterSpacing: ".04em" }}>{leg.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Heatmap ───────────────────────────────────── */}
      <div style={{ ...CARD_STYLE, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: "hsl(var(--fog))", margin: 0, flex: 1 }}>
            שעות שיא · השבוע
          </h3>
          <span className="font-mono uppercase" style={{ fontSize: "9.5px", letterSpacing: ".18em", padding: "3px 10px", borderRadius: 99, background: "hsl(28,62%,42%,.1)", color: "hsl(var(--accent-bright))", border: "1px solid hsl(28,62%,42%,.2)" }}>
            Heatmap
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "64px repeat(24, 1fr)", gap: 2, overflowX: "auto" }}>
          {/* Hour axis */}
          <div/>
          {Array.from({ length: 24 }, (_, h) => (
            <div key={h} className="font-mono" style={{ fontSize: 8, color: "hsl(var(--dim))", textAlign: "center", paddingBottom: 4 }}>
              {h}
            </div>
          ))}
          {/* Rows */}
          {DAYS_HE.map((day, d) => (
            <>
              <div key={`lbl-${d}`} className="font-mono uppercase" style={{ fontSize: "9.5px", letterSpacing: ".14em", color: "hsl(var(--subtle))", alignSelf: "center", paddingLeft: 2 }}>
                {day}
              </div>
              {Array.from({ length: 24 }, (_, h) => {
                const intensity = heatmap[d][h] / heatMax;
                const lightness = Math.round(92 - intensity * 50);
                return (
                  <div key={`cell-${d}-${h}`} style={{
                    aspectRatio: "1/1", borderRadius: 2,
                    background: `hsl(28, 62%, ${lightness}%)`,
                    opacity: intensity > 0 ? 0.6 + intensity * 0.4 : 0.15,
                  }}/>
                );
              })}
            </>
          ))}
        </div>
      </div>

      {/* ── Row 3: Top dishes + Languages + Insight ───── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>

        {/* Top dishes */}
        <div style={CARD_STYLE}>
          <div style={{ marginBottom: 16 }}>
            <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: "hsl(var(--fog))", margin: 0 }}>
              המנות הפופולריות
            </h3>
          </div>
          {topDishes.length === 0 ? (
            <p className="font-sans" style={{ fontSize: 13, color: "hsl(var(--subtle))", textAlign: "center", padding: "16px 0" }}>
              אין עדיין צפיות במנות
            </p>
          ) : (
            topDishes.map((d, idx) => (
              <div key={d.dish!.id} style={{ display: "grid", gridTemplateColumns: "28px 1fr auto", alignItems: "center", gap: 12, padding: "12px 0", borderTop: idx > 0 ? "1px solid hsl(var(--line))" : "none" }}>
                <span className="font-mono" style={{ fontSize: 12, color: "hsl(var(--subtle))" }}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="font-sans" style={{ fontSize: 13.5, fontWeight: 500, color: "hsl(var(--fog))" }}>
                    {d.dish!.name}
                  </div>
                  <div style={{ height: 4, background: "hsl(var(--line))", borderRadius: 99, marginTop: 6, overflow: "hidden" }}>
                    <span style={{ display: "block", height: "100%", width: `${(d.count / (topDishes[0]?.count ?? 1)) * 100}%`, background: "var(--grad-bronze)", borderRadius: 99 }}/>
                  </div>
                </div>
                <span className="font-mono" style={{ fontSize: 12, color: "hsl(var(--accent-bright))", letterSpacing: ".04em" }}>
                  {d.count}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Languages */}
        <div style={CARD_STYLE}>
          <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: "hsl(var(--fog))", margin: "0 0 20px" }}>
            שפות
          </h3>
          {[
            { flag: "🇮🇱", label: "עברית",   pct: 68 },
            { flag: "🇬🇧", label: "English",  pct: 22 },
            { flag: "🇫🇷", label: "Français", pct: 7  },
            { flag: "🇩🇪", label: "Deutsch",  pct: 3  },
          ].map(lang => (
            <div key={lang.label} style={{ marginBottom: 14 }}>
              <div className="font-sans" style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "hsl(var(--fog))", marginBottom: 6 }}>
                <span>{lang.flag} {lang.label}</span>
                <span className="font-mono" style={{ color: "hsl(var(--subtle))" }}>{lang.pct}%</span>
              </div>
              <div style={{ height: 6, background: "hsl(var(--line))", borderRadius: 99, overflow: "hidden" }}>
                <span style={{ display: "block", height: "100%", width: `${lang.pct}%`, background: "var(--grad-bronze)", borderRadius: 99 }}/>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly insight */}
        <div style={{ ...CARD_STYLE, background: "linear-gradient(160deg, hsl(var(--deep)), hsl(28,30%,93%))" }}>
          <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: "hsl(var(--fog))", margin: "0 0 16px" }}>
            תובנה <em style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}>השבוע</em>
          </h3>
          <p className="font-display" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.25, color: "hsl(var(--fog))", margin: "0 0 16px" }}>
            מנות עם תצוגת 3D מקבלות{" "}
            <em style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}>×2.4 יותר הזמנות</em>.
          </p>
          <p className="font-sans" style={{ fontSize: 13, lineHeight: 1.6, color: "hsl(var(--subtle))", margin: "0 0 20px" }}>
            {dishes.filter(d => !d.model_3d_url).length > 0
              ? `${dishes.filter(d => !d.model_3d_url).length} מנות שלך עדיין ללא תצוגת 3D. הוסף אותן השבוע.`
              : "כל המנות שלך כבר יש להן תצוגת 3D. מצוין!"}
          </p>
          <Link href="/dashboard/dishes">
            <button className="btn-primary" style={{ padding: "10px 20px", fontSize: 13 }}>
              צור 3D
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
