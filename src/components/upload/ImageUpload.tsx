"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
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
}

export function ImageUpload({
  currentImage,
  onUploadComplete,
  folder,
  label,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const file = event.target.files?.[0];
      if (!file) return;

      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        setError("סוג קובץ לא נתמך. רק JPEG, PNG או WebP");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError("הקובץ גדול מדי (מקסימום 5MB)");
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

      {currentImage ? (
        <div className="relative inline-block">
          <img
            src={currentImage}
            alt={label}
            className="h-32 w-32 rounded-lg object-cover border"
          />
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
            className="flex items-center gap-2 cursor-pointer border border-input rounded-md px-4 py-2 hover:bg-accent text-sm"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                מעלה...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                בחר תמונה
              </>
            )}
          </label>
          <input
            id={`upload-${folder}-${label}`}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
