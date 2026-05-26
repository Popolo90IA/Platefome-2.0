"use client";

import { useEffect, useState } from "react";
import { CinematicCurtain } from "@/components/landing/CinematicCurtain";
import { DirectionalTransition } from "@/components/transitions/DirectionalTransition";

import { MODELS } from "./_home/_lib/constants";
import { HOME_KEYFRAMES, GRAIN_SVG } from "./_home/_lib/keyframes";
import { useReveal, useHeaderScroll } from "./_home/_lib/hooks/useReveal";
import type { GalleryDish } from "./_home/_lib/types";

import { SiteNav } from "./_home/_components/SiteNav";
import { HeroSection } from "./_home/_components/HeroSection";
import { StatsSection } from "./_home/_components/StatsSection";
import { FeaturesSection } from "./_home/_components/FeaturesSection";
import { GallerySection } from "./_home/_components/GallerySection";
import { PricingSection } from "./_home/_components/PricingSection";
import { SiteFooter } from "./_home/_components/SiteFooter";
import { DishDetailModal } from "./_home/_components/DishDetailModal";

/**
 * HomePage — landing marketing Plateform.
 * Orchestre les sections via composants extraits dans _home/.
 */
export default function HomePage() {
  useReveal();
  useHeaderScroll();

  const [modelIdx, setModelIdx] = useState(0);
  const [selectedDish, setSelectedDish] = useState<GalleryDish | null>(null);

  const prev = () =>
    setModelIdx((i) => (i - 1 + MODELS.length) % MODELS.length);
  const next = () => setModelIdx((i) => (i + 1) % MODELS.length);

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedDish(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <DirectionalTransition>
      <div
        style={{
          background: "hsl(var(--void))",
          color: "hsl(var(--cream))",
          overflowX: "hidden",
          minHeight: "100vh",
        }}
      >
        <style>{HOME_KEYFRAMES}</style>

        <CinematicCurtain />

        {/* Grain overlay */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 9999,
            opacity: 0.028,
            mixBlendMode: "multiply",
            backgroundImage: GRAIN_SVG,
            backgroundSize: "256px",
          }}
        />

        <DishDetailModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
        />

        <SiteNav />

        <HeroSection
          models={MODELS}
          modelIdx={modelIdx}
          onPrev={prev}
          onNext={next}
          onSelect={setModelIdx}
        />

        <StatsSection />
        <FeaturesSection />
        <GallerySection onSelectDish={setSelectedDish} />
        <PricingSection />
        <SiteFooter />
      </div>
    </DirectionalTransition>
  );
}
