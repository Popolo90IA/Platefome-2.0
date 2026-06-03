"use client";

import Image from "next/image";

/* ── PhotoStrip — 360° thumbnail row, active outline ── */
export function PhotoStrip({
  photos,
  activePhoto,
  onPhoto,
}: {
  photos: string[];
  activePhoto: number;
  onPhoto: (i: number) => void;
}) {
  return (
    <div
      className="dish-fade-b"
      style={{ display: "flex", gap: 10, marginTop: 14, overflowX: "auto", paddingBottom: 4 }}
    >
      {photos.map((src, i) => (
        <button
          key={i}
          onClick={() => onPhoto(i)}
          style={{
            flexShrink: 0,
            width: 72,
            height: 72,
            borderRadius: 10,
            overflow: "hidden",
            border: `2px solid ${i === activePhoto ? "hsl(36,28%,92%)" : "hsl(var(--line))"}`,
            cursor: "pointer",
            padding: 0,
            background: "hsl(var(--abyss))",
            transition: "border-color .2s",
            position: "relative",
          }}
        >
          <Image src={src} alt={`תמונה ${i + 1}`} fill sizes="72px" style={{ objectFit: "cover" }} />
        </button>
      ))}
    </div>
  );
}
