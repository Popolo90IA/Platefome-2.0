"use client";

import { AuroraBackground } from "./_hero/AuroraBackground";
import { HeroCTA } from "./_hero/HeroCTA";
import { HeroSocialProof } from "./_hero/HeroSocialProof";
import { HeroTitle } from "./_hero/HeroTitle";
import { HeroVideo } from "./_hero/HeroVideo";
import { SocialProofBadge } from "./_hero/SocialProofBadge";

/**
 * HeroSection — section hero plein écran (titre + boucle vidéo + CTA + social proof).
 * Le présentoir 3D interactif vit désormais dans ShowcaseSection, plus bas.
 * Inclut aurora background + grid lines + vignette.
 */
export function HeroSection() {
  return (
    <section
      style={{
        paddingTop: 120,
        paddingBottom: 60,
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "hsl(var(--void))",
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
            color: "hsl(var(--subtle))",
            maxWidth: 480,
            margin: "0 auto 0",
          }}
        >
          הלקוח סורק QR, רואה את המנה בתלת-מימד ומזמין בביטחון.
          <br />
          ללא אפליקציה. ללא הורדה.
        </p>

        <div className="hero-fade-e" style={{ width: "100%", marginTop: 16 }}>
          <HeroVideo />
        </div>

        <HeroCTA />
        <HeroSocialProof />
      </div>
    </section>
  );
}
