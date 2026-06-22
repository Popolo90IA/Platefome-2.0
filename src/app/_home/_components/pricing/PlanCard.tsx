"use client";

import type { PricingPlan } from "../../_lib/types";
import { PlanCTA } from "./PlanCTA";

const EASE = "cubic-bezier(.32,.72,0,1)";

/**
 * PlanCard — carte de tarif Double-Bezel (coque hairline + cœur en retrait).
 * Variante `highlighted` : coque bronze, glow, léger scale. Le scale vit sur la
 * coque interne (pas sur `.reveal`, qui possède déjà le transform d'entrée GSAP).
 */
export function PlanCard({ plan, delay }: { plan: PricingPlan; delay: number }) {
  const hl = plan.highlighted;

  const checkColor = hl ? "hsl(var(--accent-bright))" : "hsl(var(--subtle))";
  const featureColor = hl ? "hsl(var(--fog))" : "hsl(var(--subtle))";
  const priceColor = hl ? "hsl(var(--accent-bright))" : "hsl(var(--fog))";

  const shellBg = hl
    ? "linear-gradient(150deg, hsl(var(--accent-bright) / .16), hsl(var(--accent-bright) / .03))"
    : "var(--bezel-shell)";
  const shellBorder = hl
    ? "1px solid hsl(var(--accent-bright) / .32)"
    : "1px solid var(--bezel-border)";
  const shellShadow = hl
    ? "0 36px 90px -44px hsl(var(--accent-bright) / .5)"
    : "inset 0 1px 0 var(--bezel-hi)";
  const baseTransform = hl ? "scale(1.035)" : "none";

  return (
    <div className="reveal" data-delay={String(delay)} style={{ height: "100%" }}>
      {/* Coque (bezel) */}
      <div
        style={{
          position: "relative",
          height: "100%",
          padding: 6,
          borderRadius: 26,
          background: shellBg,
          border: shellBorder,
          boxShadow: shellShadow,
          transform: baseTransform,
          transition: `transform .6s ${EASE}, border-color .5s ${EASE}, box-shadow .5s ${EASE}`,
          willChange: "transform",
          zIndex: hl ? 2 : 1,
        }}
        onMouseOver={(e) => {
          if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
            return;
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = hl ? "scale(1.035) translateY(-4px)" : "translateY(-6px)";
          el.style.borderColor = "hsl(var(--accent-bright) / .5)";
          el.style.boxShadow = hl
            ? "0 44px 100px -44px hsl(var(--accent-bright) / .6)"
            : "0 30px 70px -34px rgba(0,0,0,.5)";
        }}
        onMouseOut={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = baseTransform;
          el.style.borderColor = hl
            ? "hsl(var(--accent-bright) / .32)"
            : "var(--bezel-border)";
          el.style.boxShadow = shellShadow;
        }}
      >
        {/* Cœur */}
        <div
          style={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: 20,
            background:
              "linear-gradient(175deg, hsl(var(--deep)) 0%, hsl(var(--abyss)) 100%)",
            boxShadow: "inset 0 1px 0 var(--bezel-hi)",
          }}
        >
          {/* Glow accent (highlighted) */}
          {hl && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                insetInlineEnd: "-25%",
                top: "-20%",
                width: 380,
                height: 380,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, hsl(var(--accent-bright) / .16) 0%, transparent 62%)",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />
          )}

          {/* Filet accent haut (highlighted) */}
          {hl && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                insetInline: 0,
                height: 2,
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--accent-bright)), hsl(var(--gold)), transparent)",
              }}
            />
          )}

          {/* Badge */}
          {plan.badge && (
            <div
              style={{
                position: "absolute",
                top: 18,
                insetInlineStart: 22,
                background: plan.badge.bg,
                border: `1px solid ${plan.badge.border}`,
                borderRadius: 99,
                padding: "5px 13px",
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: ".08em",
                color: plan.badge.color,
              }}
            >
              {plan.badge.label}
            </div>
          )}

          {/* En-tête : tier · prix · tagline */}
          <div
            style={{
              padding: "54px 30px 26px",
              borderBottom: hl
                ? "1px solid hsl(var(--accent-bright) / .12)"
                : "1px solid var(--bezel-border)",
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: hl ? "hsl(var(--accent-bright))" : "hsl(var(--dim))",
                marginBottom: 18,
              }}
            >
              {plan.tier}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "3.4rem",
                letterSpacing: "-.04em",
                color: priceColor,
                lineHeight: 1,
              }}
            >
              {plan.price}
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: ".85rem",
                  fontWeight: 400,
                  color: hl ? "hsl(var(--gold-dark))" : "hsl(var(--subtle))",
                  letterSpacing: 0,
                }}
              >
                /חודש
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: ".82rem",
                color: hl ? "hsl(var(--gold-dark))" : "hsl(var(--subtle))",
                marginTop: 8,
              }}
            >
              {plan.tagline}
            </div>
          </div>

          {/* Features */}
          <div
            style={{
              padding: "24px 30px",
              display: "flex",
              flexDirection: "column",
              gap: 13,
              flex: 1,
              position: "relative",
            }}
          >
            {plan.features.map((f) => (
              <div
                key={f}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  direction: "rtl",
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={checkColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0 }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: ".9rem",
                    color: featureColor,
                  }}
                >
                  {f}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ padding: "0 30px 30px", position: "relative" }}>
            <PlanCTA highlighted={hl} />
          </div>
        </div>
      </div>
    </div>
  );
}
