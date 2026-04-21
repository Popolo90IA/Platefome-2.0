"use client";

import { QrCode, Eye, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight: string;
};

const STEPS: Step[] = [
  {
    icon: QrCode,
    title: "סריקה",
    description: "הלקוח סורק QR בשולחן",
    highlight: "< 2 שניות",
  },
  {
    icon: Eye,
    title: "חוויה",
    description: "רואה את המנה בתלת־מימד על השולחן שלו",
    highlight: "×3.4 המרה",
  },
  {
    icon: UtensilsCrossed,
    title: "הזמנה",
    description: "מזמין בביטחון מלא — הוא כבר ראה",
    highlight: "+₪42 הזמנה",
  },
];

interface ExperiencePathProps {
  /** 0 to 1, controls which step is "active" */
  progress: number;
}

export function ExperiencePath({ progress }: ExperiencePathProps) {
  const activeIndex = Math.min(
    STEPS.length - 1,
    Math.floor(progress * STEPS.length + 0.15)
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Mobile: vertical, Desktop: horizontal */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-0">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isActive = i <= activeIndex;
          const isCurrent = i === activeIndex;

          return (
            <div
              key={i}
              className="flex-1 flex flex-col md:flex-row items-center gap-4"
            >
              {/* Step card */}
              <div
                className="relative flex flex-col items-center text-center w-full max-w-[220px]"
                style={{
                  opacity: isActive ? 1 : 0.35,
                  transform: isCurrent ? "scale(1.05)" : "scale(1)",
                  transition:
                    "opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {/* Step number halo */}
                <div className="relative mb-3">
                  <div
                    className={`h-16 w-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? "bg-gold-gradient shadow-gold-glow"
                        : "bg-white border-2 border-[hsl(var(--gold))]/30"
                    }`}
                  >
                    <Icon
                      className={`h-7 w-7 ${
                        isActive ? "text-white" : "text-[hsl(var(--gold))]/50"
                      }`}
                    />
                  </div>

                  {/* Pulsing ring when current */}
                  {isCurrent && (
                    <div
                      className="absolute inset-0 rounded-full border-2 border-[hsl(var(--gold))]"
                      style={{
                        animation: "ringPulse 1.8s ease-out infinite",
                      }}
                    />
                  )}

                  {/* Step index */}
                  <div
                    className={`absolute -top-1 -start-1 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isActive
                        ? "bg-white text-[hsl(var(--gold-dark))] shadow-md"
                        : "bg-[hsl(var(--gold))]/20 text-[hsl(var(--gold-dark))]/60"
                    }`}
                  >
                    {i + 1}
                  </div>
                </div>

                <h3
                  className={`font-serif-display text-xl font-bold mb-1 ${
                    isActive ? "text-foreground" : "text-foreground/50"
                  }`}
                >
                  {step.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  {step.description}
                </p>

                <div
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold-dark))] border border-[hsl(var(--gold))]/30"
                      : "bg-foreground/5 text-foreground/40 border border-foreground/10"
                  }`}
                >
                  {step.highlight}
                </div>
              </div>

              {/* Connector (hidden on last) */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:flex flex-1 items-center justify-center px-2">
                  <div className="relative h-[2px] w-full bg-[hsl(var(--gold))]/15 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 start-0 bg-gold-gradient rounded-full"
                      style={{
                        width:
                          i < activeIndex
                            ? "100%"
                            : i === activeIndex
                            ? "60%"
                            : "0%",
                        transition: "width 800ms cubic-bezier(0.16,1,0.3,1)",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Mobile vertical connector */}
              {i < STEPS.length - 1 && (
                <div className="md:hidden h-8 w-[2px] bg-[hsl(var(--gold))]/20 rounded-full" />
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes ringPulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
