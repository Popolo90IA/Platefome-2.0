"use client";

import React from "react";

interface StickerRoundProps {
  text: string;
  size?: number;
  color?: string;
  reverse?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Sticker rond en rotation continue — texte SVG sur cercle.
 * Évoque le sticker "depuis 1920" des cartes de restaurant imprimées.
 */
export function StickerRound({
  text,
  size = 140,
  color = "hsl(var(--gold))",
  reverse = false,
  className = "",
  style,
}: StickerRoundProps) {
  const radius = size / 2 - 14;
  const pathId = `sticker-path-${text.replace(/\W/g, "")}-${size}`;

  return (
    <div
      className={`${reverse ? "sticker-rotate-reverse" : "sticker-rotate"} ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        <defs>
          <path
            id={pathId}
            d={`M ${size / 2}, ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            fill="none"
          />
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius + 8}
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.4"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={8}
          fill={color}
        />
        <text
          fill={color}
          style={{
            fontFamily: "'DM Mono', 'JetBrains Mono', monospace",
            fontSize: size * 0.085,
            fontWeight: 600,
            letterSpacing: size * 0.02,
            textTransform: "uppercase",
          }}
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
