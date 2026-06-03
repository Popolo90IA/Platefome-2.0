"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  STORAGE_BUCKET,
  MAX_FILE_SIZE,
  ALLOWED_IMAGE_TYPES,
  type UploadFolder,
} from "@/lib/constants";

/**
 * useImageUpload — file validation, Supabase storage upload, drag state,
 * and input ref/handlers shared by the logo and banner variants.
 */
export function useImageUpload({
  folder,
  label,
  onUploadComplete,
}: {
  folder: UploadFolder;
  label: string;
  onUploadComplete: (url: string | null) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

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

      const { data } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);
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

  return {
    uploading,
    error,
    dragOver,
    setDragOver,
    inputRef,
    inputId,
    handleInputChange,
    handleDrop,
    handleRemove,
  };
}

export type ImageUploadController = ReturnType<typeof useImageUpload>;
