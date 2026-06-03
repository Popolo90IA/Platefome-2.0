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
          color: "hsl(28,8%,40%)",
        }}
      >
        <div style={{ height: 1, width: 48, background: "hsl(30,18%,82%,.5)" }} />
        מודלים תלת-מימדיים · GLTF/GLB · פורמטים שלנו
        <div style={{ height: 1, width: 48, background: "hsl(30,18%,82%,.5)" }} />
      </div>
    </div>
  );
}
