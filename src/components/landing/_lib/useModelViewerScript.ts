"use client";

import { useEffect, useState } from "react";

/* ── useModelViewerScript — lazy-load model-viewer module when active ── */
export function useModelViewerScript(active: boolean) {
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!active) return;
    if (typeof window === "undefined") return;

    if (document.querySelector('script[data-mv-loaded="true"]')) {
      setScriptReady(true);
      return;
    }
    const script = document.createElement("script");
    script.type = "module";
    script.src = "/vendor/model-viewer.min.js";
    script.dataset.mvLoaded = "true";
    script.onload = () => setScriptReady(true);
    document.head.appendChild(script);
  }, [active]);

  return scriptReady;
}
