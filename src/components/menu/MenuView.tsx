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

/* ── Couleurs thème chaud ── */
const C = {
  bg:        "#0e0c0a",
  surface:   "#171310",
  card:      "#1c1713",
  border:    "rgba(212,160,80,.18)",
  borderHov: "rgba(212,160,80,.45)",
  orange:    "hsl(28,88%,52%)",
  orangeHov: "hsl(28,88%,62%)",
  gold:      "#d4a050",
  goldLight: "#f0c070",
  cream:     "#f5ede0",
  muted:     "rgba(245,237,224,.55)",
  dim:       "rgba(245,237,224,.32)",
};

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.18'/%3E%3C/svg%3E")`;

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
        const fromQr = typeof document !== "undefined" && (!document.referrer || document.referrer === "");
        trackEvent(restaurant.id, "menu_view", { language: lang });
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
    <div dir={dir} style={{ minHeight: "100vh", background: C.bg, backgroundImage: GRAIN, color: C.cream, fontFamily: "'Noto Serif Hebrew', serif" }}>

      {/* ── HERO BANNER ── */}
      <div style={{ position: "relative", width: "100%", minHeight: 260, overflow: "hidden", background: C.surface }}>
        {/* Ambient warm glow */}
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(212,120,30,.18) 0%, transparent 70%)", pointerEvents: "none" }} />

        {restaurant.banner_url ? (
          <>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${restaurant.banner_url})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(20px) brightness(.45)", transform: "scale(1.1)" }} aria-hidden />
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 260 }}>
              <img src={restaurant.banner_url} alt={restaurantName} style={{ width: "100%", maxHeight: 320, objectFit: "cover", opacity: 0.9 }} />
            </div>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 260 }}>
            <UtensilsCrossed style={{ width: 64, height: 64, color: C.gold, opacity: 0.5 }} />
          </div>
        )}

        {/* Gradient bottom fade */}
        <div aria-hidden style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(to top, ${C.bg}, transparent)`, pointerEvents: "none" }} />

        {/* Language switcher */}
        <div style={{ position: "absolute", top: 16, insetInlineEnd: 16, zIndex: 20 }}>
          <LanguageSwitcher value={lang} available={available} onChange={setLang} />
        </div>
      </div>

      {/* ── RESTAURANT INFO ── */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ marginTop: -56, position: "relative", zIndex: 10, background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "28px 24px", boxShadow: "0 24px 48px rgba(0,0,0,.6), 0 0 0 1px rgba(212,160,80,.08)" }}>
          <div style={{ display: "flex", flexDirection: dir === "rtl" ? "row" : "row", alignItems: "center", gap: 20 }}>
            {restaurant.logo_url ? (
              <img src={restaurant.logo_url} alt={restaurantName} style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.gold}`, flexShrink: 0 }} />
            ) : (
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${C.orange}, ${C.gold})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff" }}>{restaurantName.charAt(0)}</span>
              </div>
            )}
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.75rem", letterSpacing: "-.01em", margin: "0 0 6px", color: C.cream }}>{restaurantName}</h1>
              <div style={{ width: 40, height: 2, background: `linear-gradient(90deg, ${C.orange}, ${C.gold})`, borderRadius: 2, marginBottom: restaurantDesc ? 8 : 0 }} />
              {restaurantDesc && <p style={{ fontSize: ".9rem", color: C.muted, lineHeight: 1.6, margin: 0 }}>{restaurantDesc}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* ── MENU ── */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 20px 60px" }}>
        {dishesByCategory.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <UtensilsCrossed style={{ width: 56, height: 56, color: C.gold, opacity: 0.35, margin: "0 auto 16px" }} />
            <p style={{ color: C.muted }}>{t(lang, "empty_menu")}</p>
          </div>
        ) : (
          dishesByCategory.map(({ category, dishes: catDishes }, catIdx) => {
            const catName = pickLocalized(category as unknown as Record<string, unknown>, "name", lang);
            return (
              <section key={category.id} style={{ marginBottom: 52 }}>
                {/* Category header */}
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: C.orange, marginBottom: 8 }}>
                    ─── {t(lang, "category")} ───
                  </p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(1.6rem,5vw,2.2rem)", letterSpacing: "-.01em", color: C.goldLight, margin: "0 0 10px" }}>
                    {catName || category.name}
                  </h2>
                  <div style={{ width: 60, height: 2, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: "0 auto" }} />
                </div>

                {catDishes.length === 0 ? (
                  <p style={{ textAlign: "center", color: C.dim, fontSize: ".875rem" }}>{t(lang, "no_dishes_in_cat")}</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {catDishes.map((dish, i) => (
                      <DishCard
                        key={dish.id}
                        dish={dish}
                        restaurantId={restaurant.id}
                        lang={lang}
                        currency={currency}
                        slug={slug}
                        delay={catIdx * 60 + i * 40}
                      />
                    ))}
                  </div>
                )}
              </section>
            );
          })
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "40px 20px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.4rem", color: C.goldLight, marginBottom: 8 }}>{restaurantName}</h3>
            <div style={{ width: 48, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: "0 auto" }} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            {restaurant.address && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin style={{ width: 16, height: 16, color: C.orange, flexShrink: 0 }} />
                <span style={{ fontSize: ".875rem", color: C.muted }}>{restaurant.address}</span>
              </div>
            )}
            {restaurant.phone && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Phone style={{ width: 16, height: 16, color: C.orange, flexShrink: 0 }} />
                <a href={`tel:${restaurant.phone}`} style={{ fontSize: ".875rem", color: C.muted, textDecoration: "none" }} dir="ltr">{restaurant.phone}</a>
              </div>
            )}
            {restaurant.email && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Mail style={{ width: 16, height: 16, color: C.orange, flexShrink: 0 }} />
                <a href={`mailto:${restaurant.email}`} style={{ fontSize: ".875rem", color: C.muted, textDecoration: "none" }} dir="ltr">{restaurant.email}</a>
              </div>
            )}
          </div>
          <p style={{ textAlign: "center", marginTop: 28, fontSize: ".7rem", color: C.dim, fontFamily: "'DM Mono',monospace", letterSpacing: ".08em" }}>
            {t(lang, "powered")} <span style={{ color: C.gold }}>פלטפורמת מסעדות</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ════════════════════════════════════════
   DISH CARD — style carte chaude premium
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
        gap: 16,
        background: hovered ? "#211b15" : "#1c1713",
        border: `1px solid ${hovered ? "rgba(212,160,80,.4)" : "rgba(212,160,80,.15)"}`,
        borderRadius: 14,
        padding: 16,
        transition: "all .25s ease",
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,.5), 0 0 0 1px rgba(212,160,80,.12)" : "0 2px 12px rgba(0,0,0,.3)",
        opacity: soldout ? 0.6 : 1,
      }}
    >
      {/* ── Image ── */}
      <div style={{ position: "relative", width: 110, height: 110, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "#111" }}>
        {dish.video_url ? (
          <video
            src={dish.video_url}
            poster={dish.image_url ?? undefined}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s ease", transform: hovered ? "scale(1.08)" : "scale(1)" }}
            muted loop playsInline preload="metadata"
            onMouseEnter={(e) => { e.currentTarget.play().catch(() => {}); trackEvent(restaurantId, "video_play", { dishId: dish.id }); }}
            onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
          />
        ) : dish.image_url ? (
          <img
            src={dish.image_url}
            alt={name || dish.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s ease", transform: hovered ? "scale(1.08)" : "scale(1)" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ImageIcon style={{ width: 32, height: 32, color: "rgba(212,160,80,.3)" }} />
          </div>
        )}

        {/* Overlay video icon */}
        {dish.video_url && (
          <div style={{ position: "absolute", bottom: 6, insetInlineEnd: 6, background: "rgba(0,0,0,.65)", borderRadius: "50%", padding: 4 }}>
            <PlayCircle style={{ width: 14, height: 14, color: "#fff" }} />
          </div>
        )}

        {/* Soldout overlay */}
        {soldout && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "9px", color: "#fff", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", background: "rgba(0,0,0,.7)", padding: "3px 8px", borderRadius: 4 }}>
              {t(lang, "soldout")}
            </span>
          </div>
        )}

        {/* Clickable overlay on image */}
        {detailHref && (
          <Link href={detailHref} style={{ position: "absolute", inset: 0, zIndex: 10 }} aria-label={name || dish.name} />
        )}
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          {/* Name + Price */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "1.125rem", color: "#f5ede0", margin: 0, lineHeight: 1.2 }}>
              {detailHref ? (
                <Link href={detailHref} style={{ color: "inherit", textDecoration: "none" }}>{name || dish.name}</Link>
              ) : (name || dish.name)}
            </h3>
            <span style={{ fontFamily: "'DM Mono',monospace", fontWeight: 600, fontSize: "1rem", color: "#d4a050", whiteSpace: "nowrap", flexShrink: 0 }}>
              {formatCurrency(Number(dish.price), currency, lang)}
            </span>
          </div>

          {/* Badges */}
          {(dish.is_new || dish.is_signature || dish.is_featured || dish.model_3d_url || has360 || soldout) && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {dish.is_signature && <WarmBadge icon={<Award style={{ width: 10, height: 10 }} />} color="gold">{t(lang, "signature")}</WarmBadge>}
              {dish.is_new && <WarmBadge icon={<Sparkles style={{ width: 10, height: 10 }} />} color="orange">{t(lang, "new")}</WarmBadge>}
              {dish.is_featured && <WarmBadge icon={<Flame style={{ width: 10, height: 10 }} />} color="rose">{t(lang, "featured")}</WarmBadge>}
              {soldout && <WarmBadge icon={<CircleOff style={{ width: 10, height: 10 }} />} color="muted">{t(lang, "soldout")}</WarmBadge>}
              {has360 && (
                <button onClick={open360} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "10px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 99, border: "1px solid rgba(212,160,80,.35)", background: "rgba(212,160,80,.1)", color: "#d4a050", cursor: "pointer" }}>
                  <View style={{ width: 10, height: 10 }} />360°
                </button>
              )}
              {dish.model_3d_url && (
                <DishModelViewer restaurantId={restaurantId} dishId={dish.id} dishName={name || dish.name} modelUrl={dish.model_3d_url} arEnabled={dish.ar_enabled} language={lang} />
              )}
            </div>
          )}

          {/* Description */}
          {desc && (
            <p style={{ fontSize: ".85rem", color: "rgba(245,237,224,.5)", lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {desc}
            </p>
          )}
        </div>

        {/* CTA button */}
        {detailHref && (
          <div style={{ marginTop: 12 }}>
            <Link
              href={detailHref}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "11px", fontFamily: "'DM Mono',monospace", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", padding: "7px 16px", borderRadius: 8, background: "hsl(28,88%,52%)", color: "#fff", textDecoration: "none", transition: "background .2s" }}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = "hsl(28,88%,62%)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = "hsl(28,88%,52%)"; }}
            >
              {t(lang, "details") || "פרטים"}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        )}
      </div>

      {show360 && has360 && (
        <Photo360Viewer photos={dish.photos_360 as string[]} dishName={name || dish.name} onClose={() => setShow360(false)} />
      )}
    </article>
  );
}

/* ── Badge chaud ── */
function WarmBadge({ icon, color, children }: { icon: React.ReactNode; color: "gold" | "orange" | "rose" | "muted"; children: React.ReactNode }) {
  const s: Record<string, { bg: string; border: string; text: string }> = {
    gold:   { bg: "rgba(212,160,80,.12)",  border: "rgba(212,160,80,.3)",  text: "#d4a050" },
    orange: { bg: "rgba(212,100,30,.15)",  border: "rgba(212,100,30,.35)", text: "hsl(28,88%,62%)" },
    rose:   { bg: "rgba(220,80,80,.12)",   border: "rgba(220,80,80,.3)",   text: "#e07070" },
    muted:  { bg: "rgba(255,255,255,.06)", border: "rgba(255,255,255,.1)", text: "rgba(245,237,224,.5)" },
  };
  const st = s[color];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "10px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 99, background: st.bg, border: `1px solid ${st.border}`, color: st.text }}>
      {icon}{children}
    </span>
  );
}
