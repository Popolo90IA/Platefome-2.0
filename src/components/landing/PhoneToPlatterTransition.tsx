"use client";

import { useMemo } from "react";
import { Smartphone } from "lucide-react";
import { PhoneLayer } from "./_phone-platter/PhoneLayer";
import { GoldParticles } from "./_phone-platter/GoldParticles";
import { PlateLayer } from "./_phone-platter/PlateLayer";

interface PhoneToPlatterTransitionProps {
  /** 0 = phone intact · 0.5 = dissolving · 1 = fully transformed to plate */
  progress: number;
}

/**
 * PhoneToPlatterTransition — l'effet signature :
 * le téléphone se dissout en particules dorées qui se réassemblent en assiette.
 *
 * progress:
 *   0.00 - 0.30 : phone intact (QR code hint)
 *   0.30 - 0.60 : phone dissolves into gold particles (swirl upward)
 *   0.60 - 1.00 : particles coalesce into plate silhouette
 */
export function PhoneToPlatterTransition({
  progress,
}: PhoneToPlatterTransitionProps) {
  const p = Math.max(0, Math.min(1, progress));

  // Phone opacity and scale
  const phoneOpacity = p < 0.35 ? 1 : p < 0.55 ? 1 - (p - 0.35) / 0.2 : 0;
  const phoneScale = p < 0.35 ? 1 : 1 - (p - 0.35) * 0.6;
  const phoneBlur = p < 0.3 ? 0 : Math.min(12, (p - 0.3) * 30);
  const phoneY = -60 + p * 40; // floats down slightly

  // Plate opacity
  const plateOpacity = p < 0.55 ? 0 : (p - 0.55) / 0.45;
  const plateScale = p < 0.55 ? 0.7 : 0.7 + (p - 0.55) * 0.6;

  // Particles appear between 0.3 and 0.85
  const particlesActive = p > 0.3 && p < 0.9;
  const particleProgress = Math.max(0, Math.min(1, (p - 0.3) / 0.55));

  const particles = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        angle: (i / 36) * Math.PI * 2 + (i % 3) * 0.3,
        delay: (i % 6) * 0.05,
        distance: 40 + (i % 5) * 30,
        size: 2 + (i % 4),
      })),
    [],
  );

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      <PhoneLayer
        opacity={phoneOpacity}
        scale={phoneScale}
        blur={phoneBlur}
        y={phoneY}
        rotX={p * 15}
      />

      {particlesActive && (
        <GoldParticles particles={particles} particleProgress={particleProgress} />
      )}

      <PlateLayer opacity={plateOpacity} scale={plateScale} />

      {/* GOLD BURST at 50% progress */}
      {p > 0.45 && p < 0.7 && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: 1 - Math.abs((p - 0.55) / 0.15) }}
        >
          <div
            className="w-[400px] h-[400px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--gold) / 0.5) 0%, transparent 55%)",
              filter: "blur(20px)",
            }}
          />
        </div>
      )}

      {/* PHONE ICON hint (when idle) */}
      {p < 0.1 && (
        <div className="absolute -top-2 right-8 flex items-center gap-1 text-xs text-[hsl(var(--gold-dark))] font-medium opacity-60 animate-pulse">
          <Smartphone className="h-3 w-3" />
          <span>הטלפון של הלקוח</span>
        </div>
      )}
    </div>
  );
}
