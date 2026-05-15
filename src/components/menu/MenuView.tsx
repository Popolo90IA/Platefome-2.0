"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { UtensilsCrossed, X, Share2 } from "lucide-react";
import { DishModelViewer } from "./DishModelViewer";
import { Photo360Viewer } from "./Photo360Viewer";
import { trackEvent } from "@/lib/analytics";
import { LANGUAGE_META, pickLocalized, t, formatCurrency } from "@/lib/i18n";
import { buildMenuTheme } from "@/lib/theme";
import type { Restaurant, Category, Dish, Language } from "@/types/database.types";

/* ─── CSS variable aliases ──────────────────────────────── */
const D = {
  page:    "var(--mt-page)",
  section: "var(--mt-section)",
  card:    "var(--mt-card)",
  surface: "var(--mt-surface)",
  line:    "var(--mt-line)",
  line2:   "var(--mt-line2)",
  textDim: "var(--mt-text-dim)",
  text:    "var(--mt-text)",
  cream:   "var(--mt-cream)",
  gold:    "var(--mt-gold)",
  goldLt:  "var(--mt-gold-lt)",
  grad:    "var(--mt-grad)",
} as const;

/* SVG grain as inline data URI — fixed overlay, no external request */
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='.12'/%3E%3C/svg%3E")`;

/* Deterministic placeholder gradient per dish index */
const PLACEHOLDER_GRADIENTS = [
  // 0 — hummus cream
  "radial-gradient(ellipse 14% 8% at 38% 44%, hsl(20,75%,38%) 0%, transparent 70%), radial-gradient(ellipse 18% 10% at 62% 56%, hsl(20,75%,38%) 0%, transparent 70%), radial-gradient(circle at 50% 50%, hsl(36,55%,72%) 0%, hsl(36,45%,62%) 35%, hsl(28,40%,40%) 60%, hsl(24,35%,28%) 100%)",
  // 1 — red stew
  "radial-gradient(circle at 30% 35%, hsl(15,50%,28%) 6%, transparent 9%), radial-gradient(circle at 65% 30%, hsl(15,50%,28%) 7%, transparent 10%), radial-gradient(circle at 50% 50%, hsl(8,65%,42%) 0%, hsl(5,55%,32%) 70%, hsl(5,40%,22%) 100%)",
  // 2 — greens with tomato
  "radial-gradient(circle at 25% 30%, hsl(0,75%,52%) 5%, transparent 7%), radial-gradient(circle at 70% 28%, hsl(0,75%,52%) 4%, transparent 6%), radial-gradient(circle at 50% 60%, hsl(0,75%,52%) 6%, transparent 8%), linear-gradient(135deg, hsl(95,45%,32%), hsl(110,40%,38%))",
  // 3 — golden flatbread
  "radial-gradient(ellipse 18% 18% at 50% 48%, hsl(48,90%,72%) 0%, hsl(40,80%,58%) 60%, transparent 75%), radial-gradient(circle at 50% 50%, hsl(36,75%,55%) 0%, hsl(32,65%,42%) 55%, hsl(28,55%,32%) 100%)",
  // 4 — falafel on parsley
  "radial-gradient(circle at 28% 35%, hsl(28,55%,32%) 7%, transparent 9%), radial-gradient(circle at 60% 30%, hsl(28,55%,32%) 8%, transparent 10%), radial-gradient(circle at 35% 65%, hsl(28,55%,32%) 8%, transparent 10%), linear-gradient(135deg, hsl(85,40%,35%), hsl(95,35%,42%))",
  // 5 — orange shredded pastry
  "repeating-linear-gradient(135deg, transparent 0 6px, hsl(28,80%,48%,.25) 6px 7px), radial-gradient(ellipse 30% 18% at 50% 50%, hsl(45,90%,68%) 0%, hsl(38,75%,55%) 65%, transparent 75%), radial-gradient(circle at 50% 50%, hsl(28,55%,42%) 0%, hsl(24,45%,28%) 100%)",
];

