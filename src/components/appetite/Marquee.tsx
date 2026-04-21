"use client";

import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  fast?: boolean;
  className?: string;
}

/**
 * Marquee infini — défilement continu type journal éditorial.
 * Le contenu est dupliqué 2× pour un loop seamless.
 */
export function Marquee({
  children,
  reverse = false,
  fast = false,
  className = "",
}: MarqueeProps) {
  const trackClass = fast
    ? "marquee-track-fast"
    : reverse
    ? "marquee-track-reverse"
    : "marquee-track";

  return (
    <div
      className={`relative overflow-hidden whitespace-nowrap ${className}`}
      aria-hidden
    >
      <div className={`inline-flex ${trackClass}`}>
        <div className="inline-flex shrink-0 items-center">{children}</div>
        <div className="inline-flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}
