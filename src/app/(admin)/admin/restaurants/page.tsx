"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building2,
  Search,
  ExternalLink,
  Power,
  Trash2,
  Eye,
  AlertTriangle,
  Palette,
  Sun,
  Moon,
  Check,
  X,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import type { Restaurant } from "@/types/database.types";
import { hslToHex, hexToHsl, THEME_PRESETS } from "@/lib/theme";

type RestaurantWithStats = Restaurant & {
  dish_count?: number;
  view_count?: number;
};

export default function AdminRestaurantsPage() {
  const [restaurants, setRestaurants] = useState<RestaurantWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [themeEdit, setThemeEdit] = useState<string | null>(null); // restaurant id being edited
  const [themeForm, setThemeForm] = useState({ primary: "hsl(28,62%,42%)", dark: true });
  const [themeSaving, setThemeSaving] = useState(false);
  const supabase = createClient();

  const loadData = async () => {
    setLoading(true);
    const { data: list } = await supabase
      .from("restaurants")
      .select("*")
      .order("created_at", { ascending: false });

    if (!list) {
      setRestaurants([]);
      setLoading(false);
      return;
    }

    // Enrichir avec counts en parallèle
    const enriched = await Promise.all(
      list.map(async (r) => {
        const [dishRes, viewRes] = await Promise.all([
          supabase
            .from("dishes")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", r.id),
          supabase
            .from("menu_events")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", r.id)
            .eq("event_type", "menu_view"),
        ]);
        return {
          ...r,
          dish_count: dishRes.count ?? 0,
          view_count: viewRes.count ?? 0,
        };
      })
    );

    setRestaurants(enriched);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return restaurants;
    return restaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.slug.toLowerCase().includes(q) ||
        (r.email && r.email.toLowerCase().includes(q))
    );
  }, [restaurants, search]);

  const toggleActive = async (id: string, current: boolean) => {
    setBusy(id);
    const { error } = await supabase.rpc("admin_set_restaurant_active", {
      target_restaurant_id: id,
      new_active: !current,
    });
    setBusy(null);
    if (error) {
      alert("שגיאה: " + error.message);
      return;
    }
    setRestaurants((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_active: !current } : r))
    );
  };

  const deleteRestaurant = async (id: string) => {
    setBusy(id);
    const { error } = await supabase.rpc("admin_delete_restaurant", {
      target_restaurant_id: id,
    });
    setBusy(null);
    setConfirmDelete(null);
    if (error) {
      alert("שגיאה: " + error.message);
      return;
    }
    setRestaurants((prev) => prev.filter((r) => r.id !== id));
  };

  const openThemeEdit = (r: RestaurantWithStats) => {
    setThemeForm({
      primary: r.theme_primary ?? "hsl(28,62%,42%)",
      dark: r.theme_dark_mode ?? true,
    });
    setThemeEdit(r.id);
  };

  const saveTheme = async () => {
    if (!themeEdit) return;
    setThemeSaving(true);
    const { error } = await supabase
      .from("restaurants")
      .update({ theme_primary: themeForm.primary, theme_dark_mode: themeForm.dark })
      .eq("id", themeEdit);
    setThemeSaving(false);
    if (error) { alert("שגיאה: " + error.message); return; }
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === themeEdit
          ? { ...r, theme_primary: themeForm.primary, theme_dark_mode: themeForm.dark }
          : r
      )
    );
    setThemeEdit(null);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-4xl font-bold">
            <span className="text-gold-gradient">מסעדות</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            {restaurants.length} מסעדות רשומות במערכת
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="חפש לפי שם, slug או אימייל..."
          className="pr-10"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="shadow-premium">
          <CardContent className="py-16 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground/70 mx-auto mb-3" />
            <p className="text-muted-foreground">
              {search ? "לא נמצאו תוצאות" : "אין מסעדות במערכת"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {filtered.map((r) => (
            <Card
              key={r.id}
              className={`shadow-premium transition-all ${
                !r.is_active ? "opacity-60" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4 flex-wrap">
                  {r.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.logo_url}
                      alt={r.name}
                      className="h-14 w-14 rounded-xl object-cover border border-border/60 flex-shrink-0"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--grad-bronze)" }}>
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-serif-display text-lg font-bold truncate">
                        {r.name}
                      </h3>
                      {r.is_active ? (
                        <span className="text-[10px] text-[hsl(var(--accent-bright))] bg-[hsl(var(--accent-bright))]/10 px-2 py-0.5 rounded-full">
                          פעילה
                        </span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground bg-[hsl(var(--line))]/40 px-2 py-0.5 rounded-full">
                          מושבתת
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 truncate" dir="ltr">
                      /menu/{r.slug}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
                      <span>{r.dish_count} מנות</span>
                      <span>{r.view_count} צפיות</span>
                      <span>
                        נוצרה {new Date(r.created_at).toLocaleDateString("he-IL")}
                      </span>
                      {/* Theme badge */}
                      <span className="flex items-center gap-1.5">
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-border/50 flex-shrink-0"
                          style={{ backgroundColor: hslToHex(r.theme_primary ?? "hsl(28,62%,42%)") }}
                        />
                        {r.theme_dark_mode !== false ? (
                          <Moon className="h-3 w-3 text-muted-foreground/60" />
                        ) : (
                          <Sun className="h-3 w-3 text-muted-foreground/60" />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
                    <Link href={`/admin/restaurants/${r.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                        פרטים
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openThemeEdit(r)}
                      className="hover:border-[hsl(var(--gold))]/40"
                    >
                      <Palette className="h-4 w-4" style={{ color: hslToHex(r.theme_primary ?? "hsl(28,62%,42%)") }} />
                      עיצוב
                    </Button>
                    <Link href={`/menu/${r.slug}`} target="_blank">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                        תפריט
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActive(r.id, r.is_active)}
                      disabled={busy === r.id}
                      className={
                        r.is_active
                          ? "text-[hsl(var(--ember))] hover:bg-[hsl(var(--ember))]/10"
                          : "text-[hsl(var(--accent-bright))] hover:bg-[hsl(var(--accent-bright))]/10"
                      }
                    >
                      <Power className="h-4 w-4" />
                      {r.is_active ? "השבת" : "הפעל"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setConfirmDelete(r.id)}
                      disabled={busy === r.id}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                      מחק
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Theme edit modal */}
      {themeEdit && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setThemeEdit(null)}
        >
          <Card
            className="max-w-sm w-full shadow-premium"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-display text-xl font-bold flex items-center gap-2">
                  <Palette className="h-5 w-5" style={{ color: "hsl(var(--gold))" }} />
                  עיצוב תפריט
                </h3>
                <button
                  onClick={() => setThemeEdit(null)}
                  className="p-1 rounded hover:bg-secondary transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* Color picker */}
              <div className="space-y-3">
                <Label>צבע ראשי</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={hslToHex(themeForm.primary)}
                    onChange={(e) =>
                      setThemeForm((f) => ({ ...f, primary: hexToHsl(e.target.value) }))
                    }
                    className="h-10 w-10 rounded-lg cursor-pointer border border-border p-0.5 bg-transparent flex-shrink-0"
                  />
                  <div className="flex-1 text-xs text-muted-foreground font-mono bg-secondary rounded-lg px-3 py-2 truncate" dir="ltr">
                    {themeForm.primary}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {THEME_PRESETS.map((preset) => (
                    <button
                      key={preset.color}
                      type="button"
                      title={preset.label}
                      onClick={() => setThemeForm((f) => ({ ...f, primary: preset.color }))}
                      className="h-6 w-6 rounded-full transition-all flex-shrink-0"
                      style={{
                        backgroundColor: hslToHex(preset.color),
                        outline: themeForm.primary === preset.color ? `2px solid ${hslToHex(preset.color)}` : "2px solid transparent",
                        outlineOffset: "2px",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Dark / Light */}
              <div className="flex items-center justify-between gap-4 pt-2 border-t border-border/50">
                <div className="flex items-center gap-2">
                  {themeForm.dark ? (
                    <Moon className="h-4 w-4 flex-shrink-0" style={{ color: "hsl(var(--gold))" }} />
                  ) : (
                    <Sun className="h-4 w-4 flex-shrink-0" style={{ color: "hsl(var(--accent-bright))" }} />
                  )}
                  <span className="text-sm font-medium">
                    {themeForm.dark ? "מצב כהה" : "מצב בהיר"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setThemeForm((f) => ({ ...f, dark: !f.dark }))}
                  className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-[hsl(var(--gold))]/40 transition-colors"
                >
                  החלף
                </button>
              </div>

              <div className="flex gap-2 justify-end pt-1">
                <Button variant="outline" onClick={() => setThemeEdit(null)} disabled={themeSaving}>
                  ביטול
                </Button>
                <Button
                  onClick={saveTheme}
                  disabled={themeSaving}
                  className="text-white hover:opacity-90"
                  style={{ background: "var(--grad-bronze)" }}
                >
                  {themeSaving ? (
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Check className="h-4 w-4" />שמור</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Confirm delete modal */}
      {confirmDelete && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setConfirmDelete(null)}
        >
          <Card
            className="max-w-md w-full shadow-premium"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="font-serif-display text-xl font-bold">
                  מחיקת מסעדה
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                פעולה זו תמחק לצמיתות את המסעדה, כל המנות, הקטגוריות וה-analytics
                שלה. לא ניתן לבטל.
              </p>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setConfirmDelete(null)}
                  disabled={busy === confirmDelete}
                >
                  ביטול
                </Button>
                <Button
                  onClick={() => deleteRestaurant(confirmDelete)}
                  disabled={busy === confirmDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  <Trash2 className="h-4 w-4" />
                  מחק לצמיתות
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
