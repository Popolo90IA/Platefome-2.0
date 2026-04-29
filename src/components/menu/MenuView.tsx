"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ImageIcon,
  UtensilsCrossed,
  Sparkles,
  Flame,
  Award,
  CircleOff,
  PlayCircle,
  View,
  ChevronLeft,
} from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DishModelViewer } from "./DishModelViewer";
import { Photo360Viewer } from "./Photo360Viewer";
import { trackEvent } from "@/lib/analytics";
import { LANGUAGE_META, pickLocalized, t, formatCurrency } from "@/lib/i18n";
import type {
  Restaurant,
  Category,
  Dish,
  Language,
} from "@/types/database.types";

/* ── Palette ── */
const C = {
  bg:        "#0d0b09",
  surface:   "#131009",
  card:      "#1a1510",
  cardHov:   "#201a13",
  border:    "rgba(200,150,60,.14)",
  borderHov: "rgba(200,150,60,.38)",
  orange:    "hsl(28,88%,52%)",
  orangeHov: "hsl(28,88%,62%)",
  gold:      "#c8963c",
  goldLight: "#e8b860",
  cream:     "#f2e8d8",
  muted:     "rgba(242,232,216,.52)",
  dim:       "rgba(242,232,216,.28)",
};

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.14'/%3E%3C/svg%3E")`;

interface MenuViewProps {
  restaurant: Restaurant;
  categories: Category[];
  dishes: Dish[];
  slug?: string;
}

