"use client";

import { useMemo } from "react";
import { Smartphone, QrCode } from "lucide-react";

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
    []
  );

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      {/* PHONE */}
      <div
        className="absolute"
        style={{
          opacity: phoneOpacity,
          transform: `translateY(${phoneY}px) scale(${phoneScale}) rotateX(${p * 15}deg)`,
          filter: `blur(${phoneBlur}px)`,
          transition: "transform 150ms linear",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative w-[140px] h-[280px] rounded-[32px] bg-gradient-to-br from-zinc-800 to-black shadow-2xl border-4 border-zinc-700 overflow-hidden">
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-20 rounded-full bg-black z-10" />
          {/* Screen */}
          <div className="absolute inset-1.5 rounded-[26px] bg-gradient-to-b from-[hsl(var(--charcoal))] via-zinc-900 to-black flex flex-col items-center justify-center gap-3">
            <div className="h-16 w-16 rounded-xl bg-white/90 flex items-center justify-center">
              <QrCode className="h-10 w-10 text-black" strokeWidth={2.5} />
            </div>
            <div className="text-[9px] text-[hsl(var(--gold))] font-bold tracking-wider">
              סרוק לראות את המנה
            </div>
            <div className="mt-1 h-[2px] w-10 bg-[hsl(var(--gold))] rounded-full" />
          </div>
        </div>

        {/* Phone reflection glow */}
        <div
          className="absolute inset-0 rounded-[32px] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 40%)",
          }}
        />
      </div>

      {/* GOLD PARTICLES */}
      {particlesActive && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((pt) => {
            const t = Math.max(0, Math.min(1, particleProgress - pt.delay));
            const x = Math.cos(pt.angle) * pt.distance * (0.5 + t * 1.5);
            const y =
              Math.sin(pt.angle) * pt.distance * 0.4 * (0.5 + t * 1.2) +
              (t < 0.5 ? -t * 80 : -40 + (t - 0.5) * 80);
            const opacity = t < 0.1 ? t * 10 : t > 0.8 ? (1 - t) * 5 : 1;

            return (
              <div
                key={pt.id}
                className="absolute top-1/2 left-1/2 rounded-full"
                style={{
                  width: `${pt.size}px`,
                  height: `${pt.size}px`,
                  background:
                    "radial-gradient(circle, hsl(var(--gold)) 0%, hsl(var(--gold-dark)) 70%, transparent 100%)",
                  boxShadow: "0 0 8px hsl(var(--gold))",
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  opacity: Math.min(1, opacity),
                  transition: "none",
                }}
              />
            );
          })}
        </div>
      )}

      {/* PLATE (ceramic, top view) */}
      <div
        className="absolute"
        style={{
          opacity: plateOpacity,
          transform: `scale(${plateScale}) rotateX(60deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 200ms ease-out",
        }}
      >
        {/* Plate shadow on table */}
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 -mt-4 w-[260px] h-[40px] rounded-full blur-xl"
          style={{
            background:
              "radial-gradient(ellipse, rgba(24,18,10,0.45) 0%, transparent 70%)",
          }}
        />

        {/* Outer rim */}
        <div
          className="relative w-[280px] h-[280px] rounded-full flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #fefefe 0%, #f0ebe3 55%, #d9d0c2 100%)",
            boxShadow:
              "inset 0 4px 20px rgba(255,255,255,0.9), inset 0 -8px 30px rgba(120,90,50,0.15), 0 20px 40px -10px rgba(24,18,10,0.35)",
          }}
        >
          {/* Gold decorative rim */}
          <div
            className="absolute inset-3 rounded-full border-2"
            style={{
              borderColor: "hsl(var(--gold) / 0.6)",
              boxShadow:
                "inset 0 0 0 1px rgba(212,160,50,0.3), 0 0 20px rgba(212,160,50,0.15)",
            }}
          />
          {/* Inner plate (where food sits) */}
          <div
            className="w-[180px] h-[180px] rounded-full relative overflow-hidden"
            style={{
              background:
                "radial-gradient(circle at 40% 35%, #fafafa 0%, #ebe3d5 60%, #cec2ae 100%)",
              boxShadow: "inset 0 2px 12px rgba(120,90,50,0.25)",
            }}
          >
            {/* Subtle shimmer */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.6) 0%, transparent 50%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* GOLD BURST at 50% progress */}
      {p > 0.45 && p < 0.7 && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: 1 - Math.abs((p - 0.55) / 0.15),
          }}
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
