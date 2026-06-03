"use client";

import type { ImageUploadController } from "./useImageUpload";

/* ── UploadInput — hidden file input + error message (shared) ── */
export function UploadInput({ ctrl }: { ctrl: ImageUploadController }) {
  return (
    <>
      <input
        ref={ctrl.inputRef}
        id={ctrl.inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={ctrl.handleInputChange}
        disabled={ctrl.uploading}
        className="hidden"
      />
      {ctrl.error && <p className="text-sm text-destructive">{ctrl.error}</p>}
    </>
  );
}
