"use client";

import { Ref } from "react";
import { LogoMark } from "@/components/brand";
import { QRCode } from "@/components/ui/qr-code";
import type { BgSwatch, QrStyle } from "../../_lib/types";
import type { StageStyling } from "./_styling";

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
  const {
    cardW,
    cardH,
    isLandscape,
    isCoaster,
    qrSize,
    textColor,
    subtitleColor,
    accentColor,
  } = styling;

  return (
    <div
      style={{
        perspective: 1400,
        width: cardW,
        height: cardH,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: -8,
          left: "8%",
          right: "8%",
          height: 16,
          background:
            "radial-gradient(ellipse, rgba(0,0,0,.4), transparent 70%)",
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
          <>
            <LogoMark size={28} variant={isDarkBg ? "dark" : "light"} />
            <div
              style={{
                width: qrSize,
                height: qrSize,
                background: qrStyle.bg,
                borderRadius: 10,
                padding: 10,
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            >
              {menuUrl && (
                <QRCode
                  ref={svgRef}
                  value={menuUrl}
                  size={qrSize - 20}
                  fgColor={qrStyle.fg}
                  bgColor={qrStyle.bg}
                  errorCorrectionLevel="H"
                />
              )}
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: 8,
                letterSpacing: ".16em",
                color: subtitleColor,
                textTransform: "uppercase",
              }}
            >
              {cta}
            </div>
          </>
        )}

        {!isCoaster && !isLandscape && (
          <div style={{ marginBottom: 10 }}>
            <LogoMark size={32} variant={isDarkBg ? "dark" : "light"} />
          </div>
        )}
        {!isCoaster && !isLandscape && (
          <div style={{ marginBottom: 14 }}>
            <div
              className="font-display"
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".26em",
                color: textColor,
                marginBottom: 3,
              }}
            >
              PLATE
              <em
                style={{
                  fontStyle: "italic",
                  color: accentColor,
                  fontWeight: 400,
                }}
              >
                FORM
              </em>
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: 8,
                letterSpacing: ".2em",
                color: subtitleColor,
              }}
            >
              EVERY DISH · IN 360°
            </div>
          </div>
        )}

        {!isCoaster && (
          <div
            style={{
              width: qrSize,
              height: qrSize,
              background: qrStyle.bg,
              borderRadius: 12,
              padding: 12,
              boxSizing: "border-box",
              boxShadow: "0 6px 20px -8px rgba(0,0,0,.2)",
              marginBottom: isLandscape ? 0 : 14,
              flexShrink: 0,
            }}
          >
            {menuUrl && (
              <QRCode
                ref={svgRef}
                value={menuUrl}
                size={qrSize - 24}
                fgColor={qrStyle.fg}
                bgColor={qrStyle.bg}
                errorCorrectionLevel="H"
              />
            )}
          </div>
        )}

        {!isCoaster && (
          <div style={{ flex: isLandscape ? 1 : "unset" }}>
            <div
              className="font-display"
              style={{
                fontStyle: "italic",
                fontSize: isLandscape ? 16 : 18,
                color: textColor,
                lineHeight: 1.1,
                marginBottom: 5,
              }}
            >
              {cta.split(" ").map((word, wi, arr) =>
                wi === arr.length - 1 ? (
                  <em key={wi} style={{ color: accentColor }}>
                    {word}
                  </em>
                ) : (
                  <span key={wi}>{word} </span>
                )
              )}
            </div>
            <div
              className="font-sans"
              style={{
                fontSize: 10.5,
                color: subtitleColor,
                lineHeight: 1.4,
              }}
            >
              {desc}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
