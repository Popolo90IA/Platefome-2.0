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
  ArrowLeft,
  BarChart3,
  Scan,
  ChevronRight,
} from "lucide-react";
import type { Restaurant } from "@/types/database.types";

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
        <div
          className="h-px w-16 animate-pulse"
          style={{ background: "hsl(var(--line))" }}
        />
      </div>
    );
  }

  const menuUrl = restaurant
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/menu/${restaurant.slug}`
    : "";

  return (
    <div className="space-y-12">

      {/* ── Page title ── */}
      <div>
        <p
          className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4"
          style={{ color: "hsl(var(--dim))" }}
        >
          Overview
        </p>
        <h1
          className="font-display font-light"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "hsl(var(--cream))",
          }}
        >
          {restaurant?.name ? (
            <>שלום, {restaurant.name}</>
          ) : (
            "שלום"
          )}
        </h1>
        <p
          className="mt-3 text-sm"
          style={{ color: "hsl(var(--subtle))" }}
        >
          ברוך הבא ללוח הבקרה שלך
        </p>
      </div>

      {/* ── No restaurant ── */}
      {!restaurant && (
        <div
          className="py-12 px-8 border"
          style={{
            background: "hsl(var(--abyss))",
            borderColor: "hsl(var(--line))",
          }}
        >
          <p
            className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3"
            style={{ color: "hsl(var(--dim))" }}
          >
            Getting started
          </p>
          <h2
            className="font-display text-2xl font-light mb-4"
            style={{ color: "hsl(var(--cream))", letterSpacing: "-0.03em" }}
          >
            צור את הפרופיל שלך
          </h2>
          <p className="text-sm mb-6" style={{ color: "hsl(var(--subtle))" }}>
            צור את פרופיל המסעדה שלך כדי להתחיל לבנות את התפריט
          </p>
          <Link href="/dashboard/settings">
            <button
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-sans transition-all duration-150 group"
              style={{
                background: "hsl(var(--cream))",
                color: "hsl(var(--void))",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = "0.9"}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = "1"}
            >
              <SettingsIcon className="h-4 w-4" strokeWidth={1.5} />
              צור פרופיל מסעדה
            </button>
          </Link>
        </div>
      )}

      {restaurant && (
        <>
          {/* ── Stats row ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "hsl(var(--line))" }}>
            {[
              { icon: Utensils, label: "מנות", value: stats.dishes, href: "/dashboard/dishes" },
              { icon: FolderTree, label: "קטגוריות", value: stats.categories, href: "/dashboard/categories" },
              { icon: Eye, label: "צפיות 30י׳", value: stats.views, href: "/dashboard/analytics" },
              { icon: Scan, label: "סריקות QR", value: stats.scans, href: "/dashboard/analytics" },
            ].map((s) => (
              <Link key={s.href} href={s.href}>
                <div
                  className="group px-6 py-7 transition-all duration-150 cursor-pointer"
                  style={{ background: "hsl(var(--abyss))" }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "hsl(var(--deep))"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "hsl(var(--abyss))"}
                >
                  <s.icon
                    className="h-4 w-4 mb-4"
                    style={{ color: "hsl(var(--dim))" }}
                    strokeWidth={1.5}
                  />
                  <div
                    className="font-display font-light mb-1"
                    style={{
                      fontSize: "2.5rem",
                      letterSpacing: "-0.05em",
                      lineHeight: 1,
                      color: "hsl(var(--cream))",
                    }}
                  >
                    {s.value.toLocaleString()}
                  </div>
                  <div
                    className="text-xs font-sans"
                    style={{ color: "hsl(var(--subtle))" }}
                  >
                    {s.label}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ── Two-column grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Menu link — col 2 */}
            <div
              className="lg:col-span-2 border"
              style={{
                background: "hsl(var(--abyss))",
                borderColor: "hsl(var(--line))",
              }}
            >
              <div
                className="px-6 py-4 border-b flex items-center justify-between"
                style={{ borderColor: "hsl(var(--line))" }}
              >
                <div>
                  <p
                    className="font-mono text-[10px] tracking-[0.18em] uppercase"
                    style={{ color: "hsl(var(--dim))" }}
                  >
                    Public Menu
                  </p>
                  <h3
                    className="font-display font-light text-lg mt-0.5"
                    style={{ color: "hsl(var(--cream))", letterSpacing: "-0.03em" }}
                  >
                    התפריט הציבורי שלך
                  </h3>
                </div>
                <Link href={`/menu/${restaurant.slug}`} target="_blank">
                  <button
                    className="flex items-center gap-1.5 text-xs transition-all duration-150"
                    style={{ color: "hsl(var(--subtle))" }}
                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--fog))"}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--subtle))"}
                  >
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                    פתח
                  </button>
                </Link>
              </div>

              <div className="p-6 space-y-4">
                {/* URL row */}
                <div
                  className="flex items-center gap-3 px-4 py-3 border"
                  style={{
                    background: "hsl(var(--deep))",
                    borderColor: "hsl(var(--line))",
                  }}
                >
                  <code
                    className="flex-1 text-xs font-mono truncate"
                    dir="ltr"
                    style={{ color: "hsl(var(--subtle))" }}
                  >
                    {menuUrl}
                  </code>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 text-xs font-mono flex-shrink-0 transition-colors duration-150"
                    style={{ color: copied ? "hsl(var(--sage))" : "hsl(var(--dim))" }}
                    onMouseEnter={e => {
                      if (!copied) (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--fog))";
                    }}
                    onMouseLeave={e => {
                      if (!copied) (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--dim))";
                    }}
                  >
                    {copied
                      ? <><Check className="h-3.5 w-3.5" strokeWidth={1.5} /> הועתק</>
                      : <><Copy className="h-3.5 w-3.5" strokeWidth={1.5} /> העתק</>
                    }
                  </button>
                </div>

                {/* QR button */}
                <Link href="/dashboard/qrcode">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 border text-sm transition-all duration-150 group"
                    style={{
                      background: "hsl(var(--cream))",
                      borderColor: "hsl(var(--cream))",
                      color: "hsl(var(--void))",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = "0.9"}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = "1"}
                  >
                    <span className="flex items-center gap-2">
                      <QrCode className="h-4 w-4" strokeWidth={1.5} />
                      הורד QR קוד
                    </span>
                    <ArrowLeft className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Checklist — col 1 */}
            <div
              className="border"
              style={{
                background: "hsl(var(--abyss))",
                borderColor: "hsl(var(--line))",
              }}
            >
              <div
                className="px-6 py-4 border-b"
                style={{ borderColor: "hsl(var(--line))" }}
              >
                <p
                  className="font-mono text-[10px] tracking-[0.18em] uppercase"
                  style={{ color: "hsl(var(--dim))" }}
                >
                  Checklist
                </p>
                <div className="flex items-center justify-between mt-0.5">
                  <h3
                    className="font-display font-light text-lg"
                    style={{ color: "hsl(var(--cream))", letterSpacing: "-0.03em" }}
                  >
                    הצעדים הראשונים
                  </h3>
                  <span
                    className="font-mono text-[11px]"
                    style={{ color: "hsl(var(--dim))" }}
                  >
                    {[!!restaurant, stats.categories > 0, stats.dishes > 0, false, stats.views > 0].filter(Boolean).length}/5
                  </span>
                </div>
                {/* progress */}
                <div className="mt-3 h-px w-full" style={{ background: "hsl(var(--line))" }}>
                  <div
                    className="h-full transition-all duration-700"
                    style={{
                      width: `${([!!restaurant, stats.categories > 0, stats.dishes > 0, false, stats.views > 0].filter(Boolean).length / 5) * 100}%`,
                      background: "hsl(var(--cream))",
                    }}
                  />
                </div>
              </div>

              <div className="py-2">
                {[
                  { done: !!restaurant, text: "יצירת פרופיל מסעדה", href: "/dashboard/settings" },
                  { done: stats.categories > 0, text: "הוספת קטגוריות", href: "/dashboard/categories" },
                  { done: stats.dishes > 0, text: "הוספת מנות", href: "/dashboard/dishes" },
                  { done: false, text: "הורדת QR קוד", href: "/dashboard/qrcode" },
                  { done: stats.views > 0, text: "הצפייה הראשונה מלקוח", href: "/dashboard/analytics" },
                ].map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div
                      className="flex items-center gap-3 px-6 py-2.5 transition-colors duration-100 group"
                      style={{ color: item.done ? "hsl(var(--dim))" : "hsl(var(--pale))" }}
                      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "hsl(var(--deep))"}
                      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}
                    >
                      {/* checkbox */}
                      <div
                        className="h-4 w-4 rounded-sm flex-shrink-0 flex items-center justify-center border transition-all duration-150"
                        style={{
                          background: item.done ? "hsl(var(--cream))" : "transparent",
                          borderColor: item.done ? "hsl(var(--cream))" : "hsl(var(--line))",
                        }}
                      >
                        {item.done && (
                          <Check
                            className="h-2.5 w-2.5"
                            style={{ color: "hsl(var(--void))" }}
                            strokeWidth={2.5}
                          />
                        )}
                      </div>
                      <span
                        className="flex-1 text-[13px] font-sans"
                        style={{ textDecoration: item.done ? "line-through" : "none" }}
                      >
                        {item.text}
                      </span>
                      <ChevronRight
                        className="h-3.5 w-3.5 opacity-0 group-hover:opacity-40 transition-opacity"
                        style={{ color: "hsl(var(--subtle))" }}
                        strokeWidth={1.5}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Quick actions ── */}
          <div>
            <p
              className="font-mono text-[10px] tracking-[0.2em] uppercase mb-5"
              style={{ color: "hsl(var(--dim))" }}
            >
              Quick actions
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ background: "hsl(var(--line))" }}>
              {[
                { href: "/dashboard/dishes", icon: Utensils, label: "מנות", sub: "נהל מנות" },
                { href: "/dashboard/categories", icon: FolderTree, label: "קטגוריות", sub: "ארגן קטגוריות" },
                { href: "/dashboard/analytics", icon: BarChart3, label: "סטטיסטיקות", sub: "צפה בנתונים" },
                { href: "/dashboard/settings", icon: SettingsIcon, label: "הגדרות", sub: "עדכן פרופיל" },
              ].map((action) => (
                <Link key={action.href} href={action.href}>
                  <div
                    className="group px-5 py-6 transition-colors duration-150 cursor-pointer"
                    style={{ background: "hsl(var(--abyss))" }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "hsl(var(--deep))"}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "hsl(var(--abyss))"}
                  >
                    <action.icon
                      className="h-4 w-4 mb-4"
                      style={{ color: "hsl(var(--dim))" }}
                      strokeWidth={1.5}
                    />
                    <p
                      className="text-[13px] font-sans font-normal mb-0.5"
                      style={{ color: "hsl(var(--fog))" }}
                    >
                      {action.label}
                    </p>
                    <p
                      className="text-[11px] font-sans"
                      style={{ color: "hsl(var(--dim))" }}
                    >
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
