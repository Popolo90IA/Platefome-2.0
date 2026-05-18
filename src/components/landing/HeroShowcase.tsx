"use client";

import React from "react";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(
  () => import("@/components/appetite/HeroCanvas").then(m => m.HeroCanvas),
  { ssr: false }
);

interface HeroShowcaseProps {
  models: { url: string; label: string }[];
  modelIdx: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
  /** URL d'un QR pré-généré dans /public/brand/, ou null pour fallback SVG décoratif */
  qrSrc?: string;
}

/**
 * HeroShowcase — Présentoir 3D inspiré du mockup Gemini.
 *
 * Layout 3 colonnes (desktop) / stack (mobile) dans une carte crème dorée :
 *   ┌──────────────────────────────────────────────────────┐
 *   │  [AR icon]        [   3D MODEL    ]      [QR code]  │
 *   │  Scan QR pour                              SCAN ME  │
 *   │  voir en 3D AR                                      │
 *   └──────────────────────────────────────────────────────┘
 *           ↓ chevron bas (scroll cue)
 */
export function HeroShowcase({
  models,
  modelIdx,
  onPrev,
  onNext,
  onSelect,
  qrSrc,
}: HeroShowcaseProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1080,
        margin: "0 auto",
        position: "relative",
        direction: "rtl",
      }}
    >
      {/* ─── Carte présentoir ─────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          background:
            "linear-gradient(135deg, hsl(38,34%,96%) 0%, hsl(36,26%,91%) 55%, hsl(34,22%,88%) 100%)",
          border: "1px solid hsl(28,62%,42%,.22)",
          borderRadius: 28,
          padding: "clamp(28px, 4vw, 56px) clamp(20px, 3.5vw, 48px)",
          boxShadow:
            "0 28px 80px -24px hsl(28,62%,28%,.28), 0 2px 0 hsl(36,30%,98%,.6) inset, 0 -1px 0 hsl(28,62%,38%,.08) inset",
          overflow: "hidden",
        }}
      >
        {/* Halo radial doré derrière le modèle */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 55%, hsl(28,62%,42%,.10) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* Fines lignes décoratives haut/bas */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 14,
            left: 24,
            right: 24,
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, hsl(28,62%,42%,.35) 50%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 14,
            left: 24,
            right: 24,
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, hsl(28,62%,42%,.35) 50%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Coins dorés (cadre style musée) */}
        {[
          { top: 6, left: 6, rot: 0 },
          { top: 6, right: 6, rot: 90 },
          { bottom: 6, right: 6, rot: 180 },
          { bottom: 6, left: 6, rot: 270 },
        ].map((c, i) => (
          <span
            key={i}
            aria-hidden
            style={{
              position: "absolute",
              ...(c.top !== undefined ? { top: c.top } : {}),
              ...(c.bottom !== undefined ? { bottom: c.bottom } : {}),
              ...(c.left !== undefined ? { left: c.left } : {}),
              ...(c.right !== undefined ? { right: c.right } : {}),
              width: 18,
              height: 18,
              borderTop: "1.5px solid hsl(28,62%,42%,.5)",
              borderLeft: "1.5px solid hsl(28,62%,42%,.5)",
              transform: `rotate(${c.rot}deg)`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* ─── Grille 3 colonnes ───────────────────────────────── */}
        <div
          className="hero-showcase-grid"
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "minmax(180px, 1fr) minmax(320px, 2.2fr) minmax(180px, 1fr)",
            gap: "clamp(16px, 2.5vw, 32px)",
            alignItems: "center",
          }}
        >
          {/* ─── COL GAUCHE : AR ─────────────────────────────── */}
          <div
            className="hero-showcase-col"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            {/* Badge AR */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                background: "hsl(28,62%,42%,.10)",
                border: "1px solid hsl(28,62%,42%,.28)",
                borderRadius: 99,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "hsl(28,62%,42%)",
                  boxShadow: "0 0 8px hsl(28,62%,42%,.6)",
                  animation: "showcasePulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "hsl(28,62%,38%)",
                  fontWeight: 600,
                }}
              >
                AR · LIVE
              </span>
            </div>

            {/* Icône téléphone + AR */}
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background:
                  "linear-gradient(135deg, hsl(28,62%,42%) 0%, hsl(22,70%,50%) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 10px 28px -8px hsl(28,62%,38%,.45), inset 0 1px 0 hsl(36,80%,80%,.4)",
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="2" width="14" height="20" rx="2.5" />
                <path d="M12 18h.01" />
                <path d="M9 6h6" />
              </svg>
            </div>

            {/* Titre + sous-titre */}
            <div>
              <h3
                style={{
                  fontFamily:
                    "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: "clamp(1.25rem, 1.6vw, 1.6rem)",
                  fontWeight: 600,
                  color: "hsl(24,18%,16%)",
                  lineHeight: 1.15,
                  margin: 0,
                  letterSpacing: "-.01em",
                }}
              >
                סרוק לצפייה{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    background:
                      "linear-gradient(135deg, hsl(28,62%,38%) 0%, hsl(22,70%,50%) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  בתלת מימד
                </em>
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: ".85rem",
                  color: "hsl(24,12%,38%)",
                  lineHeight: 1.55,
                  margin: "8px 0 0",
                }}
              >
                המנה קופצת מתוך השולחן.<br />
                ללא אפליקציה. ללא הורדה.
              </p>
            </div>

            {/* Mini specs */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                marginTop: 4,
              }}
            >
              {[
                { label: "טעינה", value: "<0.8s" },
                { label: "WebXR", value: "iOS · Android" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 10,
                    letterSpacing: ".08em",
                    color: "hsl(24,12%,42%)",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "hsl(28,62%,42%,.5)",
                    }}
                  />
                  <span style={{ opacity: 0.6 }}>{s.label}</span>
                  <span style={{ color: "hsl(24,18%,18%)", fontWeight: 600 }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── COL CENTRE : 3D MODEL ───────────────────────── */}
          <div
            style={{
              position: "relative",
              width: "100%",
              minHeight: 360,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HeroCanvas modelUrl={models[modelIdx].url} />

            {/* Flèche gauche */}
            <button
              onClick={onPrev}
              aria-label="מודל קודם"
              style={{
                position: "absolute",
                left: 4,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "hsl(38,30%,97%,.92)",
                border: "1px solid hsl(28,62%,42%,.25)",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all .2s",
                boxShadow: "0 4px 14px hsl(28,62%,38%,.15)",
              }}
              onMouseOver={(e) => {
                const b = e.currentTarget;
                b.style.background = "hsl(38,32%,99%)";
                b.style.borderColor = "hsl(28,62%,42%,.5)";
                b.style.transform = "translateY(-50%) scale(1.08)";
              }}
              onMouseOut={(e) => {
                const b = e.currentTarget;
                b.style.background = "hsl(38,30%,97%,.92)";
                b.style.borderColor = "hsl(28,62%,42%,.25)";
                b.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="hsl(28,62%,38%)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Flèche droite */}
            <button
              onClick={onNext}
              aria-label="מודל הבא"
              style={{
                position: "absolute",
                right: 4,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "hsl(38,30%,97%,.92)",
                border: "1px solid hsl(28,62%,42%,.25)",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all .2s",
                boxShadow: "0 4px 14px hsl(28,62%,38%,.15)",
              }}
              onMouseOver={(e) => {
                const b = e.currentTarget;
                b.style.background = "hsl(38,32%,99%)";
                b.style.borderColor = "hsl(28,62%,42%,.5)";
                b.style.transform = "translateY(-50%) scale(1.08)";
              }}
              onMouseOut={(e) => {
                const b = e.currentTarget;
                b.style.background = "hsl(38,30%,97%,.92)";
                b.style.borderColor = "hsl(28,62%,42%,.25)";
                b.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="hsl(28,62%,38%)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Dots indicateurs */}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 7,
                zIndex: 10,
              }}
            >
              {models.map((_, i) => (
                <button
                  key={i}
                  onClick={() => onSelect(i)}
                  aria-label={`מודל ${i + 1}`}
                  style={{
                    width: i === modelIdx ? 22 : 6,
                    height: 6,
                    borderRadius: 99,
                    background:
                      i === modelIdx
                        ? "linear-gradient(90deg, hsl(28,62%,38%), hsl(22,70%,50%))"
                        : "hsl(28,62%,42%,.25)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all .35s cubic-bezier(.16,1,.3,1)",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* ─── COL DROITE : QR CODE ────────────────────────── */}
          <div
            className="hero-showcase-col"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 14,
            }}
          >
            {/* Label en haut du QR */}
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 10,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "hsl(28,62%,38%)",
                fontWeight: 600,
              }}
            >
              SCAN ME
            </span>

            {/* QR Card */}
            <div
              style={{
                position: "relative",
                padding: 12,
                background:
                  "linear-gradient(135deg, hsl(38,34%,98%), hsl(36,26%,93%))",
                border: "1px solid hsl(28,62%,42%,.3)",
                borderRadius: 16,
                boxShadow:
                  "0 14px 32px -10px hsl(28,62%,28%,.25), inset 0 1px 0 hsl(36,80%,98%,.8)",
              }}
            >
              {qrSrc ? (
                <img
                  src={qrSrc}
                  alt="QR · scan to view in AR"
                  width={120}
                  height={120}
                  style={{
                    display: "block",
                    width: 120,
                    height: 120,
                    objectFit: "contain",
                  }}
                />
              ) : (
                // Fallback : QR décoratif SVG (pixel art)
                <DecorativeQR size={120} />
              )}

              {/* Logo dans le QR */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: 30,
                  height: 30,
                  borderRadius: 7,
                  background:
                    "linear-gradient(135deg, hsl(28,62%,42%) 0%, hsl(22,70%,50%) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 0 3px hsl(38,34%,96%)",
                }}
              >
                <img
                  src="/brand/cloche.png"
                  width={20}
                  height={13}
                  alt=""
                  style={{
                    objectFit: "contain",
                    filter: "brightness(1.6) saturate(0.4)",
                  }}
                />
              </div>
            </div>

            {/* Texte sous QR */}
            <p
              style={{
                fontFamily:
                  "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: ".95rem",
                fontStyle: "italic",
                color: "hsl(24,18%,16%)",
                lineHeight: 1.3,
                margin: 0,
                textAlign: "right",
              }}
            >
              סרוק עכשיו<br />
              לחווייה{" "}
              <em
                style={{
                  fontStyle: "italic",
                  background:
                    "linear-gradient(135deg, hsl(28,62%,38%) 0%, hsl(22,70%,50%) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                מלאה
              </em>
            </p>
          </div>
        </div>

        {/* ─── Label modèle (bas de carte) ─────────────────────── */}
        <div
          style={{
            position: "relative",
            marginTop: 24,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 20px",
              background: "hsl(38,34%,96%,.7)",
              border: "1px solid hsl(28,62%,42%,.18)",
              borderRadius: 99,
              backdropFilter: "blur(10px)",
            }}
          >
            <span
              style={{
                fontFamily:
                  "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: ".95rem",
                color: "hsl(24,18%,16%)",
                fontStyle: "italic",
              }}
            >
              {models[modelIdx].label}
            </span>
            <span
              style={{
                width: 1,
                height: 14,
                background: "hsl(28,62%,42%,.25)",
              }}
            />
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "hsl(22,70%,50%)",
                boxShadow: "0 0 8px hsl(22,70%,50%,.6)",
                animation: "showcasePulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 10,
                letterSpacing: ".18em",
                color: "hsl(24,12%,38%)",
                textTransform: "uppercase",
              }}
            >
              גרור לסיבוב
            </span>
          </div>
        </div>
      </div>

      {/* ─── Chevron bas (scroll cue) ───────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "hsl(38,30%,97%,.7)",
            border: "1px solid hsl(28,62%,42%,.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "showcaseBounce 2.2s ease-in-out infinite",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="hsl(28,62%,38%)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* ─── Animations + responsive ──────────────────────────── */}
      <style jsx>{`
        @keyframes showcasePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes showcaseBounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%      { transform: translateY(6px); opacity: 1; }
        }
        @media (max-width: 900px) {
          .hero-showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .hero-showcase-col {
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ─── QR décoratif (fallback si pas d'image dans /brand/) ─── */
function DecorativeQR({ size = 120 }: { size?: number }) {
  // Pattern QR-like statique (12x12) — non scannable mais visuellement crédible.
  const pattern = [
    "111111101011111111",
    "100000101000000001",
    "101110100001011101",
    "101110101110011101",
    "101110100100011101",
    "100000101010100001",
    "111111101010101111",
    "000000001011110000",
    "101110111011010011",
    "110001000110101100",
    "001110110001101011",
    "111000101100010100",
    "000000001110101011",
    "111111101001100100",
    "100000101001010011",
    "101110101101101100",
    "101110100111100011",
    "111111101010101111",
  ];
  const cells = pattern.length;
  const cell = size / cells;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "block" }}
    >
      <rect width={size} height={size} fill="hsl(38,34%,98%)" />
      {pattern.map((row, y) =>
        row.split("").map((v, x) =>
          v === "1" ? (
            <rect
              key={`${x}-${y}`}
              x={x * cell}
              y={y * cell}
              width={cell}
              height={cell}
              fill="hsl(24,18%,16%)"
            />
          ) : null
        )
      )}
    </svg>
  );
}
