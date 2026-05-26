"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LANGUAGE_META } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import { buildMenuTheme, getFontPack } from "@/lib/theme";
import type {
  MenuLayout,
  MenuHeroStyle,
  MenuCategoryStyle,
} from "@/lib/theme";
import type {
  Restaurant,
  Category,
  Dish,
  Language,
} from "@/types/database.types";
import type { PreviewOverride } from "../types";
import {
  filterDishesBySearch,
  groupDishesByCategory,
} from "../helpers";

type UseMenuViewOptions = {
  restaurant: Restaurant;
  categories: Category[];
  dishes: Dish[];
};

/**
 * Owns the menu-view page state : language, search, active category,
 * modal, responsive flag, preview-mode postMessage overrides, body
 * scroll lock, analytics tracking, and derived theme + filtered lists.
 */
export function useMenuView({
  restaurant,
  categories,
  dishes,
}: UseMenuViewOptions) {
  // ── Language ────────────────────────────────────────────────────────────
  const available: Language[] = (restaurant.languages ?? ["he"]).filter((l) =>
    ["he", "en", "fr"].includes(l),
  ) as Language[];
  const defaultLang = (restaurant.default_language ?? "he") as Language;
  const [lang, setLang] = useState<Language>(defaultLang);
  const [langOpen, setLangOpen] = useState(false);
  const dir = LANGUAGE_META[lang].dir;

  // ── UI state ────────────────────────────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState<string | null>(
    categories[0]?.id ?? null,
  );
  const [modalDish, setModalDish] = useState<Dish | null>(null);
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // ── Responsive ──────────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Preview mode ────────────────────────────────────────────────────────
  const [previewOverride, setPreviewOverride] = useState<PreviewOverride>({});
  const isPreview = useRef(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    isPreview.current = params.get("preview") === "1";
    if (!isPreview.current) return;
    const handler = (e: MessageEvent) => {
      if (e.data && e.data.__plateform_preview) {
        setPreviewOverride(e.data.__plateform_preview as PreviewOverride);
      }
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ __plateform_ready: true }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  // ── Persist language ────────────────────────────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`menu:${restaurant.slug}:lang`);
      if (saved && (available as string[]).includes(saved))
        setLang(saved as Language);
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

  // ── Track menu view once per session ────────────────────────────────────
  useEffect(() => {
    try {
      const key = `menu:${restaurant.slug}:tracked`;
      if (!sessionStorage.getItem(key)) {
        trackEvent(restaurant.id, "menu_view", { language: lang });
        if (
          typeof document !== "undefined" &&
          (!document.referrer || document.referrer === "")
        )
          trackEvent(restaurant.id, "qr_scan", { language: lang });
        sessionStorage.setItem(key, "1");
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Lock body scroll when modal open ────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = modalDish ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalDish]);

  // ── Theme + layout (preview overrides win) ──────────────────────────────
  const themeVars = buildMenuTheme(
    previewOverride.theme_primary ?? restaurant.theme_primary,
    previewOverride.theme_dark_mode ?? restaurant.theme_dark_mode,
  ) as React.CSSProperties;
  const fontPack = getFontPack(
    previewOverride.theme_font_pack ?? restaurant.theme_font_pack,
  );
  const menuLayout = ((previewOverride.menu_layout ?? restaurant.menu_layout) ??
    "grid") as MenuLayout;
  const heroStyle = ((previewOverride.menu_hero_style ??
    restaurant.menu_hero_style) ?? "default") as MenuHeroStyle;
  const catStyle = ((previewOverride.menu_category_style ??
    restaurant.menu_category_style) ?? "pills") as MenuCategoryStyle;

  // ── Filter + group ──────────────────────────────────────────────────────
  const searchTrimmed = search.trim().toLowerCase();
  const isSearching = searchTrimmed.length > 0;
  const filteredDishes = filterDishesBySearch(dishes, search);
  const dishesByCategory = groupDishesByCategory(categories, filteredDishes);

  // ── Actions ─────────────────────────────────────────────────────────────
  const scrollToCategory = useCallback((catId: string) => {
    setActiveCategory(catId);
    const el = document.getElementById(`cat-${catId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const selectCategory = useCallback(
    (catId: string) => {
      setSearch("");
      scrollToCategory(catId);
    },
    [scrollToCategory],
  );

  const handleShare = useCallback(async () => {
    try {
      await navigator.share({
        url: window.location.href,
        title: restaurant.name,
      });
    } catch {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  }, [restaurant.name]);

  const toggleLangOpen = useCallback(() => setLangOpen((v) => !v), []);
  const blurLangOpen = useCallback(
    () => setTimeout(() => setLangOpen(false), 120),
    [],
  );
  const selectLang = useCallback((l: Language) => {
    setLang(l);
    setLangOpen(false);
  }, []);

  return {
    // language
    lang,
    available,
    langOpen,
    dir,
    toggleLangOpen,
    blurLangOpen,
    selectLang,
    // ui state
    activeCategory,
    modalDish,
    setModalDish,
    search,
    setSearch,
    isMobile,
    isSearching,
    // theme
    themeVars,
    fontPack,
    menuLayout,
    heroStyle,
    catStyle,
    // data
    filteredDishes,
    dishesByCategory,
    // actions
    selectCategory,
    handleShare,
  };
}
