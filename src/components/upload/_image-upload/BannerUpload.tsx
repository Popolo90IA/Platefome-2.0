"use client";

import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { UploadInput } from "./UploadInput";
import type { ImageUploadController } from "./useImageUpload";

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
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{label}</p>
        {currentImage && (
          <div className="flex gap-2">
            <label
              htmlFor={inputId}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white cursor-pointer hover:opacity-90 transition-opacity"
              style={{ background: "var(--grad-bronze)" }}
            >
              <Upload className="h-3 w-3" />
              החלף
            </label>
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white hover:opacity-90 transition-opacity"
              style={{ background: "hsl(var(--ember))" }}
            >
              <X className="h-3 w-3" />
              הסר
            </button>
          </div>
        )}
      </div>

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

        {/* Content overlay: logo + name, exactly like the real menu */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 text-center gap-2.5 px-4">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="logo"
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid hsl(28,62%,52%,.5)",
                boxShadow: "0 0 0 3px hsl(28,62%,52%,.15)",
              }}
            />
          ) : (
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "var(--grad-bronze)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid hsl(28,62%,52%,.4)",
              }}
            >
              <span style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>
                {restaurantName?.charAt(0) ?? "?"}
              </span>
            </div>
          )}
          <div>
            <div
              style={{
                color: "hsl(36,30%,82%)",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: ".01em",
              }}
            >
              {restaurantName || "שם המסעדה"}
            </div>
            <div
              style={{
                color: "hsl(28,62%,52%)",
                fontSize: 10,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              EVERY DISH · IN 360°
            </div>
          </div>
        </div>

        {/* Empty state: drop zone prompt */}
        {!currentImage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
            {uploading ? (
              <>
                <Loader2
                  className="h-8 w-8 animate-spin"
                  style={{ color: "rgba(255,255,255,.3)" }}
                />
                <span className="text-sm" style={{ color: "rgba(255,255,255,.5)" }}>
                  מעלה...
                </span>
              </>
            ) : (
              <>
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,.08)",
                    border: "1px solid rgba(255,255,255,.15)",
                  }}
                >
                  <ImageIcon className="h-5 w-5" style={{ color: "hsl(28,62%,52%)" }} />
                </div>
                <div>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,.85)", fontWeight: 500 }}
                  >
                    גרור תמונה לכאן, או{" "}
                    <span style={{ color: "hsl(28,62%,52%)" }}>בחר קובץ</span>
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,.4)" }}
                  >
                    JPG, PNG, WebP · עד 5MB · מומלץ 1920×600
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* "כך זה נראה" label — top right corner */}
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
