"use client";

import type { UploadFolder } from "@/lib/constants";
import { BannerUpload } from "./_image-upload/BannerUpload";
import { LogoUpload } from "./_image-upload/LogoUpload";
import { useImageUpload } from "./_image-upload/useImageUpload";

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
  const ctrl = useImageUpload({ folder, label, onUploadComplete });

  // Infer variant from folder/label if not supplied
  const mode: "logo" | "banner" =
    variant ??
    (label.includes("לוגו") || label.toLowerCase().includes("logo")
      ? "logo"
      : "banner");

  if (mode === "logo") {
    return <LogoUpload ctrl={ctrl} currentImage={currentImage} label={label} />;
  }

  return (
    <BannerUpload
      ctrl={ctrl}
      currentImage={currentImage}
      label={label}
      previewMeta={previewMeta}
    />
  );
}
