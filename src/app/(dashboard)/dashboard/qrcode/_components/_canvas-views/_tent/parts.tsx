"use client";

import { Ref } from "react";
import { LogoMark } from "@/components/brand";
import { QRCode } from "@/components/ui/qr-code";
import type { QrStyle } from "../../../_lib/types";
import type { StageStyling } from "../_styling";

/* ── QrPanel — padded QR tile (size/padding configurable) ── */
export function QrPanel({
  qrStyle,
  menuUrl,
  svgRef,
  size,
  pad,
  radius,
  shadow,
  marginBottom,
}: {
  qrStyle: QrStyle;
  menuUrl: string;
  svgRef: Ref<SVGSVGElement>;
  size: number;
  pad: number;
  radius: number;
  shadow?: string;
  marginBottom?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: qrStyle.bg,
        borderRadius: radius,
        padding: pad,
        boxSizing: "border-box",
        boxShadow: shadow,
        marginBottom,
        flexShrink: 0,
      }}
    >
      {menuUrl && (
        <QRCode
          ref={svgRef}
          value={menuUrl}
          size={size - pad * 2}
          fgColor={qrStyle.fg}
          bgColor={qrStyle.bg}
          errorCorrectionLevel="H"
        />
      )}
    </div>
  );
}

/* ── WordmarkHeader — logo + PLATE·FORM + tagline (portrait only) ── */
export function WordmarkHeader({
  styling,
  isDarkBg,
}: {
  styling: StageStyling;
  isDarkBg: boolean;
}) {
  const { textColor, subtitleColor, accentColor } = styling;
  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <LogoMark size={32} variant={isDarkBg ? "dark" : "light"} />
      </div>
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
          <em style={{ fontStyle: "italic", color: accentColor, fontWeight: 400 }}>
            FORM
          </em>
        </div>
        <div
          className="font-mono"
          style={{ fontSize: 8, letterSpacing: ".2em", color: subtitleColor }}
        >
          EVERY DISH · IN 360°
        </div>
      </div>
    </>
  );
}

/* ── CtaBlock — italic CTA (last word accented) + description ── */
export function CtaBlock({
  styling,
  cta,
  desc,
}: {
  styling: StageStyling;
  cta: string;
  desc: string;
}) {
  const { isLandscape, textColor, subtitleColor, accentColor } = styling;
  return (
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
        style={{ fontSize: 10.5, color: subtitleColor, lineHeight: 1.4 }}
      >
        {desc}
      </div>
    </div>
  );
}

/* ── CoasterContent — round coaster layout: logo + QR + cta label ── */
export function CoasterContent({
  styling,
  qrStyle,
  menuUrl,
  cta,
  isDarkBg,
  svgRef,
}: {
  styling: StageStyling;
  qrStyle: QrStyle;
  menuUrl: string;
  cta: string;
  isDarkBg: boolean;
  svgRef: Ref<SVGSVGElement>;
}) {
  const { qrSize, subtitleColor } = styling;
  return (
    <>
      <LogoMark size={28} variant={isDarkBg ? "dark" : "light"} />
      <QrPanel
        qrStyle={qrStyle}
        menuUrl={menuUrl}
        svgRef={svgRef}
        size={qrSize}
        pad={10}
        radius={10}
      />
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
  );
}
