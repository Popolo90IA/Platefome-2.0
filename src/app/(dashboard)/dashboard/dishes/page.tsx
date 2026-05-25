"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
  Loader2,
  X,
  Award,
  Sparkles,
  Flame,
  CircleOff,
  CheckCircle2,
  Cuboid,
  Film,
  Globe,
  Camera,
  View,
  RotateCcw,
} from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { dishSchema } from "@/lib/validations/dish";
import type { Dish, Category, Restaurant } from "@/types/database.types";
import type { FormState } from "./_lib/types";
import { EMPTY_FORM } from "./_lib/constants";
import { filterDishesByCategory, getCategoryName } from "./_lib/helpers";
import { ToggleChip } from "./_components/_ui/ToggleChip";
import { CollapsibleSection } from "./_components/_ui/CollapsibleSection";
import { LoadingState } from "./_components/_states/LoadingState";
import { NoRestaurantState } from "./_components/_states/NoRestaurantState";
import { NoCategoriesState } from "./_components/_states/NoCategoriesState";
import { EmptyDishesState } from "./_components/_states/EmptyDishesState";
import { PageHeader } from "./_components/PageHeader";
import { CategoryFilter } from "./_components/CategoryFilter";
import { SortableDishCard } from "./_components/SortableDishCard";

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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const supabase = createClient();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = filteredDishes.findIndex((d) => d.id === active.id);
    const newIndex = filteredDishes.findIndex((d) => d.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(filteredDishes, oldIndex, newIndex);
    // Optimistic update
    setDishes((prev) => {
      const others = prev.filter((d) => filterCat !== "all" && d.category_id !== filterCat);
      return filterCat === "all" ? reordered : [...others, ...reordered];
    });
    // Persist display_order
    await Promise.all(
      reordered.map((d, i) =>
        supabase.from("dishes").update({ display_order: i }).eq("id", d.id)
      )
    );
  };

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

    const parsed = dishSchema.safeParse({
      name: form.name,
      category_id: form.category_id,
      description: form.description || undefined,
      price: parseFloat(form.price) || 0,
      image_url: form.image_url,
    });

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) errors[String(err.path[0])] = err.message;
      });
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
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
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await supabase.from("dishes").delete().eq("id", deleteId);
    setDeleteId(null);
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

  const getCategoryNameLocal = (categoryId: string) =>
    getCategoryName(categories, categoryId);

  const filteredDishes = filterDishesByCategory(dishes, filterCat);

  if (loading) {
    return <LoadingState />;
  }

  if (!restaurant) {
    return <NoRestaurantState />;
  }

  if (categories.length === 0) {
    return <NoCategoriesState />;
  }

  const availableLangs = restaurant.languages ?? ["he"];
  const hasEn = availableLangs.includes("en");
  const hasFr = availableLangs.includes("fr");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <ConfirmDialog
        open={!!deleteId}
        title="למחוק את המנה?"
        description="פעולה זו אינה הפיכה."
        confirmLabel="מחק"
        cancelLabel="ביטול"
        danger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
      <PageHeader
        restaurant={restaurant}
        dishes={dishes}
        showForm={showForm}
        onCreate={() => setShowForm(true)}
      />

      {categories.length > 0 && dishes.length > 0 && !showForm && (
        <CategoryFilter
          categories={categories}
          dishes={dishes}
          filterCat={filterCat}
          onChange={setFilterCat}
        />
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
                  {formErrors.name && (
                    <p className="text-xs" style={{ color: "hsl(0 72% 51%)" }}>{formErrors.name}</p>
                  )}
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
                {formErrors.price && (
                  <p className="text-xs" style={{ color: "hsl(0 72% 51%)" }}>{formErrors.price}</p>
                )}
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
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--accent-bright))]/8 border border-[hsl(var(--accent-bright))]/25">
                        <div className="h-12 w-12 rounded-lg bg-[hsl(var(--accent-bright))]/15 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="h-6 w-6 text-[hsl(var(--accent-bright))]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-[hsl(var(--gold-dark))] text-sm">
                            {form.photos_360.length} תמונות הועלו
                          </div>
                          <div className="text-[11px] text-[hsl(var(--subtle))]">
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
                      <label className="flex items-center gap-2 text-sm cursor-pointer p-3 rounded-lg bg-[hsl(var(--accent-bright))]/8 border border-[hsl(var(--accent-bright))]/25 mt-3">
                        <input
                          type="checkbox"
                          checked={form.ar_enabled}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              ar_enabled: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 accent-[hsl(var(--accent-bright))]"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-[hsl(var(--gold-dark))]">
                            אפשר מציאות רבודה (AR)
                          </div>
                          <div className="text-[11px] text-[hsl(var(--subtle))]">
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
        <EmptyDishesState showForm={showForm} onCreate={() => setShowForm(true)} />
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={filteredDishes.map((d) => d.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDishes.map((dish, idx) => (
            <SortableDishCard
              key={dish.id}
              dish={dish}
              idx={idx}
              getCategoryName={getCategoryNameLocal}
              toggleAvailability={toggleAvailability}
              handleDelete={handleDelete}
              formatPrice={formatPrice}
            />
          ))}
        </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
