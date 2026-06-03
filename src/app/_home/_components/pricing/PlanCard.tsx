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
  const accent = isHighlighted ? "hsl(28,62%,42%)" : "hsl(28,8%,50%)";
  const checkColor = isHighlighted ? "hsl(28,62%,42%)" : "hsl(28,8%,45%)";
  const featureColor = isHighlighted ? "hsl(24,18%,16%)" : "hsl(24,12%,38%)";
  const priceColor = isHighlighted ? "hsl(28,62%,42%)" : "hsl(24,18%,16%)";

  return (
    <div
      className="reveal"
      data-delay={String(delay)}
      style={{
        background: isHighlighted
          ? "linear-gradient(180deg,hsl(38,30%,97%),hsl(36,22%,90%))"
          : "hsl(38,30%,97%)",
        border: isHighlighted
          ? "1px solid hsl(28,62%,42%,.4)"
          : "1px solid hsl(30,18%,82%,.5)",
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
        transform: isHighlighted ? "scale(1.04)" : undefined,
        boxShadow: isHighlighted
          ? "0 0 0 1px hsl(28,62%,42%,.08), 0 24px 64px -16px rgba(0,0,0,.12)"
          : undefined,
      }}
    >
      <div
        style={{
          height: 2,
          background: isHighlighted
            ? "linear-gradient(90deg, hsl(28,62%,42%), hsl(22,70%,50%))"
            : "hsl(30,18%,82%,.3)",
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
            ? "1px solid hsl(28,62%,42%,.1)"
            : "1px solid hsl(30,18%,82%,.3)",
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
              color: isHighlighted ? "hsl(28,48%,38%)" : "hsl(24,12%,38%)",
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
            color: isHighlighted ? "hsl(28,48%,36%)" : "hsl(28,8%,42%)",
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
