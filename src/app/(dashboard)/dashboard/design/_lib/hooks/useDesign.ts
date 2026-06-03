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
import {
  restaurantToForm,
  buildPreviewPatch,
  loadRestaurant,
  saveDesign,
} from "./designActions";

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
  const [panelSize, setPanelSize] = useState<PanelSize>(DEFAULT_PANEL_SIZE);
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
        setPanelSize({ w: rect.width, h: window.innerHeight - rect.top });
      }
      setWindowH(window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // initial load
  useEffect(() => {
    (async () => {
      const data = await loadRestaurant(supabase);
      if (data) {
        setRestaurant(data);
        setForm(restaurantToForm(data));
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // post preview to iframe
  const sendPreview = useCallback((f: DesignForm) => {
    iframeRef.current?.contentWindow?.postMessage(
      { __plateform_preview: buildPreviewPatch(f) },
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
    const { error: err } = await saveDesign(supabase, restaurant.id, form);
    setSaving(false);
    if (err) {
      setError(err);
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
