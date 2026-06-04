"use client";

import { PRICING_PLANS } from "../_lib/constants";
import { PlanCard } from "./pricing/PlanCard";
import { PricingHeader } from "./pricing/PricingHeader";

/**
 * PricingSection — section #pricing (3 plans Starter / Popular / Enterprise).
 */
export function PricingSection() {
  return (
    <section
      id="pricing"
      style={{
        padding: "120px 0 140px",
        background: "hsl(var(--deep))",
        borderTop: "1px solid hsl(var(--line))",
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
            "radial-gradient(ellipse,hsl(var(--accent-bright) / .06) 0%,transparent 65%)",
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
        <PricingHeader />

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
            fontFamily: "var(--font-body)",
            fontSize: ".8rem",
            color: "hsl(var(--subtle))",
          }}
        >
          כל המחירים בשקלים · לא כולל מע״מ · ללא התחייבות
        </p>
      </div>
    </section>
  );
}
