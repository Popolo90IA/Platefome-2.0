"use client";

import React from "react";
import { ArInfoColumn } from "./_components/ArInfoColumn";
import { ModelLabel } from "./_components/ModelLabel";
import { ModelStage } from "./_components/ModelStage";
import { QrColumn } from "./_components/QrColumn";
import { ScrollChevron } from "./_components/ScrollChevron";
import { ShowcaseFrame } from "./_components/ShowcaseFrame";
import { CARD_BG, RESPONSIVE_BREAKPOINT_PX } from "./_lib/constants";
import type { ModelEntry } from "./_lib/types";

interface HeroShowcaseProps {
  models: ModelEntry[];
  modelIdx: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
  /** URL d'un QR pré-généré dans /public/brand/, ou null pour fallback SVG décoratif */
  qrSrc?: string;
}

/**
 * HeroShowcase — présentoir 3D (orchestrateur).
 * Layout 3 colonnes (desktop) / stack (mobile) :
 *   [AR info]  ·  [3D model + nav]  ·  [QR code]
 */
export function HeroShowcase({
  models,
  modelIdx,
  onPrev,
  onNext,
  onSelect,
  qrSrc,
}: HeroShowcaseProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1080,
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
          padding: "clamp(28px, 4vw, 56px) clamp(20px, 3.5vw, 48px)",
          boxShadow:
            "0 28px 80px -24px hsl(28,62%,28%,.28), 0 2px 0 hsl(36,30%,98%,.6) inset, 0 -1px 0 hsl(28,62%,38%,.08) inset",
          overflow: "hidden",
        }}
      >
        <ShowcaseFrame />

        <div
          className="hero-showcase-grid"
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns:
              "minmax(180px, 1fr) minmax(320px, 2.2fr) minmax(180px, 1fr)",
            gap: "clamp(16px, 2.5vw, 32px)",
            alignItems: "center",
          }}
        >
          <ArInfoColumn />
          <ModelStage
            modelUrl={models[modelIdx].url}
            count={models.length}
            activeIdx={modelIdx}
            onPrev={onPrev}
            onNext={onNext}
            onSelect={onSelect}
          />
          <QrColumn qrSrc={qrSrc} />
        </div>

        <ModelLabel label={models[modelIdx].label} />
      </div>

      <ScrollChevron />

      <style jsx>{`
        @keyframes showcasePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes showcaseBounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%      { transform: translateY(6px); opacity: 1; }
        }
        @media (max-width: ${RESPONSIVE_BREAKPOINT_PX}px) {
          .hero-showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .hero-showcase-col {
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
}
