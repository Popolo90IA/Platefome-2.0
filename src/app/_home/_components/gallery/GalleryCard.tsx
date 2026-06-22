"use client";

import type { GalleryDish } from "../../_lib/types";

const EASE = "cubic-bezier(.32,.72,0,1)";

/* ── GalleryCard — dish card Double-Bezel (coque hairline + cœur image) ── */
export function GalleryCard({
  dish,
  delay,
  onSelect,
}: {
  dish: GalleryDish;
  delay: number;
  onSelect: () => void;
}) {
  return (
    <div
      className="reveal"
      data-delay={String(delay)}
      role="button"
      tabIndex={0}
      aria-label={`${dish.name} · ${dish.price}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      style={{
        position: "relative",
        padding: 5,
        borderRadius: 20,
        background:
          "linear-gradient(150deg, hsl(var(--white) / .08), hsl(var(--white) / .02))",
        border: "1px solid hsl(var(--white) / .1)",
        boxShadow: "inset 0 1px 0 hsl(var(--white) / .05)",
        cursor: "pointer",
        transition: `transform .5s ${EASE}, border-color .4s ${EASE}, box-shadow .4s ${EASE}`,
        willChange: "transform",
      }}
      onMouseOver={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-6px)";
        el.style.borderColor = "hsl(var(--accent-bright) / .32)";
        el.style.boxShadow = "0 28px 60px -28px rgba(0,0,0,.55)";
        const img = el.querySelector<HTMLImageElement>(".gallery-img");
        if (img) img.style.transform = "scale(1.07)";
      }}
      onMouseOut={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "";
        el.style.borderColor = "hsl(var(--white) / .07)";
        el.style.boxShadow = "inset 0 1px 0 hsl(var(--white) / .04)";
        const img = el.querySelector<HTMLImageElement>(".gallery-img");
        if (img) img.style.transform = "scale(1)";
      }}
    >
      {/* Cœur */}
      <div
        style={{
          position: "relative",
          borderRadius: 15,
          overflow: "hidden",
          background: "hsl(var(--abyss))",
          boxShadow: "inset 0 0 0 1px hsl(var(--white) / .03)",
        }}
      >
        {/* Image */}
        <div style={{ height: 210, overflow: "hidden", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="gallery-img"
            src={dish.img}
            alt={dish.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform .7s cubic-bezier(.16,1,.3,1)",
            }}
            loading="lazy"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, transparent 45%, hsl(24 12% 4% / .6) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 12,
              insetInlineEnd: 12,
              padding: "5px 11px",
              background: "hsl(24 12% 5% / .8)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid hsl(var(--white) / .14)",
              borderRadius: 99,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: ".08em",
              color: dish.badgeColor,
            }}
          >
            {dish.badge}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "15px 18px 18px", direction: "rtl" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 12,
              marginBottom: 9,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "hsl(var(--fog))",
              }}
            >
              {dish.name}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "hsl(var(--accent-bright))",
                letterSpacing: "-.01em",
                flexShrink: 0,
              }}
            >
              {dish.price}
            </span>
          </div>
          <div
            style={{
              display: "inline-block",
              background: "hsl(var(--white) / .04)",
              border: "1px solid hsl(var(--white) / .08)",
              borderRadius: 99,
              padding: "3px 11px",
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: "hsl(var(--dim))",
            }}
          >
            {dish.cat}
          </div>
        </div>
      </div>
    </div>
  );
}
