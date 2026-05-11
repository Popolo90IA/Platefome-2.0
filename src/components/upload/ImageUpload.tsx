"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, Loader2, ImageIcon, UserCircle2 } from "lucide-react";
import {
  STORAGE_BUCKET,
  MAX_FILE_SIZE,
  ALLOWED_IMAGE_TYPES,
  type UploadFolder,
} from "@/lib/constants";

interface ImageUploadProps {
  currentImage?: string | null;
  onUploadComplete: (url: string | null) => void;
  folder: UploadFolder;
  label: string;
  /** "logo" → circular 96×96 preview, "banner" → wide preview simulating the real menu hero */
  variant?: "logo" | "banner";
  /** Pass the logo URL + restaurant name so the banner preview looks like the real menu header */
  previewMeta?: { logoUrl?: string | null; restaurantName?: string };
}

export function ImageUpload({
  currentImage,
  onUploadComplete,
  folder,
  label,
  variant,
  previewMeta,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  // Infer variant from folder/label if not supplied
  const mode: "logo" | "banner" =
    variant ?? (label.includes("לוגו") || label.toLowerCase().includes("logo") ? "logo" : "banner");

  const handleFile = async (file: File) => {
    setError(null);

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("סוג קובץ לא נתמך — רק JPEG, PNG או WebP");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("הקובץ גדול מדי (מקסימום 5MB)");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
      onUploadComplete(data.publicUrl);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "שגיאת העלאה");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    onUploadComplete(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const inputId = `upload-${folder}-${label}`;

  /* ─── LOGO variant ─── */
  if (mode === "logo") {
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
                uploading
                  ? "opacity-60 pointer-events-none"
                  : "hover:opacity-90"
              } text-white`}
              style={{ background: "var(--grad-bronze)", border: "none" }}
            >
              {uploading ? (
                <><Loader2 className="h-4 w-4 animate-spin" />מעלה...</>
              ) : (
                <><Upload className="h-4 w-4" />{currentImage ? "החלף לוגו" : "העלה לוגו"}</>
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
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
          disabled={uploading}
          className="hidden"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  /* ─── BANNER variant ─── */
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
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {/* Dark background layer — always present */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(28,30%,14%) 0%, hsl(28,18%,6%) 100%)",
          }}
        />

        {/* Banner image (darkened, like the real menu) */}
        {currentImage && (
          <img
            src={currentImage}
            alt="banner"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "brightness(.4) saturate(.7)",
              transform: "scale(1.06)",
            }}
          />
        )}

        {/* Gradient overlay — bottom fade to dark (matches MenuView) */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, hsl(28,18%,6%) 0%, transparent 55%)",
          }}
        />

        {/* Content overlay: logo + name, exactly like the real menu */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 text-center gap-2.5 px-4">
          {/* Logo circle */}
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="logo"
              style={{
                width: 52, height: 52,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid hsl(28,62%,52%,.5)",
                boxShadow: "0 0 0 3px hsl(28,62%,52%,.15)",
              }}
            />
          ) : (
            <div
              style={{
                width: 52, height: 52, borderRadius: "50%",
                background: "var(--grad-bronze)",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "2px solid hsl(28,62%,52%,.4)",
              }}
            >
              <span style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>
                {restaurantName?.charAt(0) ?? "?"}
              </span>
            </div>
          )}
          <div>
            <div style={{ color: "hsl(36,30%,82%)", fontSize: 15, fontWeight: 600, letterSpacing: ".01em" }}>
              {restaurantName || "שם המסעדה"}
            </div>
            <div style={{ color: "hsl(28,62%,52%)", fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", marginTop: 2 }}>
              EVERY DISH · IN 360°
            </div>
          </div>
        </div>

        {/* Empty state: drop zone prompt */}
        {!currentImage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
            {uploading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin" style={{ color: "rgba(255,255,255,.3)" }} />
                <span className="text-sm" style={{ color: "rgba(255,255,255,.5)" }}>מעלה...</span>
              </>
            ) : (
              <>
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)" }}
                >
                  <ImageIcon className="h-5 w-5" style={{ color: "hsl(28,62%,52%)" }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,.85)", fontWeight: 500 }}>
                    גרור תמונה לכאן, או{" "}
                    <span style={{ color: "hsl(28,62%,52%)" }}>בחר קובץ</span>
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,.4)" }}>
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
          style={{ background: "rgba(0,0,0,.45)", color: "rgba(255,255,255,.55)", letterSpacing: ".06em" }}
        >
          תצוגה מקדימה
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        הבאנר מוצג כרקע כהה בעמוד התפריט · מומלץ 1920×600
      </p>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        disabled={uploading}
        className="hidden"
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
