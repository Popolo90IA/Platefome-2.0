"use client";

import { QR_STYLES, QR_VARIANTS } from "../_lib/constants";

type Props = {
  onPickStyle: (idx: number) => void;
  onDownload: (fg: string, bg: string, fmt: "png" | "svg") => void;
};

/**
 * VariantsStrip — strip 4 variantes QR téléchargeables (en bas du canvas).
 */
export function VariantsStrip({ onPickStyle, onDownload }: Props) {
  return (
    <div
      className="qr-variants"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 14,
        marginTop: 28,
        position: "relative",
        zIndex: 1,
      }}
    >
      {QR_VARIANTS.map((v, i) => (
        <button
          key={v.label}
          onClick={() =>
            onPickStyle(i < QR_STYLES.length ? i : QR_STYLES.length - 1)
          }
          title={`החל סגנון: ${v.label}`}
          style={{
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 12,
            padding: 16,
            textAlign: "center",
            cursor: "pointer",
            transition: "all .15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,.09)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,.04)";
          }}
        >
          <div
            style={{
              aspectRatio: "1",
              background: v.bg,
              borderRadius: 8,
              padding: 10,
              boxSizing: "border-box",
              marginBottom: 10,
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg viewBox="0 0 24 24" width="100%" height="100%">
              <rect x="2" y="2" width="6" height="6" fill={v.fg} />
              <rect x="16" y="2" width="6" height="6" fill={v.fg} />
              <rect x="2" y="16" width="6" height="6" fill={v.fg} />
              <rect x="10" y="2" width="2" height="2" fill={v.fg} />
              <rect x="14" y="6" width="2" height="2" fill={v.fg} />
              <rect x="10" y="10" width="3" height="3" fill="hsl(28,62%,42%)" />
              <rect x="16" y="10" width="2" height="2" fill={v.fg} />
              <rect x="20" y="10" width="2" height="2" fill={v.fg} />
              <rect x="10" y="16" width="2" height="2" fill={v.fg} />
              <rect x="14" y="14" width="2" height="2" fill={v.fg} />
              <rect x="18" y="16" width="2" height="2" fill={v.fg} />
              <rect x="14" y="20" width="2" height="2" fill={v.fg} />
              <rect x="20" y="20" width="2" height="2" fill={v.fg} />
            </svg>
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: 10,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.7)",
            }}
          >
            {v.label}
            <span
              style={{
                display: "block",
                marginTop: 3,
                fontSize: 9,
                color: "rgba(255,255,255,.4)",
              }}
            >
              {v.size}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload(v.fg, v.bg, i % 2 === 0 ? "png" : "svg");
            }}
            title="הורד"
            style={{
              marginTop: 8,
              padding: "4px 10px",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,.15)",
              background: "rgba(255,255,255,.06)",
              color: "rgba(255,255,255,.6)",
              fontSize: 9,
              cursor: "pointer",
              letterSpacing: ".05em",
            }}
          >
            הורד
          </button>
        </button>
      ))}
    </div>
  );
}
