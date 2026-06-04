"use client";

import { GALLERY_CATEGORIES } from "../../_lib/constants";

/* ── GalleryFilters — filter tabs (first = active) ── */
export function GalleryFilters() {
  return (
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
            fontFamily: "var(--font-body)",
            fontSize: ".85rem",
            fontWeight: ti === 0 ? 600 : 400,
            padding: "8px 18px",
            borderRadius: 99,
            border: `1px solid ${
              ti === 0 ? "hsl(var(--accent-bright))" : "hsl(var(--line) / .5)"
            }`,
            background: ti === 0 ? "hsl(var(--accent-bright) / .1)" : "transparent",
            color: ti === 0 ? "hsl(var(--accent-bright))" : "hsl(var(--dim))",
            cursor: "pointer",
          }}
        >
          {t}
        </div>
      ))}
    </div>
  );
}
