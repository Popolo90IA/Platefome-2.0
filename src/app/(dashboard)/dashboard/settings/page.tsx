"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/upload/ImageUpload";
import { slugify } from "@/lib/utils";
import { UPLOAD_FOLDERS } from "@/lib/constants";
import {
  Loader2,
  Save,
  Check,
  Eye,
  EyeOff,
  ExternalLink,
  Sparkles,
  Lock,
  AlertCircle,
} from "lucide-react";
import type { Restaurant } from "@/types/database.types";

export default function SettingsPage() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    description_en: "",
    description_fr: "",
    address: "",
    phone: "",
    email: "",
    logo_url: null as string | null,
    banner_url: null as string | null,
    languages: ["he"] as string[],
    default_language: "he",
    currency: "ILS",
  });
  const supabase = createClient();

  // Password change state
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [showPw, setShowPw] = useState({ current: false, next: false, confirm: false });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    if (pwForm.next.length < 6) {
      setPwError("הסיסמה חייבת להכיל לפחות 6 תווים");
      return;
    }
    if (pwForm.next !== pwForm.confirm) {
      setPwError("הסיסמאות אינן תואמות");
      return;
    }
    setPwSaving(true);
    // Re-authenticate with current password first
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: pwForm.current,
      });
      if (signInError) {
        setPwError("הסיסמה הנוכחית שגויה");
        setPwSaving(false);
        return;
      }
    }
    const { error } = await supabase.auth.updateUser({ password: pwForm.next });
    if (error) {
      setPwError(error.message);
    } else {
      setPwSaved(true);
      setPwForm({ current: "", next: "", confirm: "" });
      setTimeout(() => setPwSaved(false), 3000);
    }
    setPwSaving(false);
  };

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setRestaurant(data);
        setForm({
          name: data.name,
          slug: data.slug,
          description: data.description ?? "",
          description_en: data.description_en ?? "",
          description_fr: data.description_fr ?? "",
          address: data.address ?? "",
          phone: data.phone ?? "",
          email: data.email ?? "",
          logo_url: data.logo_url,
          banner_url: data.banner_url,
          languages: data.languages ?? ["he"],
          default_language: data.default_language ?? "he",
          currency: data.currency ?? "ILS",
        });
      }
      setLoading(false);
    };
    load();
  }, [supabase]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setForm((f) => ({
      ...f,
      name,
      slug: !restaurant ? slugify(name) : f.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("לא מחובר");
      setSaving(false);
      return;
    }

    const payload = {
      user_id: user.id,
      name: form.name,
      slug: form.slug,
      description: form.description || null,
      description_en: form.description_en || null,
      description_fr: form.description_fr || null,
      address: form.address || null,
      phone: form.phone || null,
      email: form.email || null,
      logo_url: form.logo_url,
      banner_url: form.banner_url,
      languages: form.languages.length > 0 ? form.languages : ["he"],
      default_language: form.languages.includes(form.default_language)
        ? form.default_language
        : form.languages[0] ?? "he",
      currency: form.currency,
    };

    let result;
    if (restaurant) {
      result = await supabase
        .from("restaurants")
        .update(payload)
        .eq("id", restaurant.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from("restaurants")
        .insert(payload)
        .select()
        .single();
    }

    if (result.error) {
      setError(result.error.message);
    } else {
      setRestaurant(result.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-up">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-4xl font-bold">
            הגדרות המסעדה
          </h1>
          <p className="text-muted-foreground mt-2">
            נהל את פרטי המסעדה והתצוגה הציבורית
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPreview((v) => !v)}
          >
            {showPreview ? (
              <>
                <EyeOff className="h-4 w-4" />
                הסתר תצוגה
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                הצג תצוגה
              </>
            )}
          </Button>
          {restaurant && (
            <Link href={`/menu/${restaurant.slug}`} target="_blank">
              <Button className="bg-gold-gradient hover:opacity-90 shadow-gold-glow">
                <ExternalLink className="h-4 w-4" />
                פתח בלשונית
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div
        className={`grid gap-6 ${
          showPreview ? "lg:grid-cols-[1fr_420px]" : "grid-cols-1"
        }`}
      >
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="shadow-premium">
            <CardHeader>
              <CardTitle className="font-serif-display text-xl">
                פרטי מסעדה
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">שם המסעדה *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={handleNameChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">כתובת (slug) *</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, slug: slugify(e.target.value) }))
                  }
                  required
                  dir="ltr"
                />
                <p className="text-xs text-muted-foreground">
                  התפריט שלך יהיה זמין ב־
                  <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground/80">
                    /menu/{form.slug || "..."}
                  </code>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">תיאור</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={3}
                  placeholder="כמה מילים על המסעדה, אווירה, סגנון..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">כתובת</Label>
                  <Input
                    id="address"
                    value={form.address}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, address: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">טלפון</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">אימייל ליצירת קשר</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  dir="ltr"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-premium">
            <CardHeader>
              <CardTitle className="font-serif-display text-xl">
                שפות ומטבע
              </CardTitle>
              <p className="text-sm text-muted-foreground pt-1">
                בחר אילו שפות יוצגו ללקוח, איזו ברירת מחדל ובאיזה מטבע
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>שפות זמינות</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { code: "he", flag: "🇮🇱", label: "עברית" },
                    { code: "en", flag: "🇬🇧", label: "English" },
                    { code: "fr", flag: "🇫🇷", label: "Français" },
                  ].map((l) => {
                    const active = form.languages.includes(l.code);
                    return (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setForm((f) => {
                            const has = f.languages.includes(l.code);
                            let next = has
                              ? f.languages.filter((x) => x !== l.code)
                              : [...f.languages, l.code];
                            if (next.length === 0) next = ["he"];
                            const defaultLang = next.includes(f.default_language)
                              ? f.default_language
                              : next[0];
                            return {
                              ...f,
                              languages: next,
                              default_language: defaultLang,
                            };
                          });
                        }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                          active
                            ? "bg-gold-gradient text-white border-transparent shadow-gold-glow"
                            : "bg-card text-foreground/70 border-border hover:border-[hsl(var(--gold))]/40"
                        }`}
                      >
                        <span className="text-lg leading-none">{l.flag}</span>
                        {l.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>שפת ברירת מחדל</Label>
                  <select
                    value={form.default_language}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        default_language: e.target.value,
                      }))
                    }
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
                  >
                    {form.languages.map((code) => (
                      <option key={code} value={code}>
                        {code === "he"
                          ? "עברית"
                          : code === "en"
                            ? "English"
                            : "Français"}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>מטבע</Label>
                  <select
                    value={form.currency}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, currency: e.target.value }))
                    }
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
                    dir="ltr"
                  >
                    <option value="ILS">₪ ILS — שקל</option>
                    <option value="EUR">€ EUR — אירו</option>
                    <option value="USD">$ USD — דולר</option>
                    <option value="GBP">£ GBP — לירה שטרלינג</option>
                  </select>
                </div>
              </div>

              {form.languages.includes("en") && (
                <div className="space-y-2">
                  <Label htmlFor="desc_en" dir="ltr">
                    🇬🇧 Description (English)
                  </Label>
                  <Textarea
                    id="desc_en"
                    dir="ltr"
                    rows={2}
                    value={form.description_en}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        description_en: e.target.value,
                      }))
                    }
                    placeholder="A short description in English"
                  />
                </div>
              )}
              {form.languages.includes("fr") && (
                <div className="space-y-2">
                  <Label htmlFor="desc_fr" dir="ltr">
                    🇫🇷 Description (Français)
                  </Label>
                  <Textarea
                    id="desc_fr"
                    dir="ltr"
                    rows={2}
                    value={form.description_fr}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        description_fr: e.target.value,
                      }))
                    }
                    placeholder="Une courte description en français"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-premium">
            <CardHeader>
              <CardTitle className="font-serif-display text-xl">
                תמונות
              </CardTitle>
              <p className="text-sm text-muted-foreground pt-1">
                הלוגו מופיע עגול • הבאנר מופיע בראש הדף בגודל מלא ללא חיתוך
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ImageUpload
                label="לוגו"
                folder={UPLOAD_FOLDERS.LOGOS}
                currentImage={form.logo_url}
                onUploadComplete={(url) =>
                  setForm((f) => ({ ...f, logo_url: url }))
                }
              />
              <ImageUpload
                label="באנר"
                folder={UPLOAD_FOLDERS.BANNERS}
                currentImage={form.banner_url}
                onUploadComplete={(url) =>
                  setForm((f) => ({ ...f, banner_url: url }))
                }
              />
            </CardContent>
          </Card>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3.5 rounded-xl border border-destructive/20">
              {error}
            </div>
          )}

          <div className="flex gap-2 sticky bottom-4 z-10">

            <Button
              type="submit"
              disabled={saving}
              size="lg"
              className="bg-gold-gradient hover:opacity-90 shadow-gold-glow"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : saved ? (
                <>
                  <Check className="h-4 w-4" />
                  נשמר!
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  שמור שינויים
                </>
              )}
            </Button>
          </div>
        </form>

        {/* ── Password Change ── */}
        <form onSubmit={handlePasswordChange} className="space-y-6">
          <Card className="shadow-premium">
            <CardHeader>
              <CardTitle className="font-serif-display text-xl flex items-center gap-2">
                <Lock className="h-5 w-5 text-[hsl(var(--gold))]" />
                שינוי סיסמה
              </CardTitle>
              <p className="text-sm text-muted-foreground pt-1">
                עדכן את הסיסמה שלך לחשבון
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current password */}
              <div className="space-y-2">
                <Label htmlFor="pw_current">סיסמה נוכחית</Label>
                <div className="relative">
                  <Input
                    id="pw_current"
                    type={showPw.current ? "text" : "password"}
                    value={pwForm.current}
                    onChange={(e) => setPwForm((f) => ({ ...f, current: e.target.value }))}
                    placeholder="••••••••"
                    required
                    dir="ltr"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => ({ ...s, current: !s.current }))}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPw.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* New password */}
              <div className="space-y-2">
                <Label htmlFor="pw_next">סיסמה חדשה</Label>
                <div className="relative">
                  <Input
                    id="pw_next"
                    type={showPw.next ? "text" : "password"}
                    value={pwForm.next}
                    onChange={(e) => setPwForm((f) => ({ ...f, next: e.target.value }))}
                    placeholder="לפחות 6 תווים"
                    required
                    dir="ltr"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => ({ ...s, next: !s.next }))}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPw.next ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div className="space-y-2">
                <Label htmlFor="pw_confirm">אימות סיסמה חדשה</Label>
                <div className="relative">
                  <Input
                    id="pw_confirm"
                    type={showPw.confirm ? "text" : "password"}
                    value={pwForm.confirm}
                    onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))}
                    placeholder="חזור על הסיסמה החדשה"
                    required
                    dir="ltr"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => ({ ...s, confirm: !s.confirm }))}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPw.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {pwError && (
                <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-3.5 rounded-xl border border-destructive/20">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{pwError}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={pwSaving || !pwForm.current || !pwForm.next || !pwForm.confirm}
                className="bg-gold-gradient hover:opacity-90 shadow-gold-glow"
              >
                {pwSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : pwSaved ? (
                  <>
                    <Check className="h-4 w-4" />
                    הסיסמה עודכנה!
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    עדכן סיסמה
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </form>

        {/* Live Preview */}
        {showPreview && (
          <div className="lg:sticky lg:top-24 lg:self-start space-y-3 h-fit">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-[hsl(var(--gold))]" />
              <span className="font-medium">תצוגת לקוח בזמן אמת</span>
            </div>
            <LivePreview form={form} />
          </div>
        )}
      </div>
    </div>
  );
}

function LivePreview({
  form,
}: {
  form: {
    name: string;
    description: string;
    logo_url: string | null;
    banner_url: string | null;
    address: string;
    phone: string;
  };
}) {
  return (
    <div className="rounded-2xl overflow-hidden bg-background border border-border shadow-premium">
      {/* Mock phone frame header */}
      <div className="bg-charcoal-gradient px-4 py-2 flex items-center gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        <div className="flex-1 text-center">
          <div className="text-xs text-white/50" dir="ltr">
            /menu/{form.name ? "..." : "..."}
          </div>
        </div>
      </div>

      <div className="max-h-[600px] overflow-y-auto scrollbar-thin">
        {/* Banner */}
        {form.banner_url ? (
          <div className="relative w-full bg-charcoal-gradient overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-50"
              style={{ backgroundImage: `url(${form.banner_url})` }}
            />
            <div className="relative flex items-center justify-center max-h-[280px]">
              <img
                src={form.banner_url}
                alt="banner preview"
                className="w-full h-auto max-h-[280px] object-contain"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
          </div>
        ) : (
          <div className="h-32 bg-charcoal-gradient relative overflow-hidden">
            <div className="absolute inset-0 bg-grain opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center text-white/40 text-xs">
              אין באנר
            </div>
          </div>
        )}

        {/* Info card */}
        <div className="px-4 -mt-12 relative z-10">
          <div className="bg-card rounded-xl shadow-premium p-4 flex flex-col items-center gap-3 text-center">
            {form.logo_url ? (
              <img
                src={form.logo_url}
                alt="logo preview"
                className="h-20 w-20 rounded-full object-cover ring-4 ring-[hsl(var(--gold))]/30 shadow-gold-glow bg-card"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-gold-gradient ring-4 ring-[hsl(var(--gold))]/20 shadow-gold-glow flex items-center justify-center">
                <span className="text-2xl font-bold text-white font-serif-display">
                  {form.name.charAt(0) || "?"}
                </span>
              </div>
            )}
            <div className="min-w-0 w-full">
              <h1 className="font-serif-display text-xl font-bold truncate">
                {form.name || "שם המסעדה"}
              </h1>
              <div className="divider-gold w-16 my-2 mx-auto" />
              {form.description && (
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {form.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Mock menu section */}
        <div className="p-4 pt-6">
          <div className="text-center mb-4">
            <h2 className="font-serif-display text-xl font-bold">תפריט</h2>
            <div className="divider-gold w-12 mx-auto mt-1.5" />
          </div>

          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex gap-3 p-3 rounded-lg bg-card border border-border/60"
              >
                <div className="h-16 w-16 rounded-md bg-secondary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <div className="h-3 bg-secondary rounded w-24" />
                    <div className="h-3 bg-[hsl(var(--gold))]/30 rounded w-10" />
                  </div>
                  <div className="h-2 bg-secondary/60 rounded w-full mb-1" />
                  <div className="h-2 bg-secondary/60 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>

          {(form.address || form.phone) && (
            <div className="mt-6 pt-4 border-t border-border/60 text-xs text-muted-foreground space-y-1 text-center">
              {form.address && <div>{form.address}</div>}
              {form.phone && <div dir="ltr">{form.phone}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
