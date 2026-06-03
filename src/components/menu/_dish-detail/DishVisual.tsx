"use client";

import type { Dish } from "@/types/database.types";
import type { DishBadge } from "./constants";
import { MainPhoto } from "./_visual/MainPhoto";
import { PhotoStrip } from "./_visual/PhotoStrip";
import { ArActions } from "./_visual/ArActions";

/* ─── DishVisual — main photo + badges + video btn + 360 strip + AR/3D ── */
export function DishVisual({
  dish,
  badges,
  photos,
  activePhoto,
  onPhoto,
  onOpenVideo,
}: {
  dish: Dish;
  badges: DishBadge[];
  photos: string[];
  activePhoto: number;
  onPhoto: (i: number) => void;
  onOpenVideo: () => void;
}) {
  const currentPhoto = photos[activePhoto] ?? "";

  return (
    <div className="dish-visual" style={{ flex: "0 0 50%", maxWidth: "50%" }}>
      <MainPhoto dish={dish} badges={badges} currentPhoto={currentPhoto} onOpenVideo={onOpenVideo} />

      {photos.length > 1 && (
        <PhotoStrip photos={photos} activePhoto={activePhoto} onPhoto={onPhoto} />
      )}

      {(dish.ar_enabled || dish.model_3d_url) && <ArActions dish={dish} />}
    </div>
  );
}