export function MenuView({ restaurant, categories, dishes, slug }: MenuViewProps) {
  const available: Language[] = (restaurant.languages ?? ["he"]).filter((l) =>
    ["he", "en", "fr"].includes(l)
  ) as Language[];
  const defaultLang = (restaurant.default_language ?? "he") as Language;
  const [lang, setLang] = useState<Language>(defaultLang);
  const dir = LANGUAGE_META[lang].dir;

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

  useEffect(() => {
    try {
      const key = `menu:${restaurant.slug}:tracked`;
      if (!sessionStorage.getItem(key)) {
        trackEvent(restaurant.id, "menu_view", { language: lang });
        const fromQr = typeof document !== "undefined" && (!document.referrer || document.referrer === "");
        if (fromQr) trackEvent(restaurant.id, "qr_scan", { language: lang });
        sessionStorage.setItem(key, "1");
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currency = restaurant.currency || "ILS";
  const restaurantName = restaurant.name;
  const restaurantDesc = pickLocalized(restaurant as unknown as Record<string, unknown>, "description", lang);
  const dishesByCategory = categories.map((cat) => ({
    category: cat,
    dishes: dishes.filter((d) => d.category_id === cat.id),
  }));

  return (
    <div
      dir={dir}
      style={{
        minHeight: "100vh",
        background: C.bg,
        backgroundImage: GRAIN,
        color: C.cream,
        fontFamily: "'Noto Serif Hebrew', 'Georgia', serif",
      }}
    >
      {/* ══════════ HERO BANNER ══════════ */}
      <div style={{ position: "relative", width: "100%", minHeight: 280, overflow: "hidden", background: C.surface }}>
        {/* Warm ambient glow */}
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(180,90,20,.22) 0%, transparent 65%)", pointerEvents: "none" }} />

        {restaurant.banner_url ? (
          <>
            <div
              aria-hidden
              style={{ position: "absolute", inset: 0, backgroundImage: `url(${restaurant.banner_url})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(18px) brightness(.4) saturate(.8)", transform: "scale(1.08)" }}
            />
            <img
              src={restaurant.banner_url}
              alt={restaurantName}
              style={{ position: "relative", width: "100%", height: 280, objectFit: "cover", opacity: 0.85 }}
            />
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 280, background: `linear-gradient(to bottom, ${C.surface}, #1a1008)` }}>
            <UtensilsCrossed style={{ width: 60, height: 60, color: C.gold, opacity: 0.3 }} />
          </div>
        )}

        {/* Bottom fade */}
        <div aria-hidden style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 140, background: `linear-gradient(to top, ${C.bg}, transparent)`, pointerEvents: "none" }} />

        {/* Language switcher */}
        <div style={{ position: "absolute", top: 16, insetInlineEnd: 16, zIndex: 20 }}>
          <LanguageSwitcher value={lang} available={available} onChange={setLang} />
        </div>
      </div>

      {/* ══════════ RESTAURANT INFO ══════════ */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            marginTop: -72,
            position: "relative",
            zIndex: 10,
            background: `linear-gradient(160deg, #1f1912 0%, #17120d 100%)`,
            border: `1px solid ${C.borderHov}`,
            borderRadius: 20,
            padding: "32px 28px",
            boxShadow: "0 32px 64px rgba(0,0,0,.7), 0 0 0 1px rgba(200,150,60,.06), inset 0 1px 0 rgba(200,150,60,.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Logo / Initiale */}
            {restaurant.logo_url ? (
              <img
                src={restaurant.logo_url}
                alt={restaurantName}
                style={{ width: 76, height: 76, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.gold}`, flexShrink: 0, boxShadow: `0 0 0 4px rgba(200,150,60,.12)` }}
              />
            ) : (
              <div
                style={{ width: 76, height: 76, borderRadius: "50%", background: `linear-gradient(135deg, ${C.orange} 0%, ${C.gold} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 8px 24px rgba(180,90,20,.35)` }}
              >
                <span style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}>{restaurantName.charAt(0)}</span>
              </div>
            )}

            <div style={{ flex: 1, minWidth: 0 }}>
              <h1
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(1.5rem,5vw,2rem)", letterSpacing: "-.01em", margin: "0 0 8px", color: C.cream, lineHeight: 1.1 }}
              >
                {restaurantName}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: restaurantDesc ? 10 : 0 }}>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
              </div>
              {restaurantDesc && (
                <p style={{ fontSize: ".875rem", color: C.muted, lineHeight: 1.65, margin: 0 }}>{restaurantDesc}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ MENU ══════════ */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 20px 80px" }}>
        {dishesByCategory.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <UtensilsCrossed style={{ width: 52, height: 52, color: C.gold, opacity: 0.3, margin: "0 auto 16px" }} />
            <p style={{ color: C.muted }}>{t(lang, "empty_menu")}</p>
          </div>
        ) : (
          dishesByCategory.map(({ category, dishes: catDishes }, catIdx) => {
            const catName = pickLocalized(category as unknown as Record<string, unknown>, "name", lang);
            const num = String(catIdx + 1).padStart(2, "0");
            return (
              <section key={category.id} style={{ marginBottom: 64 }}>

                {/* ── Category Header ── */}
                <div style={{ marginBottom: 32, position: "relative" }}>
                  {/* Number + eyebrow */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <span
                      style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", fontWeight: 600, letterSpacing: ".22em", color: C.orange, opacity: 0.8 }}
                    >
                      {num}
                    </span>
                    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, rgba(200,150,60,.3), transparent)` }} />
                  </div>

                  {/* Title */}
                  <h2
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.8rem,6vw,2.4rem)", letterSpacing: "-.015em", color: C.goldLight, margin: "0 0 12px", lineHeight: 1 }}
                  >
                    {catName || category.name}
                  </h2>

                  {/* Divider */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 2, background: C.orange, borderRadius: 2 }} />
                    <div style={{ width: 8, height: 2, background: C.gold, borderRadius: 2, opacity: 0.5 }} />
                  </div>
                </div>

                {catDishes.length === 0 ? (
                  <p style={{ color: C.dim, fontSize: ".875rem", paddingInlineStart: 4 }}>{t(lang, "no_dishes_in_cat")}</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {catDishes.map((dish, i) => (
                      <DishCard
                        key={dish.id}
                        dish={dish}
                        restaurantId={restaurant.id}
                        lang={lang}
                        currency={currency}
                        slug={slug}
                        delay={catIdx * 50 + i * 35}
                      />
                    ))}
                  </div>
                )}
              </section>
            );
          })
        )}
      </div>

      {/* ══════════ FOOTER ══════════ */}
      <footer
        style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "48px 20px 40px" }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h3
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.5rem", color: C.goldLight, margin: "0 0 10px" }}
            >
              {restaurantName}
            </h3>
            <div style={{ width: 56, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: "0 auto" }} />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
            {restaurant.address && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin style={{ width: 15, height: 15, color: C.orange, flexShrink: 0 }} />
                <span style={{ fontSize: ".85rem", color: C.muted }}>{restaurant.address}</span>
              </div>
            )}
            {restaurant.phone && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Phone style={{ width: 15, height: 15, color: C.orange, flexShrink: 0 }} />
                <a href={`tel:${restaurant.phone}`} style={{ fontSize: ".85rem", color: C.muted, textDecoration: "none" }} dir="ltr">{restaurant.phone}</a>
              </div>
            )}
            {restaurant.email && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Mail style={{ width: 15, height: 15, color: C.orange, flexShrink: 0 }} />
                <a href={`mailto:${restaurant.email}`} style={{ fontSize: ".85rem", color: C.muted, textDecoration: "none" }} dir="ltr">{restaurant.email}</a>
              </div>
            )}
          </div>

          <p style={{ textAlign: "center", marginTop: 32, fontSize: ".65rem", color: C.dim, fontFamily: "'DM Mono',monospace", letterSpacing: ".1em", textTransform: "uppercase" }}>
            {t(lang, "powered")} <span style={{ color: C.gold }}>PLATFORME</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ════════════════════════════════════════
   DISH CARD
   ════════════════════════════════════════ */
