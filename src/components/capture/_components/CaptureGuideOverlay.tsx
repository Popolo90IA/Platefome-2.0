"use client";

import { PHOTOS_360_COUNT } from "@/lib/constants";
import { GUIDE_CIRCUMFERENCE, GUIDE_RADIUS } from "../_lib/constants";

interface Props {
  photosCount: number;
  currentAngle: number;
}

/**
 * CaptureGuideOverlay — cercle SVG guide + arc de progression + marqueurs photo.
 */
export function CaptureGuideOverlay({ photosCount, currentAngle }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg className="w-48 h-48 sm:w-64 sm:h-64" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={GUIDE_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <circle
          cx="100"
          cy="100"
          r={GUIDE_RADIUS}
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${(currentAngle / 360) * GUIDE_CIRCUMFERENCE} ${GUIDE_CIRCUMFERENCE}`}
          transform="rotate(-90 100 100)"
          style={{ transition: "stroke-dasharray 0.3s" }}
        />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(42 55% 52%)" />
            <stop offset="100%" stopColor="hsl(42 78% 65%)" />
          </linearGradient>
        </defs>
        {Array.from({ length: PHOTOS_360_COUNT }).map((_, i) => {
          const angle = (i / PHOTOS_360_COUNT) * 2 * Math.PI - Math.PI / 2;
          const x = 100 + GUIDE_RADIUS * Math.cos(angle);
          const y = 100 + GUIDE_RADIUS * Math.sin(angle);
          const done = i < photosCount;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill={done ? "hsl(42 78% 65%)" : "rgba(255,255,255,0.4)"}
            />
          );
        })}
      </svg>
    </div>
  );
}
