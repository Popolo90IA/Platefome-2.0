"use client";

import { QRCode } from "@/components/ui/qr-code";
import { MAX_PRINT_GRID } from "../../_lib/constants";
import type { BgSwatch, QrStyle } from "../../_lib/types";
import type { StageStyling } from "./_styling";

interface Props {
  styling: StageStyling;
  bg: BgSwatch;
  qrStyle: QrStyle;
  menuUrl: string;
  tableCount: number;
}

/**
 * PrintGridView — tab 3 : grille de QR par table pour impression.
 */
export function PrintGridView({
  styling,
  bg,
  qrStyle,
  menuUrl,
  tableCount,
}: Props) {
  const { subtitleColor } = styling;

  return (
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
          (_, i) => i + 1
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
  );
}
