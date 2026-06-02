"use client";

import { HeroShowcase } from "@/components/landing/HeroShowcase";
import type { HeroModel } from "../_lib/types";
import { AuroraBackground } from "./_hero/AuroraBackground";
import { HeroCTA } from "./_hero/HeroCTA";
import { HeroSocialProof } from "./_hero/HeroSocialProof";
import { HeroTitle } from "./_hero/HeroTitle";
import { SocialProofBadge } from "./_hero/SocialProofBadge";

type HeroSectionProps = {
  models: HeroModel[];
  modelIdx: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (idx: number) => void;
};

/**
 * HeroSection — section hero plein écran (titre + showcase 3D + CTA + social proof).
 * Inclut aurora background + grid lines + vignette.
 */
export function HeroSection({
  models,
  modelIdx,
  onPrev,
  onNext,
  onSelect,
}: HeroSectionProps) {
  return (
    <section
      style={{
        paddingTop: 120,
        paddingBottom: 60,
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "hsl(38,28%,94%)",
      }}
    >
      <AuroraBackground />

      <div
        className="page-section-inner"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 56px",
          width: "100%",
          position: "relative",
          zIndex: 3,
          direction: "rtl",
          textAlign: "center",
        }}
      >
        <SocialProofBadge />
        <HeroTitle />

        <p
          className="hero-fade-d"
          style={{
            fontSize: "1.0625rem",
            lineHeight: 1.75,
            color: "hsl(24,12%,38%)",
            maxWidth: 480,
            margin: "0 auto 0",
          }}
        >
          הלקוח סורק QR, רואה את המנה בתלת-מימד ומזמין בביטחון.
          <br />
          ללא אפליקציה. ללא הורדה.
        </p>

        <div style={{ width: "100%", marginTop: 16 }}>
          <HeroShowcase
            models={models}
            modelIdx={modelIdx}
            onPrev={onPrev}
            onNext={onNext}
            onSelect={onSelect}
          />
        </div>

        <HeroCTA />
        <HeroSocialProof />
      </div>
    </section>
  );
}
