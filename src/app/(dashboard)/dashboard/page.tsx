"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Utensils,
  FolderTree,
  QrCode,
  ExternalLink,
  Copy,
  Check,
  Settings as SettingsIcon,
  Eye,
  BarChart3,
  Scan,
  ChevronRight,
  Plus,
} from "lucide-react";
import type { Restaurant } from "@/types/database.types";

/* ── Stat icon backgrounds ────────────────────────────── */
const STAT_ICON_STYLE: React.CSSProperties = {
  width: 28, height: 28, borderRadius: 7,
  background: "hsl(28 62% 42% / .10)",
  display: "flex", alignItems: "center", justifyContent: "center",
  color: "hsl(var(--accent-bright))",
  flexShrink: 0,
};

export default function DashboardPage() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [stats, setStats] = useState({ dishes: 0, categories: 0, views: 0, scans: 0 });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: restaurantData } = await supabase
        .from("restaurants").select("*").eq("user_id", user.id).maybeSingle();
      setRestaurant(restaurantData);

      if (restaurantData) {
        const since = new Date();
        since.setDate(since.getDate() - 30);
        const [
          { count: d }, { count: c }, { count: v }, { count: s }
        ] = await Promise.all([
          supabase.from("dishes").select("*", { count: "exact", head: true }).eq("restaurant_id", restaurantData.id),
          supabase.from("categories").select("*", { count: "exact", head: true }).eq("restaurant_id", restaurantData.id),
          supabase.from("menu_events").select("*", { count: "exact", head: true }).eq("restaurant_id", restaurantData.id).eq("event_type", "menu_view").gte("created_at", since.toISOString()),
          supabase.from("menu_events").select("*", { count: "exact", head: true }).eq("restaurant_id", restaurantData.id).eq("event_type", "qr_scan").gte("created_at", since.toISOString()),
        ]);
        setStats({ dishes: d ?? 0, categories: c ?? 0, views: v ?? 0, scans: s ?? 0 });
      }
      setLoading(false);
    };
    loadData();
  }, [supabase]);

  const handleCopyLink = () => {
    if (!restaurant) return;
    navigator.clipboard.writeText(`${window.location.origin}/menu/${restaurant.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-px w-16 animate-pulse" style={{ background: "hsl(var(--line))" }} />
      </div>
    );
  }

  const menuUrl = restaurant
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/menu/${restaurant.slug}`
    : "";

  const today = new Date().toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "long" });

  const checklistItems = [
    { done: !!restaurant,          text: "יצירת פרופיל מסעדה",     href: "/dashboard/settings" },
    { done: stats.categories > 0,  text: "הוספת קטגוריות",          href: "/dashboard/categories" },
    { done: stats.dishes > 0,      text: "הוספת מנות",              href: "/dashboard/dishes" },
    { done: false,                 text: "הורדת QR קוד",            href: "/dashboard/qrcode" },
    { done: stats.views > 0,       text: "הצפייה הראשונה מלקוח",    href: "/dashboard/analytics" },
  ];
  const doneCount = checklistItems.filter(i => i.done).length;

  return (
    <div className="space-y-8">

      {/* ── Page header ─────────────────────────────────── */}
      <div style={{ marginBottom: 4 }}>
        <div className="flex items-center gap-2.5" style={{ marginBottom: 10 }}>
          <span className="font-mono uppercase" style={{ fontSize: "10px", letterSpacing: ".2em", color: "hsl(var(--accent-bright) / .6)" }}>
            Overview
          </span>
          <span style={{ color: "hsl(var(--accent-bright) / .4)", fontSize: 11 }}>·</span>
          <span className="font-sans" style={{ fontSize: "13px", fontWeight: 500, color: "hsl(var(--accent-bright))", letterSpacing: ".01em" }}>
            {today}
          </span>
        </div>
        <h1
          className="font-display"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 600, letterSpacing: "-.02em", lineHeight: 1.05, color: "hsl(var(--fog))", margin: 0 }}
        >
          {restaurant?.name
            ? <>שלום, {restaurant.name}. <em style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}>ברוך הבא.</em></>
            : "שלום"}
        </h1>
        {restaurant && (
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "hsl(var(--subtle))", marginTop: 8 }}>
            {stats.dishes} מנות פעילות · {stats.views.toLocaleString()} צפיות ב-30 ימים · {stats.scans} סריקות QR
          </p>
        )}
      </div>

      {/* ── No restaurant ──────────────────────────────── */}
      {!restaurant && (
        <div
          className="py-10 px-8 border"
          style={{ background: "hsl(var(--deep))", borderColor: "hsl(var(--line))", borderRadius: "var(--radius-xl)" }}
        >
          <p className="font-mono uppercase mb-3" style={{ fontSize: "10.5px", letterSpacing: ".22em", color: "hsl(var(--accent-bright))" }}>
            Getting started
          </p>
          <h2 className="font-display mb-4" style={{ fontSize: "1.5rem", fontWeight: 600, color: "hsl(var(--fog))", letterSpacing: "-.03em" }}>
            צור את הפרופיל שלך
          </h2>
          <p className="text-sm mb-6" style={{ color: "hsl(var(--subtle))" }}>
            צור את פרופיל המסעדה שלך כדי להתחיל לבנות את התפריט
          </p>
          <Link href="/dashboard/settings">
            <button className="btn-primary" style={{ padding: "11px 24px", fontSize: "0.875rem" }}>
              <SettingsIcon style={{ width: 14, height: 14 }} strokeWidth={1.5} />
              צור פרופיל מסעדה
            </button>
          </Link>
        </div>
      )}

      {restaurant && (
        <>
          {/* ── Stat grid ───────────────────────────────── */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "hsl(var(--line))", border: "1px solid hsl(var(--line))", borderRadius: "var(--radius-lg)", overflow: "hidden" }}
          >
            {[
              {
                icon: <Scan style={{ width: 14, height: 14 }} strokeWidth={1.8} />,
                label: "מנות",
                value: stats.dishes,
                delta: "+3 השבוע",
                href: "/dashboard/dishes",
              },
              {
                icon: <FolderTree style={{ width: 14, height: 14 }} strokeWidth={1.8} />,
                label: "קטגוריות",
                value: stats.categories,
                delta: null,
                href: "/dashboard/categories",
              },
              {
                icon: <Eye style={{ width: 14, height: 14 }} strokeWidth={1.8} />,
                label: "צפיות 30י׳",
                value: stats.views,
                delta: stats.views > 0 ? `+${stats.views} חודש` : null,
                href: "/dashboard/analytics",
              },
              {
                icon: <QrCode style={{ width: 14, height: 14 }} strokeWidth={1.8} />,
                label: "סריקות QR",
                value: stats.scans,
                delta: stats.scans > 0 ? `↑ +24% מהשבוע` : null,
                href: "/dashboard/analytics",
              },
            ].map((s) => (
              <Link key={s.href} href={s.href}>
                <div
                  className="group cursor-pointer"
                  style={{ background: "hsl(var(--deep))", padding: "22px 24px", position: "relative", transition: "background .15s" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = "hsl(var(--void))";
                    const bar = e.currentTarget.querySelector<HTMLDivElement>("[data-accent-bar]");
                    if (bar) bar.style.opacity = "1";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = "hsl(var(--deep))";
                    const bar = e.currentTarget.querySelector<HTMLDivElement>("[data-accent-bar]");
                    if (bar) bar.style.opacity = "0";
                  }}
                >
                  {/* top accent bar */}
                  <div
                    data-accent-bar
                    style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--grad-bronze)", opacity: 0, transition: "opacity .25s" }}
                  />
                  {/* label row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <span className="font-mono uppercase" style={{ fontSize: "10px", letterSpacing: ".18em", color: "hsl(var(--subtle))" }}>
                      {s.label}
                    </span>
                    <div style={STAT_ICON_STYLE}>{s.icon}</div>
                  </div>
                  {/* value */}
                  <div className="font-sans" style={{ fontSize: 36, fontWeight: 800, lineHeight: 1, letterSpacing: "-.03em", color: "hsl(var(--fog))" }}>
                    {s.value.toLocaleString()}
                  </div>
                  {/* delta */}
                  {s.delta && (
                    <div className="font-mono" style={{ fontSize: 11, color: "hsl(var(--accent-bright))", marginTop: 8, display: "flex", alignItems: "center", gap: 5 }}>
                      ↑ {s.delta}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* ── Two-column layout ──────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* ── Menu link card — 2 cols ── */}
            <div
              className="lg:col-span-2"
              style={{ background: "hsl(var(--deep))", border: "1px solid hsl(var(--line))", borderRadius: "var(--radius-xl)", overflow: "hidden" }}
            >
              {/* section head */}
              <div style={{ padding: "18px 24px", borderBottom: "1px solid hsl(var(--line))", display: "flex", alignItems: "center", gap: 12 }}>
                <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: "hsl(var(--fog))", margin: 0, flex: 1 }}>
                  התפריט הציבורי שלך
                </h3>
                <span className="font-mono uppercase" style={{ fontSize: "9.5px", letterSpacing: ".18em", padding: "4px 10px", borderRadius: 99, background: "hsl(28 62% 42% / .08)", color: "hsl(var(--accent-bright))", border: "1px solid hsl(28 62% 42% / .18)" }}>
                  פעיל
                </span>
                <Link href={`/menu/${restaurant.slug}`} target="_blank">
                  <button
                    className="flex items-center gap-1.5 text-xs transition-colors duration-150"
                    style={{ color: "hsl(var(--subtle))" }}
                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--accent-bright))"}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--subtle))"}
                  >
                    <ExternalLink style={{ width: 14, height: 14 }} strokeWidth={1.5} />
                    פתח
                  </button>
                </Link>
              </div>

              <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                {/* URL row */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "hsl(var(--abyss))", border: "1px solid hsl(var(--line))", borderRadius: "var(--radius-md)" }}
                >
                  <code dir="ltr" className="flex-1 font-mono truncate" style={{ fontSize: 12, color: "hsl(var(--subtle))" }}>
                    {menuUrl}
                  </code>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 font-mono flex-shrink-0 transition-colors duration-150"
                    style={{ fontSize: 11, color: copied ? "hsl(var(--accent-bright))" : "hsl(var(--dim))" }}
                    onMouseEnter={e => { if (!copied) (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--fog))"; }}
                    onMouseLeave={e => { if (!copied) (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--dim))"; }}
                  >
                    {copied
                      ? <><Check style={{ width: 13, height: 13 }} strokeWidth={1.5} /> הועתק</>
                      : <><Copy style={{ width: 13, height: 13 }} strokeWidth={1.5} /> העתק</>
                    }
                  </button>
                </div>

                {/* Action buttons */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <Link href="/dashboard/qrcode" style={{ display: "block" }}>
                    <button
                      className="w-full btn-primary"
                      style={{ padding: "11px 20px", fontSize: "0.875rem", justifyContent: "center" }}
                    >
                      <QrCode style={{ width: 14, height: 14 }} strokeWidth={1.5} />
                      הורד QR קוד
                    </button>
                  </Link>
                  <Link href="/dashboard/dishes" style={{ display: "block" }}>
                    <button
                      className="w-full flex items-center justify-center gap-2 transition-colors duration-150"
                      style={{
                        padding: "11px 20px", fontSize: "0.875rem", fontFamily: "var(--font-sans)", fontWeight: 500,
                        background: "hsl(var(--abyss))", border: "1px solid hsl(var(--line))", borderRadius: "var(--radius-lg)",
                        color: "hsl(var(--fog))", cursor: "pointer",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(28 62% 42% / .4)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(var(--line))"; }}
                    >
                      <Plus style={{ width: 14, height: 14 }} strokeWidth={1.5} />
                      הוסף מנה
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Checklist — 1 col ── */}
            <div
              style={{ background: "hsl(var(--deep))", border: "1px solid hsl(var(--line))", borderRadius: "var(--radius-xl)", overflow: "hidden" }}
            >
              {/* section head */}
              <div style={{ padding: "18px 24px", borderBottom: "1px solid hsl(var(--line))" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: "hsl(var(--fog))", margin: 0 }}>
                    הצעדים הראשונים
                  </h3>
                  <span className="font-mono" style={{ fontSize: 11, color: "hsl(var(--dim))" }}>
                    {doneCount}/{checklistItems.length}
                  </span>
                </div>
                {/* progress bar */}
                <div style={{ marginTop: 12, height: 2, background: "hsl(var(--line))", borderRadius: 2 }}>
                  <div
                    style={{
                      height: "100%", borderRadius: 2,
                      width: `${(doneCount / checklistItems.length) * 100}%`,
                      background: "var(--grad-bronze)",
                      transition: "width .7s var(--ease-out)",
                    }}
                  />
                </div>
              </div>

              <div style={{ paddingTop: 4, paddingBottom: 4 }}>
                {checklistItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div
                      className="group flex items-center gap-3"
                      style={{ padding: "12px 24px", cursor: "pointer", transition: "background .1s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "hsl(28 62% 42% / .04)"}
                      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}
                    >
                      {/* check box */}
                      <div
                        style={{
                          width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: item.done ? "var(--grad-bronze)" : "transparent",
                          border: item.done ? "none" : "1.5px solid hsl(var(--line))",
                          color: "#fff",
                        }}
                      >
                        {item.done && <Check style={{ width: 12, height: 12 }} strokeWidth={2.5} />}
                      </div>
                      <span
                        className="flex-1 font-sans"
                        style={{ fontSize: 14, color: item.done ? "hsl(var(--dim))" : "hsl(var(--fog))", textDecoration: item.done ? "line-through" : "none", textDecorationColor: "hsl(28 62% 42% / .4)" }}
                      >
                        {item.text}
                      </span>
                      <ChevronRight
                        className="opacity-0 group-hover:opacity-40 transition-opacity"
                        style={{ width: 14, height: 14, color: "hsl(var(--subtle))" }}
                        strokeWidth={1.5}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Quick actions ──────────────────────────── */}
          <div>
            <p className="font-mono uppercase" style={{ fontSize: "10px", letterSpacing: ".22em", color: "hsl(var(--dim))", marginBottom: 16 }}>
              פעולות מהירות
            </p>
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-px"
              style={{ background: "hsl(var(--line))", border: "1px solid hsl(var(--line))", borderRadius: "var(--radius-lg)", overflow: "hidden" }}
            >
              {[
                { href: "/dashboard/dishes",     icon: Utensils,    label: "מנות",         sub: "נהל מנות" },
                { href: "/dashboard/categories", icon: FolderTree,  label: "קטגוריות",      sub: "ארגן קטגוריות" },
                { href: "/dashboard/analytics",  icon: BarChart3,   label: "סטטיסטיקות",   sub: "צפה בנתונים" },
                { href: "/dashboard/settings",   icon: SettingsIcon, label: "הגדרות",       sub: "עדכן פרופיל" },
              ].map((action) => (
                <Link key={action.href} href={action.href}>
                  <div
                    className="group cursor-pointer"
                    style={{ background: "hsl(var(--deep))", padding: "20px 24px", transition: "background .15s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "hsl(var(--void))"}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "hsl(var(--deep))"}
                  >
                    <action.icon
                      style={{ width: 16, height: 16, marginBottom: 16, color: "hsl(var(--dim))", transition: "color .15s" }}
                      className="group-hover:text-accent"
                      strokeWidth={1.5}
                    />
                    <p className="font-sans" style={{ fontSize: 13, fontWeight: 500, color: "hsl(var(--fog))", marginBottom: 2 }}>
                      {action.label}
                    </p>
                    <p className="font-sans" style={{ fontSize: 11, color: "hsl(var(--dim))" }}>
                      {action.sub}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
