"use client";

import { BRONZE_GRADIENT, BRONZE_GRADIENT_ICON, QR_CARD_BG, QR_SIZE } from "../_lib/constants";
import { DecorativeQR } from "./DecorativeQR";

interface Props {
  qrSrc?: string;
}

/**
 * QrColumn — colonne droite : label SCAN ME + QR card + logo central + texte.
 */
export function QrColumn({ qrSrc }: Props) {
  return (
    <div
      className="hero-showcase-col"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 14,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "hsl(28,62%,38%)",
          fontWeight: 600,
        }}
      >
        SCAN ME
      </span>

      <div
        style={{
          position: "relative",
          padding: 12,
          background: QR_CARD_BG,
          border: "1px solid hsl(28,62%,42%,.3)",
          borderRadius: 16,
          boxShadow:
            "0 14px 32px -10px hsl(28,62%,28%,.25), inset 0 1px 0 hsl(36,80%,98%,.8)",
        }}
      >
        {qrSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={qrSrc}
            alt="QR · scan to view in AR"
            width={QR_SIZE}
            height={QR_SIZE}
            style={{
              display: "block",
              width: QR_SIZE,
              height: QR_SIZE,
              objectFit: "contain",
            }}
          />
        ) : (
          <DecorativeQR size={QR_SIZE} />
        )}

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 30,
            height: 30,
            borderRadius: 7,
            background: BRONZE_GRADIENT_ICON,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 0 3px hsl(38,34%,96%)",
          }}
        >
          <svg width={20} height={20} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="50" cy="50" r="46" fill="none" stroke="hsl(38,80%,88%)" strokeWidth="5"/>
            <circle cx="50" cy="50" r="38" fill="none" stroke="hsl(38,80%,88%)" strokeWidth="2" opacity="0.5"/>
            <text x="50" y="68" fontFamily="Cormorant Garamond,Georgia,serif" fontSize="58" fontStyle="italic" fontWeight="600" textAnchor="middle" fill="hsl(38,80%,88%)">P</text>
          </svg>
        </div>
      </div>

      <p
        style={{
          fontFamily: "var(--font-hebrew)",
          fontSize: ".95rem",
          fontStyle: "italic",
          color: "hsl(24,18%,16%)",
          lineHeight: 1.3,
          margin: 0,
          textAlign: "right",
        }}
      >
        סרוק עכשיו
        <br />
        לחווייה{" "}
        <em
          style={{
            fontStyle: "italic",
            background: BRONZE_GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          מלאה
        </em>
      </p>
    </div>
  );
}
