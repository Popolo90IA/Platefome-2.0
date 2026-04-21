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
import { FileUpload } from "@/components/upload/FileUpload";
import { Photo360Capture } from "@/components/capture/Photo360Capture";
import {
  UPLOAD_FOLDERS,
  ALLOWED_VIDEO_TYPES,
  ALLOWED_MODEL_EXTS,
  MAX_VIDEO_SIZE,
  MAX_MODEL_SIZE,
} from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  X,
  ImageIcon,
  Utensils,
  FolderTree,
  Award,
  Sparkles,
  Flame,
  CircleOff,
  CheckCircle2,
  Cuboid,
  Film,
  Globe,
  ChevronDown,
  ChevronUp,
  Camera,
  View,
  RotateCcw,
} from "lucide-react";
import type { Dish, Category, Restaurant } from "@/types/database.types";

type FormState = {
  name: string;
  name_en: string;
  name_fr: string;
  category_id: string;
  description: string;
  description_en: string;
  description_fr: string;
  price: string;
  image_url: string | null;
  video_url: string | null;
  model_3d_url: string | null;
  photos_360: string[] | null;
  ar_enabled: boolean;
  is_available: boolean;
  is_featured: boolean;
  is_new: boolean;
  is_signature: boolean;
};

const EMPTY_FORM: FormState = {
  name: "",
  name_en: "",
  name_fr: "",
  category_id: "",
  description: "",
  description_en: "",
  description_fr: "",
  price: "",
  image_url: null,
  video_url: null,
  model_3d_url: null,
  photos_360: null,
  ar_enabled: true,
  is_available: true,
  is_featured: false,
  is_new: false,
  is_signature: false,
};

