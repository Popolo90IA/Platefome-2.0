"use client";

import { Ref } from "react";
import type { BgSwatch, QrStyle } from "../../_lib/types";
import type { StageStyling } from "./_styling";
import {
  CoasterContent,
  WordmarkHeader,
  QrPanel,
  CtaBlock,
} from "./_tent/parts";

interface Props {
  styling: StageStyling;
  bg: BgSwatch;
  qrStyle: QrStyle;
  menuUrl: string;
  cta: string;
  desc: string;
  isDarkBg: boolean;
  svgRef: Ref<SVGSVGElement>;
}

/**
 * TentView — tab 0 : carte 3D inclinée (tent card) avec ombre + perspective.
 */
export function TentView({
  styling,
  bg,
  qrStyle,
  menuUrl,
  cta,
  desc,
  isDarkBg,
  svgRef,
}: Props) {
  const { cardW, cardH, isLandscape, isCoaster, qrSize } = styling;

  return (
    <div style={{ perspective: 1400, width: cardW, height: cardH, position: "relative" }}>
      <div
        style={{
          position: "absolute",
          bottom: -8,
          left: "8%",
          right: "8%",
          height: 16,
          background: "radial-gradient(ellipse, rgba(0,0,0,.4), transparent 70%)",
          filter: "blur(6px)",
          zIndex: -1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: cardW,
          height: cardH,
          background: bg.bg,
          borderRadius: isCoaster ? "50%" : 6,
          padding: isCoaster ? 20 : isLandscape ? "20px 24px" : "28px 24px",
          boxSizing: "border-box",
          boxShadow:
            "0 30px 60px -20px rgba(0,0,0,.5), 0 60px 120px -40px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.5)",
          transform: "rotateY(-12deg) rotateX(2deg)",
          transformOrigin: "bottom center",
          display: "flex",
          flexDirection: isLandscape ? "row" : "column",
          alignItems: "center",
          justifyContent: isCoaster ? "center" : "flex-start",
          textAlign: "center",
          gap: isLandscape ? 20 : isCoaster ? 8 : 0,
        }}
      >
        {isCoaster && (
          <CoasterContent
            styling={styling}
            qrStyle={qrStyle}
            menuUrl={menuUrl}
            cta={cta}
            isDarkBg={isDarkBg}
            svgRef={svgRef}
          />
        )}

        {!isCoaster && !isLandscape && (
          <WordmarkHeader styling={styling} isDarkBg={isDarkBg} />
        )}

        {!isCoaster && (
          <QrPanel
            qrStyle={qrStyle}
            menuUrl={menuUrl}
            svgRef={svgRef}
            size={qrSize}
            pad={12}
            radius={12}
            shadow="0 6px 20px -8px rgba(0,0,0,.2)"
            marginBottom={isLandscape ? 0 : 14}
          />
        )}

        {!isCoaster && <CtaBlock styling={styling} cta={cta} desc={desc} />}
      </div>
    </div>
  );
}
