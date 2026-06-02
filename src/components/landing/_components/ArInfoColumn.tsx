"use client";

import { BRONZE_GRADIENT, BRONZE_GRADIENT_ICON, MINI_SPECS } from "../_lib/constants";

/**
 * ArInfoColumn — colonne gauche : badge AR + icône téléphone + titre + specs.
 */
export function ArInfoColumn() {
  return (
    <div
      className="hero-showcase-col"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 16,
      }}
    >
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

      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 18,
          background: BRONZE_GRADIENT_ICON,
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

      <div>
        <h3
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
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
              background: BRONZE_GRADIENT,
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
          המנה קופצת מתוך השולחן.
          <br />
          ללא אפליקציה. ללא הורדה.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginTop: 4,
        }}
      >
        {MINI_SPECS.map((s) => (
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
  );
}
