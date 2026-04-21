"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, Loader2, FileIcon } from "lucide-react";
import { STORAGE_BUCKET, type UploadFolder } from "@/lib/constants";

interface FileUploadProps {
  currentUrl?: string | null;
  onUploadComplete: (url: string | null) => void;
  folder: UploadFolder;
  label: string;
  accept: string;
  maxSize: number;
  allowedTypes?: string[];
  allowedExts?: string[];
  preview?: "video" | "model" | "none";
  helperText?: string;
}

export function FileUpload({
  currentUrl,
  onUploadComplete,
  folder,
  label,
  accept,
  maxSize,
  allowedTypes,
  allowedExts,
  preview = "none",
  helperText,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const file = event.target.files?.[0];
      if (!file) return;

      if (allowedTypes && allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
        // fallback check par extension
        const ext = "." + file.name.split(".").pop()?.toLowerCase();
        if (!allowedExts || !allowedExts.includes(ext)) {
          setError("סוג קובץ לא נתמך");
          return;
        }
      } else if (allowedExts && allowedExts.length > 0 && !allowedTypes) {
        const ext = "." + file.name.split(".").pop()?.toLowerCase();
        if (!allowedExts.includes(ext)) {
          setError("סוג קובץ לא נתמך");
          return;
        }
      }

      if (file.size > maxSize) {
        setError(`הקובץ גדול מדי (מקסימום ${Math.round(maxSize / 1024 / 1024)}MB)`);
        return;
      }

      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type || undefined,
        });

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

  const handleRemove = () => {
    onUploadComplete(null);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      {currentUrl ? (
        <div className="relative inline-block">
          {preview === "video" ? (
            <video
              src={currentUrl}
              muted
              controls
              className="h-32 rounded-lg border object-cover"
            />
          ) : (
            <div className="flex items-center gap-2 h-14 px-3 rounded-lg border bg-card text-sm">
              <FileIcon className="h-5 w-5 text-[hsl(var(--gold))]" />
              <span className="max-w-[180px] truncate" dir="ltr">
                {currentUrl.split("/").pop()}
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <label
            htmlFor={`upload-${folder}-${label}`}
            className="flex items-center gap-2 cursor-pointer border border-input rounded-lg px-4 py-2 hover:bg-accent text-sm"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                מעלה...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                בחר קובץ
              </>
            )}
          </label>
          <input
            id={`upload-${folder}-${label}`}
            type="file"
            accept={accept}
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </div>
      )}

      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
