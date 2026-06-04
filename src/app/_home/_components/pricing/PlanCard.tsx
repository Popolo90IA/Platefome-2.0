"use client";

import type { PricingPlan } from "../../_lib/types";
import { PlanCTA } from "./PlanCTA";

/**
 * PlanCard — carte de tarif (Starter / Popular / Enterprise).
 * Variante highlighted = mise en avant (scale, gradient, badge pill).
 */
export function PlanCard({
  plan,
  delay,
}: {
  plan: PricingPlan;
  delay: number;
}) {
  const isHighlighted = plan.highlighted;
  const accent = isHighlighted ? "hsl(var(--accent-bright))" : "hsl(var(--dim))";
  const checkColor = isHighlighted ? "hsl(var(--accent-bright))" : "hsl(var(--subtle))";
  const featureColor = isHighlighted ? "hsl(var(--fog))" : "hsl(var(--subtle))";
  const priceColor = isHighlighted ? "hsl(var(--accent-bright))" : "hsl(var(--fog))";

  return (
    <div
      className="reveal"
      data-delay={String(delay)}
      style={{
        background: isHighlighted
          ? "linear-gradient(180deg,hsl(var(--deep)),hsl(var(--abyss)))"
          : "hsl(var(--deep))",
        border: isHighlighted
          ? "1px solid hsl(var(--accent-bright) / .4)"
          : "1px solid hsl(var(--line) / .5)",
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
        transform: isHighlighted ? "scale(1.04)" : undefined,
        boxShadow: isHighlighted
          ? "0 0 0 1px hsl(var(--accent-bright) / .08), 0 24px 64px -16px rgba(0,0,0,.12)"
          : undefined,
      }}
    >
      <div
        style={{
          height: 2,
          background: isHighlighted
            ? "linear-gradient(90deg, hsl(var(--accent-bright)), hsl(var(--gold)))"
            : "hsl(var(--line) / .3)",
        }}
      />

      {plan.badge && (
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: plan.badge.bg,
            border: `1px solid ${plan.badge.border}`,
            borderRadius: isHighlighted ? 99 : 8,
            padding: "4px 12px",
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 11,
            fontWeight: isHighlighted ? 600 : 700,
            color: plan.badge.color,
            letterSpacing: ".06em",
          }}
        >
          {plan.badge.label}
        </div>
      )}

      <div
        style={{
          padding: "28px 28px 24px",
          borderBottom: isHighlighted
            ? "1px solid hsl(var(--accent-bright) / .1)"
            : "1px solid hsl(var(--line) / .3)",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: ".1em",
            textTransform: "uppercase" as const,
            color: accent,
            marginBottom: 16,
          }}
        >
          {plan.tier}
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 700,
            fontSize: "3.25rem",
            letterSpacing: "-.04em",
            color: priceColor,
            lineHeight: 1,
          }}
        >
          {plan.price}
          <span
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: ".85rem",
              fontWeight: 400,
              color: isHighlighted ? "hsl(var(--gold-dark))" : "hsl(var(--subtle))",
              letterSpacing: 0,
            }}
          >
            /חודש
          </span>
        </div>
        <div
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: ".8rem",
            color: isHighlighted ? "hsl(var(--gold-dark))" : "hsl(var(--subtle))",
            marginTop: 6,
          }}
        >
          {plan.tagline}
        </div>
      </div>

      <div
        style={{
          padding: "24px 28px",
          display: "flex",
          flexDirection: "column" as const,
          gap: 12,
          marginBottom: 4,
        }}
      >
        {plan.features.map((f) => (
          <div
            key={f}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              direction: "rtl" as const,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={checkColor}
              strokeWidth={isHighlighted ? "2.5" : "2"}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".9rem",
                color: featureColor,
              }}
            >
              {f}
            </span>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 28px 28px" }}>
        <PlanCTA highlighted={!!isHighlighted} />
      </div>
    </div>
  );
}
