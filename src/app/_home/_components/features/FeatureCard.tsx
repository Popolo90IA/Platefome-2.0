"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  CARD_BASE,
  EYEBROW_BASE,
  H3,
  ICON_WRAP_BASE,
  NUMBER_BG,
  P,
} from "./styles";

interface Props {
  delay: number;
  numberStr: string;
  topGradient: string;
  iconBg: string;
  iconBorder: string;
  iconStroke: string;
  iconSvg: ReactNode;
  eyebrowColor: string;
  eyebrow: string;
  titleLines: ReactNode;
  description: string;
  mockup: ReactNode;
}

/**
 * FeatureCard — carte feature générique (numbered, icon, eyebrow, titre,
 * paragraphe, mockup). Utilisée 3× dans FeaturesSection.
 */
export function FeatureCard({
  delay,
  numberStr,
  topGradient,
  iconBg,
  iconBorder,
  iconSvg,
  iconStroke,
  eyebrowColor,
  eyebrow,
  titleLines,
  description,
  mockup,
}: Props) {
  const iconWrapStyle: CSSProperties = {
    ...ICON_WRAP_BASE,
    background: iconBg,
    border: `1px solid ${iconBorder}`,
  };
  return (
    <div
      className="reveal"
      data-delay={delay}
      style={{
        ...CARD_BASE,
        transition:
          "transform .3s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s",
      }}
      onMouseOver={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-6px)";
        el.style.borderColor = "hsl(var(--accent-bright) / .35)";
        el.style.boxShadow = "0 24px 56px -20px rgba(0,0,0,.45)";
      }}
      onMouseOut={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "";
        el.style.borderColor = "hsl(var(--line) / .5)";
        el.style.boxShadow = "";
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: topGradient,
        }}
      />
      <div style={NUMBER_BG}>{numberStr}</div>
      <div style={iconWrapStyle}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconStroke}
          strokeWidth="2"
        >
          {iconSvg}
        </svg>
      </div>
      <div style={{ ...EYEBROW_BASE, color: eyebrowColor }}>{eyebrow}</div>
      <h3 style={H3}>{titleLines}</h3>
      <p style={P}>{description}</p>
      {mockup}
    </div>
  );
}
