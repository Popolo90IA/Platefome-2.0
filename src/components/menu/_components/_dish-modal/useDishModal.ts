"use client";

import { useEffect, useState } from "react";
import { LANGUAGE_META, pickLocalized } from "@/lib/i18n";
import type { Dish, Language } from "@/types/database.types";

export type ArTab = "2D" | "3D" | "360" | "AR";

/**
 * useDishModal — derived dish data, view-mode tabs, 360 state, Escape-to-close.
 */
export function useDishModal(
  dish: Dish,
  lang: Language,
  onClose: () => void,
) {
  const [arTab, setArTab] = useState<ArTab>("2D");
  const [show360, setShow360] = useState(false);

  const name =
    pickLocalized(dish as unknown as Record<string, unknown>, "name", lang) ||
    dish.name;
  const desc = pickLocalized(
    dish as unknown as Record<string, unknown>,
    "description",
    lang,
  );

  const has3d = !!dish.model_3d_url;
  const has360 = Array.isArray(dish.photos_360) && dish.photos_360.length > 0;
  const hasVideo = !!dish.video_url;
  const hasViewTabs = has3d || has360 || hasVideo;

  const tabs: ArTab[] = [
    "2D",
    ...(has3d ? ["3D" as const] : []),
    ...(has360 ? ["360" as const] : []),
    ...(dish.ar_enabled && has3d ? ["AR" as const] : []),
  ];

  const dir = LANGUAGE_META[lang].dir;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return {
    name,
    desc,
    has3d,
    has360,
    hasViewTabs,
    tabs,
    dir,
    arTab,
    setArTab,
    show360,
    setShow360,
  };
}
