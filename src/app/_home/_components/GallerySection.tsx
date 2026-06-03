"use client";

import { GALLERY_DISHES } from "../_lib/constants";
import type { GalleryDish } from "../_lib/types";
import { GalleryCard } from "./gallery/GalleryCard";
import { GalleryFilters } from "./gallery/GalleryFilters";
import { GalleryFooter } from "./gallery/GalleryFooter";
import { GalleryHeader } from "./gallery/GalleryHeader";

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
        style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", direction: "rtl" }}
      >
        <GalleryHeader />
        <GalleryFilters />

        <div
          className="gallery-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}
        >
          {GALLERY_DISHES.map((d, i) => (
            <GalleryCard
              key={d.name}
              dish={d}
              delay={(i % 3) * 80}
              onSelect={() => onSelectDish(d)}
            />
          ))}
        </div>

        <GalleryFooter />
      </div>
    </section>
  );
}
