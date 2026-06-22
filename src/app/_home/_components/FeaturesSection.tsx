"use client";

import { ArMockup } from "./features/ArMockup";
import { BarChartMockup } from "./features/BarChartMockup";
import { FeatureCard } from "./features/FeatureCard";
import { FeaturesHeader } from "./features/FeaturesHeader";
import { QrMockup } from "./features/QrMockup";

/**
 * FeaturesSection — section #features "השיטה".
 * Bento asymétrique RTL : étape 01 (סריקה) en tuile large featured à droite,
 * étapes 02 (AR) + 03 (אנליטיקה) empilées à gauche. Cards Double-Bezel.
 */
export function FeaturesSection() {
  return (
    <section
      id="features"
      style={{
        padding: "140px 0 150px",
        background: "hsl(var(--deep))",
        borderTop: "1px solid hsl(var(--line))",
        position: "relative",
        scrollMarginTop: 80,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 820,
          height: 420,
          background:
            "radial-gradient(ellipse,hsl(var(--accent-bright) / .06) 0%,transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 24px",
          direction: "rtl",
          position: "relative",
        }}
      >
        <FeaturesHeader />

        <div
          className="features-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.32fr 1fr",
            gap: 18,
            alignItems: "stretch",
          }}
        >
          {/* Étape 01 — featured (סריקה QR) */}
          <FeatureCard
            featured
            delay={0}
            numberStr="01"
            accentVar="--accent-bright"
            iconSvg={
              <>
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="3" height="3" rx=".5" />
              </>
            }
            eyebrow="סריקה"
            titleLines={
              <>
                הלקוח מכוון,
                <br />
                התפריט נפתח
              </>
            }
            description="קוד QR אישי. תוך 0.8 שניות נפתח תפריט ישירות בדפדפן: ללא אפליקציה, ללא הורדה."
            bullets={["פתיחה תוך פחות משנייה", "עובד בכל דפדפן, בלי התקנה"]}
            mockup={<QrMockup />}
          />

          {/* Étapes 02 + 03 — empilées */}
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 18 }}>
            <FeatureCard
              delay={120}
              numberStr="02"
              accentVar="--gold-light"
              iconSvg={
                <>
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" x2="12" y1="22.08" y2="12" />
                </>
              }
              eyebrow="AR תלת-מימד"
              titleLines={<>המנה על השולחן, ב-AR</>}
              description="iPhone ו-Android מציגים את המנה במציאות רבודה. כל מנה, לפני ההזמנה."
              mockup={<ArMockup />}
            />

            <FeatureCard
              delay={240}
              numberStr="03"
              accentVar="--gold"
              iconSvg={
                <>
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </>
              }
              eyebrow="אנליטיקה"
              titleLines={<>אנליטיקה בזמן אמת</>}
              description="כל סריקה נמדדת: צפיות, המרות ומנות מובילות, ישירות בלוח הבקרה."
              mockup={<BarChartMockup />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
