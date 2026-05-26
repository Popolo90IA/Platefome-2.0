"use client";

import type { GalleryDish } from "../_lib/types";

type DishDetailModalProps = {
  dish: GalleryDish | null;
  onClose: () => void;
};

/**
 * DishDetailModal — modal détaillée d'un plat de la gallery.
 * Click backdrop → close. Click contenu → stopPropagation.
 * L'écoute de Escape est faite côté HomePage (parent).
 */
export function DishDetailModal({ dish, onClose }: DishDetailModalProps) {
  if (!dish) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "hsl(38,28%,94%,.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        animation: "fadeIn .2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "hsl(36,22%,90%)",
          border: "1px solid hsl(36,28%,92%,.14)",
          borderRadius: 16,
          overflow: "hidden",
          maxWidth: 560,
          width: "100%",
          boxShadow: "0 40px 80px -20px rgba(0,0,0,.9)",
          animation: "slideUp .35s cubic-bezier(.16,1,.3,1)",
          direction: "rtl",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dish.img}
            alt={dish.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top,hsl(36,22%,90%) 0%,transparent 50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              padding: "6px 14px",
              background: "hsl(38,28%,94%,.82)",
              backdropFilter: "blur(8px)",
              border: "1px solid hsl(30,18%,82%,.2)",
              borderRadius: 99,
              fontFamily: "'DM Mono',monospace",
              fontSize: ".625rem",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: dish.badgeColor,
            }}
          >
            {dish.badge}
          </div>

          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "hsl(38,28%,94%,.72)",
              border: "1px solid hsl(30,18%,82%,.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "hsl(var(--pale))",
              transition: "background .2s",
            }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "hsl(38,30%,97%)")
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "hsl(38,28%,94%,.72)")
            }
            aria-label="סגור"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "28px 32px 36px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <h2
              style={{
                fontFamily: "'Noto Serif Hebrew',serif",
                fontWeight: 400,
                fontSize: "1.75rem",
                letterSpacing: "-.03em",
                color: "hsl(var(--cream))",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              {dish.name}
            </h2>
            <span
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 300,
                fontSize: "2rem",
                letterSpacing: "-.04em",
                color: "hsl(var(--gold))",
                whiteSpace: "nowrap",
                lineHeight: 1,
              }}
            >
              {dish.price}
            </span>
          </div>
          <div
            style={{
              width: 40,
              height: 1,
              background: "hsl(30,18%,82%,.2)",
              marginBottom: 16,
            }}
          />
          <p
            style={{
              fontSize: "1.0625rem",
              color: "hsl(var(--subtle))",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            {dish.desc}
          </p>

          <div
            style={{
              marginTop: 28,
              padding: "16px 20px",
              background: "hsl(36,28%,92%,.04)",
              border: "1px solid hsl(36,28%,92%,.08)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "hsl(var(--sage))",
                boxShadow: "0 0 8px hsl(28,62%,42%,.4)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: ".6875rem",
                letterSpacing: ".12em",
                color: "hsl(var(--dim))",
                textTransform: "uppercase",
              }}
            >
              זמין לצפייה בתלת-מימד ו-AR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
