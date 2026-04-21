"use client";

import { ReactNode } from "react";

interface EditorialBlockProps {
  number: string;
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  accent?: "crimson" | "matcha" | "amber" | "cream";
  tilt?: number;
  className?: string;
}

/**
 * Bloc éditorial numéroté — grands chiffres Swiss + titre italic + corps.
 * Inspiré des magazines gastronomiques imprimés.
 */
export function EditorialBlock({
  number,
  eyebrow,
  title,
  body,
  accent = "crimson",
  tilt = 0,
  className = "",
}: EditorialBlockProps) {
  const accentColor = {
    crimson: "hsl(var(--crimson))",
    matcha: "hsl(var(--matcha))",
    amber: "hsl(var(--amber))",
    cream: "hsl(var(--cream))",
  }[accent];

  return (
    <article
      className={`relative ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div
        className="flex items-start gap-4 mb-6"
        style={{ color: accentColor }}
      >
        <span
          className="font-[Instrument_Serif] italic leading-none"
          style={{ fontSize: "clamp(72px, 9vw, 140px)" }}
        >
          /{number}
        </span>
        {eyebrow && (
          <span className="eyebrow mt-4 text-[hsl(var(--mist))]">
            {eyebrow}
          </span>
        )}
      </div>
      <h3
        className="font-[Instrument_Serif] italic leading-[0.92] text-[hsl(var(--cream))] mb-5"
        style={{ fontSize: "clamp(34px, 4.2vw, 56px)" }}
      >
        {title}
      </h3>
      {body && (
        <div className="text-[hsl(var(--mist))] text-base md:text-lg leading-relaxed max-w-md">
          {body}
        </div>
      )}
    </article>
  );
}
