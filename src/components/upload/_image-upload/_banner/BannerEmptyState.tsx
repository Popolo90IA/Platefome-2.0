"use client";

import { Loader2, ImageIcon } from "lucide-react";

/* ── BannerEmptyState — uploading spinner or drop-zone prompt ── */
export function BannerEmptyState({ uploading }: { uploading: boolean }) {
  return (
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
  );
}
