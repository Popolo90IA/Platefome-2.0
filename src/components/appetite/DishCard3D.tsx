"use client";

import { useEffect, useState } from "react";

interface DishCard3DProps {
  name: string;
  nameLatin?: string;
  price: string;
  tag?: string;
  modelUrl?: string;
  fallbackEmoji?: string;
  accent?: "crimson" | "matcha" | "amber";
  tilt?: number;
}

/**
 * Carte plat avec visualisation 3D (model-viewer).
 * Fallback : grande pastille colorée avec emoji si pas de modèle.
 * Prix en JetBrains Mono pour l'effet ticket de caisse éditorial.
 */
export function DishCard3D({
  name,
  nameLatin,
  price,
  tag = "3D · AR",
  modelUrl,
  fallbackEmoji = "◆",
  accent = "crimson",
  tilt = 0,
}: DishCard3DProps) {
  const [mvLoaded, setMvLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (customElements.get("model-viewer")) {
      setMvLoaded(true);
      return;
    }
    const existing = document.querySelector(
      'script[data-mv="appetite"]'
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => setMvLoaded(true));
      return;
    }
    const s = document.createElement("script");
    s.type = "module";
    s.src =
      "https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js";
    s.dataset.mv = "appetite";
    s.addEventListener("load", () => setMvLoaded(true));
    document.head.appendChild(s);
  }, []);

  const accentColor = {
    crimson: "hsl(var(--crimson))",
    matcha: "hsl(var(--matcha))",
    amber: "hsl(var(--amber))",
  }[accent];

  const shadowClass = {
    crimson: "shadow-hard",
    matcha: "shadow-hard-matcha",
    amber: "shadow-hard-cream",
  }[accent];

  return (
    <div
      className={`group relative bg-[hsl(var(--ink))] border border-[hsl(var(--border))] ${shadowClass} transition-transform duration-500 hover:-translate-y-1`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {/* Tag ribbon */}
      <div
        className="absolute top-3 start-3 z-10 px-2 py-0.5 tick-number"
        style={{
          background: accentColor,
          color: "hsl(var(--obsidian))",
        }}
      >
        {tag}
      </div>

      {/* 3D viewport */}
      <div
        className="relative aspect-square overflow-hidden"
        style={{
          background: `radial-gradient(circle at 50% 55%, hsl(var(--charcoal)) 0%, hsl(var(--obsidian)) 70%)`,
        }}
      >
        {modelUrl && mvLoaded ? (
          // @ts-expect-error - custom element
          <model-viewer
            src={modelUrl}
            auto-rotate
            camera-controls
            shadow-intensity="1"
            exposure="0.85"
            style={{ width: "100%", height: "100%", background: "transparent" }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="font-[Instrument_Serif] italic select-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12"
              style={{
                fontSize: "clamp(80px, 14vw, 160px)",
                color: accentColor,
                textShadow: `0 0 40px ${accentColor}40`,
              }}
            >
              {fallbackEmoji}
            </div>
          </div>
        )}

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 3px)",
          }}
        />
      </div>

      {/* Info bar */}
      <div className="p-5 border-t border-[hsl(var(--border))]">
        <div className="flex items-end justify-between gap-3 mb-1.5">
          <h4 className="font-[Noto_Serif_Hebrew] text-2xl leading-tight text-[hsl(var(--cream))]">
            {name}
          </h4>
          <span
            className="tick-number text-base whitespace-nowrap"
            style={{ color: accentColor }}
          >
            ₪{price}
          </span>
        </div>
        {nameLatin && (
          <p className="font-[Instrument_Serif] italic text-sm text-[hsl(var(--mist))]">
            {nameLatin}
          </p>
        )}
      </div>
    </div>
  );
}
