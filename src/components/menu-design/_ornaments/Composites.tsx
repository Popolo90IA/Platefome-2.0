"use client";

import type { OrnamentProps } from "./types";

/** Wax seal — cachet de cire bordeaux */
export function WaxSeal({
  size = 80,
  text = "P",
  ...props
}: OrnamentProps & { text?: string }) {
  return (
    <div
      className="relative inline-flex items-center justify-center rounded-full shadow-wax-seal"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 30%, hsl(0 55% 42%), hsl(0 55% 22%) 70%, hsl(0 55% 15%) 100%)`,
      }}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      {/* Inner impressed ring */}
      <div className="absolute inset-2 rounded-full" style={{ border: "1px dashed rgba(255, 220, 200, 0.3)" }} />
      {/* Letter/symbol */}
      <span
        className="font-display font-bold relative z-10"
        style={{
          fontSize: size * 0.42,
          color: "rgba(255, 220, 180, 0.85)",
          textShadow: "0 -1px 0 rgba(60, 0, 0, 0.5), 0 1px 0 rgba(255, 200, 180, 0.2)",
        }}
      >
        {text}
      </span>
      {/* Highlight */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: "12%",
          background:
            "radial-gradient(ellipse at 30% 25%, rgba(255, 220, 200, 0.3) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}

/** Chapter badge — numéro romain dans un cercle */
export function ChapterBadge({
  numeral,
  label,
}: {
  numeral: string;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        {/* Outer circle */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "hsl(var(--parchment))",
            border: "1px solid hsl(var(--gold) / 0.5)",
            boxShadow:
              "inset 0 0 0 1px hsl(var(--parchment)), inset 0 0 0 4px hsl(var(--gold) / 0.2), 0 4px 12px -4px rgba(139, 90, 43, 0.2)",
          }}
        >
          <span
            className="font-display text-3xl italic"
            style={{
              color: "hsl(var(--gold-dark))",
              textShadow: "0 1px 0 rgba(255, 220, 150, 0.3)",
            }}
          >
            {numeral}
          </span>
        </div>
        {/* Star top */}
        <svg
          className="absolute -top-1 left-1/2 -translate-x-1/2 text-[hsl(var(--gold))]"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden
        >
          <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="currentColor" />
        </svg>
      </div>
      {label && (
        <span className="smallcaps text-xs text-[hsl(var(--gold-dark))]">{label}</span>
      )}
    </div>
  );
}

/** Leader dots row — ligne menu avec prix */
export function MenuLine({
  name,
  price,
  description,
}: {
  name: React.ReactNode;
  price: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className="group py-3">
      <div className="menu-row">
        <span className="font-display text-xl text-foreground">{name}</span>
        <span className="menu-row-dots" />
        <span className="menu-row-price text-lg">{price}</span>
      </div>
      {description && (
        <p className="mt-1.5 text-sm text-muted-foreground italic font-body-serif leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
