"use client";

import { useModelViewerScript } from "./_lib/useModelViewerScript";
import { PlateFoodFallback } from "./_plate-3d/PlateFoodFallback";
import { SteamEffect } from "./_plate-3d/SteamEffect";

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
  const scriptReady = useModelViewerScript(active);

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
