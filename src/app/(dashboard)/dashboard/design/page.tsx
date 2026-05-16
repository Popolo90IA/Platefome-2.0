"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Save,
  Check,
  Palette,
  Sun,
  Moon,
  Type,
  LayoutGrid,
  List,
  ImageOff,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import {
  buildMenuTheme,
  hexToHsl,
  hslToHex,
  THEME_PRESETS,
  FONT_PACKS,
  MENU_LAYOUTS,
  MENU_HERO_STYLES,
  MENU_CATEGORY_STYLES,
} from "@/lib/theme";
import type { Restaurant } from "@/types/database.types";

type DesignTab = "color" | "font" | "layout";

type DesignForm = {
  theme_primary: string;
  theme_dark_mode: boolean;
  theme_font_pack: string;
  menu_layout: string;
  menu_hero_style: string;
  menu_category_style: string;
};

export default function DesignPage() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<DesignTab>("color");

  const [form, setForm] = useState<DesignForm>({
    theme_primary: "hsl(28,62%,42%)",
    theme_dark_mode: true,
    theme_font_pack: "elegant",
    menu_layout: "grid",
    menu_hero_style: "default",
    menu_category_style: "pills",
  });

  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setRestaurant(data);
        setForm({
          theme_primary: data.theme_primary ?? "hsl(28,62%,42%)",
          theme_dark_mode: data.theme_dark_mode ?? true,
          theme_font_pack: data.theme_font_pack ?? "elegant",
          menu_layout: data.menu_layout ?? "grid",
          menu_hero_style: data.menu_hero_style ?? "default",
          menu_category_style: data.menu_category_style ?? "pills",
        });
      }
      setLoading(false);
    };
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    if (!restaurant) return;
    setSaving(true);
    setError(null);
    const { error: err } = await supabase
      .from("restaurants")
      .update({
        theme_primary: form.theme_primary,
        theme_dark_mode: form.theme_dark_mode,
        theme_font_pack: form.theme_font_pack,
        menu_layout: form.menu_layout,
        menu_hero_style: form.menu_hero_style,
        menu_category_style: form.menu_category_style,
      })
      .eq("id", restaurant.id);
    setSaving(false);
    if (err) { setError(err.message); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const TABS: { key: DesignTab; label: string; icon: React.ReactNode }[] = [
    { key: "color",  label: "צבע",   icon: <Palette className="h-3.5 w-3.5" /> },
    { key: "font",   label: "גופן",  icon: <Type className="h-3.5 w-3.5" /> },
    { key: "layout", label: "פריסה", icon: <LayoutGrid className="h-3.5 w-3.5" /> },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        לא נמצאה מסעדה. צור מסעדה בהגדרות תחילה.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up max-w-xl">
      {/* Header */}
      <div>
        <p
          className="font-mono uppercase text-xs mb-2"
          style={{ letterSpacing: ".1em", color: "hsl(var(--accent-bright))" }}
        >
          עיצוב
        </p>
        <h1 className="font-serif-display text-4xl font-bold">
          <span className="text-gold-gradient">מראה התפריט</span>
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          כל שינוי חל מיד על עמוד התפריט הציבורי
        </p>
      </div>

      {/* Card with tabs */}
      <Card className="shadow-premium">
        <CardHeader className="pb-0">
          {/* Tab bar */}
          <div
            className="flex gap-1 p-1 rounded-lg"
            style={{ background: "hsl(var(--secondary))" }}
          >
            {TABS.map((t) => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-md text-sm font-medium transition-all"
                  style={
                    active
                      ? { background: "hsl(var(--card))", color: "hsl(var(--gold))", boxShadow: "0 1px 4px rgba(0,0,0,.12)" }
                      : { color: "hsl(var(--muted-foreground))" }
                  }
                >
                  {t.icon}
                  {t.label}
                </button>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-5">
          {/* ── Tab: צבע ── */}
          {tab === "color" && (
            <>
              <div className="space-y-3">
                <Label>צבע ראשי</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={hslToHex(form.theme_primary)}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, theme_primary: hexToHsl(e.target.value) }))
                    }
                    className="h-10 w-10 rounded-lg cursor-pointer border border-border p-0.5 bg-transparent flex-shrink-0"
                    title="בחר צבע"
                  />
                  <div
                    className="flex-1 text-xs text-muted-foreground font-mono bg-secondary rounded-lg px-3 py-2 truncate"
                    dir="ltr"
                  >
                    {form.theme_primary}
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, theme_primary: "hsl(28,62%,42%)" }))}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border hover:border-[hsl(var(--gold))]/40 flex-shrink-0"
                  >
                    ברירת מחדל
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {THEME_PRESETS.map((preset) => {
                    const isActive = form.theme_primary === preset.color;
                    const hex = hslToHex(preset.color);
                    return (
                      <button
                        key={preset.color}
                        type="button"
                        title={preset.label}
                        onClick={() => setForm((f) => ({ ...f, theme_primary: preset.color }))}
                        className="h-7 w-7 rounded-full transition-all flex-shrink-0"
                        style={{
                          backgroundColor: hex,
                          outline: isActive ? `2px solid ${hex}` : "2px solid transparent",
                          outlineOffset: "2px",
                          boxShadow: isActive ? `0 0 8px ${hex}80` : "none",
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-1 border-t border-border/50">
                <div className="flex items-center gap-2.5">
                  {form.theme_dark_mode ? (
                    <Moon className="h-4 w-4 flex-shrink-0" style={{ color: "hsl(var(--gold))" }} />
                  ) : (
                    <Sun className="h-4 w-4 flex-shrink-0" style={{ color: "hsl(var(--accent-bright))" }} />
                  )}
                  <div>
                    <div className="text-sm font-medium">
                      {form.theme_dark_mode ? "מצב כהה" : "מצב בהיר"}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {form.theme_dark_mode
                        ? "רקע כהה — מתאים לאווירה יוקרתית"
                        : "רקע בהיר — מתאים לאווירה קלה"}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, theme_dark_mode: !f.theme_dark_mode }))}
                  className="flex-shrink-0 transition-opacity hover:opacity-80"
                >
                  {form.theme_dark_mode ? (
                    <ToggleRight className="h-9 w-9" style={{ color: "hsl(var(--gold))" }} />
                  ) : (
                    <ToggleLeft className="h-9 w-9 text-muted-foreground" />
                  )}
                </button>
              </div>

              <ThemePreview primary={form.theme_primary} dark={form.theme_dark_mode} />
            </>
          )}

          {/* ── Tab: גופן ── */}
          {tab === "font" && (
            <div className="space-y-3">
              <Label>גופן כותרות ותוכן</Label>
              <div className="grid grid-cols-3 gap-2">
                {FONT_PACKS.map((pack) => {
                  const isActive = form.theme_font_pack === pack.key;
                  return (
                    <button
                      key={pack.key}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, theme_font_pack: pack.key }))}
                      className="flex flex-col items-center gap-1.5 py-5 px-2 rounded-lg border transition-all text-center"
                      style={{
                        borderColor: isActive ? "hsl(var(--gold))" : "hsl(var(--border))",
                        background: isActive ? "hsl(var(--gold),.08)" : "transparent",
                        boxShadow: isActive ? "0 0 0 1px hsl(var(--gold),.3)" : "none",
                      }}
                    >
                      <span
                        className="text-xl leading-none"
                        style={{
                          fontFamily: pack.headingFont,
                          color: isActive ? "hsl(var(--gold))" : "hsl(var(--foreground))",
                        }}
                      >
                        {pack.sample}
                      </span>
                      <span className="text-xs font-medium mt-2">{pack.label}</span>
                      <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                        {pack.key === "elegant" && "סריף + מודרני"}
                        {pack.key === "modern" && "סנס-סריף"}
                        {pack.key === "hebrew" && "עברי מסורתי"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Tab: פריסה ── */}
          {tab === "layout" && (
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                  <Label>פריסת מנות</Label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {MENU_LAYOUTS.map((opt) => {
                    const isActive = form.menu_layout === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, menu_layout: opt.key }))}
                        className="flex items-center gap-2.5 py-3 px-3 rounded-lg border transition-all text-start"
                        style={{
                          borderColor: isActive ? "hsl(var(--gold))" : "hsl(var(--border))",
                          background: isActive ? "hsl(var(--gold),.08)" : "transparent",
                        }}
                      >
                        {opt.key === "grid" ? (
                          <LayoutGrid className="h-4 w-4 flex-shrink-0" style={{ color: isActive ? "hsl(var(--gold))" : "hsl(var(--muted-foreground))" }} />
                        ) : (
                          <List className="h-4 w-4 flex-shrink-0" style={{ color: isActive ? "hsl(var(--gold))" : "hsl(var(--muted-foreground))" }} />
                        )}
                        <div>
                          <div className="text-sm font-medium">{opt.label}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <ImageOff className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                  <Label>סגנון כותרת</Label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {MENU_HERO_STYLES.map((opt) => {
                    const isActive = form.menu_hero_style === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, menu_hero_style: opt.key }))}
                        className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg border transition-all text-center"
                        style={{
                          borderColor: isActive ? "hsl(var(--gold))" : "hsl(var(--border))",
                          background: isActive ? "hsl(var(--gold),.08)" : "transparent",
                        }}
                      >
                        <span className="text-sm font-medium" style={{ color: isActive ? "hsl(var(--gold))" : "hsl(var(--foreground))" }}>
                          {opt.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground leading-tight">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Palette className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                  <Label>סגנון קטגוריות</Label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {MENU_CATEGORY_STYLES.map((opt) => {
                    const isActive = form.menu_category_style === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, menu_category_style: opt.key }))}
                        className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg border transition-all text-center"
                        style={{
                          borderColor: isActive ? "hsl(var(--gold))" : "hsl(var(--border))",
                          background: isActive ? "hsl(var(--gold),.08)" : "transparent",
                        }}
                      >
                        <span className="text-sm font-medium" style={{ color: isActive ? "hsl(var(--gold))" : "hsl(var(--foreground))" }}>
                          {opt.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground leading-tight">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save button */}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="text-white hover:opacity-90 min-w-[120px]"
          style={{ background: saved ? "hsl(142 72% 29%)" : "var(--grad-bronze)" }}
        >
          {saving ? (
            <><Loader2 className="h-4 w-4 animate-spin" />שומר...</>
          ) : saved ? (
            <><Check className="h-4 w-4" />נשמר</>
          ) : (
            <><Save className="h-4 w-4" />שמור שינויים</>
          )}
        </Button>
      </div>
    </div>
  );
}

