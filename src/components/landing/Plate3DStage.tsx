"use client";

import { useEffect, useState } from "react";

interface Plate3DStageProps {
  active: boolean;
  modelUrl?: string;
  posterUrl?: string;
}

/**
 * Plate3DStage — le plat 3D tourne au-dessus de l'assiette.
 * Utilise <model-viewer> si chargé, sinon fallback sur un rendu CSS premium.
 */
export function Plate3DStage({
  active,
  modelUrl,
  posterUrl,
}: Plate3DStageProps) {
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
    script.src =
      "https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js";
    script.dataset.mvLoaded = "true";
    script.onload = () => setScriptReady(true);
    document.head.appendChild(script);
  }, [active]);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "scale(1)" : "scale(0.85)",
        transition: "opacity 700ms ease, transform 900ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Steam (vapeur) — only visible when active */}
      {active && <SteamEffect />}

      {/* The 3D stage */}
      <div className="relative w-[320px] h-[320px]">
        {/* Plate beneath */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: "translateY(40px)" }}
        >
          <div
            className="w-[300px] h-[300px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 40% 30%, #fefefe 0%, #ece4d4 60%, #c9bea7 100%)",
              boxShadow:
                "inset 0 4px 18px rgba(255,255,255,0.8), inset 0 -6px 24px rgba(120,90,50,0.2), 0 30px 50px -12px rgba(24,18,10,0.4)",
              transform: "rotateX(65deg)",
            }}
          >
            <div
              className="absolute inset-4 rounded-full border"
              style={{ borderColor: "hsl(var(--gold) / 0.5)" }}
            />
          </div>
        </div>

        {/* Model or fallback */}
        <div className="absolute inset-0 flex items-center justify-center">
          {modelUrl && scriptReady ? (
            /* @ts-expect-error model-viewer custom element */
            <model-viewer
              src={modelUrl}
              poster={posterUrl}
              alt="Plat 3D"
              auto-rotate
              auto-rotate-delay="0"
              rotation-per-second="18deg"
              camera-orbit="0deg 75deg 3m"
              shadow-intensity="1.5"
              shadow-softness="0.8"
              exposure="1.1"
              environment-image="neutral"
              disable-zoom
              disable-pan
              interaction-prompt="none"
              style={{
                width: "280px",
                height: "280px",
                background: "transparent",
              }}
            >
              {/* @ts-expect-error */}
            </model-viewer>
          ) : (
            <PlateFoodFallback />
          )}
        </div>

        {/* Orbiting gold glow */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--gold) / 0.3) 0%, transparent 60%)",
            filter: "blur(30px)",
            animation: "plateGlow 4s ease-in-out infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes plateGlow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }
      `}</style>
    </div>
  );
}

/** Beau plat stylisé en CSS quand aucun modèle GLB fourni */
function PlateFoodFallback() {
  return (
    <div
      className="relative w-[200px] h-[200px]"
      style={{
        animation: "plateSpin 12s linear infinite",
      }}
    >
      {/* Main dish dome */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 25%, #e8a968 0%, #c17838 40%, #8a4e1f 100%)",
          boxShadow:
            "inset -10px -15px 30px rgba(60,30,10,0.5), inset 10px 10px 20px rgba(255,200,120,0.4), 0 20px 30px -8px rgba(60,30,10,0.4)",
        }}
      />

      {/* Garnish elements */}
      <div
        className="absolute top-6 left-10 h-6 w-6 rounded-full"
        style={{
          background: "radial-gradient(circle, #3d7a2a, #1f4515)",
          boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.3)",
        }}
      />
      <div
        className="absolute top-12 right-8 h-5 w-5 rounded-full"
        style={{
          background: "radial-gradient(circle, #c43030, #7a1515)",
          boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.3)",
        }}
      />
      <div
        className="absolute bottom-8 left-16 h-4 w-4 rounded-full"
        style={{
          background: "radial-gradient(circle, #3d7a2a, #1f4515)",
        }}
      />
      <div
        className="absolute bottom-12 right-12 h-7 w-7 rounded-full"
        style={{
          background: "radial-gradient(circle, #f4d06f, #b88e2a)",
          boxShadow: "inset -2px -2px 6px rgba(60,40,10,0.5)",
        }}
      />

      {/* Gold glaze shine */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 40%)",
        }}
      />

      <style jsx>{`
        @keyframes plateSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

/** Vapeur animée SVG */
function SteamEffect() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[160px] pointer-events-none">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: "30px",
            height: "80px",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.5) 0%, transparent 70%)",
            filter: "blur(4px)",
            animation: `steamRise ${3 + i * 0.5}s ease-out ${i * 0.7}s infinite`,
            opacity: 0,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes steamRise {
          0% {
            opacity: 0;
            transform: translate(-50%, 0) scale(0.6);
          }
          30% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -120px) scale(1.5);
          }
        }
      `}</style>
    </div>
  );
}