export default function DishesPage() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterCat, setFilterCat] = useState<string>("all");
  const [showI18n, setShowI18n] = useState(false);
  const [show360Capture, setShow360Capture] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const supabase = createClient();

  const load = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: r } = await supabase
      .from("restaurants")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    setRestaurant(r);

    if (r) {
      const [{ data: cats }, { data: dsh }] = await Promise.all([
        supabase
          .from("categories")
          .select("*")
          .eq("restaurant_id", r.id)
          .order("display_order"),
        supabase
          .from("dishes")
          .select("*")
          .eq("restaurant_id", r.id)
          .order("created_at", { ascending: false }),
      ]);
      setCategories(cats ?? []);
      setDishes(dsh ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
    setShowI18n(false);
  };

  const handleEdit = (dish: Dish) => {
    setEditingId(dish.id);
    setForm({
      name: dish.name,
      name_en: dish.name_en ?? "",
      name_fr: dish.name_fr ?? "",
      category_id: dish.category_id,
      description: dish.description ?? "",
      description_en: dish.description_en ?? "",
      description_fr: dish.description_fr ?? "",
      price: String(dish.price),
      image_url: dish.image_url,
      video_url: dish.video_url,
      model_3d_url: dish.model_3d_url,
      photos_360: dish.photos_360 ?? null,
      ar_enabled: dish.ar_enabled,
      is_available: dish.is_available,
      is_featured: dish.is_featured,
      is_new: dish.is_new,
      is_signature: dish.is_signature,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurant) return;
    setSaving(true);

    const payload = {
      restaurant_id: restaurant.id,
      category_id: form.category_id,
      name: form.name,
      name_en: form.name_en || null,
      name_fr: form.name_fr || null,
      description: form.description || null,
      description_en: form.description_en || null,
      description_fr: form.description_fr || null,
      price: parseFloat(form.price),
      image_url: form.image_url,
      video_url: form.video_url,
      model_3d_url: form.model_3d_url,
      photos_360: form.photos_360,
      ar_enabled: form.ar_enabled,
      is_available: form.is_available,
      is_featured: form.is_featured,
      is_new: form.is_new,
      is_signature: form.is_signature,
    };

    if (editingId) {
      await supabase.from("dishes").update(payload).eq("id", editingId);
    } else {
      await supabase.from("dishes").insert(payload);
    }

    await load();
    resetForm();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("למחוק את המנה?")) return;
    await supabase.from("dishes").delete().eq("id", id);
    await load();
  };

  const toggleAvailability = async (dish: Dish) => {
    await supabase
      .from("dishes")
      .update({ is_available: !dish.is_available })
      .eq("id", dish.id);
    setDishes((prev) =>
      prev.map((d) =>
        d.id === dish.id ? { ...d, is_available: !d.is_available } : d
      )
    );
  };

  const getCategoryName = (categoryId: string) =>
    categories.find((c) => c.id === categoryId)?.name ?? "—";

  const filteredDishes =
    filterCat === "all" ? dishes : dishes.filter((d) => d.category_id === filterCat);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <Card className="max-w-md mx-auto shadow-premium">
        <CardContent className="pt-8 pb-8 text-center">
          <Utensils className="h-12 w-12 mx-auto text-[hsl(var(--gold))] mb-4" />
          <p className="mb-5 text-muted-foreground">צור תחילה פרופיל מסעדה</p>
          <Link href="/dashboard/settings">
            <Button className="bg-gold-gradient hover:opacity-90">
              צור פרופיל
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (categories.length === 0) {
    return (
      <Card className="max-w-md mx-auto shadow-premium">
        <CardContent className="pt-8 pb-8 text-center">
          <FolderTree className="h-12 w-12 mx-auto text-[hsl(var(--gold))] mb-4" />
          <p className="mb-5 text-muted-foreground">
            עליך ליצור קטגוריה לפני הוספת מנות
          </p>
          <Link href="/dashboard/categories">
            <Button className="bg-gold-gradient hover:opacity-90">
              צור קטגוריה
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const availableLangs = restaurant.languages ?? ["he"];
  const hasEn = availableLangs.includes("en");
  const hasFr = availableLangs.includes("fr");

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-display text-4xl font-bold">מנות</h1>
          <p className="text-muted-foreground mt-2">נהל את התפריט שלך</p>
        </div>
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gold-gradient hover:opacity-90 shadow-gold-glow"
          >
            <Plus className="h-4 w-4" />
            מנה חדשה
          </Button>
        )}
      </div>

      {/* Category filter */}
      {categories.length > 0 && dishes.length > 0 && !showForm && (
        <div className="flex flex-wrap gap-2 scrollbar-thin">
          <FilterChip
            active={filterCat === "all"}
            onClick={() => setFilterCat("all")}
            count={dishes.length}
          >
            הכל
          </FilterChip>
          {categories.map((cat) => {
            const count = dishes.filter((d) => d.category_id === cat.id).length;
            return (
              <FilterChip
                key={cat.id}
                active={filterCat === cat.id}
                onClick={() => setFilterCat(cat.id)}
                count={count}
              >
                {cat.name}
              </FilterChip>
            );
          })}
        </div>
      )}

      {showForm && (
        <Card className="shadow-premium animate-scale-in border-[hsl(var(--gold))]/20">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="font-serif-display text-xl">
              {editingId ? "עריכת מנה" : "מנה חדשה"}
            </CardTitle>
            <button
              onClick={resetForm}
              className="p-1 rounded-md hover:bg-secondary transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">שם המנה *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">קטגוריה *</Label>
                  <select
                    id="category"
                    value={form.category_id}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category_id: e.target.value }))
                    }
                    required
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
                  >
                    <option value="">בחר קטגוריה</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
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
                  placeholder="תאר את המנה, רכיבים, רמזים..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">מחיר *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  required
                  dir="ltr"
                  placeholder="0.00"
                />
              </div>

              {/* Badges toggles */}
              <div className="space-y-3">
                <Label>תגיות ותצוגה</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <ToggleChip
                    active={form.is_signature}
                    onChange={(v) =>
                      setForm((f) => ({ ...f, is_signature: v }))
                    }
                    icon={<Award className="h-3.5 w-3.5" />}
                    color="gold"
                  >
                    מנת השף
                  </ToggleChip>
                  <ToggleChip
                    active={form.is_new}
                    onChange={(v) => setForm((f) => ({ ...f, is_new: v }))}
                    icon={<Sparkles className="h-3.5 w-3.5" />}
                    color="emerald"
                  >
                    חדש
                  </ToggleChip>
                  <ToggleChip
                    active={form.is_featured}
                    onChange={(v) => setForm((f) => ({ ...f, is_featured: v }))}
                    icon={<Flame className="h-3.5 w-3.5" />}
                    color="rose"
                  >
                    מומלץ
                  </ToggleChip>
                  <ToggleChip
                    active={!form.is_available}
                    onChange={(v) =>
                      setForm((f) => ({ ...f, is_available: !v }))
                    }
                    icon={<CircleOff className="h-3.5 w-3.5" />}
                    color="muted"
                  >
                    אזל
                  </ToggleChip>
                </div>
              </div>

              <ImageUpload
                label="תמונת המנה"
                folder={UPLOAD_FOLDERS.DISHES}
                currentImage={form.image_url}
                onUploadComplete={(url) =>
                  setForm((f) => ({ ...f, image_url: url }))
                }
              />

              {/* Média avancés (vidéo + 3D) - Section premium mise en avant */}
              <div className="relative border-2 border-[hsl(var(--gold))]/30 rounded-xl overflow-hidden bg-gradient-to-br from-[hsl(var(--gold))]/5 to-transparent">
                <div className="absolute top-0 right-0 px-3 py-1 bg-gold-gradient text-white text-[10px] font-bold uppercase tracking-wider rounded-bl-lg shadow-gold-glow">
                  ✨ חדש
                </div>
                <div className="px-5 py-4 border-b border-[hsl(var(--gold))]/20 bg-gradient-to-r from-[hsl(var(--gold))]/10 to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gold-gradient flex items-center justify-center shadow-gold-glow flex-shrink-0">
                      <Cuboid className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif-display font-bold text-lg">
                        חוויית 3D + VR + וידאו
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        הייחוד של הפלטפורמה שלך - תן ללקוח לראות את המנה בתלת־מימד ובמציאות רבודה
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-5">
                  {/* Video */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Film className="h-4 w-4 text-rose-600" />
                      <Label className="text-sm font-bold">וידאו של המנה</Label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      סרטון קצר שיתנגן כשהלקוח מעביר מעל המנה. מעולה להראות תהליך הכנה או את המנה &quot;חיה&quot;.
                    </p>
                    <FileUpload
                      label=""
                      folder={UPLOAD_FOLDERS.VIDEOS}
                      currentUrl={form.video_url}
                      onUploadComplete={(url) =>
                        setForm((f) => ({ ...f, video_url: url }))
                      }
                      accept="video/mp4,video/webm,video/quicktime"
                      allowedTypes={ALLOWED_VIDEO_TYPES}
                      maxSize={MAX_VIDEO_SIZE}
                      preview="video"
                      helperText="MP4 / WebM / MOV — עד 25MB"
                    />
                  </div>

                  <div className="h-px bg-[hsl(var(--gold))]/20" />

                  {/* Photos 360° */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <View className="h-4 w-4 text-[hsl(var(--gold-dark))]" />
                      <Label className="text-sm font-bold">תצוגה 360° (מצלמה)</Label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      הפעל את המצלמה וסובב סביב המנה כדי לצלם 24 תמונות אוטומטית. הלקוח יוכל אחר־כך להחליק אצבע כדי לראות את המנה מכל הזוויות.
                    </p>

                    {form.photos_360 && form.photos_360.length > 0 ? (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                        <div className="h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-emerald-700 text-sm">
                            {form.photos_360.length} תמונות הועלו
                          </div>
                          <div className="text-[11px] text-emerald-600/80">
                            התצוגה 360° תוצג ללקוחות בתפריט
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setShow360Capture(true)}
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          צלם מחדש
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShow360Capture(true)}
                        className="w-full border-[hsl(var(--gold))]/40 hover:bg-[hsl(var(--gold))]/10 h-auto py-3"
                      >
                        <Camera className="h-5 w-5" />
                        <div className="text-start">
                          <div className="font-bold">התחל צילום 360°</div>
                          <div className="text-[11px] text-muted-foreground font-normal">
                            24 תמונות · כ-30 שניות
                          </div>
                        </div>
                      </Button>
                    )}
                  </div>

                  <div className="h-px bg-[hsl(var(--gold))]/20" />

                  {/* 3D model */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Cuboid className="h-4 w-4 text-[hsl(var(--gold-dark))]" />
                      <Label className="text-sm font-bold">מודל תלת־מימד (3D / AR)</Label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      קובץ <code className="px-1 rounded bg-secondary text-[11px]">.glb</code> או <code className="px-1 rounded bg-secondary text-[11px]">.gltf</code>. הלקוח יוכל לסובב את המנה 360° ואף לראות אותה על השולחן שלו ב-AR.{" "}
                      <a
                        href="https://poly.pizza/"
                        target="_blank"
                        rel="noopener"
                        className="text-[hsl(var(--gold-dark))] underline hover:text-[hsl(var(--gold))]"
                      >
                        מודלים חינמיים ב-Poly.pizza ↗
                      </a>
                    </p>
                    <FileUpload
                      label=""
                      folder={UPLOAD_FOLDERS.MODELS}
                      currentUrl={form.model_3d_url}
                      onUploadComplete={(url) =>
                        setForm((f) => ({ ...f, model_3d_url: url }))
                      }
                      accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
                      allowedExts={ALLOWED_MODEL_EXTS}
                      maxSize={MAX_MODEL_SIZE}
                      preview="model"
                      helperText=".glb / .gltf — עד 20MB"
                    />
                    {form.model_3d_url && (
                      <label className="flex items-center gap-2 text-sm cursor-pointer p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 mt-3">
                        <input
                          type="checkbox"
                          checked={form.ar_enabled}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              ar_enabled: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 accent-emerald-600"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-emerald-700">
                            אפשר מציאות רבודה (AR)
                          </div>
                          <div className="text-[11px] text-emerald-600/80">
                            הלקוח יראה את המנה בגודל אמיתי על השולחן שלו - עובד על iPhone ו-Android ללא אפליקציה
                          </div>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Multi-langue */}
              {(hasEn || hasFr) && (
                <CollapsibleSection
                  open={showI18n}
                  onToggle={() => setShowI18n((v) => !v)}
                  title="תרגומים"
                  subtitle="תרגומים לשפות אחרות. אם ריק — יוצג הטקסט בעברית"
                  icon={<Globe className="h-4 w-4" />}
                >
                  <div className="space-y-4">
                    {hasEn && (
                      <div className="space-y-3 p-3 rounded-lg bg-secondary/40">
                        <div className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                          🇬🇧 English
                        </div>
                        <Input
                          dir="ltr"
                          placeholder="Name"
                          value={form.name_en}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name_en: e.target.value }))
                          }
                        />
                        <Textarea
                          dir="ltr"
                          rows={2}
                          placeholder="Description"
                          value={form.description_en}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              description_en: e.target.value,
                            }))
                          }
                        />
                      </div>
                    )}
                    {hasFr && (
                      <div className="space-y-3 p-3 rounded-lg bg-secondary/40">
                        <div className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                          🇫🇷 Français
                        </div>
                        <Input
                          dir="ltr"
                          placeholder="Nom"
                          value={form.name_fr}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name_fr: e.target.value }))
                          }
                        />
                        <Textarea
                          dir="ltr"
                          rows={2}
                          placeholder="Description"
                          value={form.description_fr}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              description_fr: e.target.value,
                            }))
                          }
                        />
                      </div>
                    )}
                  </div>
                </CollapsibleSection>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-gold-gradient hover:opacity-90"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "שמור"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  ביטול
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {show360Capture && restaurant && (
        <Photo360Capture
          restaurantId={restaurant.id}
          onComplete={(urls) => {
            setForm((f) => ({ ...f, photos_360: urls }));
            setShow360Capture(false);
          }}
          onCancel={() => setShow360Capture(false)}
        />
      )}

      {dishes.length === 0 ? (
        <Card className="shadow-premium">
          <CardContent className="pt-10 pb-10 text-center">
            <Utensils className="h-12 w-12 mx-auto text-[hsl(var(--gold))] opacity-50 mb-4" />
            <p className="text-muted-foreground mb-5">אין מנות עדיין</p>
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gold-gradient hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
                הוסף מנה ראשונה
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDishes.map((dish, idx) => (
            <Card
              key={dish.id}
              className={`group overflow-hidden shadow-sm hover:shadow-premium hover:border-[hsl(var(--gold))]/30 transition-all animate-fade-up ${
                !dish.is_available ? "opacity-70" : ""
              }`}
              style={{ animationDelay: `${Math.min(idx * 40, 400)}ms` }}
            >
              <div className="relative h-52 overflow-hidden">
                {dish.image_url ? (
                  <img
                    src={dish.image_url}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                  <span className="text-xs bg-white/95 backdrop-blur px-2.5 py-1 rounded-full font-medium text-[hsl(var(--gold-dark))] shadow-sm">
                    {getCategoryName(dish.category_id)}
                  </span>
                </div>
                <div className="absolute top-3 left-3 flex gap-1">
                  {dish.video_url && (
                    <MiniBadge color="dark">
                      <Film className="h-3 w-3" />
                    </MiniBadge>
                  )}
                  {dish.model_3d_url && (
                    <MiniBadge color="gold">
                      <Cuboid className="h-3 w-3" />
                    </MiniBadge>
                  )}
                </div>
                {!dish.is_available && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-bold uppercase tracking-wider text-sm px-3 py-1 bg-black/60 rounded">
                      אזל
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif-display font-bold text-lg leading-tight flex-1">
                    {dish.name}
                  </h3>
                  <span className="font-bold text-lg text-gold-gradient whitespace-nowrap">
                    {formatPrice(dish.price)}
                  </span>
                </div>

                {/* Badges row */}
                {(dish.is_signature || dish.is_new || dish.is_featured) && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {dish.is_signature && (
                      <TinyBadge color="gold">
                        <Award className="h-2.5 w-2.5" />
                        מנת השף
                      </TinyBadge>
                    )}
                    {dish.is_new && (
                      <TinyBadge color="emerald">
                        <Sparkles className="h-2.5 w-2.5" />
                        חדש
                      </TinyBadge>
                    )}
                    {dish.is_featured && (
                      <TinyBadge color="rose">
                        <Flame className="h-2.5 w-2.5" />
                        מומלץ
                      </TinyBadge>
                    )}
                  </div>
                )}

                {dish.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                    {dish.description}
                  </p>
                )}
                <div className="flex justify-between items-center gap-1 pt-2 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => toggleAvailability(dish)}
                    className={`text-xs font-medium flex items-center gap-1.5 transition-colors ${
                      dish.is_available
                        ? "text-emerald-600 hover:text-emerald-700"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title={dish.is_available ? "זמין" : "אזל"}
                  >
                    {dish.is_available ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <CircleOff className="h-4 w-4" />
                    )}
                    {dish.is_available ? "זמין" : "אזל"}
                  </button>
                  <div className="flex gap-0.5">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(dish)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(dish.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
        active
          ? "bg-gold-gradient text-white shadow-gold-glow"
          : "bg-card border border-border hover:border-[hsl(var(--gold))]/40 text-foreground/70"
      }`}
    >
      {children}
      <span
        className={`text-xs px-1.5 py-0.5 rounded-full ${
          active ? "bg-white/20" : "bg-secondary text-muted-foreground"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function ToggleChip({
  active,
  onChange,
  children,
  icon,
  color,
}: {
  active: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
  icon: React.ReactNode;
  color: "gold" | "emerald" | "rose" | "muted";
}) {
  const styles: Record<typeof color, string> = {
    gold: "bg-[hsl(var(--gold))]/20 text-[hsl(var(--gold-dark))] border-[hsl(var(--gold))]/50",
    emerald: "bg-emerald-500/20 text-emerald-700 border-emerald-500/50",
    rose: "bg-rose-500/20 text-rose-700 border-rose-500/50",
    muted: "bg-muted text-muted-foreground border-border",
  };
  return (
    <button
      type="button"
      onClick={() => onChange(!active)}
      className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
        active
          ? styles[color] + " shadow-sm"
          : "bg-card text-muted-foreground border-border hover:border-[hsl(var(--gold))]/30"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function TinyBadge({
  color,
  children,
}: {
  color: "gold" | "emerald" | "rose";
  children: React.ReactNode;
}) {
  const styles: Record<typeof color, string> = {
    gold: "bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold-dark))] border-[hsl(var(--gold))]/30",
    emerald: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
    rose: "bg-rose-500/15 text-rose-700 border-rose-500/30",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border ${styles[color]}`}
    >
      {children}
    </span>
  );
}

function MiniBadge({
  color,
  children,
}: {
  color: "gold" | "dark";
  children: React.ReactNode;
}) {
  const styles = {
    gold: "bg-gold-gradient text-white",
    dark: "bg-black/70 text-white",
  };
  return (
    <span
      className={`inline-flex items-center justify-center h-6 w-6 rounded-full shadow ${styles[color]}`}
    >
      {children}
    </span>
  );
}

function CollapsibleSection({
  open,
  onToggle,
  title,
  subtitle,
  icon,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 bg-secondary/30 hover:bg-secondary/60 transition-colors text-start"
      >
        <span className="h-8 w-8 rounded-lg bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold-dark))] flex items-center justify-center flex-shrink-0">
          {icon}
        </span>
        <span className="flex-1 min-w-0">
          <div className="font-medium text-sm">{title}</div>
          {subtitle && (
            <div className="text-xs text-muted-foreground truncate">
              {subtitle}
            </div>
          )}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {open && <div className="p-4 bg-card">{children}</div>}
    </div>
  );
}
