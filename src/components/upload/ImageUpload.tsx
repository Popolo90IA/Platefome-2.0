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
  /** "logo" → circular 96×96 preview, "banner" → wide 16:5 preview */
  variant?: "logo" | "banner";
}

export function ImageUpload({
  currentImage,
  onUploadComplete,
  folder,
  label,
  variant,
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
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>

      {/* Drop zone / preview */}
      <div
        className={`relative w-full rounded-xl overflow-hidden transition-all cursor-pointer group ${
          dragOver ? "ring-2 ring-[hsl(var(--gold))]" : ""
        }`}
        style={{
          aspectRatio: "16/5",
          background: currentImage
            ? "transparent"
            : "hsl(var(--gold) / .05)",
          border: currentImage
            ? "none"
            : `2px dashed hsl(var(--gold) / .3)`,
        }}
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {currentImage ? (
          <>
            <img
              src={currentImage}
              alt="banner"
              className="w-full h-full object-cover"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-2">
                <label
                  htmlFor={inputId}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white cursor-pointer transition-colors"
                  style={{ background: "var(--grad-bronze)" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Upload className="h-3.5 w-3.5" />
                  החלף
                </label>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white transition-colors"
                  style={{ background: "hsl(var(--ember))" }}
                >
                  <X className="h-3.5 w-3.5" />
                  הסר
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
            {uploading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/40" />
                <span className="text-sm text-muted-foreground">מעלה...</span>
              </>
            ) : (
              <>
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                  style={{ background: "hsl(var(--gold) / .1)" }}
                >
                  <ImageIcon className="h-5 w-5" style={{ color: "hsl(var(--gold))" }} />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    גרור תמונה לכאן, או{" "}
                    <span style={{ color: "hsl(var(--accent-bright))" }}>בחר קובץ</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    JPG, PNG, WebP · עד 5MB · מומלץ 1920×600
                  </p>
                </div>
              </>
            )}
          </div>
        )}
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
