"use client";

import { Ref } from "react";
import type { Format, BgSwatch, QrStyle } from "../_lib/types";
import { CanvasTabs } from "./CanvasTabs";
import { CanvasStage } from "./CanvasStage";
import { VariantsStrip } from "./VariantsStrip";

type Props = {
  activeTab: number;
  onSelectTab: (i: number) => void;
  formatIdx: number;
  format: Format;
  bg: BgSwatch;
  qrStyle: QrStyle;
  menuUrl: string;
  cta: string;
  desc: string;
  isDarkBg: boolean;
  tableCount: number;
  restaurantName: string;
  svgRef: Ref<SVGSVGElement>;
  onPickStyle: (idx: number) => void;
  onDownloadVariant: (fg: string, bg: string, fmt: "png" | "svg") => void;
};

/**
 * CanvasPanel — colonne droite : tabs + stage + meta + variants strip.
 */
export function CanvasPanel({
  activeTab,
  onSelectTab,
  formatIdx,
  format,
  bg,
  qrStyle,
  menuUrl,
  cta,
  desc,
  isDarkBg,
  tableCount,
  restaurantName,
  svgRef,
  onPickStyle,
  onDownloadVariant,
}: Props) {
  return (
    <div
      className="qr-canvas-panel"
      style={{
        background: "linear-gradient(160deg, hsl(28,15%,15%), hsl(28,15%,9%))",
        borderRadius: 16,
        padding: 36,
        minHeight: 700,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,.04) 1px, transparent 0)",
          backgroundSize: "16px 16px",
        }}
      />

      <CanvasTabs activeTab={activeTab} onSelect={onSelectTab} />

      <CanvasStage
        activeTab={activeTab}
        formatIdx={formatIdx}
        format={format}
        bg={bg}
        qrStyle={qrStyle}
        menuUrl={menuUrl}
        cta={cta}
        desc={desc}
        isDarkBg={isDarkBg}
        tableCount={tableCount}
        restaurantName={restaurantName}
        svgRef={svgRef}
      />

      <div
        className="font-mono"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 8px",
          marginTop: 24,
          fontSize: 10,
          letterSpacing: ".06em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,.4)",
        }}
      >
        <span>{format.label}</span>
        <span>חוצץ שולחן · דו-צדדי</span>
        <span>CMYK · 350gsm</span>
      </div>

      <VariantsStrip onPickStyle={onPickStyle} onDownload={onDownloadVariant} />
    </div>
  );
}
