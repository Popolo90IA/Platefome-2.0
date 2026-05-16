"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/upload/ImageUpload";
import { UPLOAD_FOLDERS } from "@/lib/constants";
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
  Image as ImageIcon,
  ToggleLeft,
  ToggleRight,
  Sparkles,
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

type DesignTab = "color" | "font" | "layout" | "images";

type DesignForm = {
  theme_primary: string;
  theme_dark_mode: boolean;
  theme_font_pack: string;
  menu_layout: string;
  menu_hero_style: string;
  menu_category_style: string;
  logo_url: string | null;
  banner_url: string | null;
  /* read-only in design — needed for live preview */
  name: string;
  description: string;
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
    logo_url: null,
    banner_url: null,
    name: "",
    description: "",
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
          logo_url: data.logo_url,
          banner_url: data.banner_url,
          name: data.name ?? "",
          description: data.description ?? "",
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
        logo_url: form.logo_url,
        banner_url: form.banner_url,
      })
      .eq("id", restaurant.id);
    setSaving(false);
    if (err) { setError(err.message); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const TABS: { key: DesignTab; label: string; icon: React.ReactNode }[] = [
    { key: "color",  label: "צבע",    icon: <Palette className="h-3.5 w-3.5" /> },
    { key: "font",   label: "גופן",   icon: <Type className="h-3.5 w-3.5" /> },
    { key: "layout", label: "פריסה",  icon: <LayoutGrid className="h-3.5 w-3.5" /> },
    { key: "images", label: "תמונות", icon: <ImageIcon className="h-3.5 w-3.5" /> },
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
    <div className="animate-fade-up max-w-5xl">
      {/* Header */}
      <div className="mb-8">
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

      {/* Two-column layout: settings + live preview */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

        {/* Left — tabs card + save */}
        <div className="space-y-4">
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
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-md text-xs font-medium transition-all"
                      style={
                        active
                          ? { background: "hsl(var(--card))", color: "hsl(var(--gold))", boxShadow: "0 1px 4px rgba(0,0,0,.12)" }
                          : { color: "hsl(var(--muted-foreground))" }
                      }
                    >
                      {t.icon}
                      <span className="hidden sm:inline">{t.label}</span>
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

              {/* ── Tab: תמונות ── */}
              {tab === "images" && (
                <div className="space-y-6">
                  <p className="text-sm text-muted-foreground">
                    הלוגו מופיע עגול · הבאנר מופיע בראש הדף בגודל מלא
                  </p>
                  <ImageUpload
                    label="לוגו"
                    folder={UPLOAD_FOLDERS.LOGOS}
                    currentImage={form.logo_url}
                    onUploadComplete={(url) => setForm((f) => ({ ...f, logo_url: url }))}
                  />
                  <ImageUpload
                    label="באנר"
                    folder={UPLOAD_FOLDERS.BANNERS}
                    currentImage={form.banner_url}
                    onUploadComplete={(url) => setForm((f) => ({ ...f, banner_url: url }))}
                    previewMeta={{ logoUrl: form.logo_url, restaurantName: form.name }}
                  />
                </div>
              )}

            </CardContent>
          </Card>

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

        {/* Right — live preview */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-3 h-fit">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" style={{ color: "hsl(var(--gold))" }} />
            <span className="font-medium">תצוגת לקוח בזמן אמת</span>
          </div>
          <LivePreview form={form} />
        </div>

      </div>
    </div>
  );
}

/* ── Live preview ── */
function LivePreview({
  form,
}: {
  form: {
    name: string;
    description: string;
    logo_url: string | null;
    banner_url: string | null;
  };
}) {
  return (
    <div className="rounded-2xl overflow-hidden bg-background border border-border shadow-premium">
      {/* Mock browser chrome */}
      <div
        className="px-4 py-2 flex items-center gap-1.5"
        style={{ background: "hsl(var(--deep))" }}
      >
        <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        <div className="flex-1 mx-3">
          <div
            className="text-xs text-white/40 rounded px-2 py-0.5 text-center truncate"
            style={{ background: "hsl(var(--abyss) / .5)" }}
            dir="ltr"
          >
            /menu/{slugifySimple(form.name) || "..."}
          </div>
        </div>
      </div>

      <div className="max-h-[540px] overflow-y-auto scrollbar-thin">
        {/* Banner */}
        {form.banner_url ? (
          <div className="relative w-full overflow-hidden" style={{ background: "hsl(var(--deep))" }}>
            <div
              className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-50"
              style={{ backgroundImage: `url(${form.banner_url})` }}
            />
            <div className="relative flex items-center justify-center max-h-[200px]">
              <img
                src={form.banner_url}
                alt="banner"
                className="w-full h-auto max-h-[200px] object-contain"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
          </div>
        ) : (
          <div className="h-24 relative overflow-hidden" style={{ background: "hsl(var(--deep))" }}>
            <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xs">
              אין באנר
            </div>
          </div>
        )}

        {/* Info card */}
        <div className="px-4 -mt-10 relative z-10">
          <div className="bg-card rounded-xl shadow-premium p-4 flex flex-col items-center gap-3 text-center">
            {form.logo_url ? (
              <img
                src={form.logo_url}
                alt="logo"
                className="rounded-full object-cover ring-4 ring-[hsl(var(--gold))]/30 shadow-premium bg-card"
                style={{ height: 64, width: 64 }}
              />
            ) : (
              <div
                className="rounded-full ring-4 ring-[hsl(var(--gold))]/20 flex items-center justify-center"
                style={{ height: 64, width: 64, background: "var(--grad-bronze)" }}
              >
                <span className="text-xl font-bold text-white font-serif-display">
                  {form.name.charAt(0) || "?"}
                </span>
              </div>
            )}
            <div className="min-w-0 w-full">
              <h1 className="font-serif-display text-lg font-bold truncate">
                {form.name || "שם המסעדה"}
              </h1>
              <div className="divider-gold w-12 my-2 mx-auto" />
              {form.description && (
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {form.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Mock menu items */}
        <div className="p-4 pt-5">
          <div className="text-center mb-4">
            <h2 className="font-serif-display text-base font-bold">תפריט</h2>
            <div className="divider-gold w-8 mx-auto mt-1.5" />
          </div>
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-card border border-border/60">
                <div className="h-12 w-12 rounded-md bg-secondary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <div className="h-3 bg-secondary rounded w-16" />
                    <div className="h-3 bg-secondary rounded w-10 flex-shrink-0" />
                  </div>
                  <div className="h-2 bg-secondary/70 rounded w-full mb-1" />
                  <div className="h-2 bg-secondary/50 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mini theme preview strip ── */
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

function slugifySimple(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 24);
}
