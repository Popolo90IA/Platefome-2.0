"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
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
  ChevronRight,
  Loader2,
  Camera,
  RotateCcw,
  CheckCircle2,
  Cuboid,
  Film,
  Award,
  Sparkles,
  Flame,
  CircleOff,
  Globe,
  Trash2,
  Eye,
  ChevronDown,
} from "lucide-react";
import type { Dish, Category, Restaurant } from "@/types/database.types";

// ── Constants ──────────────────────────────────────────────────────────────
const ALLERGEN_OPTIONS = [
  { key: "gluten",    label: "גלוטן",      emoji: "🌾" },
  { key: "dairy",     label: "חלב",        emoji: "🥛" },
  { key: "eggs",      label: "ביצים",      emoji: "🥚" },
  { key: "nuts",      label: "אגוזים",     emoji: "🥜" },
  { key: "sesame",    label: "שומשום",     emoji: "🌰" },
  { key: "fish",      label: "דגים",       emoji: "🐟" },
  { key: "shellfish", label: "פירות ים",   emoji: "🦐" },
  { key: "soy",       label: "סויה",       emoji: "🫘" },
];

const MENU_TAGS = [
  { key: "popular",    label: "פופולרי" },
  { key: "homemade",   label: "בית" },
  { key: "hot",        label: "חם" },
  { key: "cold",       label: "קר" },
  { key: "spicy",      label: "חריף" },
  { key: "seasonal",   label: "עונתי" },
  { key: "vegan",      label: "טבעוני" },
  { key: "vegetarian", label: "צמחוני" },
  { key: "glutenfree", label: "ללא גלוטן" },
];

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
  allergens: string[];
  tags: string[];
};

// ── Tiny helpers ───────────────────────────────────────────────────────────
function SectionCard({
  title,
  badge,
  children,
  defaultOpen = true,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        background: "hsl(var(--deep))",
        border: "1px solid hsl(var(--line))",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 16,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          borderBottom: open ? "1px solid hsl(var(--line))" : "none",
        }}
      >
        <span
          className="font-display"
          style={{ fontSize: 19, fontWeight: 600, color: "hsl(var(--fog))" }}
        >
          {title}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {badge && (
            <span
              className="font-mono uppercase"
              style={{ fontSize: 10, letterSpacing: ".18em", color: "hsl(var(--dim))" }}
            >
              {badge}
            </span>
          )}
          <ChevronDown
            style={{
              width: 16, height: 16,
              color: "hsl(var(--dim))",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform .2s",
            }}
          />
        </div>
      </button>
      {open && <div style={{ padding: "20px 24px" }}>{children}</div>}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-mono uppercase"
      style={{
        display: "block",
        fontSize: "10.5px",
        letterSpacing: ".16em",
        color: "hsl(var(--subtle))",
        marginBottom: 6,
      }}
    >
      {children}
    </span>
  );
}

