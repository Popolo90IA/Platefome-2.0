"use client";

import { Upload, X, Loader2, UserCircle2 } from "lucide-react";
import { UploadInput } from "./UploadInput";
import type { ImageUploadController } from "./useImageUpload";

/* ── LogoUpload — circular 96×96 preview variant ── */
export function LogoUpload({
  ctrl,
  currentImage,
  label,
}: {
  ctrl: ImageUploadController;
  currentImage?: string | null;
  label: string;
}) {
  const { uploading, inputId, handleRemove } = ctrl;

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex items-center gap-5">
        {/* Circle preview */}
        <div className="relative flex-shrink-0">
          {currentImage ? (
            <>
              <img
                src={currentImage}
                alt="logo"
                className="h-24 w-24 rounded-full object-cover"
                style={{
                  border: "3px solid hsl(var(--gold) / .35)",
                  boxShadow: "0 0 0 4px hsl(var(--gold) / .08)",
                }}
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center text-white shadow-md transition-transform hover:scale-110"
                style={{ background: "hsl(var(--ember))" }}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <div
              className="h-24 w-24 rounded-full flex items-center justify-center"
              style={{
                background: "hsl(var(--gold) / .08)",
                border: "2px dashed hsl(var(--gold) / .3)",
              }}
            >
              <UserCircle2 className="h-10 w-10 text-muted-foreground/40" />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor={inputId}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all border ${
              uploading ? "opacity-60 pointer-events-none" : "hover:opacity-90"
            } text-white`}
            style={{ background: "var(--grad-bronze)", border: "none" }}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                מעלה...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                {currentImage ? "החלף לוגו" : "העלה לוגו"}
              </>
            )}
          </label>
          <p className="text-xs text-muted-foreground">
            JPG, PNG, WebP · עד 5MB · מומלץ 400×400
          </p>
          {currentImage && (
            <button
              type="button"
              onClick={handleRemove}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors text-right"
            >
              הסר תמונה
            </button>
          )}
        </div>
      </div>
      <UploadInput ctrl={ctrl} />
    </div>
  );
}
