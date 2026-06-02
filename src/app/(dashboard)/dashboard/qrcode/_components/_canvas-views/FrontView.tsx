"use client";

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
}

/**
 * FrontView — tab 1 : carte face avant (קדמי) sans inclinaison.
 */
export function FrontView({
  styling,
  bg,
  qrStyle,
  menuUrl,
  cta,
  desc,
  isDarkBg,
}: Props) {
  const { cardW, cardH, isCoaster, qrSize, textColor, subtitleColor } =
    styling;

  return (
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
      <LogoMark
        size={isCoaster ? 26 : 34}
        variant={isDarkBg ? "dark" : "light"}
      />
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
  );
}