function FieldInput({
  value,
  onChange,
  placeholder,
  dir,
  required,
  type,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  dir?: "ltr" | "rtl";
  required?: boolean;
  type?: string;
}) {
  return (
    <input
      type={type ?? "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      dir={dir}
      required={required}
      className="font-sans"
      style={{
        width: "100%",
        boxSizing: "border-box",
        fontSize: 14,
        padding: "11px 14px",
        background: "hsl(var(--void))",
        border: "1px solid hsl(var(--line))",
        borderRadius: 8,
        color: "hsl(var(--fog))",
        outline: "none",
        transition: "border-color .15s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "hsl(var(--accent-bright))")}
      onBlur={(e) => (e.target.style.borderColor = "hsl(var(--line))")}
    />
  );
}

function FieldTextarea({
  value,
  onChange,
  placeholder,
  dir,
  rows,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  dir?: "ltr" | "rtl";
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      dir={dir}
      rows={rows ?? 3}
      className="font-sans"
      style={{
        width: "100%",
        boxSizing: "border-box",
        fontSize: 14,
        padding: "11px 14px",
        background: "hsl(var(--void))",
        border: "1px solid hsl(var(--line))",
        borderRadius: 8,
        color: "hsl(var(--fog))",
        outline: "none",
        resize: "vertical",
        lineHeight: 1.5,
        transition: "border-color .15s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "hsl(var(--accent-bright))")}
      onBlur={(e) => (e.target.style.borderColor = "hsl(var(--line))")}
    />
  );
}

function ChipToggle({
  active,
  onClick,
  children,
  variant = "default",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: "default" | "diet" | "allergen";
}) {
  const colors = {
    default: {
      on: { bg: "hsl(28,62%,42%,.12)", border: "hsl(28,62%,42%,.35)", color: "hsl(28,62%,35%)" },
      off: { bg: "transparent", border: "hsl(var(--line))", color: "hsl(var(--dim))" },
    },
    diet: {
      on: { bg: "hsl(120,30%,40%,.1)", border: "hsl(120,30%,40%,.3)", color: "hsl(120,30%,32%)" },
      off: { bg: "transparent", border: "hsl(var(--line))", color: "hsl(var(--dim))" },
    },
    allergen: {
      on: { bg: "hsl(0,60%,50%,.1)", border: "hsl(0,60%,50%,.3)", color: "hsl(0,55%,42%)" },
      off: { bg: "transparent", border: "hsl(var(--line))", color: "hsl(var(--dim))" },
    },
  };
  const c = active ? colors[variant].on : colors[variant].off;
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-sans"
      style={{
        padding: "5px 12px",
        borderRadius: 99,
        border: `1px solid ${c.border}`,
        background: c.bg,
        color: c.color,
        fontSize: 12.5,
        cursor: "pointer",
        transition: "all .15s",
        fontWeight: active ? 500 : 400,
      }}
    >
      {children}
    </button>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function DishEditPage() {
  const params = useParams();
  const router = useRouter();
  const dishId = params.id as string;
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [dish, setDish] = useState<Dish | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [show360Capture, setShow360Capture] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [activeMediaTab, setActiveMediaTab] = useState<"3d" | "360" | "photo" | "video">("photo");
  const [showI18n, setShowI18n] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "", name_en: "", name_fr: "",
    category_id: "",
    description: "", description_en: "", description_fr: "",
    price: "",
    image_url: null, video_url: null, model_3d_url: null, photos_360: null,
    ar_enabled: true, is_available: true,
    is_featured: false, is_new: false, is_signature: false,
    allergens: [], tags: [],
  });

  // Auto-save debounce
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstLoad = useRef(true);

  // Load data
  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: r } = await supabase
        .from("restaurants").select("*").eq("user_id", user.id).maybeSingle();
      if (!r) { router.push("/dashboard/settings"); return; }
      setRestaurant(r);

      const [{ data: d }, { data: cats }] = await Promise.all([
        supabase.from("dishes").select("*").eq("id", dishId).maybeSingle(),
        supabase.from("categories").select("*").eq("restaurant_id", r.id).order("display_order"),
      ]);

      if (!d) { router.push("/dashboard/dishes"); return; }
      setDish(d);
      setCategories(cats ?? []);

      setForm({
        name: d.name,
        name_en: d.name_en ?? "",
        name_fr: d.name_fr ?? "",
        category_id: d.category_id,
        description: d.description ?? "",
        description_en: d.description_en ?? "",
        description_fr: d.description_fr ?? "",
        price: String(d.price),
        image_url: d.image_url,
        video_url: d.video_url,
        model_3d_url: d.model_3d_url,
        photos_360: d.photos_360 ?? null,
        ar_enabled: d.ar_enabled,
        is_available: d.is_available,
        is_featured: d.is_featured,
        is_new: d.is_new,
        is_signature: d.is_signature,
        allergens: (d.allergens as string[]) ?? [],
        tags: (d.tags as string[]) ?? [],
      });

      // Pick best media tab
      if (d.model_3d_url) setActiveMediaTab("3d");
      else if (d.photos_360?.length) setActiveMediaTab("360");
      else if (d.video_url) setActiveMediaTab("video");
      else setActiveMediaTab("photo");

      setLoading(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dishId]);

  // Auto-save on form change (skip first mount)
  useEffect(() => {
    if (isFirstLoad.current) { isFirstLoad.current = false; return; }
    if (loading) return;

    setSaveState("saving");
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      await doSave();
    }, 1800);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const doSave = useCallback(async () => {
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
      price: parseFloat(form.price) || 0,
      image_url: form.image_url,
      video_url: form.video_url,
      model_3d_url: form.model_3d_url,
      photos_360: form.photos_360,
      ar_enabled: form.ar_enabled,
      is_available: form.is_available,
      is_featured: form.is_featured,
      is_new: form.is_new,
      is_signature: form.is_signature,
      allergens: form.allergens.length ? form.allergens : null,
      tags: form.tags.length ? form.tags : null,
    };
    const { error } = await supabase.from("dishes").update(payload).eq("id", dishId);
    setSaving(false);
    setSaveState(error ? "error" : "saved");
    setTimeout(() => setSaveState("idle"), 3000);
  }, [form, restaurant, dishId, supabase]);

  const handlePublish = async () => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    await doSave();
  };

  const handleDelete = async () => {
    if (deleteConfirmText !== form.name) return;
    await supabase.from("dishes").delete().eq("id", dishId);
    router.push("/dashboard/dishes");
  };

  const toggleAllergen = (key: string) =>
    setForm((f) => ({
      ...f,
      allergens: f.allergens.includes(key)
        ? f.allergens.filter((a) => a !== key)
        : [...f.allergens, key],
    }));

  const toggleTag = (key: string) =>
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(key)
        ? f.tags.filter((t) => t !== key)
        : [...f.tags, key],
    }));

  const categoryName = categories.find((c) => c.id === form.category_id)?.name ?? "";

  // ── Render ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
        <div
          style={{
            width: 32, height: 32, borderRadius: "50%",
            border: "2px solid hsl(var(--gold))",
            borderTopColor: "transparent",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    );
  }

  const availableLangs = restaurant?.languages ?? ["he"];
  const hasEn = availableLangs.includes("en");
  const hasFr = availableLangs.includes("fr");

  const mediaTabs = [
    { key: "photo", label: "תמונה", dot: !!form.image_url },
    { key: "360",   label: "360°",  dot: !!(form.photos_360?.length) },
    { key: "3d",    label: "3D",    dot: !!form.model_3d_url },
    { key: "video", label: "וידאו", dot: !!form.video_url },
  ] as const;

  return (
    <div dir="rtl" style={{ color: "hsl(var(--fog))", paddingBottom: 100 }}>

      {/* ── Breadcrumb ────────────────────────────────────────────────── */}
      <nav
        className="font-mono uppercase"
        style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, letterSpacing: ".12em", color: "hsl(var(--dim))", marginBottom: 18 }}
      >
        <Link href="/dashboard" style={{ color: "hsl(var(--subtle))", textDecoration: "none" }}>
          דשבורד
        </Link>
        <ChevronRight style={{ width: 12, height: 12, opacity: .5 }} />
        <Link href="/dashboard/dishes" style={{ color: "hsl(var(--subtle))", textDecoration: "none" }}>
          תפריט
        </Link>
        <ChevronRight style={{ width: 12, height: 12, opacity: .5 }} />
        <span style={{ color: "hsl(var(--accent-bright))" }}>{form.name || "מנה חדשה"}</span>
      </nav>

      {/* ── Page header ───────────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, gap: 24, flexWrap: "wrap" }}>
        <div>
          {/* Status pill */}
          <div style={{ marginBottom: 10 }}>
            <span
              className="font-mono uppercase"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "5px 12px", borderRadius: 99,
                background: form.is_available ? "hsl(120,30%,40%,.1)" : "hsl(0,60%,50%,.08)",
                border: `1px solid ${form.is_available ? "hsl(120,30%,40%,.2)" : "hsl(0,60%,50%,.2)"}`,
                fontSize: 10.5, letterSpacing: ".14em",
                color: form.is_available ? "hsl(120,30%,30%)" : "hsl(0,55%,42%)",
              }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: form.is_available ? "hsl(120,40%,40%)" : "hsl(0,60%,50%)",
              }} />
              {form.is_available ? "פעיל · זמין בתפריט" : "לא זמין"}
            </span>
          </div>
          <h1
            className="font-display"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1, letterSpacing: "-.02em", color: "hsl(var(--fog))", margin: "0 0 8px" }}
          >
            עריכת <em style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}>מנה</em>
          </h1>
          <p className="font-sans" style={{ fontSize: 14, color: "hsl(var(--subtle))", margin: 0 }}>
            {form.name || "—"}{categoryName ? ` · ${categoryName}` : ""}
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
          {/* Auto-save indicator */}
          <span
            className="font-mono uppercase"
            style={{ fontSize: 11, letterSpacing: ".14em", color: saveState === "error" ? "hsl(0,60%,50%)" : "hsl(var(--dim))", display: "flex", alignItems: "center", gap: 6 }}
          >
            {saveState === "saving" && (
              <><Loader2 style={{ width: 12, height: 12, animation: "spin 1s linear infinite" }} />שומר...</>
            )}
            {saveState === "saved" && (
              <><CheckCircle2 style={{ width: 12, height: 12, color: "hsl(120,40%,40%)" }} />נשמר</>
            )}
            {saveState === "idle" && (
              <><span style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(var(--accent-bright))", opacity: .6, display: "inline-block" }} />נשמר אוטומטית</>
            )}
            {saveState === "error" && "שגיאה בשמירה"}
          </span>

          {/* Preview */}
          {restaurant && (
            <Link
              href={`/menu/${restaurant.slug}`}
              target="_blank"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "10px 18px", borderRadius: 10, fontSize: 13.5, fontWeight: 500,
                background: "transparent", border: "1px solid hsl(var(--line))",
                color: "hsl(var(--fog))", textDecoration: "none", transition: "all .15s",
              }}
            >
              <Eye style={{ width: 14, height: 14 }} />
              תצוגה מקדימה
            </Link>
          )}

          {/* Publish */}
          <button
            type="button"
            onClick={handlePublish}
            disabled={saving}
            className="btn-primary"
            style={{ padding: "10px 22px", fontSize: 13.5 }}
          >
            {saving ? <Loader2 style={{ width: 14, height: 14, animation: "spin 1s linear infinite" }} /> : null}
            פרסם שינויים
          </button>
        </div>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" }}>

        {/* LEFT: form ─────────────────────────────────────────────────── */}
        <div>

          {/* 1. Details */}
          <SectionCard title="פרטי המנה" badge="חובה">
            <div style={{ marginBottom: 16 }}>
              <FieldLabel>שם המנה (עברית) *</FieldLabel>
              <FieldInput
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                placeholder="חומוס מסבחה"
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
              <div>
                <FieldLabel>קטגוריה *</FieldLabel>
                <select
                  value={form.category_id}
                  onChange={(e) => setForm((f) => ({ ...f, category_id: e.target.value }))}
                  className="font-sans"
                  style={{
                    width: "100%", fontSize: 14, padding: "11px 14px",
                    background: "hsl(var(--void))", border: "1px solid hsl(var(--line))",
                    borderRadius: 8, color: "hsl(var(--fog))", outline: "none",
                  }}
                >
                  <option value="">בחר קטגוריה</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>מחיר (₪) *</FieldLabel>
                <FieldInput
                  value={form.price}
                  onChange={(v) => setForm((f) => ({ ...f, price: v }))}
                  type="number"
                  dir="ltr"
                  placeholder="38"
                />
              </div>
            </div>

            <div>
              <FieldLabel>תיאור קצר</FieldLabel>
              <FieldTextarea
                value={form.description}
                onChange={(v) => setForm((f) => ({ ...f, description: v }))}
                placeholder="תאר את המנה, רכיבים, מרקם, הגשה..."
                rows={3}
              />
              <span className="font-sans" style={{ fontSize: 12, color: "hsl(var(--dim))", marginTop: 5, display: "block" }}>
                תרגום אוטומטי לשפות הפעילות. ניתן לערוך כל תרגום בנפרד.
              </span>
            </div>
          </SectionCard>

          {/* 2. Visuals / Media */}
          <SectionCard title="חזותי" badge="3D · 360 · AR">
            {/* Media tabs */}
            <div
              style={{
                display: "flex", gap: 4, padding: 4,
                background: "hsl(var(--abyss))", borderRadius: 10,
                marginBottom: 18, width: "fit-content",
              }}
            >
              {mediaTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveMediaTab(tab.key as typeof activeMediaTab)}
                  className="font-sans"
                  style={{
                    padding: "8px 18px", borderRadius: 7, fontSize: 13, fontWeight: 500,
                    color: activeMediaTab === tab.key ? "hsl(var(--fog))" : "hsl(var(--subtle))",
                    background: activeMediaTab === tab.key ? "hsl(var(--deep))" : "transparent",
                    border: "none", cursor: "pointer",
                    boxShadow: activeMediaTab === tab.key ? "0 1px 3px rgba(0,0,0,.06)" : "none",
                    display: "inline-flex", alignItems: "center", gap: 6,
                    transition: "all .15s",
                  }}
                >
                  {tab.dot && (
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: "hsl(var(--accent-bright))",
                      boxShadow: activeMediaTab === tab.key ? "0 0 0 3px hsl(28,62%,42%,.18)" : "none",
                    }} />
                  )}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Photo tab */}
            {activeMediaTab === "photo" && (
              <ImageUpload
                label=""
                folder={UPLOAD_FOLDERS.DISHES}
                currentImage={form.image_url}
                onUploadComplete={(url) => setForm((f) => ({ ...f, image_url: url }))}
                variant="banner"
                previewMeta={{ restaurantName: form.name }}
              />
            )}

            {/* 360 tab */}
            {activeMediaTab === "360" && (
              <div>
                {form.photos_360 && form.photos_360.length > 0 ? (
                  <div
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "16px 20px", borderRadius: 12,
                      background: "hsl(28,62%,42%,.06)",
                      border: "1px solid hsl(28,62%,42%,.2)",
                      marginBottom: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                        background: "hsl(28,62%,42%,.12)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <CheckCircle2 style={{ width: 22, height: 22, color: "hsl(var(--accent-bright))" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="font-sans" style={{ fontSize: 14, fontWeight: 500, color: "hsl(var(--fog))" }}>
                        {form.photos_360.length} תמונות הועלו
                      </div>
                      <div className="font-sans" style={{ fontSize: 12, color: "hsl(var(--subtle))", marginTop: 2 }}>
                        התצוגה 360° תוצג ללקוחות בתפריט
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShow360Capture(true)}
                      className="font-sans"
                      style={{
                        padding: "7px 14px", borderRadius: 8, fontSize: 13,
                        background: "transparent", border: "1px solid hsl(var(--line))",
                        color: "hsl(var(--fog))", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 6,
                      }}
                    >
                      <RotateCcw style={{ width: 13, height: 13 }} />
                      צלם מחדש
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShow360Capture(true)}
                    style={{
                      width: "100%", padding: "28px 24px", borderRadius: 12,
                      border: "2px dashed hsl(28,62%,42%,.3)",
                      background: "hsl(28,62%,42%,.04)",
                      cursor: "pointer", display: "flex", flexDirection: "column",
                      alignItems: "center", gap: 10, transition: "all .15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "hsl(28,62%,42%,.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "hsl(28,62%,42%,.04)";
                    }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "hsl(28,62%,42%,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Camera style={{ width: 20, height: 20, color: "hsl(var(--accent-bright))" }} />
                    </div>
                    <div className="font-display" style={{ fontSize: 19, fontWeight: 500, color: "hsl(var(--fog))" }}>
                      התחל צילום <em style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}>360°</em>
                    </div>
                    <p className="font-sans" style={{ fontSize: 13, color: "hsl(var(--subtle))", margin: 0, textAlign: "center", lineHeight: 1.5, maxWidth: 340 }}>
                      הפעל את המצלמה וסובב סביב המנה · 24 תמונות אוטומטית · כ-30 שניות
                    </p>
                  </button>
                )}
              </div>
            )}

            {/* 3D tab */}
            {activeMediaTab === "3d" && (
              <div>
                <FileUpload
                  label=""
                  folder={UPLOAD_FOLDERS.MODELS}
                  currentUrl={form.model_3d_url}
                  onUploadComplete={(url) => setForm((f) => ({ ...f, model_3d_url: url }))}
                  accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
                  allowedExts={ALLOWED_MODEL_EXTS}
                  maxSize={MAX_MODEL_SIZE}
                  preview="model"
                  helperText=".glb / .gltf — עד 20MB"
                />
                {form.model_3d_url && (
                  <label
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 10, marginTop: 14,
                      padding: "14px 16px", borderRadius: 10, cursor: "pointer",
                      background: "hsl(28,62%,42%,.06)", border: "1px solid hsl(28,62%,42%,.2)",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.ar_enabled}
                      onChange={(e) => setForm((f) => ({ ...f, ar_enabled: e.target.checked }))}
                      style={{ marginTop: 2, accentColor: "hsl(var(--accent-bright))" }}
                    />
                    <div>
                      <div className="font-sans" style={{ fontSize: 13.5, fontWeight: 500, color: "hsl(var(--accent-bright))" }}>
                        אפשר מציאות רבודה (AR)
                      </div>
                      <div className="font-sans" style={{ fontSize: 12, color: "hsl(var(--subtle))", marginTop: 2 }}>
                        הלקוח יראה את המנה בגודל אמיתי על השולחן שלו — iPhone + Android, ללא אפליקציה
                      </div>
                    </div>
                  </label>
                )}
                {/* Hint for no 3D file */}
                <div
                  style={{
                    marginTop: 14, padding: "14px 16px", borderRadius: 10,
                    background: "hsl(var(--abyss))",
                    display: "flex", alignItems: "center", gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                      background: "var(--grad-bronze)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <Cuboid style={{ width: 18, height: 18, color: "#fff" }} />
                  </div>
                  <div>
                    <div className="font-sans" style={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--fog))" }}>
                      אין קובץ 3D? נסרוק עבורך.
                    </div>
                    <div className="font-sans" style={{ fontSize: 12, color: "hsl(var(--subtle))", marginTop: 2 }}>
                      <a href="https://poly.pizza/" target="_blank" rel="noopener" style={{ color: "hsl(var(--accent-bright))", textDecoration: "none" }}>
                        מודלים חינמיים ב-Poly.pizza ↗
                      </a>
                      {" "}· .GLB · .GLTF · עד 20MB
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Video tab */}
            {activeMediaTab === "video" && (
              <FileUpload
                label=""
                folder={UPLOAD_FOLDERS.VIDEOS}
                currentUrl={form.video_url}
                onUploadComplete={(url) => setForm((f) => ({ ...f, video_url: url }))}
                accept="video/mp4,video/webm,video/quicktime"
                allowedTypes={ALLOWED_VIDEO_TYPES}
                maxSize={MAX_VIDEO_SIZE}
                preview="video"
                helperText="MP4 / WebM / MOV — עד 25MB"
              />
            )}
          </SectionCard>

          {/* 3. Tags & dietary */}
          <SectionCard title="תגיות ודיאטה" badge="אופציונלי">
            {/* Display badges */}
            <div style={{ marginBottom: 20 }}>
              <FieldLabel>תגיות תצוגה</FieldLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { key: "is_signature", label: "מנת השף", icon: <Award style={{ width: 12, height: 12 }} /> },
                  { key: "is_new",       label: "חדש",     icon: <Sparkles style={{ width: 12, height: 12 }} /> },
                  { key: "is_featured",  label: "מומלץ",   icon: <Flame style={{ width: 12, height: 12 }} /> },
                ].map((b) => (
                  <ChipToggle
                    key={b.key}
                    active={form[b.key as keyof FormState] as boolean}
                    onClick={() => setForm((f) => ({ ...f, [b.key]: !f[b.key as keyof FormState] }))}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{b.icon}{b.label}</span>
                  </ChipToggle>
                ))}
                <ChipToggle
                  active={!form.is_available}
                  onClick={() => setForm((f) => ({ ...f, is_available: !f.is_available }))}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <CircleOff style={{ width: 12, height: 12 }} />אזל מהמלאי
                  </span>
                </ChipToggle>
              </div>
            </div>

            {/* Menu tags */}
            <div style={{ marginBottom: 20 }}>
              <FieldLabel>תגיות תפריט</FieldLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {MENU_TAGS.map((t) => (
                  <ChipToggle
                    key={t.key}
                    active={form.tags.includes(t.key)}
                    onClick={() => toggleTag(t.key)}
                    variant="diet"
                  >
                    {t.label}
                  </ChipToggle>
                ))}
              </div>
            </div>

            {/* Allergens */}
            <div>
              <FieldLabel>אלרגנים</FieldLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {ALLERGEN_OPTIONS.map((a) => (
                  <ChipToggle
                    key={a.key}
                    active={form.allergens.includes(a.key)}
                    onClick={() => toggleAllergen(a.key)}
                    variant="allergen"
                  >
                    {a.emoji} {a.label}
                  </ChipToggle>
                ))}
              </div>
              {form.allergens.length > 0 && (
                <p className="font-sans" style={{ fontSize: 12, color: "hsl(var(--dim))", marginTop: 8 }}>
                  יוצג ללקוח כאזהרת אלרגן בתפריט
                </p>
              )}
            </div>
          </SectionCard>

          {/* 4. Translations */}
          {(hasEn || hasFr) && (
            <SectionCard title="תרגומים" badge="אופציונלי" defaultOpen={false}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18 }}>
                <Globe style={{ width: 14, height: 14, color: "hsl(var(--accent-bright))" }} />
                <span className="font-sans" style={{ fontSize: 13, color: "hsl(var(--subtle))" }}>
                  אם ריק — יוצג הטקסט בעברית כברירת מחדל
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {hasEn && (
                  <div
                    style={{
                      padding: "16px 18px", borderRadius: 10,
                      background: "hsl(var(--abyss))",
                      border: "1px solid hsl(var(--line))",
                    }}
                  >
                    <div className="font-sans" style={{ fontSize: 12, fontWeight: 600, color: "hsl(var(--subtle))", marginBottom: 12 }}>
                      🇬🇧 English
                    </div>
                    <div style={{ marginBottom: 10 }}>
                      <FieldLabel>Name</FieldLabel>
                      <FieldInput dir="ltr" value={form.name_en} onChange={(v) => setForm((f) => ({ ...f, name_en: v }))} placeholder="Dish name in English" />
                    </div>
                    <div>
                      <FieldLabel>Description</FieldLabel>
                      <FieldTextarea dir="ltr" value={form.description_en} onChange={(v) => setForm((f) => ({ ...f, description_en: v }))} placeholder="Description in English" rows={2} />
                    </div>
                  </div>
                )}
                {hasFr && (
                  <div
                    style={{
                      padding: "16px 18px", borderRadius: 10,
                      background: "hsl(var(--abyss))",
                      border: "1px solid hsl(var(--line))",
                    }}
                  >
                    <div className="font-sans" style={{ fontSize: 12, fontWeight: 600, color: "hsl(var(--subtle))", marginBottom: 12 }}>
                      🇫🇷 Français
                    </div>
                    <div style={{ marginBottom: 10 }}>
                      <FieldLabel>Nom</FieldLabel>
                      <FieldInput dir="ltr" value={form.name_fr} onChange={(v) => setForm((f) => ({ ...f, name_fr: v }))} placeholder="Nom du plat en français" />
                    </div>
                    <div>
                      <FieldLabel>Description</FieldLabel>
                      <FieldTextarea dir="ltr" value={form.description_fr} onChange={(v) => setForm((f) => ({ ...f, description_fr: v }))} placeholder="Description en français" rows={2} />
                    </div>
                  </div>
                )}
              </div>
            </SectionCard>
          )}

          {/* 5. Danger zone */}
          <SectionCard title="אזור סכנה" badge="בלתי הפיך" defaultOpen={false}>
            <div
              style={{
                padding: "18px 20px", borderRadius: 10,
                border: "1px solid hsl(var(--ember) / .3)",
                background: "hsl(var(--ember) / .04)",
              }}
            >
              <div className="font-sans" style={{ fontSize: 14, fontWeight: 600, color: "hsl(var(--fog))", marginBottom: 4 }}>
                מחיקת המנה
              </div>
              <p className="font-sans" style={{ fontSize: 13, color: "hsl(var(--subtle))", marginBottom: 14, lineHeight: 1.5 }}>
                פעולה זו בלתי הפיכה. המנה, תמונותיה ומדיניות הגשה ימחקו לצמיתות.
              </p>
              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="font-sans"
                  style={{
                    padding: "8px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer",
                    background: "transparent", border: "1px solid hsl(var(--ember) / .5)",
                    color: "hsl(var(--ember))", display: "flex", alignItems: "center", gap: 6,
                    transition: "all .15s",
                  }}
                >
                  <Trash2 style={{ width: 13, height: 13 }} />
                  מחק מנה
                </button>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div className="font-sans" style={{ fontSize: 13, color: "hsl(var(--fog))" }}>
                    הקלד את שם המנה לאישור:
                    <span style={{ fontWeight: 600, marginRight: 4 }}>{form.name}</span>
                  </div>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder={form.name}
                    className="font-sans"
                    style={{
                      fontSize: 14, padding: "10px 14px",
                      background: "hsl(var(--void))",
                      border: "1px solid hsl(var(--ember) / .4)",
                      borderRadius: 8, color: "hsl(var(--fog))", outline: "none",
                    }}
                  />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={deleteConfirmText !== form.name}
                      className="font-sans"
                      style={{
                        padding: "8px 16px", borderRadius: 8, fontSize: 13, cursor: deleteConfirmText !== form.name ? "not-allowed" : "pointer",
                        background: deleteConfirmText !== form.name ? "hsl(var(--line))" : "hsl(var(--ember))",
                        border: "none", color: "white", transition: "all .15s",
                      }}
                    >
                      מחק לצמיתות
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText(""); }}
                      className="font-sans"
                      style={{
                        padding: "8px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer",
                        background: "transparent", border: "1px solid hsl(var(--line))",
                        color: "hsl(var(--subtle))",
                      }}
                    >
                      ביטול
                    </button>
                  </div>
                </div>
              )}
            </div>
          </SectionCard>
        </div>

        {/* RIGHT: sticky preview ────────────────────────────────────── */}
        <div style={{ position: "sticky", top: 24 }}>
          {/* Preview label */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px", marginBottom: 14 }}>
            <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".14em", color: "hsl(var(--subtle))" }}>
              תצוגה מקדימה · חי
            </span>
            <span
              className="font-mono uppercase"
              style={{ fontSize: 10, letterSpacing: ".14em", color: "hsl(var(--accent-bright))", display: "flex", alignItems: "center", gap: 5 }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(var(--accent-bright))", display: "inline-block", opacity: .7 }} />
              מסנכרן
            </span>
          </div>

          {/* Phone mockup */}
          <div
            style={{
              background: "hsl(var(--fog))",
              borderRadius: 28, padding: "12px 12px 16px",
              boxShadow: "0 30px 80px -30px rgba(0,0,0,.25)",
            }}
          >
            <div
              style={{
                background: "hsl(var(--void))",
                borderRadius: 18, overflow: "hidden",
                aspectRatio: "9 / 19",
              }}
            >
              {/* Status bar */}
              <div
                className="font-mono"
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "8px 14px", fontSize: 10, color: "hsl(var(--fog))",
                }}
              >
                <span>9:41</span>
                <span>●●●●</span>
              </div>

              {/* Photo area */}
              <div
                style={{
                  aspectRatio: "4/3",
                  background: form.image_url
                    ? `url(${form.image_url}) center/cover`
                    : "linear-gradient(135deg, hsl(28,40%,32%), hsl(28,55%,45%))",
                  position: "relative",
                }}
              >
                {(form.model_3d_url || form.photos_360?.length) && (
                  <div
                    className="font-mono"
                    style={{
                      position: "absolute", top: 10, right: 10,
                      background: "rgba(255,255,255,.95)", borderRadius: 99,
                      padding: "4px 9px", fontSize: 9, letterSpacing: ".12em",
                      color: "hsl(var(--accent-bright))",
                      display: "flex", alignItems: "center", gap: 4,
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "hsl(var(--accent-bright))", display: "inline-block" }} />
                    {form.model_3d_url ? "3D" : "360°"}
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: "14px 16px" }}>
                <div
                  className="font-display"
                  style={{ fontSize: 20, fontWeight: 600, color: "hsl(var(--fog))", lineHeight: 1.1 }}
                >
                  {form.name || "שם המנה"}
                </div>
                <div
                  className="font-mono"
                  style={{ fontSize: 13, color: "hsl(var(--accent-bright))", marginTop: 4, letterSpacing: ".04em" }}
                >
                  {form.price ? `₪${form.price}` : "₪—"}
                </div>
                {form.description && (
                  <div
                    className="font-sans"
                    style={{
                      fontSize: 12, color: "hsl(var(--subtle))",
                      lineHeight: 1.5, marginTop: 8,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    } as React.CSSProperties}
                  >
                    {form.description}
                  </div>
                )}

                {/* Tag row */}
                {(form.tags.length > 0 || form.is_signature || form.is_new || form.is_featured) && (
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 10 }}>
                    {form.is_signature && (
                      <span style={{ padding: "3px 9px", borderRadius: 99, fontSize: 10, fontWeight: 500, color: "hsl(var(--accent-bright))", background: "hsl(28,62%,42%,.1)", border: "1px solid hsl(28,62%,42%,.18)" }}>
                        מנת השף
                      </span>
                    )}
                    {form.is_new && (
                      <span style={{ padding: "3px 9px", borderRadius: 99, fontSize: 10, fontWeight: 500, color: "hsl(120,30%,32%)", background: "hsl(120,30%,40%,.1)", border: "1px solid hsl(120,30%,40%,.2)" }}>
                        חדש
                      </span>
                    )}
                    {form.tags.slice(0, 2).map((t) => {
                      const found = MENU_TAGS.find((mt) => mt.key === t);
                      return found ? (
                        <span key={t} style={{ padding: "3px 9px", borderRadius: 99, fontSize: 10, fontWeight: 500, color: "hsl(var(--accent-bright))", background: "hsl(28,62%,42%,.1)", border: "1px solid hsl(28,62%,42%,.18)" }}>
                          {found.label}
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>

              {/* CTA */}
              <div
                className="font-sans"
                style={{
                  margin: "0 16px 14px",
                  padding: 12, borderRadius: 10,
                  background: "var(--grad-bronze)",
                  textAlign: "center", fontSize: 13, fontWeight: 600, color: "white",
                }}
              >
                הוסף להזמנה
              </div>
            </div>
          </div>

          {/* Meta stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
            {[
              { k: "מנה",          v: categoryName || "—" },
              { k: "מחיר",         v: form.price ? `₪${form.price}` : "—" },
              { k: "מצב",          v: form.is_available ? "זמין" : "אזל" },
              { k: "מודל 3D",      v: form.model_3d_url ? "✓ פעיל" : "—" },
            ].map(({ k, v }) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".14em", color: "hsl(var(--dim))" }}>{k}</span>
                <span className="font-sans" style={{ color: "hsl(var(--fog))", fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Photo 360 modal */}
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
    </div>
  );
}
