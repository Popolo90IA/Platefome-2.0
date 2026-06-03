"use client";

import { QrCode } from "lucide-react";

/* ── PhoneLayer — QR phone that dissolves as progress rises ── */
export function PhoneLayer({
  opacity,
  scale,
  blur,
  y,
  rotX,
}: {
  opacity: number;
  scale: number;
  blur: number;
  y: number;
  rotX: number;
}) {
  return (
    <div
      className="absolute"
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale}) rotateX(${rotX}deg)`,
        filter: `blur(${blur}px)`,
        transition: "transform 150ms linear",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative w-[140px] h-[280px] rounded-[32px] bg-gradient-to-br from-zinc-800 to-black shadow-2xl border-4 border-zinc-700 overflow-hidden">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-20 rounded-full bg-black z-10" />
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
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 40%)",
        }}
      />
    </div>
  );
}
