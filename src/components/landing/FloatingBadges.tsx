"use client";

import { Cuboid, Eye, Sparkles, Maximize2, Camera, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Badge = {
  icon: LucideIcon;
  label: string;
  value?: string;
  angle: number; // degrees around the plate
  delay: number; // animation stagger
};

const BADGES: Badge[] = [
  { icon: Cuboid, label: "תלת־מימד", value: "4K", angle: -90, delay: 0 },
  { icon: Maximize2, label: "מציאות רבודה", angle: -30, delay: 0.15 },
  { icon: Eye, label: "צפיות", value: "1,247", angle: 30, delay: 0.3 },
  { icon: Sparkles, label: "פופולרי", angle: 90, delay: 0.45 },
  { icon: Camera, label: "360°", angle: 150, delay: 0.6 },
  { icon: Globe, label: "8 שפות", angle: 210, delay: 0.75 },
];

interface FloatingBadgesProps {
  active: boolean;
  radius?: number; // px
}

export function FloatingBadges({ active, radius = 220 }: FloatingBadgesProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ perspective: "1000px" }}
      aria-hidden
    >
      {BADGES.map((b, i) => {
        const rad = (b.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius * 0.45; // flatten orbit (elliptical like table view)
        const Icon = b.icon;

        return (
          <div
            key={i}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              opacity: active ? 1 : 0,
              transition: `opacity 600ms ease ${b.delay}s, transform 800ms cubic-bezier(0.16,1,0.3,1) ${b.delay}s`,
            }}
          >
            <div
              className="group relative"
              style={{
                animation: active
                  ? `badgeFloat 4s ease-in-out ${b.delay}s infinite`
                  : "none",
              }}
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[hsl(var(--gold))]/40 shadow-gold-glow">
                <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-gold-gradient text-white">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="flex flex-col leading-tight pe-1">
                  {b.value && (
                    <span className="text-[10px] font-bold text-[hsl(var(--gold-dark))]">
                      {b.value}
                    </span>
                  )}
                  <span className="text-[11px] font-medium text-foreground/80">
                    {b.label}
                  </span>
                </div>
              </div>

              {/* Gold thread connecting to center */}
              <div
                className="absolute top-1/2 start-1/2 -z-10"
                style={{
                  width: `${Math.sqrt(x * x + y * y)}px`,
                  height: "1px",
                  transformOrigin: "0 0",
                  transform: `rotate(${Math.atan2(-y, -x) * (180 / Math.PI)}deg)`,
                  background:
                    "linear-gradient(90deg, hsl(var(--gold)/0.6), transparent)",
                  opacity: 0.7,
                }}
              />
            </div>
          </div>
        );
      })}

      <style jsx>{`
        @keyframes badgeFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </div>
  );
}
