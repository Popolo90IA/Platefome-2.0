"use client";

import { CARD, BG_SWATCHES, QR_STYLES } from "../_lib/constants";

type Props = {
  bgIdx: number;
  qrStyleIdx: number;
  onSelectBg: (i: number) => void;
  onSelectQrStyle: (i: number) => void;
};

/**
 * ColorsPickerCard — sidebar : choix fond carte (BG_SWATCHES) + style QR (QR_STYLES).
 */
export function ColorsPickerCard({
  bgIdx,
  qrStyleIdx,
  onSelectBg,
  onSelectQrStyle,
}: Props) {
  return (
    <div style={CARD}>
      <div
        className="font-sans uppercase"
        style={{
          fontSize: "11.5px",
          letterSpacing: ".05em",
          color: "hsl(var(--subtle))",
          marginBottom: 14,
        }}
      >
        צבעים
      </div>
      <div style={{ marginBottom: 14 }}>
        <span
          className="font-sans uppercase"
          style={{
            fontSize: 11,
            letterSpacing: ".08em",
            color: "hsl(var(--dim))",
            display: "block",
            marginBottom: 6,
          }}
        >
          תבנית
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          {BG_SWATCHES.map((sw, i) => (
            <button
              key={sw.label}
              onClick={() => onSelectBg(i)}
              title={sw.label}
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                cursor: "pointer",
                background: sw.bg,
                border:
                  i === bgIdx
                    ? "2px solid hsl(28,62%,42%)"
                    : sw.border
                      ? "1px solid hsl(var(--line))"
                      : "2px solid transparent",
                boxShadow:
                  i === bgIdx ? "0 0 0 3px hsl(28,62%,42%,.2)" : "none",
                transition: "all .15s",
              }}
            />
          ))}
        </div>
      </div>
      <div>
        <span
          className="font-sans uppercase"
          style={{
            fontSize: 11,
            letterSpacing: ".08em",
            color: "hsl(var(--dim))",
            display: "block",
            marginBottom: 6,
          }}
        >
          סגנון QR
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          {QR_STYLES.map((qs, i) => (
            <button
              key={qs.label}
              onClick={() => onSelectQrStyle(i)}
              title={qs.label}
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                cursor: "pointer",
                background: qs.bg,
                border:
                  i === qrStyleIdx
                    ? "2px solid hsl(28,62%,42%)"
                    : "2px solid transparent",
                display: "grid",
                placeItems: "center",
                transition: "all .15s",
                boxShadow:
                  i === qrStyleIdx ? "0 0 0 3px hsl(28,62%,42%,.25)" : "none",
              }}
            >
              <svg width="22" viewBox="0 0 24 24">
                <rect x="3" y="3" width="6" height="6" fill={qs.fg} />
                <rect x="15" y="3" width="6" height="6" fill={qs.fg} />
                <rect x="3" y="15" width="6" height="6" fill={qs.fg} />
                <rect
                  x="11"
                  y="11"
                  width="3"
                  height="3"
                  fill="hsl(28,62%,42%)"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
