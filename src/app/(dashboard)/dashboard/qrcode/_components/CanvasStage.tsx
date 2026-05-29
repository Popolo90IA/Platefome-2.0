"use client";

import { Ref } from "react";
import { LogoMark } from "@/components/brand";
import { QRCode } from "@/components/ui/qr-code";
import type { Format, BgSwatch, QrStyle } from "../_lib/types";
import { COASTER_IDX, MAX_PRINT_GRID } from "../_lib/constants";

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
 * CanvasStage — affiche le rendu actif (3D tent / קדמי / אחורי / הדפסה).
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
  const cardW = format.width;
  const cardH = format.height;
  const isLandscape = cardW > cardH;
  const isCoaster = formatIdx === COASTER_IDX;
  const qrSize = isCoaster
    ? Math.round(cardW * 0.62)
    : Math.min(cardW, cardH) * 0.5;

  const textColor = isDarkBg ? "#f6f4ef" : "hsl(28,15%,18%)";
  const subtitleColor = isDarkBg ? "rgba(246,244,239,.55)" : "hsl(28,15%,40%)";
  const accentColor = "hsl(28,62%,38%)";

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
                    ),
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
      )}

      {activeTab === 1 && (
        <div
          style={{
            width: cardW,
            height: cardH,
            background: bg.bg,
            borderRadius: isCoaster ? "50%" : 10,
            padding: isCoaster ? 18 : "24px 20px",
            boxSizing: "border-box",
            boxShadow: "0 8px 32px -8px rgba(0,0,0,.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: isCoaster ? "center" : "flex-start",
            textAlign: "center",
            gap: isCoaster ? 8 : 12,
          }}
        >
          <LogoMark size={isCoaster ? 26 : 34} variant={isDarkBg ? "dark" : "light"} />
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
                value={menuUrl}
                size={qrSize - 20}
                fgColor={qrStyle.fg}
                bgColor={qrStyle.bg}
                errorCorrectionLevel="H"
              />
            )}
          </div>
          <div
            className="font-display"
            style={{
              fontStyle: "italic",
              fontSize: isCoaster ? 10 : 18,
              color: textColor,
              lineHeight: 1.2,
            }}
          >
            {cta}
          </div>
          {!isCoaster && (
            <div
              className="font-sans"
              style={{ fontSize: 11, color: subtitleColor }}
            >
              {desc}
            </div>
          )}
        </div>
      )}

      {activeTab === 2 && (
        <div
          style={{
            width: cardW,
            height: cardH,
            background: bg.bg,
            borderRadius: isCoaster ? "50%" : 10,
            padding: isCoaster ? 24 : "28px 24px",
            boxSizing: "border-box",
            boxShadow: "0 8px 32px -8px rgba(0,0,0,.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: isCoaster ? 10 : 16,
          }}
        >
          <LogoMark size={52} variant={isDarkBg ? "dark" : "light"} />
          <div
            className="font-display"
            style={{
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: ".3em",
              color: textColor,
            }}
          >
            PLATE
            <em style={{ fontStyle: "italic", color: accentColor }}>FORM</em>
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: 10,
              letterSpacing: ".2em",
              color: subtitleColor,
              textTransform: "uppercase",
            }}
          >
            EVERY DISH · IN 360°
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: 10,
              color: subtitleColor,
              marginTop: 8,
              direction: "ltr",
            }}
          >
            {restaurantName}
          </div>
        </div>
      )}

      {activeTab === 3 && (
        <div style={{ maxHeight: 520, overflowY: "auto", width: "100%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
              gap: 12,
              padding: 4,
            }}
          >
            {Array.from(
              { length: Math.min(tableCount, MAX_PRINT_GRID) },
              (_, i) => i + 1,
            ).map((n) => (
              <div
                key={n}
                style={{
                  background: bg.bg,
                  borderRadius: 8,
                  padding: 10,
                  boxSizing: "border-box",
                  boxShadow: "0 4px 16px -4px rgba(0,0,0,.35)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    background: qrStyle.bg,
                    borderRadius: 6,
                    padding: 5,
                    boxSizing: "border-box",
                    flexShrink: 0,
                  }}
                >
                  {menuUrl && (
                    <QRCode
                      value={`${menuUrl}?table=${n}`}
                      size={62}
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
                    letterSpacing: ".06em",
                    color: subtitleColor,
                  }}
                >
                  שולחן {n}
                </div>
              </div>
            ))}
            {tableCount > MAX_PRINT_GRID && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,.04)",
                  borderRadius: 8,
                  padding: 10,
                  fontSize: 11,
                  color: "rgba(255,255,255,.4)",
                  fontFamily: "monospace",
                }}
              >
                +{tableCount - MAX_PRINT_GRID} נוספים
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
