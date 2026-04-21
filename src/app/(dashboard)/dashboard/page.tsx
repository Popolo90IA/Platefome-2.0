"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Utensils,
  FolderTree,
  QrCode,
  ExternalLink,
  Copy,
  Check,
  Settings as SettingsIcon,
  Eye,
  Sparkles,
  ArrowLeft,
  BarChart3,
  Scan,
} from "lucide-react";
import type { Restaurant } from "@/types/database.types";

export default function DashboardPage() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [stats, setStats] = useState({
    dishes: 0,
    categories: 0,
    views: 0,
    scans: 0,
  });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
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
        const since = new Date();
        since.setDate(since.getDate() - 30);
        const [
          { count: dishCount },
          { count: catCount },
          { count: viewCount },
          { count: scanCount },
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
            .gte("created_at", since.toISOString()),
          supabase
            .from("menu_events")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", restaurantData.id)
            .eq("event_type", "qr_scan")
            .gte("created_at", since.toISOString()),
        ]);

        setStats({
          dishes: dishCount ?? 0,
          categories: catCount ?? 0,
          views: viewCount ?? 0,
          scans: scanCount ?? 0,
        });
      }

      setLoading(false);
    };

    loadData();
  }, [supabase]);

  const handleCopyLink = () => {
    if (!restaurant) return;
    const url = `${window.location.origin}/menu/${restaurant.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
      </div>
    );
  }

  const menuUrl = restaurant
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/menu/${restaurant.slug}`
    : "";

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-4xl font-bold">
            שלום{restaurant?.name ? (
              <>
                ,{" "}
                <span className="text-gold-gradient">{restaurant.name}</span>
              </>
            ) : ""}
            !
          </h1>
          <p className="text-muted-foreground mt-2">ברוך הבא ללוח הבקרה שלך</p>
        </div>
        {restaurant && (
          <Link href={`/menu/${restaurant.slug}`} target="_blank">
            <Button className="bg-gold-gradient hover:opacity-90 shadow-gold-glow">
              <Eye className="h-4 w-4" />
              תצוגת לקוח
            </Button>
          </Link>
        )}
      </div>

      {!restaurant && (
        <Card className="border-[hsl(var(--gold))]/30 bg-gradient-to-br from-[hsl(var(--gold))]/5 to-transparent shadow-premium">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold-glow flex-shrink-0">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="font-serif-display text-2xl font-bold mb-1">
                  בוא נתחיל!
                </h2>
                <p className="text-muted-foreground mb-5">
                  צור את פרופיל המסעדה שלך כדי להתחיל לבנות את התפריט
                </p>
                <Link href="/dashboard/settings">
                  <Button className="bg-gold-gradient hover:opacity-90">
                    <SettingsIcon className="h-4 w-4" />
                    צור פרופיל מסעדה
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {restaurant && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Utensils className="h-5 w-5" />}
              label="מנות"
              value={stats.dishes}
              href="/dashboard/dishes"
              linkText="נהל מנות"
            />
            <StatCard
              icon={<FolderTree className="h-5 w-5" />}
              label="קטגוריות"
              value={stats.categories}
              href="/dashboard/categories"
              linkText="נהל קטגוריות"
            />
            <StatCard
              icon={<Eye className="h-5 w-5" />}
              label="צפיות 30 ימים"
              value={stats.views}
              href="/dashboard/analytics"
              linkText="ראה סטטיסטיקות"
            />
            <StatCard
              icon={<Scan className="h-5 w-5" />}
              label="סריקות QR 30י׳"
              value={stats.scans}
              href="/dashboard/analytics"
              linkText="ראה סטטיסטיקות"
            />
          </div>

          {/* Menu Link */}
          <Card className="shadow-premium overflow-hidden">
            <div className="bg-charcoal-gradient text-white p-6 relative">
              <div className="absolute inset-0 bg-grain opacity-10" />
              <div className="relative">
                <h3 className="font-serif-display text-xl font-bold mb-1">
                  התפריט הציבורי שלך
                </h3>
                <p className="text-white/60 text-sm">
                  שתף את הקישור או הורד את ה־QR קוד
                </p>
              </div>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 bg-secondary/50 p-3.5 rounded-xl border border-border/60">
                <code
                  className="flex-1 text-sm text-foreground/80 truncate"
                  dir="ltr"
                >
                  {menuUrl}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyLink}
                  className="flex-shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      הועתק
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      העתק
                    </>
                  )}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={`/menu/${restaurant.slug}`} target="_blank">
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4" />
                    פתח תפריט
                  </Button>
                </Link>
                <Link href="/dashboard/qrcode">
                  <Button className="bg-gold-gradient hover:opacity-90 shadow-gold-glow">
                    <QrCode className="h-4 w-4" />
                    הורד QR קוד
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Checklist */}
          <Card className="shadow-premium">
            <CardHeader>
              <CardTitle className="font-serif-display text-xl">
                הצעדים הראשונים
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <ChecklistItem
                done={!!restaurant}
                text="יצירת פרופיל מסעדה"
                href="/dashboard/settings"
              />
              <ChecklistItem
                done={stats.categories > 0}
                text="הוספת קטגוריות"
                href="/dashboard/categories"
              />
              <ChecklistItem
                done={stats.dishes > 0}
                text="הוספת מנות"
                href="/dashboard/dishes"
              />
              <ChecklistItem
                done={false}
                text="הורדת QR קוד והדפסה"
                href="/dashboard/qrcode"
              />
              <ChecklistItem
                done={stats.views > 0}
                text="קבלת הצפייה הראשונה מלקוח"
                href="/dashboard/analytics"
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  href,
  linkText,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  href: string;
  linkText: string;
}) {
  return (
    <Card className="group relative overflow-hidden shadow-premium hover:border-[hsl(var(--gold))]/40 transition-all">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--gold))]/10 rounded-full blur-2xl group-hover:bg-[hsl(var(--gold))]/20 transition-colors" />
      <CardContent className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            {label}
          </span>
          <div className="h-9 w-9 rounded-lg bg-gold-gradient flex items-center justify-center text-white shadow-gold-glow">
            {icon}
          </div>
        </div>
        <div className="font-serif-display text-4xl font-bold mb-2">
          {value}
        </div>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs font-medium text-[hsl(var(--gold-dark))] hover:text-[hsl(var(--gold))] transition-colors"
        >
          {linkText}
          <ArrowLeft className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
}

function ChecklistItem({
  done,
  text,
  href,
}: {
  done: boolean;
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/60 transition-colors"
    >
      <div
        className={`h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          done
            ? "bg-gold-gradient border-transparent shadow-gold-glow"
            : "border-border"
        }`}
      >
        {done && <Check className="h-3.5 w-3.5 text-white" />}
      </div>
      <span
        className={`flex-1 ${
          done ? "line-through text-muted-foreground" : "text-foreground"
        }`}
      >
        {text}
      </span>
      <ArrowLeft className="h-4 w-4 text-muted-foreground/40" />
    </Link>
  );
}
