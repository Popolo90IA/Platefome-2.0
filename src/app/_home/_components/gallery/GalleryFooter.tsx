"use client";

/* ── GalleryFooter — note formats (rule lines + text) ── */
export function GalleryFooter() {
  return (
    <div style={{ textAlign: "center", marginTop: 56 }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          fontFamily: "'DM Sans',sans-serif",
          fontSize: ".82rem",
          color: "hsl(var(--subtle))",
        }}
      >
        <div style={{ height: 1, width: 48, background: "hsl(var(--line) / .5)" }} />
        מודלים תלת-מימדיים · GLTF/GLB · פורמטים שלנו
        <div style={{ height: 1, width: 48, background: "hsl(var(--line) / .5)" }} />
      </div>
    </div>
  );
}
