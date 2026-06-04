"use client";

import type { GalleryDish } from "../../_lib/types";

/* ── GalleryCard — dish card (image + badge + hover lift) ── */
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
      onClick={onSelect}
      style={{
        background: "hsl(var(--deep))",
        border: "1px solid hsl(var(--line) / .5)",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color .25s, transform .25s, box-shadow .25s",
      }}
      onMouseOver={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "hsl(var(--accent-bright) / .3)";
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 16px 40px rgba(0,0,0,.4)";
      }}
      onMouseOut={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "hsl(var(--line) / .5)";
        el.style.transform = "";
        el.style.boxShadow = "";
      }}
    >
      {/* Image */}
      <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={dish.img}
          alt={dish.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform .6s cubic-bezier(.16,1,.3,1)",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          loading="lazy"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg,transparent 50%,hsl(var(--fog) / .4) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            padding: "4px 10px",
            background: "hsl(var(--void) / .85)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${dish.badgeColor.replace(")", ", .3)")}`,
            borderRadius: 99,
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 11,
            fontWeight: 600,
            color: dish.badgeColor,
          }}
        >
          {dish.badge}
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
              color: "hsl(var(--fog))",
            }}
          >
            {dish.name}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "hsl(var(--accent-bright))",
            }}
          >
            {dish.price}
          </span>
        </div>
        <div
          style={{
            display: "inline-block",
            background: "hsl(var(--abyss))",
            border: "1px solid hsl(var(--line))",
            borderRadius: 99,
            padding: "2px 10px",
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 11,
            color: "hsl(var(--dim))",
          }}
        >
          {dish.cat}
        </div>
      </div>
    </div>
  );
}
