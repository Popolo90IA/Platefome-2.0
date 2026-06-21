"use client";

import { useEffect, useRef } from "react";
import { CARD_BG } from "@/components/landing/_lib/constants";
import { ScrollChevron } from "@/components/landing/_components/ScrollChevron";

/**
 * HeroVideo — visuel central du hero : boucle vidéo "intro plat" (1:1).
 * Remplace le showcase 3D comme première apparition de la page.
 * Autoplay muet en boucle, respecte prefers-reduced-motion (pause + poster figé).
 * Le cadre premium reprend exactement celui de HeroShowcase (border bronze, radius, ombre).
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Garantit muted avant play() (sinon autoplay bloqué par les navigateurs).
    v.muted = true;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      v.pause();
      v.currentTime = 0;
    } else {
      v.play().catch(() => {});
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 580,
        margin: "0 auto",
        position: "relative",
        direction: "rtl",
      }}
    >
      <div
        style={{
          position: "relative",
          background: CARD_BG,
          border: "1px solid hsl(28,62%,42%,.22)",
          borderRadius: 28,
          padding: "clamp(10px, 1.6vw, 16px)",
          boxShadow:
            "0 28px 80px -24px hsl(28,62%,28%,.28), 0 2px 0 hsl(36,30%,98%,.6) inset, 0 -1px 0 hsl(28,62%,38%,.08) inset",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/intro-plat-poster.jpg"
          aria-label="הדגמה: מנה בתלת-מימד"
          style={{
            display: "block",
            width: "100%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            borderRadius: 16,
          }}
        >
          <source src="/intro-plat.mp4" type="video/mp4" />
        </video>
      </div>

      <ScrollChevron />
    </div>
  );
}
