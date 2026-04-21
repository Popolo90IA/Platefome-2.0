"use client";

import { useRef, useState } from "react";
import { useEditMode } from "./EditModeProvider";
import { createClient } from "@/lib/supabase/client";
import { STORAGE_BUCKET } from "@/lib/constants";
import { Loader2, Camera, AlertCircle } from "lucide-react";

type Props = {
  contentKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
};

export function EditableImage({
  contentKey,
  defaultSrc,
  alt,
  className = "",
}: Props) {
  const { isAdmin, isEditMode, getContent, setContent } = useEditMode();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const src = getContent(contentKey, defaultSrc);
  const editable = isAdmin && isEditMode;

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("רק תמונות");
      return;
    }

    setUploading(true);
    setError(null);

    const ext = file.name.split(".").pop() || "jpg";
    const path = `site/${contentKey.replace(/\./g, "_")}-${Date.now()}.${ext}`;

    const { error: upErr } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { upsert: true });

    if (upErr) {
      setError(upErr.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    await setContent(contentKey, data.publicUrl, "image");

    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  if (!editable) {
    return <img src={src} alt={alt} className={className} />;
  }

  return (
    <div className="relative inline-block group">
      <img
        src={src}
        alt={alt}
        className={`${className} outline outline-2 outline-dashed outline-[hsl(var(--gold))]/50 group-hover:outline-[hsl(var(--gold))]`}
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded"
      >
        {uploading ? (
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-white">
            <Camera className="h-8 w-8" />
            <span className="text-sm font-medium">החלף תמונה</span>
          </div>
        )}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      {error && (
        <div className="absolute -bottom-8 start-0 flex items-center gap-1 text-xs text-red-600 bg-white px-2 py-1 rounded shadow">
          <AlertCircle className="h-3 w-3" />
          {error}
        </div>
      )}
    </div>
  );
}
