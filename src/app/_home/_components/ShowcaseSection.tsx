"use client";

import { useState } from "react";
import { HeroShowcase } from "@/components/landing/HeroShowcase";
import { MODELS } from "../_lib/constants";

/**
 * ShowcaseSection — présentoir 3D interactif (carousel de plats).
 * Déplacé hors du hero : la boucle vidéo sert de hook en haut, ce bloc
 * propose l'interaction 3D plus bas (après les stats).
 */
export function ShowcaseSection() {
  const [modelIdx, setModelIdx] = useState(0);
  const prev = () =>
    setModelIdx((i) => (i - 1 + MODELS.length) % MODELS.length);
  const next = () => setModelIdx((i) => (i + 1) % MODELS.length);

  return (
    <section
      id="showcase"
      style={{
        padding: "120px 0 140px",
        background: "hsl(var(--void))",
        borderTop: "1px solid hsl(var(--line))",
        position: "relative",
        scrollMarginTop: 80,
        overflow: "hidden",
      }}
    >
      <div
        className="page-section-inner"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 56px",
          direction: "rtl",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="eyebrow-gold" style={{ marginBottom: 14 }}>
            הדגמה אינטראקטיבית
          </p>
          <h2 style={{ maxWidth: 620, margin: "0 auto" }}>
            סובבו, התקרבו — כל מנה <em>בתלת-מימד</em>
          </h2>
        </div>

        <HeroShowcase
          models={MODELS}
          modelIdx={modelIdx}
          onPrev={prev}
          onNext={next}
          onSelect={setModelIdx}
        />
      </div>
    </section>
  );
}
