"use client";

import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { trackEvent } from "@/lib/analytics";
import type { Restaurant, Language } from "@/types/database.types";
import type { PreviewOverride } from "../types";

/* ── Responsive flag (<600px = mobile) ── */
export function useResponsive(setIsMobile: Dispatch<SetStateAction<boolean>>) {
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ── Preview mode — listen to parent postMessage overrides ── */
export function usePreviewMode(
  setPreviewOverride: Dispatch<SetStateAction<PreviewOverride>>,
) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ── Persist + restore language, sync <html> lang/dir ── */
export function useLangPersistence(
  restaurant: Restaurant,
  lang: Language,
  dir: string,
  available: Language[],
  setLang: Dispatch<SetStateAction<Language>>,
) {
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
}

/* ── Track menu_view (+ qr_scan if no referrer) once per session ── */
export function useMenuTracking(restaurant: Restaurant, lang: Language) {
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
}

/* ── Lock body scroll while modal open ── */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);
}
