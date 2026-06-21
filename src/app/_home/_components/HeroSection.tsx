"use client";

import { AuroraBackground } from "./_hero/AuroraBackground";
import { HeroCTA } from "./_hero/HeroCTA";
import { HeroSocialProof } from "./_hero/HeroSocialProof";
import { HeroTitle } from "./_hero/HeroTitle";
import { HeroVideo } from "./_hero/HeroVideo";
import { SocialProofBadge } from "./_hero/SocialProofBadge";

/**
 * HeroSection — hero éditorial asymétrique (split RTL).
 * Colonne texte ancrée à droite (start RTL) · colonne vidéo à gauche, en profondeur
 * (cadre bronze décalé + glow + chip 360°). Le présentoir 3D vit dans ShowcaseSection.
 */
export function HeroSection() {
  return (
    <section
      style={{
        paddingTop: 140,
        paddingBottom: 72,
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "hsl(var(--void))",
        overflow: "hidden",
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
        }}
      >
        <div
          className="hero-split"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "clamp(40px, 5vw, 80px)",
            alignItems: "center",
          }}
        >
          {/* COLONNE TEXTE — ancrée au start (droite en RTL) */}
          <div
            className="hero-text-col"
            style={{
              textAlign: "right",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
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
                maxWidth: 440,
                margin: "4px 0 0",
              }}
            >
              הלקוח סורק QR, רואה את המנה בתלת-מימד ומזמין בביטחון.
              <br />
              ללא אפליקציה. ללא הורדה.
            </p>

            <HeroCTA />
            <HeroSocialProof />
          </div>

          {/* COLONNE VIDÉO — gauche en RTL, profondeur en couches */}
          <div
            className="hero-video-col hero-fade-e"
            style={{ position: "relative" }}
          >
            {/* cadre bronze décalé (desktop) */}
            <div
              aria-hidden
              className="hero-video-deco"
              style={{
                position: "absolute",
                inset: 0,
                transform: "translate(18px, 18px)",
                border: "1px solid hsl(var(--accent-bright) / .32)",
                borderRadius: 32,
                pointerEvents: "none",
              }}
            />
            {/* glow bronze */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "-12%",
                background:
                  "radial-gradient(ellipse at 50% 50%, hsl(var(--accent-bright) / .18) 0%, transparent 65%)",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative" }}>
              <HeroVideo />
              {/* chip 360° */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -16,
                  insetInlineStart: -16,
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "7px 14px",
                  background: "var(--grad-bronze)",
                  color: "#fff",
                  fontFamily: "var(--font-mono)",
                  fontSize: ".7rem",
                  fontWeight: 600,
                  letterSpacing: ".12em",
                  borderRadius: 99,
                  boxShadow: "0 8px 24px hsl(28,62%,28%,.4)",
                }}
              >
                360°
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
