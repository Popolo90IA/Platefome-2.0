"use client";

import { Upload, X } from "lucide-react";

/* ── BannerHeader — label + replace/remove actions (when image set) ── */
export function BannerHeader({
  label,
  hasImage,
  inputId,
  onRemove,
}: {
  label: string;
  hasImage: boolean;
  inputId: string;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium">{label}</p>
      {hasImage && (
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
            onClick={onRemove}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white hover:opacity-90 transition-opacity"
            style={{ background: "hsl(var(--ember))" }}
          >
            <X className="h-3 w-3" />
            הסר
          </button>
        </div>
      )}
    </div>
  );
}
