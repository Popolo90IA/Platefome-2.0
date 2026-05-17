"use client";

import { useEffect, useState } from "react";

const SCRIPT_ATTR = "data-mv-loaded";
const SCRIPT_SRC = "/vendor/model-viewer.min.js";

/**
 * Charge <model-viewer> à la demande depuis l'assetdomain (self-hosted).
 * - Évite le tier party unpkg.com (latence, fiabilité, parfois bloqué en IL)
 * - Charge une seule fois pour toute l'app
 * - Renvoie `ready` quand le custom element est défini
 */
export function useModelViewer(enabled: boolean = true) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    // Déjà chargé ?
    if (customElements.get("model-viewer")) {
      setReady(true);
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[${SCRIPT_ATTR}]`
    );
    if (existing) {
      if (existing.dataset.mvLoaded === "ready") {
        setReady(true);
      } else {
        existing.addEventListener("load", () => setReady(true), { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = SCRIPT_SRC;
    script.dataset.mvLoaded = "loading";
    script.onload = () => {
      script.dataset.mvLoaded = "ready";
      setReady(true);
    };
    document.head.appendChild(script);
  }, [enabled]);

  return ready;
}