/* ── Mini theme preview ── */
function ThemePreview({ primary, dark }: { primary: string; dark: boolean }) {
  const theme = buildMenuTheme(primary, dark) as React.CSSProperties;
  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{ ...theme, borderColor: "var(--mt-line2)" }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between gap-3"
        style={{ background: "var(--mt-page)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="h-7 w-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: "var(--mt-grad)" }}
          >
            M
          </div>
          <div>
            <div className="text-xs font-semibold" style={{ color: "var(--mt-text)" }}>שם המסעדה</div>
            <div className="text-[10px]" style={{ color: "var(--mt-text-dim)" }}>תיאור קצר</div>
          </div>
        </div>
        <div
          className="text-[10px] font-medium px-2.5 py-1 rounded-full text-white"
          style={{ background: "var(--mt-grad)" }}
        >
          ₪42
        </div>
      </div>
      <div
        className="px-4 py-2 flex gap-2"
        style={{ background: "var(--mt-section)", borderTop: "1px solid var(--mt-line)" }}
      >
        {["מנות ראשונות", "עיקריות", "קינוחים"].map((cat) => (
          <span
            key={cat}
            className="text-[10px] px-2.5 py-1 rounded-full font-medium"
            style={{
              background: cat === "מנות ראשונות" ? "var(--mt-grad)" : "var(--mt-surface)",
              color: cat === "מנות ראשונות" ? "white" : "var(--mt-text-dim)",
            }}
          >
            {cat}
          </span>
        ))}
      </div>
      <div
        className="px-4 py-3 flex items-center gap-3"
        style={{ background: "var(--mt-card)", borderTop: "1px solid var(--mt-line)" }}
      >
        <div className="h-12 w-12 rounded-lg flex-shrink-0" style={{ background: "var(--mt-surface)" }} />
        <div className="flex-1 space-y-1.5">
          <div className="h-2.5 rounded" style={{ background: "var(--mt-surface)", width: "60%" }} />
          <div className="h-2 rounded" style={{ background: "var(--mt-surface)", width: "80%" }} />
          <div className="h-2 rounded" style={{ background: "var(--mt-surface)", width: "45%" }} />
        </div>
        <div className="text-[10px] font-semibold flex-shrink-0" style={{ color: "var(--mt-gold)" }}>₪68</div>
      </div>
    </div>
  );
}
