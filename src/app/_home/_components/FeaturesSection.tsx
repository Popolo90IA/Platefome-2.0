"use client";

import { ArMockup } from "./features/ArMockup";
import { BarChartMockup } from "./features/BarChartMockup";
import { FeatureCard } from "./features/FeatureCard";
import { FeaturesHeader } from "./features/FeaturesHeader";
import { QrMockup } from "./features/QrMockup";

/**
 * FeaturesSection — section #features "השיטה" (3 cards QR / 3D AR / Analytics).
 */
export function FeaturesSection() {
  return (
    <section
      id="features"
      style={{
        padding: "120px 0 140px",
        background: "hsl(38,30%,97%)",
        borderTop: "1px solid hsl(30,18%,86%)",
        position: "relative",
        scrollMarginTop: 80,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 400,
          background:
            "radial-gradient(ellipse,hsl(28,62%,42%,.06) 0%,transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 24px",
          direction: "rtl",
        }}
      >
        <FeaturesHeader />

        <div
          className="features-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 20,
          }}
        >
          <FeatureCard
            delay={0}
            numberStr="01"
            topGradient="linear-gradient(90deg, hsl(28,62%,42%), hsl(22,70%,50%))"
            iconBg="linear-gradient(135deg,hsl(28,62%,42%,.12),hsl(22,70%,50%,.08))"
            iconBorder="hsl(28,62%,42%,.3)"
            iconStroke="hsl(28,62%,42%)"
            iconSvg={
              <>
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="3" height="3" rx=".5" />
              </>
            }
            eyebrowColor="hsl(28,62%,42%)"
            eyebrow="סריקה"
            titleLines={
              <>
                הלקוח מכוון,
                <br />
                התפריט נפתח
              </>
            }
            description="קוד QR אישי. תוך 0.8 שניות נפתח תפריט ישירות בדפדפן — ללא אפליקציה, ללא הורדה."
            mockup={<QrMockup />}
          />

          <FeatureCard
            delay={120}
            numberStr="02"
            topGradient="linear-gradient(90deg,hsl(36,80%,58%),hsl(28,62%,42%))"
            iconBg="linear-gradient(135deg,hsl(36,80%,55%,.15),hsl(28,62%,42%,.1))"
            iconBorder="hsl(36,80%,55%,.25)"
            iconStroke="hsl(36,80%,62%)"
            iconSvg={
              <>
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" x2="12" y1="22.08" y2="12" />
              </>
            }
            eyebrowColor="hsl(36,80%,62%)"
            eyebrow="AR תלת-מימד"
            titleLines={
              <>
                המנה על
                <br />
                השולחן, ב-AR
              </>
            }
            description="iPhone ו-Android מציגים את המנה במציאות רבודה. כל מנה — לפני ההזמנה."
            mockup={<ArMockup />}
          />

          <FeatureCard
            delay={240}
            numberStr="03"
            topGradient="linear-gradient(90deg,hsl(140,60%,45%),hsl(28,62%,42%))"
            iconBg="linear-gradient(135deg,hsl(140,60%,45%,.15),hsl(28,62%,42%,.1))"
            iconBorder="hsl(140,60%,45%,.25)"
            iconStroke="hsl(140,60%,55%)"
            iconSvg={
              <>
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </>
            }
            eyebrowColor="hsl(140,60%,55%)"
            eyebrow="אנליטיקה"
            titleLines={
              <>
                +30% הזמנות
                <br />
                נמדדו
              </>
            }
            description="שולחנות שסורקים ממירים ×3.4 יותר. אנליטיקה בזמן אמת: צפיות, המרות, מנות פופולריות."
            mockup={<BarChartMockup />}
          />
        </div>
      </div>
    </section>
  );
}
