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

  // Restore préférence user
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`menu:${restaurant.slug}:lang`);
      if (saved && (available as string[]).includes(saved)) {
        setLang(saved as Language);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(`menu:${restaurant.slug}:lang`, lang);
    } catch {}
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir, restaurant.slug]);

  // Track la vue de menu (1 fois par session+resto)
  useEffect(() => {
    try {
      const key = `menu:${restaurant.slug}:tracked`;
      if (!sessionStorage.getItem(key)) {
        // Détection QR scan via referrer vide + user direct (heuristique)
        const fromQr =
          typeof document !== "undefined" &&
          (!document.referrer || document.referrer === "");
        trackEvent(restaurant.id, "menu_view", { language: lang });
        if (fromQr) trackEvent(restaurant.id, "qr_scan", { language: lang });
        sessionStorage.setItem(key, "1");
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currency = restaurant.currency || "ILS";
  const restaurantName = restaurant.name; // le nom reste le même dans toutes les langues
  const restaurantDesc = pickLocalized(
    restaurant as unknown as Record<string, unknown>,
    "description",
    lang
  );

  const dishesByCategory = categories.map((cat) => ({
    category: cat,
    dishes: dishes.filter((d) => d.category_id === cat.id),
  }));

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      {/* Banner */}
      {restaurant.banner_url ? (
        <div className="relative w-full bg-charcoal-gradient overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-50"
            style={{ backgroundImage: `url(${restaurant.banner_url})` }}
            aria-hidden="true"
          />
          <div className="relative flex items-center justify-center max-h-[55vh] md:max-h-[65vh]">
            <img
              src={restaurant.banner_url}
              alt={`${restaurantName} banner`}
              className="w-full h-auto max-h-[55vh] md:max-h-[65vh] object-contain animate-fade-in"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
          {/* Language switcher flottant */}
          <div className="absolute top-4 end-4 z-20">
            <LanguageSwitcher
              value={lang}
              available={available}
              onChange={setLang}
            />
          </div>
        </div>
      ) : (
        <div className="h-48 md:h-64 bg-charcoal-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <UtensilsCrossed className="h-20 w-20 text-[hsl(var(--gold))] opacity-60" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          <div className="absolute top-4 end-4 z-20">
            <LanguageSwitcher
              value={lang}
              available={available}
              onChange={setLang}
            />
          </div>
        </div>
      )}

      {/* Restaurant Info Card */}
      <div className="container mx-auto px-4 -mt-20 md:-mt-24 relative z-10">
        <div className="bg-card rounded-2xl shadow-premium p-6 md:p-8 max-w-3xl mx-auto animate-fade-up">
          <div
            className={`flex flex-col sm:flex-row items-center gap-5 ${
              dir === "rtl" ? "sm:text-start" : "sm:text-start"
            } text-center`}
          >
            {restaurant.logo_url ? (
              <img
                src={restaurant.logo_url}
                alt={restaurantName}
                className="h-28 w-28 rounded-full object-cover ring-4 ring-[hsl(var(--gold))]/30 shadow-gold-glow bg-card flex-shrink-0"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-gold-gradient ring-4 ring-[hsl(var(--gold))]/20 shadow-gold-glow flex items-center justify-center flex-shrink-0">
                <span className="text-4xl font-bold text-white font-serif-display">
                  {restaurantName.charAt(0)}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="font-serif-display text-3xl md:text-4xl font-bold text-foreground">
                {restaurantName}
              </h1>
              <div
                className={`divider-gold w-24 my-3 ${
                  dir === "rtl" ? "mx-auto sm:me-auto sm:ms-0" : "mx-auto sm:ms-0"
                }`}
              />
              {restaurantDesc && (
                <p className="text-muted-foreground leading-relaxed">
                  {restaurantDesc}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        {dishesByCategory.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <UtensilsCrossed className="h-16 w-16 mx-auto text-[hsl(var(--gold))] opacity-40 mb-4" />
            <p className="text-muted-foreground text-lg">{t(lang, "empty_menu")}</p>
          </div>
        ) : (
          dishesByCategory.map(({ category, dishes: catDishes }, catIdx) => {
            const catName = pickLocalized(
              category as unknown as Record<string, unknown>,
              "name",
              lang
            );
            return (
              <section
                key={category.id}
                className="mb-14 animate-fade-up"
                style={{ animationDelay: `${catIdx * 80}ms` }}
              >
                <div className="text-center mb-8">
                  <h2 className="font-serif-display text-3xl md:text-4xl font-bold text-foreground">
                    {catName || category.name}
                  </h2>
                  <div className="divider-gold w-20 mx-auto mt-3" />
                </div>

                {catDishes.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center">
                    {t(lang, "no_dishes_in_cat")}
                  </p>
                ) : (
                  <div className="space-y-4">
                    {catDishes.map((dish) => (
                      <DishCard
                        key={dish.id}
                        dish={dish}
                        restaurantId={restaurant.id}
                        lang={lang}
                        currency={currency}
                        slug={slug}
                      />
                    ))}
                  </div>
                )}
              </section>
            );
          })
        )}
      </div>

      {/* Footer */}
      <footer className="bg-charcoal-gradient text-white/90 mt-12">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="text-center mb-8">
            <h3 className="font-serif-display text-2xl font-bold text-white mb-3">
              {restaurantName}
            </h3>
            <div className="divider-gold w-16 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {restaurant.address && (
              <div className="flex items-start gap-3 justify-center sm:justify-start">
                <MapPin className="h-5 w-5 text-[hsl(var(--gold))] flex-shrink-0 mt-0.5" />
                <span className="text-white/80">{restaurant.address}</span>
              </div>
            )}
            {restaurant.phone && (
              <div className="flex items-start gap-3 justify-center sm:justify-start">
                <Phone className="h-5 w-5 text-[hsl(var(--gold))] flex-shrink-0 mt-0.5" />
                <a
                  href={`tel:${restaurant.phone}`}
                  className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors"
                  dir="ltr"
                >
                  {restaurant.phone}
                </a>
              </div>
            )}
            {restaurant.email && (
              <div className="flex items-start gap-3 justify-center sm:justify-start">
                <Mail className="h-5 w-5 text-[hsl(var(--gold))] flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${restaurant.email}`}
                  className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors"
                  dir="ltr"
                >
                  {restaurant.email}
                </a>
              </div>
            )}
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/50">
            {t(lang, "powered")}{" "}
            <span className="text-gold-gradient font-semibold">
              פלטפורמת מסעדות
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DishCard({
  dish,
  restaurantId,
  lang,
  currency,
  slug,
}: {
  dish: Dish;
  restaurantId: string;
  lang: Language;
  currency: string;
  slug?: string;
}) {
  const name = pickLocalized(
    dish as unknown as Record<string, unknown>,
    "name",
    lang
  );
  const desc = pickLocalized(
    dish as unknown as Record<string, unknown>,
    "description",
    lang
  );
  const soldout = !dish.is_available;
  const has360 = Array.isArray(dish.photos_360) && dish.photos_360.length > 0;
  const [show360, setShow360] = useState(false);

  const handleVideoPlay = () => {
    trackEvent(restaurantId, "video_play", { dishId: dish.id, language: lang });
  };

  const open360 = () => {
    trackEvent(restaurantId, "ar_view", { dishId: dish.id, language: lang });
    setShow360(true);
  };

  return (
    <article
      className={`group relative flex gap-4 p-4 md:p-5 rounded-xl bg-card border border-border/60 hover:border-[hsl(var(--gold))]/50 hover:shadow-premium transition-all duration-300 ${
        soldout ? "opacity-60" : ""
      }`}
    >
      {/* Media */}
      <div className="relative h-24 w-24 md:h-28 md:w-28 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-border/50 bg-secondary">
        {dish.video_url ? (
          <video
            src={dish.video_url}
            poster={dish.image_url ?? undefined}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            muted
            loop
            playsInline
            preload="metadata"
            onMouseEnter={(e) => {
              const v = e.currentTarget;
              v.play().catch(() => {});
              handleVideoPlay();
            }}
            onMouseLeave={(e) => {
              const v = e.currentTarget;
              v.pause();
              v.currentTime = 0;
            }}
          />
        ) : dish.image_url ? (
          <img
            src={dish.image_url}
            alt={name || dish.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
          </div>
        )}
        {dish.video_url && (
          <div className="absolute bottom-1 end-1 bg-black/60 rounded-full p-1 text-white">
            <PlayCircle className="h-3.5 w-3.5" />
          </div>
        )}
        {soldout && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-[10px] text-white font-bold uppercase tracking-wider px-2 py-1 rounded bg-black/70">
              {t(lang, "soldout")}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-3 mb-1.5">
          <h3 className="font-semibold text-lg md:text-xl text-foreground truncate">
            {name || dish.name}
          </h3>
          <span className="font-bold text-lg text-gold-gradient whitespace-nowrap">
            {formatCurrency(Number(dish.price), currency, lang)}
          </span>
        </div>

        {/* Badges */}
        {(dish.is_new || dish.is_signature || dish.is_featured || dish.model_3d_url || has360 || soldout) && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {dish.is_signature && (
              <Badge icon={<Award className="h-3 w-3" />} color="gold">
                {t(lang, "signature")}
              </Badge>
            )}
            {dish.is_new && (
              <Badge icon={<Sparkles className="h-3 w-3" />} color="emerald">
                {t(lang, "new")}
              </Badge>
            )}
            {dish.is_featured && (
              <Badge icon={<Flame className="h-3 w-3" />} color="rose">
                {t(lang, "featured")}
              </Badge>
            )}
            {soldout && (
              <Badge icon={<CircleOff className="h-3 w-3" />} color="muted">
                {t(lang, "soldout")}
              </Badge>
            )}
            {has360 && (
              <button
                type="button"
                onClick={open360}
                className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold-dark))] border-[hsl(var(--gold))]/30 hover:bg-[hsl(var(--gold))]/25 transition-colors"
              >
                <View className="h-3 w-3" />
                360°
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

        {desc && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {desc}
          </p>
        )}

        {slug && (
          <div className="mt-3">
            <Link
              href={`/menu/${slug}/dish/${dish.id}`}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-[hsl(var(--gold))]/40 text-[hsl(var(--gold-dark))] bg-[hsl(var(--gold))]/8 hover:bg-[hsl(var(--gold))]/20 hover:border-[hsl(var(--gold))]/60 transition-colors"
            >
              פרטים
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
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

function Badge({
  icon,
  color,
  children,
}: {
  icon: React.ReactNode;
  color: "gold" | "emerald" | "rose" | "muted";
  children: React.ReactNode;
}) {
  const styles: Record<typeof color, string> = {
    gold:
      "bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold-dark))] border-[hsl(var(--gold))]/30",
    emerald:
      "bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-400",
    rose:
      "bg-rose-500/15 text-rose-700 border-rose-500/30 dark:text-rose-400",
    muted:
      "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${styles[color]}`}
    >
      {icon}
      {children}
    </span>
  );
}
