"use client";

import { type SVGProps } from "react";

/**
 * Menu Ornaments — bibliothèque d'ornements SVG authentiques
 * Inspirés des menus gastronomiques français du 19e siècle
 */

type OrnamentProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

/** Fleuron central — ornement classique séparateur */
export function Fleuron({ size = 48, ...props }: OrnamentProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * 0.4}
      viewBox="0 0 120 48"
      fill="none"
      aria-hidden
      {...props}
    >
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none">
        {/* Central diamond */}
        <path d="M60 18 L66 24 L60 30 L54 24 Z" fill="currentColor" />
        {/* Left vine */}
        <path d="M54 24 Q40 24 32 16 Q28 24 20 22" />
        <path d="M54 24 Q40 24 32 32 Q28 24 20 26" />
        <circle cx="20" cy="22" r="1.5" fill="currentColor" />
        <circle cx="20" cy="26" r="1.5" fill="currentColor" />
        {/* Right vine */}
        <path d="M66 24 Q80 24 88 16 Q92 24 100 22" />
        <path d="M66 24 Q80 24 88 32 Q92 24 100 26" />
        <circle cx="100" cy="22" r="1.5" fill="currentColor" />
        <circle cx="100" cy="26" r="1.5" fill="currentColor" />
        {/* Tiny leaves */}
        <path d="M38 18 Q36 14 40 12 Q42 16 38 18 Z" fill="currentColor" opacity="0.7" />
        <path d="M38 30 Q36 34 40 36 Q42 32 38 30 Z" fill="currentColor" opacity="0.7" />
        <path d="M82 18 Q84 14 80 12 Q78 16 82 18 Z" fill="currentColor" opacity="0.7" />
        <path d="M82 30 Q84 34 80 36 Q78 32 82 30 Z" fill="currentColor" opacity="0.7" />
      </g>
    </svg>
  );
}

/** Laurel wreath — pour les distinctions/étoiles */
export function LaurelWreath({ size = 120, ...props }: OrnamentProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden
      {...props}
    >
      <g stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round">
        {/* Left laurel */}
        <path d="M20 60 Q 15 35, 35 20 Q 50 30, 55 55" />
        <path d="M22 55 Q 18 48, 28 42" />
        <path d="M20 48 Q 16 40, 26 34" />
        <path d="M24 40 Q 20 32, 32 26" />
        <path d="M30 32 Q 28 26, 38 22" />
        <path d="M22 62 Q 20 68, 28 72" />
        <path d="M24 70 Q 22 76, 32 78" />
        {/* Right laurel */}
        <path d="M100 60 Q 105 35, 85 20 Q 70 30, 65 55" />
        <path d="M98 55 Q 102 48, 92 42" />
        <path d="M100 48 Q 104 40, 94 34" />
        <path d="M96 40 Q 100 32, 88 26" />
        <path d="M90 32 Q 92 26, 82 22" />
        <path d="M98 62 Q 100 68, 92 72" />
        <path d="M96 70 Q 98 76, 88 78" />
      </g>
    </svg>
  );
}

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
      <div
        className="absolute inset-2 rounded-full"
        style={{
          border: "1px dashed rgba(255, 220, 200, 0.3)",
        }}
      />
      {/* Letter/symbol */}
      <span
        className="font-display font-bold relative z-10"
        style={{
          fontSize: size * 0.42,
          color: "rgba(255, 220, 180, 0.85)",
          textShadow:
            "0 -1px 0 rgba(60, 0, 0, 0.5), 0 1px 0 rgba(255, 200, 180, 0.2)",
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

/** Three stars — étoiles Michelin style */
export function ThreeStars({ size = 24, ...props }: OrnamentProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size * 3}
      height={size}
      viewBox="0 0 72 24"
      aria-hidden
      {...props}
    >
      <g fill="currentColor">
        {[12, 36, 60].map((cx) => (
          <path
            key={cx}
            d={`M${cx} 4 L${cx + 2.8} ${10} L${cx + 9} ${10.5} L${cx + 4} ${14.5} L${cx + 5.8} ${20.5} L${cx} ${17} L${cx - 5.8} ${20.5} L${cx - 4} ${14.5} L${cx - 9} ${10.5} L${cx - 2.8} ${10} Z`}
          />
        ))}
      </g>
    </svg>
  );
}

/** Corner flourish — ornement d'angle (menu ancien) */
export function CornerFlourish({
  size = 64,
  rotation = 0,
  ...props
}: OrnamentProps & { rotation?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden
      {...props}
    >
      <g stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round">
        <path d="M4 4 L24 4 M4 4 L4 24" />
        <path d="M4 4 Q 16 16, 28 12 Q 20 20, 28 28" />
        <path d="M4 4 Q 12 20, 18 28" />
        <circle cx="28" cy="12" r="1.5" fill="currentColor" />
        <circle cx="18" cy="28" r="1.5" fill="currentColor" />
        <path d="M10 10 Q 8 6, 12 4" opacity="0.6" />
        {/* Decorative dot */}
        <circle cx="4" cy="4" r="2" fill="currentColor" />
        {/* Outer leaf */}
        <path d="M20 4 Q 24 8, 24 4 Z" fill="currentColor" opacity="0.6" />
        <path d="M4 20 Q 8 24, 4 24 Z" fill="currentColor" opacity="0.6" />
      </g>
    </svg>
  );
}

/** Rule divider with central diamond */
export function RuleDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.6)] to-[hsl(var(--gold)/0.6)]" />
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className="text-[hsl(var(--gold))]">
        <path d="M6 1 L11 6 L6 11 L1 6 Z" fill="currentColor" />
      </svg>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[hsl(var(--gold)/0.6)] to-[hsl(var(--gold)/0.6)]" />
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
        <span className="smallcaps text-xs text-[hsl(var(--gold-dark))]">
          {label}
        </span>
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