function dishPlaceholder(idx: number): string {
  return PLACEHOLDER_GRADIENTS[idx % PLACEHOLDER_GRADIENTS.length];
}

/* ─── Types ─────────────────────────────────────────────── */
interface MenuViewProps {
  restaurant: Restaurant;
  categories: Category[];
  dishes: Dish[];
  slug?: string;
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export function MenuView({ restaurant, categories, dishes, slug }: MenuViewProps) {
  const available: Language[] = (restaurant.languages ?? ["he"]).filter((l) =>
    ["he", "en", "fr"].includes(l)
  ) as Language[];
  const defaultLang = (restaurant.default_language ?? "he") as Language;
  const [lang, setLang] = useState<Language>(defaultLang);
  const [langOpen, setLangOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    categories[0]?.id ?? null
  );
  const [modalDish, setModalDish] = useState<Dish | null>(null);
  const [search, setSearch] = useState("");
  const dir = LANGUAGE_META[lang].dir;

  /* Persist language preference */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`menu:${restaurant.slug}:lang`);
      if (saved && (available as string[]).includes(saved)) setLang(saved as Language);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try { localStorage.setItem(`menu:${restaurant.slug}:lang`, lang); } catch {}
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir, restaurant.slug]);

  /* Track menu view once per session */
  useEffect(() => {
    try {
      const key = `menu:${restaurant.slug}:tracked`;
      if (!sessionStorage.getItem(key)) {
        trackEvent(restaurant.id, "menu_view", { language: lang });
        if (typeof document !== "undefined" && (!document.referrer || document.referrer === ""))
          trackEvent(restaurant.id, "qr_scan", { language: lang });
        sessionStorage.setItem(key, "1");
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Lock body scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = modalDish ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalDish]);

  const currency = restaurant.currency || "ILS";
  const restaurantName = restaurant.name;

  /* Theme tokens */
  const themeVars = buildMenuTheme(
    restaurant.theme_primary,
    restaurant.theme_dark_mode
  ) as React.CSSProperties;

  /* Search filter */
  const searchTrimmed = search.trim().toLowerCase();
  const isSearching = searchTrimmed.length > 0;
  const filteredDishes = isSearching
    ? dishes.filter((d) => {
        const name = (d.name || "").toLowerCase();
        const nameEn = ((d as Record<string, unknown>).name_en as string || "").toLowerCase();
        const nameFr = ((d as Record<string, unknown>).name_fr as string || "").toLowerCase();
        const desc = (d.description || "").toLowerCase();
        return name.includes(searchTrimmed) || nameEn.includes(searchTrimmed) || nameFr.includes(searchTrimmed) || desc.includes(searchTrimmed);
      })
    : dishes;

  const dishesByCategory = categories.map((cat) => ({
    category: cat,
    dishes: filteredDishes.filter((d) => d.category_id === cat.id),
  }));
  /* Flatten dish index for placeholder cycling */
  let dishGlobalIdx = 0;

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const el = document.getElementById(`cat-${catId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleShare = async () => {
    try {
      await navigator.share({ url: window.location.href, title: restaurantName });
    } catch {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  };

  return (
    <div
      dir={dir}
      style={{
        ...themeVars,
        minHeight: "100vh",
        background: D.page,
        color: D.text,
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* ── Grain texture overlay (fixed, full-page) ── */}
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, zIndex: 1,
          pointerEvents: "none",
          backgroundImage: GRAIN_SVG,
          backgroundSize: "240px",
          opacity: 0.06,
          mixBlendMode: "screen",
        }}
      />

      {/* ══════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════ */}
      <header
        style={{
          position: "relative",
          height: 360,
          overflow: "hidden",
          borderBottom: `1px solid ${D.line}`,
        }}
      >
        {/* Background */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            background: restaurant.banner_url
              ? undefined
              : `radial-gradient(ellipse at 30% 50%, hsl(28,62%,30%,.6), transparent 60%),
                 radial-gradient(ellipse at 70% 30%, hsl(22,70%,40%,.5), transparent 60%),
                 linear-gradient(135deg, hsl(28,30%,14%) 0%, hsl(28,18%,6%) 100%)`,
          }}
        >
          {restaurant.banner_url && (
            <Image
              src={restaurant.banner_url}
              alt=""
              aria-hidden
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", filter: "brightness(.4) saturate(.7)", transform: "scale(1.08)" }}
            />
          )}
        </div>
        {/* Bottom fade */}
        <div
          aria-hidden
          style={{ position: "absolute", inset: "auto 0 0", height: 180, background: `linear-gradient(180deg, transparent 0%, ${D.page} 100%)`, pointerEvents: "none" }}
        />

        {/* Utility bar (top) */}
        <div
          style={{
            position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)",
            zIndex: 10, maxWidth: 720, width: "calc(100% - 48px)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}
        >
          {/* Language pill */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setLangOpen(v => !v)}
              onBlur={() => setTimeout(() => setLangOpen(false), 120)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "8px 14px", borderRadius: 99,
                background: "hsl(28,18%,6%,.6)", backdropFilter: "blur(16px)",
                border: `1px solid ${D.line}`,
                fontFamily: "'DM Mono', monospace", fontSize: "10.5px", letterSpacing: ".14em",
                textTransform: "uppercase", color: D.text, cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 14 }}>{LANGUAGE_META[lang].flag}</span>
              {lang.toUpperCase()}
              {available.length > 1 && (
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: .6 }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              )}
            </button>
            {langOpen && available.length > 1 && (
              <div style={{
                position: "absolute", top: "calc(100% + 8px)", insetInlineStart: 0, minWidth: 160,
                background: D.card, border: `1px solid ${D.line2}`, borderRadius: 12,
                overflow: "hidden", zIndex: 50,
                boxShadow: "0 16px 40px rgba(0,0,0,.5)",
              }}>
                {available.map(l => (
                  <button
                    key={l}
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); setLang(l); setLangOpen(false); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      width: "100%", padding: "11px 16px",
                      background: l === lang ? `${D.gold}1a` : "transparent",
                      border: "none", cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif", fontSize: 13.5,
                      color: l === lang ? D.gold : D.text,
                      textAlign: "start",
                    }}
                    dir={LANGUAGE_META[l].dir}
                  >
                    <span style={{ fontSize: 16 }}>{LANGUAGE_META[l].flag}</span>
                    {LANGUAGE_META[l].label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Share pill */}
          <button
            type="button"
            onClick={handleShare}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 14px", borderRadius: 99,
              background: "hsl(28,18%,6%,.6)", backdropFilter: "blur(16px)",
              border: `1px solid ${D.line}`,
              fontFamily: "'DM Mono', monospace", fontSize: "10.5px", letterSpacing: ".14em",
              textTransform: "uppercase", color: D.text, cursor: "pointer",
            }}
          >
            <Share2 style={{ width: 11, height: 11 }} strokeWidth={1.6} />
            Share
          </button>
        </div>

        {/* Hero content (bottom-aligned) */}
        <div
          style={{
            position: "relative", zIndex: 2, height: "100%",
            maxWidth: 720, margin: "0 auto", padding: "0 24px 36px",
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
          }}
        >
          {/* Restaurant mark row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{
              width: 48, height: 48,
              background: D.grad,
              borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff",
              boxShadow: `0 0 32px ${D.gold}59`,
              flexShrink: 0,
            }}>
              {restaurant.logo_url ? (
                <Image
                  src={restaurant.logo_url}
                  alt={restaurantName}
                  width={48}
                  height={48}
                  style={{ borderRadius: 12, objectFit: "cover" }}
                  priority
                />
              ) : (
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 22 Q5 12 16 12 Q27 12 27 22 Z"/>
                  <line x1="3" y1="22" x2="29" y2="22"/>
                  <circle cx="16" cy="9" r="1.5" fill="currentColor"/>
                  <line x1="16" y1="10.5" x2="16" y2="12"/>
                </svg>
              )}
            </div>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: D.textDim }}>
                {restaurantName}
                {restaurant.address && ` · ${restaurant.address}`}
              </div>
            </div>
          </div>

          {/* Restaurant name as h1 */}
          <h1
            style={{
              fontFamily: "'Noto Serif Hebrew', 'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: "clamp(48px, 8vw, 72px)",
              lineHeight: .95,
              letterSpacing: "-.02em",
              color: D.cream,
              margin: "0 0 12px",
            }}
          >
            {restaurantName}
          </h1>

          {/* Meta row */}
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontFamily: "'DM Mono', monospace", fontSize: "10.5px", letterSpacing: ".18em", textTransform: "uppercase", color: D.textDim }}>
            {restaurant.phone && (
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 4, height: 4, borderRadius: 99, background: D.gold, display: "inline-block" }}/>
                <a href={`tel:${restaurant.phone}`} style={{ color: "inherit", textDecoration: "none" }} dir="ltr">{restaurant.phone}</a>
              </span>
            )}
            {restaurant.address && (
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 4, height: 4, borderRadius: 99, background: D.gold, display: "inline-block" }}/>
                {restaurant.address}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          STICKY CATEGORY NAV
          ══════════════════════════════════════════════ */}
      {categories.length > 0 && (
        <nav
          style={{
            position: "sticky", top: 0, zIndex: 20,
            background: "hsl(28,18%,6%,.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: `1px solid ${D.line}`,
          }}
        >
          {/* Category pills */}
          <div style={{ padding: "12px 24px 0", overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "none" }}>
            <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", gap: 6 }}>
              {categories.map((cat) => {
                const catName = pickLocalized(cat as unknown as Record<string, unknown>, "name", lang) || cat.name;
                const isActive = !isSearching && activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => { setSearch(""); scrollToCategory(cat.id); }}
                    style={{
                      padding: "7px 16px", borderRadius: 99,
                      background: isActive ? D.grad : "transparent",
                      border: `1px solid ${isActive ? "transparent" : D.line}`,
                      color: isActive ? "#fff" : D.textDim,
                      fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                      cursor: "pointer", flexShrink: 0,
                      boxShadow: isActive ? `0 0 20px ${D.gold}4d` : "none",
                      transition: "all .15s",
                    }}
                  >
                    {catName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search bar */}
          <div style={{ padding: "10px 24px 12px" }}>
            <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
              <svg
                aria-hidden
                width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ position: "absolute", top: "50%", insetInlineStart: 12, transform: "translateY(-50%)", color: D.textDim, pointerEvents: "none" }}
              >
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t(lang, "search_placeholder")}
                dir={dir}
                style={{
                  width: "100%",
                  paddingInlineStart: 34,
                  paddingInlineEnd: search ? 34 : 12,
                  paddingTop: 8,
                  paddingBottom: 8,
                  borderRadius: 99,
                  background: "hsl(28,22%,12%,.8)",
                  border: `1px solid ${search ? D.line2 : D.line}`,
                  color: D.cream,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color .2s",
                }}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="נקה חיפוש"
                  style={{
                    position: "absolute", top: "50%", insetInlineEnd: 8, transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: D.textDim,
                    display: "flex", alignItems: "center", padding: 4,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* ══════════════════════════════════════════════
          MENU SECTIONS
          ══════════════════════════════════════════════ */}
      <main>
        {isSearching && filteredDishes.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 24px" }}>
            <UtensilsCrossed style={{ width: 44, height: 44, color: D.gold, opacity: 0.22, margin: "0 auto 16px" }} />
            <p style={{ color: D.textDim, fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>{t(lang, "no_search_results")}</p>
            <button
              type="button"
              onClick={() => setSearch("")}
              style={{ marginTop: 16, fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: D.gold, background: "none", border: `1px solid ${D.line2}`, borderRadius: 99, padding: "8px 18px", cursor: "pointer" }}
            >
              ✕ {t(lang, "search_placeholder").replace("...", "")}
            </button>
          </div>
        ) : dishesByCategory.length === 0 ? (
          <div style={{ textAlign: "center", padding: "120px 24px" }}>
            <UtensilsCrossed style={{ width: 52, height: 52, color: D.gold, opacity: 0.25, margin: "0 auto 16px" }} />
            <p style={{ color: D.textDim, fontFamily: "'DM Sans', sans-serif" }}>{t(lang, "empty_menu")}</p>
          </div>
        ) : (
          dishesByCategory.map(({ category, dishes: catDishes }) => {
            const catName = pickLocalized(category as unknown as Record<string, unknown>, "name", lang) || category.name;
            const catTotal = catDishes.length;
            /* Skip empty categories when searching */
            if (isSearching && catTotal === 0) return null;
            return (
              <section key={category.id} id={`cat-${category.id}`} style={{ scrollMarginTop: 64 }}>

                {/* ── Section rule ── */}
                <div style={{ margin: "56px auto 24px", maxWidth: 860, padding: "0 24px", display: "flex", alignItems: "center", gap: 14 }}>
                  <h2 style={{ fontFamily: "'Noto Serif Hebrew', 'Cormorant Garamond', serif", fontWeight: 500, fontSize: 32, letterSpacing: "-.02em", color: D.cream, margin: 0, flexShrink: 0, lineHeight: 1 }}>
                    {catName}
                  </h2>
                  <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${D.line2} 50%, transparent)` }}/>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: D.textDim }}>
                    {String(catTotal).padStart(2, "0")}
                  </span>
                </div>

                {/* ── Dish list ── */}
                <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: 14 }}>
                  {catDishes.length === 0 ? (
                    <p style={{ color: D.textDim, fontSize: 13, paddingInlineStart: 4, fontFamily: "'DM Sans', sans-serif" }}>{t(lang, "no_dishes_in_cat")}</p>
                  ) : (
                    catDishes.map((dish) => {
                      const idx = dishGlobalIdx++;
                      return (
                        <DishCard
                          key={dish.id}
                          dish={dish}
                          restaurantId={restaurant.id}
                          lang={lang}
                          currency={currency}
                          placeholderGradient={dishPlaceholder(idx)}
                          onOpen={() => setModalDish(dish)}
                        />
                      );
                    })
                  )}
                </div>
              </section>
            );
          })
        )}

        {/* Bottom padding */}
        <div style={{ height: 80 }} />
      </main>

      {/* ══════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════ */}
      <footer>
        <div style={{ maxWidth: 860, margin: "60px auto 0", padding: "36px 24px", borderTop: `1px solid ${D.line}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <span style={{ color: D.gold, display: "flex", alignItems: "center" }}>
            <svg width="14" height="14" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 22 Q5 12 16 12 Q27 12 27 22 Z"/>
              <line x1="3" y1="22" x2="29" y2="22"/>
              <circle cx="16" cy="9" r="1.5" fill="currentColor"/>
            </svg>
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: D.textDim }}>
            {t(lang, "powered")}
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: ".18em", color: D.text }}>
            PLATE<em style={{ fontStyle: "italic", color: D.gold }}>FORM</em>
          </span>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════
          DISH DETAIL MODAL
          ══════════════════════════════════════════════ */}
      {modalDish && (
        <DishModal
          dish={modalDish}
          restaurantId={restaurant.id}
          lang={lang}
          currency={currency}
          onClose={() => setModalDish(null)}
        />
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   DISH CARD
   ════════════════════════════════════════════════════════ */
function DishCard({
  dish, restaurantId, lang, currency, placeholderGradient, onOpen,
}: {
  dish: Dish;
  restaurantId: string;
  lang: Language;
  currency: string;
  placeholderGradient: string;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [show360, setShow360] = useState(false);
  const name = pickLocalized(dish as unknown as Record<string, unknown>, "name", lang) || dish.name;
  const desc = pickLocalized(dish as unknown as Record<string, unknown>, "description", lang);
  const soldout = !dish.is_available;
  const has3d = !!dish.model_3d_url;
  const has360 = Array.isArray(dish.photos_360) && dish.photos_360.length > 0;
  const hasVideo = !!dish.video_url;

  /* Badge type — highest capability first */
  const badgeType: "3D" | "Video" | "AR" | "360" | null =
    has3d ? (dish.ar_enabled ? "AR" : "3D") :
    hasVideo ? "Video" :
    has360 ? "360" :
    null;

  const openModal = () => {
    trackEvent(restaurantId, "dish_view", { dishId: dish.id, language: lang });
    onOpen();
  };

  const open360 = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent(restaurantId, "ar_view", { dishId: dish.id, language: lang });
    setShow360(true);
  };

  return (
    <>
      <article
        tabIndex={0}
        role="button"
        aria-label={name}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={openModal}
        onKeyDown={(e) => e.key === "Enter" && openModal()}
        style={{
          display: "flex",
          flexDirection: "row",
          direction: "ltr",
          gap: 16,
          background: hovered ? "hsl(28,22%,14%)" : D.card,
          border: `1px solid ${hovered ? D.line2 : D.line}`,
          borderRadius: 14,
          padding: 14,
          cursor: "pointer",
          transition: "border-color .25s, background .25s",
          position: "relative",
          outline: "none",
          opacity: soldout ? 0.62 : 1,
          alignItems: "center",
        }}
      >
        {/* Media column — gauche, carré 80px */}
        <div
          style={{
            position: "relative",
            borderRadius: 10,
            overflow: "hidden",
            width: 90,
            height: 90,
            flexShrink: 0,
            background: dish.image_url ? undefined : placeholderGradient,
          }}
        >
          {/* Shimmer highlight */}
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 30%, rgba(255,220,170,.3), transparent 60%)", zIndex: 1, pointerEvents: "none" }} />

          {dish.video_url ? (
            <video
              src={dish.video_url}
              poster={dish.image_url ?? undefined}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .5s", transform: hovered ? "scale(1.08)" : "scale(1)" }}
              muted loop playsInline preload="metadata"
              onMouseEnter={(e) => { e.currentTarget.play().catch(() => {}); trackEvent(restaurantId, "video_play", { dishId: dish.id }); }}
              onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
            />
          ) : dish.image_url ? (
            <Image
              src={dish.image_url}
              alt={name}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              style={{ objectFit: "cover", display: "block", transition: "transform .5s", transform: hovered ? "scale(1.08)" : "scale(1)" }}
            />
          ) : null}

          {/* Soldout overlay */}
          {soldout && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
              <span style={{ fontSize: 8, fontFamily: "'DM Mono', monospace", letterSpacing: ".1em", textTransform: "uppercase", color: "#fff" }}>
                {t(lang, "soldout")}
              </span>
            </div>
          )}

          {/* Media badge */}
          {badgeType && (
            <span style={{ position: "absolute", bottom: 4, insetInlineStart: 4, zIndex: 3, fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: ".1em", textTransform: "uppercase", padding: "2px 6px", borderRadius: 99, background: "hsl(28,18%,6%,.8)", backdropFilter: "blur(8px)", color: D.goldLt, display: "flex", alignItems: "center", gap: 3 }}>
              {badgeType === "3D" || badgeType === "AR" ? (
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="9" ry="3"/></svg>
              ) : badgeType === "Video" ? (
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              ) : (
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/></svg>
              )}
              {badgeType}
            </span>
          )}
        </div>

        {/* Info column — milieu, flex-1 */}
        <div style={{ flex: 1, minWidth: 0, direction: "rtl" }}>
          <h3 style={{ fontFamily: "'Noto Serif Hebrew', 'Cormorant Garamond', serif", fontWeight: 600, fontSize: 19, lineHeight: 1.15, color: D.cream, margin: "0 0 4px" }}>
            {name}
          </h3>

          {desc && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.55, color: D.textDim, margin: "0 0 8px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {desc}
            </p>
          )}

          {/* Tags row */}
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {dish.is_signature && <DishTag color="gold">מנת השף</DishTag>}
            {dish.is_new && <DishTag color="orange">חדש</DishTag>}
            {dish.is_featured && <DishTag color="orange">מומלץ</DishTag>}
            {soldout && <DishTag color="muted">{t(lang, "soldout")}</DishTag>}
            {has360 && (
              <button
                type="button"
                onClick={open360}
                style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: ".14em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 99, color: D.goldLt, background: `${D.goldLt}14`, border: `1px solid ${D.goldLt}2d`, cursor: "pointer" }}
              >
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/></svg>
                360°
              </button>
            )}
            {has3d && !has360 && (
              <DishModelViewer
                restaurantId={restaurantId}
                dishId={dish.id}
                dishName={name}
                modelUrl={dish.model_3d_url!}
                arEnabled={dish.ar_enabled}
                language={lang}
                trigger={
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: ".14em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 99, color: D.goldLt, background: `${D.goldLt}14`, border: `1px solid ${D.goldLt}2d` }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="9" ry="3"/></svg>
                    3D
                  </span>
                }
              />
            )}
          </div>
        </div>

        {/* Prix — badge à droite */}
        <div style={{
          flexShrink: 0, alignSelf: "center",
          fontFamily: "'DM Mono', monospace", fontSize: 13.5, color: D.cream,
          background: D.surface, borderRadius: 8, padding: "6px 12px",
          border: `1px solid ${D.line}`, letterSpacing: ".02em",
        }}>
          {formatCurrency(Number(dish.price), currency, lang)}
        </div>
      </article>

      {show360 && has360 && (
        <Photo360Viewer
          photos={dish.photos_360 as string[]}
          dishName={name}
          onClose={() => setShow360(false)}
        />
      )}
    </>
  );
}

/* ════════════════════════════════════════════════════════
   DISH DETAIL MODAL
   ════════════════════════════════════════════════════════ */
function DishModal({
  dish, restaurantId, lang, currency, onClose,
}: {
  dish: Dish;
  restaurantId: string;
  lang: Language;
  currency: string;
  onClose: () => void;
}) {
  const name = pickLocalized(dish as unknown as Record<string, unknown>, "name", lang) || dish.name;
  const desc = pickLocalized(dish as unknown as Record<string, unknown>, "description", lang);
  const has3d = !!dish.model_3d_url;
  const has360 = Array.isArray(dish.photos_360) && dish.photos_360.length > 0;
  const hasVideo = !!dish.video_url;
  const [arTab, setArTab] = useState<"2D" | "3D" | "360" | "AR">("2D");
  const [show360, setShow360] = useState(false);

  const dir = LANGUAGE_META[lang].dir;

  /* Keyboard close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={name}
      dir={dir}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "hsl(28,18%,6%,.7)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
      onClick={onClose}
    >
      <div
        style={{ background: D.card, border: `1px solid ${D.line2}`, borderRadius: 22, maxWidth: 560, width: "100%", maxHeight: "90vh", overflow: "auto", boxShadow: "0 40px 100px rgba(0,0,0,.5)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Art / media area */}
        <div style={{ position: "relative", aspectRatio: "1.6", background: dish.image_url ? undefined : "linear-gradient(135deg, hsl(28,40%,32%), hsl(28,55%,45%))", overflow: "hidden" }}>
          {dish.image_url && (
            <Image src={dish.image_url} alt={name} fill sizes="(max-width: 640px) 100vw, 560px" style={{ objectFit: "cover" }} />
          )}
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 30%, rgba(255,220,170,.4), transparent 60%)" }}/>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="סגור"
            style={{ position: "absolute", top: 16, insetInlineStart: 16, zIndex: 10, width: 36, height: 36, borderRadius: 99, background: "hsl(28,18%,6%,.7)", backdropFilter: "blur(8px)", border: `1px solid ${D.line}`, color: D.cream, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <X style={{ width: 14, height: 14 }} strokeWidth={2}/>
          </button>

          {/* AR/view toggle tabs */}
          {(has3d || has360 || hasVideo) && (
            <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4, background: "hsl(28,18%,6%,.7)", backdropFilter: "blur(16px)", border: `1px solid ${D.line}`, borderRadius: 99, padding: 4 }}>
              {(["2D", ...(hasVideo ? [] : []), ...(has3d ? ["3D"] : []), ...(has360 ? ["360"] : []), ...(dish.ar_enabled && has3d ? ["AR"] : [])] as ("2D"|"3D"|"360"|"AR")[]).map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setArTab(tab)}
                  style={{ padding: "7px 14px", borderRadius: 99, fontFamily: "'DM Mono', monospace", fontSize: "9.5px", letterSpacing: ".18em", textTransform: "uppercase", color: arTab === tab ? "#fff" : D.textDim, border: "none", background: arTab === tab ? D.grad : "transparent", cursor: "pointer", transition: "all .15s" }}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px 28px" }}>
          <h2 style={{ fontFamily: "'Noto Serif Hebrew', 'Cormorant Garamond', serif", fontWeight: 600, fontSize: 32, letterSpacing: "-.02em", color: D.cream, margin: "0 0 8px", lineHeight: 1.05 }}>
            {name}
          </h2>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 16, color: D.gold, letterSpacing: ".04em", marginBottom: 16 }}>
            {formatCurrency(Number(dish.price), currency, lang)}
          </div>
          {desc && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: D.text, margin: "0 0 18px" }}>
              {desc}
            </p>
          )}

          {/* Info rows */}
          {dish.allergens && dish.allergens.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 14, borderTop: `1px solid ${D.line}` }}>
              <InfoRow label="אלרגנים" value={dish.allergens.join(", ")} />
            </div>
          )}

          {/* 3D viewer inline — lazy */}
          {arTab === "3D" && has3d && (
            <div style={{ marginTop: 20 }}>
              <DishModelViewer
                restaurantId={restaurantId}
                dishId={dish.id}
                dishName={name}
                modelUrl={dish.model_3d_url!}
                arEnabled={false}
                language={lang}
                trigger={
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: D.grad, color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="9" ry="3"/></svg>
                    {t(lang, "view_3d_cta")}
                  </span>
                }
              />
            </div>
          )}

          {arTab === "AR" && has3d && dish.ar_enabled && (
            <div style={{ marginTop: 20 }}>
              <DishModelViewer
                restaurantId={restaurantId}
                dishId={dish.id}
                dishName={name}
                modelUrl={dish.model_3d_url!}
                arEnabled
                language={lang}
                trigger={
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: D.grad, color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                    {t(lang, "view_ar")}
                  </span>
                }
              />
            </div>
          )}

          {arTab === "360" && has360 && (
            <button
              type="button"
              onClick={() => setShow360(true)}
              style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: D.grad, color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 600, cursor: "pointer", border: "none" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/></svg>
              360°
            </button>
          )}
        </div>
      </div>

      {show360 && has360 && (
        <Photo360Viewer
          photos={dish.photos_360 as string[]}
          dishName={name}
          onClose={() => setShow360(false)}
        />
      )}
    </div>
  );
}

/* ── Info row (modal) ─────────────────────────────────── */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: D.textDim }}>{label}</span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: D.cream }}>{value}</span>
    </div>
  );
}

/* ── Dish tag badge ────────────────────────────────────── */
function DishTag({ color, children }: { color: "gold" | "orange" | "muted"; children: React.ReactNode }) {
  const styles: Record<string, { bg: string; border: string; text: string }> = {
    gold:   { bg: `hsl(36,80%,62%,.08)`, border: `hsl(36,80%,62%,.18)`, text: D.goldLt },
    orange: { bg: `hsl(28,62%,52%,.1)`,  border: `hsl(28,62%,52%,.25)`, text: D.gold },
    muted:  { bg: `rgba(255,255,255,.04)`, border: `rgba(255,255,255,.1)`, text: D.textDim },
  };
  const s = styles[color];
  return (
    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9.5px", letterSpacing: ".18em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 99, color: s.text, background: s.bg, border: `1px solid ${s.border}` }}>
      {children}
    </span>
  );
}
