"use client";

import { useEffect, useRef, useState } from "react";
import { X, Cuboid, Maximize2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface DishModelViewerProps {
  restaurantId: string;
  dishId: string;
  dishName: string;
  modelUrl: string;
  arEnabled?: boolean;
  language?: string;
  trigger?: React.ReactNode;
}

/**
 * Visionneuse 3D + AR pour un plat.
 * Utilise <model-viewer> (Google, sans dépendance NPM, script chargé à la demande).
 * Supporte .glb / .gltf. AR natif sur iOS (Quick Look) et Android (Scene Viewer).
 */
export function DishModelViewer({
  restaurantId,
  dishId,
  dishName,
  modelUrl,
  arEnabled = true,
  language,
  trigger,
}: DishModelViewerProps) {
  const [open, setOpen] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    if (typeof window === "undefined") return;

    // Charge le script model-viewer à la demande
    const EXISTING = document.querySelector(
      'script[data-mv-loaded="true"]'
    );
    if (EXISTING) {
      setScriptReady(true);
      return;
    }
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js";
    script.dataset.mvLoaded = "true";
    script.onload = () => setScriptReady(true);
    document.head.appendChild(script);
  }, [open]);

  useEffect(() => {
    if (open) {
      trackEvent(restaurantId, "dish_view", { dishId, language });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, restaurantId, dishId, language]);

  const handleArClick = () => {
    trackEvent(restaurantId, "ar_view", { dishId, language });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex"
        aria-label={`${dishName} — 3D`}
      >
        {trigger ?? (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold-dark))] border border-[hsl(var(--gold))]/30 hover:bg-[hsl(var(--gold))]/25 transition-colors">
            <Cuboid className="h-3.5 w-3.5" />
            3D
          </span>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            ref={viewerRef}
            className="relative w-full max-w-3xl aspect-square bg-gradient-to-br from-[hsl(var(--charcoal))] to-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="סגור"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-full bg-black/40 text-white text-xs backdrop-blur">
              {dishName}
            </div>

            {scriptReady ? (
              /* @ts-expect-error model-viewer is a custom web component */
              <model-viewer
                src={modelUrl}
                alt={dishName}
                camera-controls
                auto-rotate
                auto-rotate-delay="800"
                rotation-per-second="25deg"
                shadow-intensity="1.2"
                exposure="1"
                environment-image="neutral"
                ar={arEnabled ? "" : undefined}
                ar-modes="webxr scene-viewer quick-look"
                ar-scale="fixed"
                style={{
                  width: "100%",
                  height: "100%",
                  background: "transparent",
                }}
              >
                {arEnabled && (
                  <button
                    slot="ar-button"
                    onClick={handleArClick}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gold-gradient text-white px-5 py-2.5 rounded-full font-medium shadow-gold-glow flex items-center gap-2 hover:opacity-90 transition-opacity"
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <Maximize2 className="h-4 w-4" />
                    הצג על השולחן שלי
                  </button>
                )}
                {/* @ts-expect-error */}
              </model-viewer>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
