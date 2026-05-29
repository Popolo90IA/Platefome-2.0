"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Restaurant } from "@/types/database.types";
import type {
  DesignForm,
  DesignTab,
  PanelSize,
  PreviewMode,
} from "../types";
import {
  DEFAULT_FORM,
  DEFAULT_PANEL_SIZE,
  IFRAME_READY_FALLBACK_MS,
  SAVED_TOAST_MS,
} from "../constants";
import { buildPreviewUrl } from "../helpers";

/**
 * useDesign — hook orchestrant état + handlers de la page design.
 * - charge restaurant + form depuis Supabase
 * - mesure le panneau preview (resize-aware)
 * - écoute le ping ready de l'iframe via postMessage
 * - propage chaque updateForm vers l'iframe en live
 * - persiste via handleSave
 */
export function useDesign() {
  const supabase = createClient();

  // state
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<DesignTab>("color");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("mobile");
  const [tabletLandscape, setTabletLandscape] = useState(false);
  const [panelSize, setPanelSize] =
    useState<PanelSize>(DEFAULT_PANEL_SIZE);
  const [windowH, setWindowH] = useState<number>(
    typeof window !== "undefined" ? window.innerHeight : 900,
  );
  const [form, setForm] = useState<DesignForm>(DEFAULT_FORM);

  // refs
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeReady = useRef(false);

  // measure panel + window height
  useEffect(() => {
    const measure = () => {
      if (rightPanelRef.current) {
        const rect = rightPanelRef.current.getBoundingClientRect();
        setPanelSize({
          w: rect.width,
          h: window.innerHeight - rect.top,
        });
      }
      setWindowH(window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // initial load
  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setRestaurant(data);
        setForm({
          theme_primary: data.theme_primary ?? DEFAULT_FORM.theme_primary,
          theme_dark_mode: data.theme_dark_mode ?? DEFAULT_FORM.theme_dark_mode,
          theme_font_pack: data.theme_font_pack ?? DEFAULT_FORM.theme_font_pack,
          menu_layout: data.menu_layout ?? DEFAULT_FORM.menu_layout,
          menu_hero_style: data.menu_hero_style ?? DEFAULT_FORM.menu_hero_style,
          menu_category_style:
            data.menu_category_style ?? DEFAULT_FORM.menu_category_style,
          logo_url: data.logo_url,
          banner_url: data.banner_url,
          name: data.name ?? "",
          description: data.description ?? "",
        });
      }
      setLoading(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // post preview to iframe
  const sendPreview = useCallback((f: DesignForm) => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        __plateform_preview: {
          theme_primary: f.theme_primary,
          theme_dark_mode: f.theme_dark_mode,
          theme_font_pack: f.theme_font_pack,
          menu_layout: f.menu_layout,
          menu_hero_style: f.menu_hero_style,
          menu_category_style: f.menu_category_style,
        },
      },
      "*",
    );
  }, []);

  // listen iframe ready ping
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.__plateform_ready) {
        iframeReady.current = true;
        sendPreview(form);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [form, sendPreview]);

  // patch + propagate
  const updateForm = useCallback(
    (patch: Partial<DesignForm>) => {
      setForm((prev) => {
        const next = { ...prev, ...patch };
        if (iframeReady.current) sendPreview(next);
        return next;
      });
    },
    [sendPreview],
  );

  // onLoad iframe — fallback init si pas de ping ready
  const handleIframeLoad = useCallback(() => {
    setTimeout(() => {
      if (!iframeReady.current) {
        iframeReady.current = true;
        sendPreview(form);
      }
    }, IFRAME_READY_FALLBACK_MS);
  }, [form, sendPreview]);

  // save
  const handleSave = async () => {
    if (!restaurant) return;
    setSaving(true);
    setError(null);
    const { error: err } = await supabase
      .from("restaurants")
      .update({
        theme_primary: form.theme_primary,
        theme_dark_mode: form.theme_dark_mode,
        theme_font_pack: form.theme_font_pack,
        menu_layout: form.menu_layout,
        menu_hero_style: form.menu_hero_style,
        menu_category_style: form.menu_category_style,
        logo_url: form.logo_url,
        banner_url: form.banner_url,
      })
      .eq("id", restaurant.id);
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), SAVED_TOAST_MS);
  };

  const menuUrl = buildPreviewUrl(restaurant?.slug);

  return {
    // state
    restaurant,
    loading,
    saving,
    saved,
    error,
    tab,
    setTab,
    previewMode,
    setPreviewMode,
    tabletLandscape,
    setTabletLandscape,
    panelSize,
    windowH,
    form,
    menuUrl,
    // refs
    rightPanelRef,
    iframeRef,
    // handlers
    updateForm,
    handleIframeLoad,
    handleSave,
  };
}
