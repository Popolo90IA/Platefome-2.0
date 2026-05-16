"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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
  Smartphone,
  Monitor,
} from "lucide-react";
import {
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
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("mobile");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeReady = useRef(false);

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

  /* Listen for iframe ready signal */
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.__plateform_ready) {
        iframeReady.current = true;
        sendPreview(form);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const sendPreview = useCallback((f: DesignForm) => {
    iframeRef.current?.contentWindow?.postMessage(
      { __plateform_preview: {
        theme_primary: f.theme_primary,
        theme_dark_mode: f.theme_dark_mode,
        theme_font_pack: f.theme_font_pack,
        menu_layout: f.menu_layout,
        menu_hero_style: f.menu_hero_style,
        menu_category_style: f.menu_category_style,
      }},
      "*"
    );
  }, []);

  /* Push updates to iframe on every form change */
  const updateForm = useCallback((patch: Partial<DesignForm>) => {
    setForm((prev) => {
      const next = { ...prev, ...patch };
      if (iframeReady.current) sendPreview(next);
      return next;
    });
  }, [sendPreview]);

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

  const menuUrl = restaurant?.slug ? `/menu/${restaurant.slug}?preview=1` : null;

  return (
    <div className="animate-fade-up" style={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: 24, height: "calc(100vh - 80px)", alignItems: "start" }}>

      {/* Left — controls */}
      <div className="space-y-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 80px)", paddingRight: 4 }}>
        {/* Header */}
        <div>
          <p className="font-mono uppercase text-xs mb-1" style={{ letterSpacing: ".1em", color: "hsl(var(--accent-bright))" }}>עיצוב</p>
          <h1 className="font-serif-display text-3xl font-bold"><span className="text-gold-gradient">מראה התפריט</span></h1>
          <p className="text-muted-foreground mt-1 text-xs">השינויים מופיעים בתצוגה המקדימה מיד · שמור כדי להחיל על הלקוחות</p>
        </div>

        <Card className="shadow-premium">
          <CardHeader className="pb-0">
            <div className="flex gap-1 p-1 rounded-lg" style={{ background: "hsl(var(--secondary))" }}>
              {TABS.map((t) => {
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTab(t.key)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-md text-xs font-medium transition-all"
                    style={active ? { background: "hsl(var(--card))", color: "hsl(var(--gold))", boxShadow: "0 1px 4px rgba(0,0,0,.12)" } : { color: "hsl(var(--muted-foreground))" }}
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
                      onChange={(e) => updateForm({ theme_primary: hexToHsl(e.target.value) })}
                      className="h-10 w-10 rounded-lg cursor-pointer border border-border p-0.5 bg-transparent flex-shrink-0"
                      title="בחר צבע"
                    />
                    <div className="flex-1 text-xs text-muted-foreground font-mono bg-secondary rounded-lg px-3 py-2 truncate" dir="ltr">
                      {form.theme_primary}
                    </div>
                    <button
                      type="button"
                      onClick={() => updateForm({ theme_primary: "hsl(28,62%,42%)" })}
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
                          onClick={() => updateForm({ theme_primary: preset.color })}
                          className="h-7 w-7 rounded-full transition-all flex-shrink-0"
                          style={{ backgroundColor: hex, outline: isActive ? `2px solid ${hex}` : "2px solid transparent", outlineOffset: "2px", boxShadow: isActive ? `0 0 8px ${hex}80` : "none" }}
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
                      <div className="text-sm font-medium">{form.theme_dark_mode ? "מצב כהה" : "מצב בהיר"}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {form.theme_dark_mode ? "רקע כהה — מתאים לאווירה יוקרתית" : "רקע בהיר — מתאים לאווירה קלה"}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateForm({ theme_dark_mode: !form.theme_dark_mode })}
                    className="flex-shrink-0 transition-opacity hover:opacity-80"
                  >
                    {form.theme_dark_mode ? (
                      <ToggleRight className="h-9 w-9" style={{ color: "hsl(var(--gold))" }} />
                    ) : (
                      <ToggleLeft className="h-9 w-9 text-muted-foreground" />
                    )}
                  </button>
                </div>
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
                        onClick={() => updateForm({ theme_font_pack: pack.key })}
                        className="flex flex-col items-center gap-1.5 py-5 px-2 rounded-lg border transition-all text-center"
                        style={{ borderColor: isActive ? "hsl(var(--gold))" : "hsl(var(--border))", background: isActive ? "hsl(var(--gold),.08)" : "transparent", boxShadow: isActive ? "0 0 0 1px hsl(var(--gold),.3)" : "none" }}
                      >
                        <span className="text-xl leading-none" style={{ fontFamily: pack.headingFont, color: isActive ? "hsl(var(--gold))" : "hsl(var(--foreground))" }}>
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
                          onClick={() => updateForm({ menu_layout: opt.key })}
                          className="flex items-center gap-2.5 py-3 px-3 rounded-lg border transition-all text-start"
                          style={{ borderColor: isActive ? "hsl(var(--gold))" : "hsl(var(--border))", background: isActive ? "hsl(var(--gold),.08)" : "transparent" }}
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
                          onClick={() => updateForm({ menu_hero_style: opt.key })}
                          className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg border transition-all text-center"
                          style={{ borderColor: isActive ? "hsl(var(--gold))" : "hsl(var(--border))", background: isActive ? "hsl(var(--gold),.08)" : "transparent" }}
                        >
                          <span className="text-sm font-medium" style={{ color: isActive ? "hsl(var(--gold))" : "hsl(var(--foreground))" }}>{opt.label}</span>
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
                          onClick={() => updateForm({ menu_category_style: opt.key })}
                          className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg border transition-all text-center"
                          style={{ borderColor: isActive ? "hsl(var(--gold))" : "hsl(var(--border))", background: isActive ? "hsl(var(--gold),.08)" : "transparent" }}
                        >
                          <span className="text-sm font-medium" style={{ color: isActive ? "hsl(var(--gold))" : "hsl(var(--foreground))" }}>{opt.label}</span>
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
                <p className="text-sm text-muted-foreground">הלוגו מופיע עגול · הבאנר מופיע בראש הדף בגודל מלא</p>
                <ImageUpload
                  label="לוגו"
                  folder={UPLOAD_FOLDERS.LOGOS}
                  currentImage={form.logo_url}
                  onUploadComplete={(url) => updateForm({ logo_url: url })}
                />
                <ImageUpload
                  label="באנר"
                  folder={UPLOAD_FOLDERS.BANNERS}
                  currentImage={form.banner_url}
                  onUploadComplete={(url) => updateForm({ banner_url: url })}
                  previewMeta={{ logoUrl: form.logo_url, restaurantName: form.name }}
                />
              </div>
            )}

          </CardContent>
        </Card>

        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="flex justify-end pb-6">
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

      {/* Right — live iframe preview */}
      <div className="flex flex-col gap-3" style={{ height: "calc(100vh - 80px)", position: "sticky", top: 0 }}>
        {/* Preview toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span
              className="inline-block h-2 w-2 rounded-full animate-pulse"
              style={{ background: "hsl(var(--gold))" }}
            />
            <span className="font-medium text-xs">תצוגה חיה — השינויים מופיעים מיד</span>
          </div>
          <div className="flex gap-1 p-1 rounded-lg" style={{ background: "hsl(var(--secondary))" }}>
            <button
              type="button"
              onClick={() => setPreviewMode("mobile")}
              className="p-1.5 rounded-md transition-colors"
              style={previewMode === "mobile" ? { background: "var(--grad-bronze)", color: "white" } : { color: "hsl(var(--muted-foreground))" }}
              title="מובייל"
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode("desktop")}
              className="p-1.5 rounded-md transition-colors"
              style={previewMode === "desktop" ? { background: "var(--grad-bronze)", color: "white" } : { color: "hsl(var(--muted-foreground))" }}
              title="דסקטופ"
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Frame container */}
        <div className="flex-1 flex items-start justify-center overflow-hidden">
          {!menuUrl ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            <div
              className="relative overflow-hidden shadow-premium transition-all duration-300"
              style={{
                width: previewMode === "mobile" ? 375 : "100%",
                height: previewMode === "mobile" ? 720 : "100%",
                borderRadius: previewMode === "mobile" ? 32 : 12,
                border: previewMode === "mobile"
                  ? "8px solid hsl(var(--line))"
                  : "1px solid hsl(var(--line))",
                flexShrink: 0,
              }}
            >
              {previewMode === "mobile" && (
                <div
                  className="absolute top-2 left-1/2 -translate-x-1/2 z-10 rounded-full"
                  style={{ width: 80, height: 5, background: "hsl(var(--line))" }}
                />
              )}
              <iframe
                ref={iframeRef}
                src={menuUrl}
                className="w-full h-full border-0"
                style={{ borderRadius: previewMode === "mobile" ? 26 : 10 }}
                title="תצוגה מקדימה חיה"
                onLoad={() => {
                  /* If iframe loaded but ready signal hasn't arrived yet, send after short delay */
                  setTimeout(() => {
                    if (!iframeReady.current) {
                      iframeReady.current = true;
                      sendPreview(form);
                    }
                  }, 500);
                }}
              />
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

