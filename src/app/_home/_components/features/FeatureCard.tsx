"use client";

import type { ReactNode } from "react";

interface Props {
  delay: number;
  numberStr: string;
  /** CSS custom property name for the accent, e.g. "--accent-bright". */
  accentVar: string;
  iconSvg: ReactNode;
  eyebrow: string;
  titleLines: ReactNode;
  description: string;
  mockup: ReactNode;
  featured?: boolean;
  bullets?: readonly string[];
}

const EASE = "cubic-bezier(.32,.72,0,1)";

/**
 * FeatureCard — carte "machined hardware" (Double-Bezel : coque hairline +
 * cœur en retrait avec highlight inset et radii concentriques). Variante
 * `featured` pour la tuile large du bento Features.
 */
export function FeatureCard({
  delay,
  numberStr,
  accentVar,
  iconSvg,
  eyebrow,
  titleLines,
  description,
  mockup,
  featured = false,
  bullets,
}: Props) {
  const solid = `hsl(var(${accentVar}))`;

  return (
    <div
      className="reveal"
      data-delay={delay}
      style={{
        position: "relative",
        height: "100%",
        padding: 6,
        borderRadius: 28,
        background: "var(--bezel-shell)",
        border: "1px solid var(--bezel-border)",
        boxShadow: "inset 0 1px 0 var(--bezel-hi)",
        transition: `transform .6s ${EASE}, border-color .5s ${EASE}, box-shadow .5s ${EASE}`,
        willChange: "transform",
      }}
      onMouseOver={(e) => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
          return;
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-6px)";
        el.style.borderColor = `hsl(var(${accentVar}) / .32)`;
        el.style.boxShadow = `0 30px 70px -34px hsl(var(${accentVar}) / .4)`;
      }}
      onMouseOut={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "";
        el.style.borderColor = "var(--bezel-border)";
        el.style.boxShadow = "inset 0 1px 0 var(--bezel-hi)";
      }}
    >
      {/* Cœur en retrait */}
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 22,
          padding: featured ? "44px 40px" : "30px 28px",
          background:
            "linear-gradient(165deg, hsl(var(--deep)) 0%, hsl(var(--abyss)) 100%)",
          boxShadow:
            "inset 0 1px 0 var(--bezel-hi), inset 0 0 0 1px var(--veil-soft)",
        }}
      >
        {/* Glow accent coin haut */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            insetInlineEnd: "-22%",
            top: "-32%",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: `radial-gradient(circle, hsl(var(${accentVar}) / .14) 0%, transparent 62%)`,
            filter: "blur(36px)",
            pointerEvents: "none",
          }}
        />

        {/* Chiffre fantôme */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: featured ? 14 : 8,
            insetInlineStart: featured ? 30 : 22,
            fontFamily: "var(--font-body)",
            fontWeight: 800,
            fontSize: featured ? 156 : 92,
            lineHeight: 1,
            letterSpacing: "-.05em",
            color: `hsl(var(${accentVar}) / .07)`,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {numberStr}
        </div>

        {/* Icône — pastille en retrait, trait ultra-light */}
        <div
          style={{
            position: "relative",
            width: featured ? 56 : 48,
            height: featured ? 56 : 48,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `hsl(var(${accentVar}) / .1)`,
            border: `1px solid hsl(var(${accentVar}) / .22)`,
            boxShadow: "inset 0 1px 0 var(--bezel-hi)",
            marginBottom: featured ? 26 : 20,
          }}
        >
          <svg
            width={featured ? 24 : 22}
            height={featured ? 24 : 22}
            viewBox="0 0 24 24"
            fill="none"
            stroke={solid}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {iconSvg}
          </svg>
        </div>

        {/* Eyebrow mono */}
        <div
          style={{
            position: "relative",
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: solid,
            marginBottom: 14,
          }}
        >
          {eyebrow}
        </div>

        {/* Titre */}
        <h3
          style={{
            position: "relative",
            fontFamily: "var(--font-hebrew)",
            fontWeight: 700,
            fontSize: featured ? "clamp(1.9rem, 2.5vw, 2.5rem)" : "1.55rem",
            lineHeight: 1.08,
            letterSpacing: "-.02em",
            color: "hsl(var(--fog))",
            margin: "0 0 14px",
          }}
        >
          {titleLines}
        </h3>

        {/* Description */}
        <p
          style={{
            position: "relative",
            fontFamily: "var(--font-body)",
            fontSize: featured ? ".98rem" : ".875rem",
            lineHeight: 1.7,
            color: "hsl(var(--subtle))",
            maxWidth: featured ? 360 : 300,
            margin: 0,
          }}
        >
          {description}
        </p>

        {/* Points clés (featured) */}
        {bullets && bullets.length > 0 && (
          <div
            style={{
              position: "relative",
              marginTop: 24,
              display: "flex",
              flexDirection: "column",
              gap: 11,
            }}
          >
            {bullets.map((b) => (
              <div
                key={b}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={solid}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: ".9rem",
                    color: "hsl(var(--fog))",
                  }}
                >
                  {b}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Respiration → mockup ancré en bas */}
        <div style={{ flex: 1, minHeight: featured ? 24 : 18 }} />

        <div style={{ position: "relative" }}>{mockup}</div>
      </div>
    </div>
  );
}
