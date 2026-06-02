"use client";

import { Ref } from "react";
import type { BgSwatch, Format, QrStyle } from "../_lib/types";
import { BackView } from "./_canvas-views/BackView";
import { FrontView } from "./_canvas-views/FrontView";
import { PrintGridView } from "./_canvas-views/PrintGridView";
import { TentView } from "./_canvas-views/TentView";
import { computeStageStyling } from "./_canvas-views/_styling";

type Props = {
  activeTab: number;
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
};

/**
 * CanvasStage — orchestrateur : route vers la vue active (tent / front / back / print).
 */
export function CanvasStage({
  activeTab,
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
}: Props) {
  const styling = computeStageStyling(format, formatIdx, isDarkBg);

  return (
    <div
      className="qr-stage"
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: 480,
        position: "relative",
        zIndex: 1,
      }}
    >
      {activeTab === 0 && (
        <TentView
          styling={styling}
          bg={bg}
          qrStyle={qrStyle}
          menuUrl={menuUrl}
          cta={cta}
          desc={desc}
          isDarkBg={isDarkBg}
          svgRef={svgRef}
        />
      )}
      {activeTab === 1 && (
        <FrontView
          styling={styling}
          bg={bg}
          qrStyle={qrStyle}
          menuUrl={menuUrl}
          cta={cta}
          desc={desc}
          isDarkBg={isDarkBg}
        />
      )}
      {activeTab === 2 && (
        <BackView
          styling={styling}
          bg={bg}
          isDarkBg={isDarkBg}
          restaurantName={restaurantName}
        />
      )}
      {activeTab === 3 && (
        <PrintGridView
          styling={styling}
          bg={bg}
          qrStyle={qrStyle}
          menuUrl={menuUrl}
          tableCount={tableCount}
        />
      )}
    </div>
  );
}
