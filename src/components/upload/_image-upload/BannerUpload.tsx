"use client";

import { UploadInput } from "./UploadInput";
import type { ImageUploadController } from "./useImageUpload";
import { BannerHeader } from "./_banner/BannerHeader";
import { BannerHeroOverlay } from "./_banner/BannerHeroOverlay";
import { BannerEmptyState } from "./_banner/BannerEmptyState";

/* ── BannerUpload — wide preview simulating the real menu hero ── */
export function BannerUpload({
  ctrl,
  currentImage,
  label,
  previewMeta,
}: {
  ctrl: ImageUploadController;
  currentImage?: string | null;
  label: string;
  previewMeta?: { logoUrl?: string | null; restaurantName?: string };
}) {
  const { uploading, dragOver, setDragOver, inputId, inputRef, handleDrop, handleRemove } =
    ctrl;
  const { logoUrl, restaurantName } = previewMeta ?? {};

  return (
    <div className="space-y-3">
      <BannerHeader
        label={label}
        hasImage={!!currentImage}
        inputId={inputId}
        onRemove={handleRemove}
      />

      {/* ── Preview: simulates the real menu hero header ── */}
      <div
        className={`relative w-full rounded-xl overflow-hidden transition-all ${
          dragOver ? "ring-2 ring-[hsl(var(--gold))]" : ""
        } ${!currentImage ? "cursor-pointer" : ""}`}
        style={{ height: 200 }}
        onClick={() => !uploading && !currentImage && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {/* Dark background layer — always present */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(28,30%,14%) 0%, hsl(28,18%,6%) 100%)",
          }}
        />

        {/* Banner image (darkened, like the real menu) */}
        {currentImage && (
          <img
            src={currentImage}
            alt="banner"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(.4) saturate(.7)", transform: "scale(1.06)" }}
          />
        )}

        {/* Gradient overlay — bottom fade to dark (matches MenuView) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, hsl(28,18%,6%) 0%, transparent 55%)",
          }}
        />

        <BannerHeroOverlay logoUrl={logoUrl} restaurantName={restaurantName} />

        {!currentImage && <BannerEmptyState uploading={uploading} />}

        {/* "תצוגה מקדימה" label — top right corner */}
        <div
          className="absolute top-2.5 left-2.5 text-[10px] px-2 py-1 rounded-full"
          style={{
            background: "rgba(0,0,0,.45)",
            color: "rgba(255,255,255,.55)",
            letterSpacing: ".06em",
          }}
        >
          תצוגה מקדימה
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        הבאנר מוצג כרקע כהה בעמוד התפריט · מומלץ 1920×600
      </p>

      <UploadInput ctrl={ctrl} />
    </div>
  );
}
