"use client";

import { useEffect, useState } from "react";
import { HeroDishFallback } from "./_dish-3d/HeroDishFallback";

interface Dish3DSceneProps {
  modelUrl?: string;
  posterUrl?: string;
}

/**
 * Dish3DScene — loads <model-viewer> for a .glb when modelUrl is set, otherwise
 * renders the interactive CSS plate fallback.
 */
export function Dish3DScene({ modelUrl, posterUrl }: Dish3DSceneProps = {}) {
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!modelUrl) return;
    if (typeof window === "undefined") return;
    const existing = document.querySelector('script[data-mv-loaded="true"]');
    if (existing) {
      setScriptReady(true);
      return;
    }
    const script = document.createElement("script");
    script.type = "module";
    script.src = "/vendor/model-viewer.min.js";
    script.dataset.mvLoaded = "true";
    script.onload = () => setScriptReady(true);
    document.head.appendChild(script);
  }, [modelUrl]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {modelUrl && scriptReady ? (
        /* @ts-expect-error model-viewer custom element */
        <model-viewer
          src={modelUrl}
          poster={posterUrl}
          alt="מנת השף — תלת-מימד"
          camera-controls
          auto-rotate
          auto-rotate-delay="500"
          rotation-per-second="10deg"
          camera-orbit="0deg 48deg auto"
          camera-target="0m 0m 0m"
          field-of-view="28deg"
          shadow-intensity="0.8"
          shadow-softness="0.8"
          exposure="1.4"
          environment-image="https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr"
          tone-mapping="aces"
          style={
            {
              width: "100%",
              height: "100%",
              background: "transparent",
              "--progress-bar-color": "transparent",
              "--progress-mask": "transparent",
            } as React.CSSProperties
          }
        >
          {/* @ts-expect-error */}
        </model-viewer>
      ) : (
        <HeroDishFallback />
      )}
    </div>
  );
}
