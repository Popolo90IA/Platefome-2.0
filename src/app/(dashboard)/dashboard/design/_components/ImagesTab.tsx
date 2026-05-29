"use client";

import { ImageUpload } from "@/components/upload/ImageUpload";
import { UPLOAD_FOLDERS } from "@/lib/constants";

type Props = {
  logoUrl: string | null;
  bannerUrl: string | null;
  restaurantName: string;
  onChangeLogo: (url: string | null) => void;
  onChangeBanner: (url: string | null) => void;
};

/**
 * ImagesTab — onglet images : upload logo + banner avec preview.
 */
export function ImagesTab({
  logoUrl,
  bannerUrl,
  restaurantName,
  onChangeLogo,
  onChangeBanner,
}: Props) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        הלוגו מופיע עגול · הבאנר מופיע בראש הדף בגודל מלא
      </p>
      <ImageUpload
        label="לוגו"
        folder={UPLOAD_FOLDERS.LOGOS}
        currentImage={logoUrl}
        onUploadComplete={onChangeLogo}
      />
      <ImageUpload
        label="באנר"
        folder={UPLOAD_FOLDERS.BANNERS}
        currentImage={bannerUrl}
        onUploadComplete={onChangeBanner}
        previewMeta={{ logoUrl, restaurantName }}
      />
    </div>
  );
}
