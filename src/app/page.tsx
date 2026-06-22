"use client";

import { useEffect, useState } from "react";
import { CinematicCurtain } from "@/components/landing/CinematicCurtain";
import { DirectionalTransition } from "@/components/transitions/DirectionalTransition";

import { HOME_KEYFRAMES, GRAIN_SVG } from "./_home/_lib/keyframes";
import { useReveal, useHeaderScroll } from "./_home/_lib/hooks/useReveal";
import type { GalleryDish } from "./_home/_lib/types";

import { SiteNav } from "./_home/_components/SiteNav";
import { HeroSection } from "./_home/_components/HeroSection";
import { StatsSection } from "./_home/_components/StatsSection";
import { ShowcaseSection } from "./_home/_components/ShowcaseSection";
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

  const [selectedDish, setSelectedDish] = useState<GalleryDish | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Préférence sauvegardée (défaut : dark — la home est éditoriale sombre).
  useEffect(() => {
    const saved = localStorage.getItem("platforme-home-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  // Applique `.dark` sur <html> tant qu'on est sur la home (pour que les UI
  // rendues au niveau <body> — toasts, modale — héritent du bon thème).
  // Persiste le choix. Retiré en quittant la route.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("platforme-home-theme", theme);
    return () => root.classList.remove("dark");
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

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
      {/* Le thème est porté par `.dark` sur <html> (script no-flash + effet
          ci-dessus). Le wrapper hérite des tokens, pas de className ici pour
          éviter un conflit de premier paint. */}
      <div
        style={{
          background: "hsl(var(--void))",
          color: "hsl(var(--cream))",
          colorScheme: theme,
          overflowX: "hidden",
          minHeight: "100vh",
          transition: "background .4s ease, color .4s ease",
        }}
      >
        <style>{HOME_KEYFRAMES}</style>
        {/* Fallback no-JS : hero + sections reveal ne doivent jamais rester invisibles. */}
        <noscript>
          <style>{`.hero-fade-a,.hero-fade-b,.hero-fade-c,.hero-fade-d,.hero-fade-e,.hero-fade-f,.reveal,.reveal-left,.reveal-scale,.reveal-blur{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>

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

        <SiteNav theme={theme} onToggleTheme={toggleTheme} />

        <HeroSection />

        <StatsSection />
        <ShowcaseSection />
        <FeaturesSection />
        <GallerySection onSelectDish={setSelectedDish} />
        <PricingSection />
        <SiteFooter />
      </div>
    </DirectionalTransition>
  );
}
