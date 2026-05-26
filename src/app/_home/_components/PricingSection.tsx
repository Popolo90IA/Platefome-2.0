"use client";

import Link from "next/link";
import { PRICING_PLANS } from "../_lib/constants";
import type { PricingPlan } from "../_lib/types";

function PlanCard({ plan, delay }: { plan: PricingPlan; delay: number }) {
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
        {isHighlighted ? (
          <Link
            href="/signup"
            transitionTypes={["nav-forward"]}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "13px 24px",
              background:
                "linear-gradient(135deg, hsl(28,62%,38%), hsl(22,70%,50%))",
              borderRadius: 10,
              fontFamily: "'DM Sans',sans-serif",
              fontSize: ".9rem",
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
              boxShadow: "0 4px 20px hsl(28,62%,42%,.3)",
              transition: "transform .2s,box-shadow .2s",
            }}
            onMouseOver={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 32px hsl(28,62%,42%,.4)";
            }}
            onMouseOut={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "";
              el.style.boxShadow = "0 4px 20px hsl(28,62%,42%,.3)";
            }}
          >
            בחר תוכנית
          </Link>
        ) : (
          <Link
            href="/signup"
            transitionTypes={["nav-forward"]}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "13px 24px",
              background: "transparent",
              border: "1px solid hsl(30,18%,78%)",
              borderRadius: 10,
              fontFamily: "'DM Sans',sans-serif",
              fontSize: ".9rem",
              fontWeight: 600,
              color: "hsl(24,12%,38%)",
              textDecoration: "none",
              transition: "border-color .2s,color .2s,background .2s",
            }}
            onMouseOver={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "hsl(28,62%,42%,.5)";
              el.style.color = "hsl(28,62%,42%)";
            }}
            onMouseOut={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "hsl(30,18%,78%)";
              el.style.color = "hsl(24,12%,38%)";
            }}
          >
            בחר תוכנית
          </Link>
        )}
      </div>
    </div>
  );
}

/**
 * PricingSection — section #pricing (3 plans Starter / Popular / Enterprise).
 */
export function PricingSection() {
  return (
    <section
      id="pricing"
      style={{
        padding: "120px 0 140px",
        background: "hsl(38,30%,97%)",
        borderTop: "1px solid hsl(30,18%,86%)",
        scrollMarginTop: 80,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 400,
          background:
            "radial-gradient(ellipse,hsl(28,62%,42%,.06) 0%,transparent 65%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: 1060,
          margin: "0 auto",
          padding: "0 24px",
          direction: "rtl",
        }}
      >
        {/* Header */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "hsl(28,62%,42%,.08)",
              border: "1px solid hsl(28,62%,42%,.18)",
              borderRadius: 99,
              padding: "6px 18px",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "hsl(28,62%,42%)",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".1em",
                textTransform: "uppercase" as const,
                color: "hsl(28,62%,42%)",
              }}
            >
              מחירים
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(2.2rem,4.5vw,3.5rem)",
              fontWeight: 700,
              color: "hsl(24,18%,16%)",
              lineHeight: 1.05,
              letterSpacing: "-.02em",
              margin: "0 0 20px",
            }}
          >
            שלוש תוכניות.{" "}
            <em style={{ color: "hsl(28,62%,42%)", fontStyle: "italic" }}>
              אפס הפתעות.
            </em>
          </h2>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "hsl(28,62%,42%,.07)",
              border: "1px solid hsl(28,62%,42%,.2)",
              borderRadius: 99,
              padding: "8px 20px",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "hsl(28,62%,42%)",
                boxShadow: "0 0 8px hsl(28,62%,42%,.35)",
                animation: "pulseGlow 2.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".82rem",
                fontWeight: 600,
                color: "hsl(28,62%,42%)",
              }}
            >
              חודש ראשון מתנה לכל תוכנית
            </span>
          </div>
        </div>

        {/* 3 cards */}
        <div
          className="pricing-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 16,
            alignItems: "center",
          }}
        >
          {PRICING_PLANS.map((plan, i) => (
            <PlanCard key={plan.title} plan={plan} delay={i * 100} />
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 40,
            fontFamily: "'DM Sans',sans-serif",
            fontSize: ".8rem",
            color: "hsl(28,8%,38%)",
          }}
        >
          כל המחירים בשקלים · לא כולל מע״מ · ללא התחייבות
        </p>
      </div>
    </section>
  );
}
