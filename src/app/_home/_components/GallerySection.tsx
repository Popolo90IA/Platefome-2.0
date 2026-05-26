"use client";

import { GALLERY_CATEGORIES, GALLERY_DISHES } from "../_lib/constants";
import type { GalleryDish } from "../_lib/types";

type GallerySectionProps = {
  onSelectDish: (dish: GalleryDish) => void;
};

/**
 * GallerySection — section #gallery (header + filtres + grid 6 plats).
 * Click sur une card → onSelectDish (ouvre la modal détaillée).
 */
export function GallerySection({ onSelectDish }: GallerySectionProps) {
  return (
    <section
      id="gallery"
      style={{
        padding: "120px 0 140px",
        background: "hsl(38,28%,94%)",
        borderTop: "1px solid hsl(30,18%,86%)",
        scrollMarginTop: 80,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 300,
          background:
            "radial-gradient(ellipse,hsl(28,62%,42%,.05) 0%,transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 24px",
          direction: "rtl",
        }}
      >
        {/* Header centré */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "hsl(28,62%,42%,.08)",
              border: "1px solid hsl(28,62%,42%,.18)",
              borderRadius: 99,
              padding: "6px 18px",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "hsl(28,62%,42%)",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".1em",
                textTransform: "uppercase" as const,
                color: "hsl(28,62%,42%)",
              }}
            >
              הגלריה
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(2.2rem,4.5vw,3.5rem)",
              fontWeight: 700,
              color: "hsl(24,18%,16%)",
              lineHeight: 1.05,
              letterSpacing: "-.02em",
              margin: "0 0 16px",
            }}
          >
            כל מנה,{" "}
            <em style={{ color: "hsl(28,62%,42%)", fontStyle: "italic" }}>
              בשלושה ממדים
            </em>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "1rem",
              color: "hsl(24,12%,38%)",
              maxWidth: 420,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            הלקוחות רואים את המנה לפני שמזמינים. AR תואם iPhone ו-Android, ללא
            אפליקציה.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginBottom: 48,
            flexWrap: "wrap" as const,
          }}
        >
          {GALLERY_CATEGORIES.map((t, ti) => (
            <div
              key={t}
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".85rem",
                fontWeight: ti === 0 ? 600 : 400,
                padding: "8px 18px",
                borderRadius: 99,
                border: `1px solid ${
                  ti === 0 ? "hsl(28,62%,42%)" : "hsl(30,18%,82%,.5)"
                }`,
                background: ti === 0 ? "hsl(28,62%,42%,.1)" : "transparent",
                color: ti === 0 ? "hsl(28,62%,42%)" : "hsl(28,8%,55%)",
                cursor: "pointer",
              }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* Cards grid */}
        <div
          className="gallery-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 20,
          }}
        >
          {GALLERY_DISHES.map((d, i) => (
            <div
              key={d.name}
              className="reveal"
              data-delay={String((i % 3) * 80)}
              onClick={() => onSelectDish(d)}
              style={{
                background: "hsl(38,30%,97%)",
                border: "1px solid hsl(30,18%,82%,.5)",
                borderRadius: 16,
                overflow: "hidden",
                cursor: "pointer",
                transition:
                  "border-color .25s, transform .25s, box-shadow .25s",
              }}
              onMouseOver={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "hsl(28,62%,42%,.3)";
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 16px 40px rgba(0,0,0,.4)";
              }}
              onMouseOut={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "hsl(30,18%,82%,.5)";
                el.style.transform = "";
                el.style.boxShadow = "";
              }}
            >
              {/* Image */}
              <div
                style={{
                  height: 220,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.img}
                  alt={d.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform .6s cubic-bezier(.16,1,.3,1)",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.06)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  loading="lazy"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg,transparent 50%,hsl(24,18%,16%,.4) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    padding: "4px 10px",
                    background: "hsl(38,28%,94%,.85)",
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${d.badgeColor.replace(")", ", .3)")}`,
                    borderRadius: 99,
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    color: d.badgeColor,
                  }}
                >
                  {d.badge}
                </div>
              </div>
              {/* Info */}
              <div style={{ padding: "16px 18px 20px", direction: "rtl" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "hsl(24,18%,16%)",
                    }}
                  >
                    {d.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "hsl(28,62%,42%)",
                    }}
                  >
                    {d.price}
                  </span>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    background: "hsl(36,22%,92%)",
                    border: "1px solid hsl(30,18%,80%)",
                    borderRadius: 99,
                    padding: "2px 10px",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 11,
                    color: "hsl(28,8%,50%)",
                  }}
                >
                  {d.cat}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={{ textAlign: "center", marginTop: 56 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "'DM Sans',sans-serif",
              fontSize: ".82rem",
              color: "hsl(28,8%,40%)",
            }}
          >
            <div
              style={{
                height: 1,
                width: 48,
                background: "hsl(30,18%,82%,.5)",
              }}
            />
            מודלים תלת-מימדיים · GLTF/GLB · פורמטים שלנו
            <div
              style={{
                height: 1,
                width: 48,
                background: "hsl(30,18%,82%,.5)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
