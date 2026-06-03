"use client";

import { useState } from "react";
import type { Dish, Restaurant } from "@/types/database.types";
import { buildBadges, KF } from "./_dish-detail/constants";
import { DishHeader } from "./_dish-detail/DishHeader";
import { DishInfo } from "./_dish-detail/DishInfo";
import { DishVisual } from "./_dish-detail/DishVisual";
import { VideoModal } from "./_dish-detail/VideoModal";

interface DishDetailViewProps {
  dish: Dish;
  restaurant: Restaurant;
  slug: string;
}

export function DishDetailView({ dish, restaurant, slug }: DishDetailViewProps) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  const photos: string[] = [
    ...(dish.image_url ? [dish.image_url] : []),
    ...(dish.photos_360 ?? []),
  ];
  const badges = buildBadges(dish);

  return (
    <div style={{ background: "hsl(var(--void))", color: "hsl(var(--cream))", minHeight: "100vh", direction: "rtl" }}>
      <style>{KF}</style>

      <DishHeader dish={dish} restaurant={restaurant} slug={slug} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px 80px" }}>
        <div className="dish-layout" style={{ display: "flex", gap: 64, alignItems: "flex-start" }}>
          <DishVisual
            dish={dish}
            badges={badges}
            photos={photos}
            activePhoto={activePhoto}
            onPhoto={setActivePhoto}
            onOpenVideo={() => setVideoOpen(true)}
          />
          <DishInfo dish={dish} restaurant={restaurant} badges={badges} />
        </div>
      </div>

      {videoOpen && dish.video_url && (
        <VideoModal src={dish.video_url} onClose={() => setVideoOpen(false)} />
      )}
    </div>
  );
}