function DishCard({
  dish, restaurantId, lang, currency, slug, delay,
}: {
  dish: Dish; restaurantId: string; lang: Language; currency: string; slug?: string; delay?: number;
}) {
  const name = pickLocalized(dish as unknown as Record<string, unknown>, "name", lang);
  const desc = pickLocalized(dish as unknown as Record<string, unknown>, "description", lang);
  const soldout = !dish.is_available;
  const has360 = Array.isArray(dish.photos_360) && dish.photos_360.length > 0;
  const [show360, setShow360] = useState(false);
  const [hovered, setHovered] = useState(false);

  const open360 = () => {
    trackEvent(restaurantId, "ar_view", { dishId: dish.id, language: lang });
    setShow360(true);
  };

  const detailHref = slug ? `/menu/${slug}/dish/${dish.id}` : undefined;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        gap: 0,
        background: hovered ? "#1f1912" : "#191410",
        border: `1px solid ${hovered ? "rgba(200,150,60,.36)" : "rgba(200,150,60,.12)"}`,
        borderRadius: 16,
        overflow: "hidden",
        transition: "all .25s ease",
        boxShadow: hovered
          ? "0 12px 40px rgba(0,0,0,.55), 0 0 0 1px rgba(200,150,60,.1)"
          : "0 2px 16px rgba(0,0,0,.3)",
        opacity: soldout ? 0.62 : 1,
      }}
    >
      {/* ── Image (left/right selon dir) ── */}
      <div
        style={{ position: "relative", width: 130, minWidth: 130, height: 140, overflow: "hidden", background: "#0f0c08", flexShrink: 0 }}
      >
        {dish.video_url ? (
          <video
            src={dish.video_url}
            poster={dish.image_url ?? undefined}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s ease", transform: hovered ? "scale(1.1)" : "scale(1)" }}
            muted loop playsInline preload="metadata"
            onMouseEnter={(e) => { e.currentTarget.play().catch(() => {}); trackEvent(restaurantId, "video_play", { dishId: dish.id }); }}
            onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
          />
        ) : dish.image_url ? (
          <img
            src={dish.image_url}
            alt={name || dish.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s ease", transform: hovered ? "scale(1.1)" : "scale(1)" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #1a1408, #0f0c08)" }}>
            <ImageIcon style={{ width: 30, height: 30, color: "rgba(200,150,60,.25)" }} />
          </div>
        )}

        {/* Warm gradient overlay on image */}
        {(dish.image_url || dish.video_url) && (
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,11,9,0) 50%, rgba(13,11,9,.25) 100%)", pointerEvents: "none" }} />
        )}

        {/* Video badge */}
        {dish.video_url && (
          <div style={{ position: "absolute", bottom: 8, insetInlineStart: 8, background: "rgba(0,0,0,.7)", borderRadius: 99, padding: "3px 8px", display: "flex", alignItems: "center", gap: 4 }}>
            <PlayCircle style={{ width: 12, height: 12, color: "#fff" }} />
            <span style={{ fontSize: "9px", color: "#fff", fontFamily: "'DM Mono',monospace", fontWeight: 600 }}>VIDEO</span>
          </div>
        )}

        {/* Soldout overlay */}
        {soldout && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.62)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "9px", color: "#fff", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", background: "rgba(0,0,0,.75)", padding: "4px 10px", borderRadius: 6 }}>
              {t(lang, "soldout")}
            </span>
          </div>
        )}

        {/* Full image link */}
        {detailHref && (
          <Link href={detailHref} style={{ position: "absolute", inset: 0, zIndex: 10 }} aria-label={name || dish.name} />
        )}
      </div>

      {/* ── Content ── */}
      <div
        style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "18px 20px" }}
      >
        <div>
          {/* Name + Price row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
            <h3
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "clamp(1rem,3vw,1.2rem)", color: "#f2e8d8", margin: 0, lineHeight: 1.2, flex: 1 }}
            >
              {detailHref ? (
                <Link href={detailHref} style={{ color: "inherit", textDecoration: "none" }}>{name || dish.name}</Link>
              ) : (name || dish.name)}
            </h3>
            <span
              style={{ fontFamily: "'DM Mono',monospace", fontWeight: 700, fontSize: "1rem", color: "#c8963c", whiteSpace: "nowrap", flexShrink: 0, letterSpacing: "-.01em" }}
            >
              {formatCurrency(Number(dish.price), currency, lang)}
            </span>
          </div>

          {/* Description */}
          {desc && (
            <p
              style={{ fontSize: ".82rem", color: "rgba(242,232,216,.48)", lineHeight: 1.65, margin: "0 0 10px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
            >
              {desc}
            </p>
          )}

          {/* Badges */}
          {(dish.is_new || dish.is_signature || dish.is_featured || dish.model_3d_url || has360 || soldout) && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {dish.is_signature && <WarmBadge icon={<Award style={{ width: 9, height: 9 }} />} color="gold">{t(lang, "signature")}</WarmBadge>}
              {dish.is_new && <WarmBadge icon={<Sparkles style={{ width: 9, height: 9 }} />} color="orange">{t(lang, "new")}</WarmBadge>}
              {dish.is_featured && <WarmBadge icon={<Flame style={{ width: 9, height: 9 }} />} color="rose">{t(lang, "featured")}</WarmBadge>}
              {soldout && <WarmBadge icon={<CircleOff style={{ width: 9, height: 9 }} />} color="muted">{t(lang, "soldout")}</WarmBadge>}
              {has360 && (
                <button
                  onClick={open360}
                  style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "9px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 99, border: "1px solid rgba(200,150,60,.3)", background: "rgba(200,150,60,.08)", color: "#c8963c", cursor: "pointer" }}
                >
                  <View style={{ width: 9, height: 9 }} />360°
                </button>
              )}
              {dish.model_3d_url && (
                <DishModelViewer
                  restaurantId={restaurantId}
                  dishId={dish.id}
                  dishName={name || dish.name}
                  modelUrl={dish.model_3d_url}
                  arEnabled={dish.ar_enabled}
                  language={lang}
                />
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        {detailHref && (
          <div style={{ marginTop: 14 }}>
            <Link
              href={detailHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "10px",
                fontFamily: "'DM Mono',monospace",
                fontWeight: 600,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                padding: "7px 18px",
                borderRadius: 8,
                background: "transparent",
                border: "1px solid rgba(200,150,60,.4)",
                color: "#c8963c",
                textDecoration: "none",
                transition: "all .2s",
              }}
              onMouseOver={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "hsl(28,88%,52%)";
                el.style.borderColor = "hsl(28,88%,52%)";
                el.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.borderColor = "rgba(200,150,60,.4)";
                el.style.color = "#c8963c";
              }}
            >
              {t(lang, "details") || "פרטים"}
              <ChevronLeft style={{ width: 12, height: 12 }} />
            </Link>
          </div>
        )}
      </div>

      {show360 && has360 && (
        <Photo360Viewer
          photos={dish.photos_360 as string[]}
          dishName={name || dish.name}
          onClose={() => setShow360(false)}
        />
      )}
    </article>
  );
}

/* ── Warm Badge ── */
function WarmBadge({
  icon, color, children,
}: { icon: React.ReactNode; color: "gold" | "orange" | "rose" | "muted"; children: React.ReactNode }) {
  const s: Record<string, { bg: string; border: string; text: string }> = {
    gold:   { bg: "rgba(200,150,60,.1)",   border: "rgba(200,150,60,.28)",  text: "#c8963c" },
    orange: { bg: "rgba(200,90,20,.14)",   border: "rgba(200,90,20,.3)",    text: "hsl(28,88%,60%)" },
    rose:   { bg: "rgba(210,70,70,.1)",    border: "rgba(210,70,70,.25)",   text: "#d07070" },
    muted:  { bg: "rgba(255,255,255,.05)", border: "rgba(255,255,255,.1)",  text: "rgba(242,232,216,.45)" },
  };
  const st = s[color];
  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "9px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 99, background: st.bg, border: `1px solid ${st.border}`, color: st.text }}
    >
      {icon}{children}
    </span>
  );
}
