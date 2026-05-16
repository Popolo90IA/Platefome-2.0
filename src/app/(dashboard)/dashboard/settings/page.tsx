"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { slugify } from "@/lib/utils";
import {
  Loader2,
  Save,
  Check,
  Eye,
  EyeOff,
  ExternalLink,
  Lock,
  AlertCircle,
  Store,
  Globe,
  Bell,
  AlertTriangle,
  User,
  ToggleLeft,
  ToggleRight,
  Crown,
} from "lucide-react";
import type { Restaurant } from "@/types/database.types";

type FormState = {
  name: string;
  slug: string;
  description: string;
  description_en: string;
  description_fr: string;
  address: string;
  phone: string;
  email: string;
  languages: string[];
  default_language: string;
  currency: string;
  theme_primary: string;
  theme_dark_mode: boolean;
};

/* ─── tiny section-icon helper ─── */
function SectionIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="h-7 w-7 rounded-md flex items-center justify-center text-white flex-shrink-0"
      style={{ background: "var(--grad-bronze)" }}
    >
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* account info */
  const [userEmail, setUserEmail] = useState<string>("");
  const [userCreatedAt, setUserCreatedAt] = useState<string>("");

  /* menu visibility */
  const [isActive, setIsActive] = useState(true);

  /* form */
  const [form, setForm] = useState<FormState>({
    name: "",
    slug: "",
    description: "",
    description_en: "",
    description_fr: "",
    address: "",
    phone: "",
    email: "",
    languages: ["he"] as string[],
    default_language: "he",
    currency: "ILS",
    theme_primary: "hsl(28,62%,42%)",
    theme_dark_mode: true,
  });
  const supabase = createClient();

  /* password */
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [showPw, setShowPw] = useState({ current: false, next: false, confirm: false });

  /* danger zone */
  const [dangerConfirm, setDangerConfirm] = useState("");
  const [deactivating, setDeactivating] = useState(false);
  const [deactivateSuccess, setDeactivateSuccess] = useState(false);
  const deactivateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* notifications */
  const [notifWeekly, setNotifWeekly] = useState(false);

  /* ─── load ─── */
  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUserEmail(user.email ?? "");
      if (user.created_at) {
        setUserCreatedAt(
          new Date(user.created_at).toLocaleDateString("he-IL", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
      }

      const { data } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setRestaurant(data);
        setIsActive((data as { is_active?: boolean }).is_active !== false);
        setForm({
          name: data.name,
          slug: data.slug,
          description: data.description ?? "",
          description_en: data.description_en ?? "",
          description_fr: data.description_fr ?? "",
          address: data.address ?? "",
          phone: data.phone ?? "",
          email: data.email ?? "",
          languages: data.languages ?? ["he"],
          default_language: data.default_language ?? "he",
          currency: data.currency ?? "ILS",
          theme_primary: data.theme_primary ?? "hsl(28,62%,42%)",
          theme_dark_mode: data.theme_dark_mode ?? true,
        });
      }
      setLoading(false);
    };
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─── handlers ─── */
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

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("לא מחובר"); setSaving(false); return; }

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
      languages: form.languages.length > 0 ? form.languages : ["he"],
      default_language: form.languages.includes(form.default_language)
        ? form.default_language
        : form.languages[0] ?? "he",
      currency: form.currency,
      is_active: isActive,
    };

    let result;
    if (restaurant) {
      result = await supabase
        .from("restaurants").update(payload).eq("id", restaurant.id).select().single();
    } else {
      result = await supabase
        .from("restaurants").insert(payload).select().single();
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    setRestaurant(result.data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setSaving(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    if (pwForm.next.length < 6) { setPwError("הסיסמה חייבת להכיל לפחות 6 תווים"); return; }
    if (pwForm.next !== pwForm.confirm) { setPwError("הסיסמאות אינן תואמות"); return; }
    setPwSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: pwForm.current,
      });
      if (signInError) { setPwError("הסיסמה הנוכחית שגויה"); setPwSaving(false); return; }
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

  const handleDeactivate = async () => {
    if (!restaurant) return;
    setDeactivating(true);
    await supabase.from("restaurants").update({ is_active: false }).eq("id", restaurant.id);
    setIsActive(false);
    setDeactivating(false);
    setDangerConfirm("");
    setDeactivateSuccess(true);
    if (deactivateTimerRef.current) clearTimeout(deactivateTimerRef.current);
    deactivateTimerRef.current = setTimeout(() => setDeactivateSuccess(false), 4000);
  };

  /* ─── loading ─── */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
      </div>
    );
  }

  /* ─── page ─── */
  return (
    <div className="max-w-5xl mx-auto animate-fade-up">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-4xl font-bold">
            <span className="text-gold-gradient">הגדרות המסעדה</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            נהל את פרטי המסעדה
          </p>
        </div>
        {restaurant && (
          <Link href={`/menu/${restaurant.slug}`} target="_blank">
            <Button className="hover:opacity-90 text-white" style={{ background: "var(--grad-bronze)" }}>
              <ExternalLink className="h-4 w-4" />
              פתח תפריט
            </Button>
          </Link>
        )}
      </div>

      <div className="max-w-2xl space-y-6">

          {/* ── Account info ── */}
          <Card className="shadow-premium">
            <CardHeader>
              <CardTitle className="font-serif-display text-xl flex items-center gap-2.5">
                <SectionIcon><User className="h-3.5 w-3.5" /></SectionIcon>
                חשבון
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4 py-3 border-b border-border/50">
                <div>
                  <div className="text-sm font-medium">כתובת אימייל</div>
                  <div className="text-xs text-muted-foreground mt-0.5" dir="ltr">{userEmail || "—"}</div>
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full text-white"
                  style={{ background: "var(--grad-bronze)" }}
                >
                  חינם
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-3 border-b border-border/50">
                <div>
                  <div className="text-sm font-medium">חבר מאז</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{userCreatedAt || "—"}</div>
                </div>
              </div>

              {/* Plan upgrade banner */}
              <div
                className="rounded-xl p-4 flex items-center justify-between gap-3"
                style={{ background: "hsl(var(--gold) / .08)", border: "1px solid hsl(var(--gold) / .2)" }}
              >
                <div className="flex items-center gap-2.5">
                  <Crown className="h-5 w-5 flex-shrink-0" style={{ color: "hsl(var(--gold))" }} />
                  <div>
                    <div className="text-sm font-semibold">שדרג ל-Pro</div>
                    <div className="text-xs text-muted-foreground">תמונות 3D · אנליטיקס · QR מותאם</div>
                  </div>
                </div>
                <Link href="/dashboard/billing">
                  <Button
                    size="sm"
                    className="text-white text-xs hover:opacity-90 flex-shrink-0"
                    style={{ background: "var(--grad-bronze)" }}
                  >
                    שדרג
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* ── Restaurant profile ── */}
          <form onSubmit={handleSubmit} className="space-y-6" id="profile-form">
            <Card className="shadow-premium">
              <CardHeader>
                <CardTitle className="font-serif-display text-xl flex items-center gap-2.5">
                  <SectionIcon><Store className="h-3.5 w-3.5" /></SectionIcon>
                  פרטי מסעדה
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">שם המסעדה *</Label>
                  <Input id="name" value={form.name} onChange={handleNameChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">כתובת URL *</Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                    required
                    dir="ltr"
                  />
                  <p className="text-xs text-muted-foreground">
                    התפריט זמין ב־
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
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
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
                      onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">טלפון</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
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
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    dir="ltr"
                  />
                </div>
              </CardContent>
            </Card>

            {/* ── Languages & currency ── */}
            <Card className="shadow-premium">
              <CardHeader>
                <CardTitle className="font-serif-display text-xl flex items-center gap-2.5">
                  <SectionIcon><Globe className="h-3.5 w-3.5" /></SectionIcon>
                  שפות ומטבע
                </CardTitle>
                <p className="text-sm text-muted-foreground pt-1">
                  בחר אילו שפות יוצגו ללקוח ובאיזה מטבע
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
                              return { ...f, languages: next, default_language: defaultLang };
                            });
                          }}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                            active
                              ? "text-white border-transparent"
                              : "bg-card text-foreground/70 border-border hover:border-[hsl(var(--gold))]/40"
                          }`}
                          style={active ? { background: "var(--grad-bronze)" } : {}}
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
                      onChange={(e) => setForm((f) => ({ ...f, default_language: e.target.value }))}
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
                    >
                      {form.languages.map((code) => (
                        <option key={code} value={code}>
                          {code === "he" ? "עברית" : code === "en" ? "English" : "Français"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>מטבע</Label>
                    <select
                      value={form.currency}
                      onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
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
                    <Label htmlFor="desc_en" dir="ltr">🇬🇧 Description (English)</Label>
                    <Textarea
                      id="desc_en"
                      dir="ltr"
                      rows={2}
                      value={form.description_en}
                      onChange={(e) => setForm((f) => ({ ...f, description_en: e.target.value }))}
                      placeholder="A short description in English"
                    />
                  </div>
                )}
                {form.languages.includes("fr") && (
                  <div className="space-y-2">
                    <Label htmlFor="desc_fr" dir="ltr">🇫🇷 Description (Français)</Label>
                    <Textarea
                      id="desc_fr"
                      dir="ltr"
                      rows={2}
                      value={form.description_fr}
                      onChange={(e) => setForm((f) => ({ ...f, description_fr: e.target.value }))}
                      placeholder="Une courte description en français"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ── Menu visibility ── */}
            <Card className="shadow-premium">
              <CardHeader>
                <CardTitle className="font-serif-display text-xl flex items-center gap-2.5">
                  <SectionIcon><Eye className="h-3.5 w-3.5" /></SectionIcon>
                  נראות התפריט
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium">הצג תפריט ללקוחות</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {isActive
                        ? "התפריט ציבורי וגלוי לכל מי שיש לו את הקישור"
                        : "התפריט מוסתר — לקוחות יראו עמוד 'לא זמין'"}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsActive((v) => !v)}
                    className="flex-shrink-0 transition-opacity hover:opacity-80"
                    title={isActive ? "לחץ להסתרה" : "לחץ להפעלה"}
                  >
                    {isActive ? (
                      <ToggleRight className="h-9 w-9" style={{ color: "hsl(var(--accent-bright))" }} />
                    ) : (
                      <ToggleLeft className="h-9 w-9 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3.5 rounded-xl border border-destructive/20 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div
              className="sticky bottom-4 z-10"
              style={{ filter: "drop-shadow(0 4px 16px hsl(28 62% 38% / .25))" }}
            >
              <Button
                type="submit"
                disabled={saving}
                size="lg"
                className="w-full hover:opacity-90 text-white"
                style={{ background: "var(--grad-bronze)" }}
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : saved ? (
                  <><Check className="h-4 w-4" />נשמר!</>
                ) : (
                  <><Save className="h-4 w-4" />שמור שינויים</>
                )}
              </Button>
            </div>
          </form>

          {/* ── Notifications ── */}
          <Card className="shadow-premium">
            <CardHeader>
              <CardTitle className="font-serif-display text-xl flex items-center gap-2.5">
                <SectionIcon><Bell className="h-3.5 w-3.5" /></SectionIcon>
                התראות
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium">סיכום שבועי</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    קבל אימייל שבועי עם סטטיסטיקות התפריט
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifWeekly((v) => !v)}
                  className="flex-shrink-0 transition-opacity hover:opacity-80"
                >
                  {notifWeekly ? (
                    <ToggleRight className="h-9 w-9" style={{ color: "hsl(var(--accent-bright))" }} />
                  ) : (
                    <ToggleLeft className="h-9 w-9 text-muted-foreground" />
                  )}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* ── Password change ── */}
          <form onSubmit={handlePasswordChange}>
            <Card className="shadow-premium">
              <CardHeader>
                <CardTitle className="font-serif-display text-xl flex items-center gap-2.5">
                  <SectionIcon><Lock className="h-3.5 w-3.5" /></SectionIcon>
                  שינוי סיסמה
                </CardTitle>
                <p className="text-sm text-muted-foreground pt-1">עדכן את הסיסמה לחשבון</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {(["current", "next", "confirm"] as const).map((field) => {
                  const labels = { current: "סיסמה נוכחית", next: "סיסמה חדשה", confirm: "אימות סיסמה חדשה" };
                  const placeholders = { current: "••••••••", next: "לפחות 6 תווים", confirm: "חזור על הסיסמה החדשה" };
                  return (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={`pw_${field}`}>{labels[field]}</Label>
                      <div className="relative">
                        <Input
                          id={`pw_${field}`}
                          type={showPw[field] ? "text" : "password"}
                          value={pwForm[field]}
                          onChange={(e) => setPwForm((f) => ({ ...f, [field]: e.target.value }))}
                          placeholder={placeholders[field]}
                          required
                          dir="ltr"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw((s) => ({ ...s, [field]: !s[field] }))}
                          className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                        >
                          {showPw[field] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  );
                })}

                {pwError && (
                  <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-3.5 rounded-xl border border-destructive/20">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>{pwError}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={pwSaving || !pwForm.current || !pwForm.next || !pwForm.confirm}
                  className="hover:opacity-90 text-white"
                  style={{ background: "var(--grad-bronze)" }}
                >
                  {pwSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : pwSaved ? (
                    <><Check className="h-4 w-4" />הסיסמה עודכנה!</>
                  ) : (
                    <><Lock className="h-4 w-4" />עדכן סיסמה</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </form>

          {/* ── Danger zone ── */}
          <Card
            className="shadow-premium"
            style={{ borderColor: "hsl(var(--ember) / .3)" }}
          >
            <CardHeader>
              <CardTitle className="font-serif-display text-xl flex items-center gap-2.5">
                <div
                  className="h-7 w-7 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsl(var(--ember) / .15)" }}
                >
                  <AlertTriangle className="h-3.5 w-3.5" style={{ color: "hsl(var(--ember))" }} />
                </div>
                <span style={{ color: "hsl(var(--ember))" }}>אזור מסוכן</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                השבתת התפריט תסתיר אותו מהציבור. הנתונים לא יימחקו ותוכל להפעיל מחדש בכל עת.
              </p>
              <div className="space-y-2">
                <Label htmlFor="danger-confirm" className="text-sm">
                  כדי להמשיך, הקלד{" "}
                  <code
                    className="px-1.5 py-0.5 rounded text-xs"
                    style={{ background: "hsl(var(--ember) / .1)", color: "hsl(var(--ember))" }}
                  >
                    {form.name || "שם המסעדה"}
                  </code>
                </Label>
                <Input
                  id="danger-confirm"
                  value={dangerConfirm}
                  onChange={(e) => setDangerConfirm(e.target.value)}
                  placeholder={form.name || "שם המסעדה"}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                disabled={dangerConfirm !== form.name || deactivating || !restaurant}
                onClick={handleDeactivate}
                className="border-[hsl(var(--ember))]/40 hover:bg-[hsl(var(--ember))]/10"
                style={{ color: "hsl(var(--ember))" }}
              >
                {deactivating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4" />
                    השבת תפריט
                  </>
                )}
              </Button>
              {deactivateSuccess && (
                <p className="text-sm font-sans" style={{ color: "hsl(158 45% 42%)" }}>
                  התפריט הושבת. תוכל להפעיל אותו מחדש בכל עת.
                </p>
              )}
            </CardContent>
          </Card>

      </div>
    </div>
  );
}


/* tiny helper — no need to import full slugify for preview URL display */
function slugifySimple(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 24);
}
