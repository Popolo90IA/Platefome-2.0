"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { Dish, Language } from "@/types/database.types";
import type { MenuLayout } from "@/lib/theme";
import { D } from "../_lib/constants";
import { Photo360Viewer } from "../Photo360Viewer";
import { DishInfo } from "./_dish-card/DishInfo";
import { DishMedia } from "./_dish-card/DishMedia";
import { DishPrice } from "./_dish-card/DishPrice";
import {
  computeBadgeType,
  localizedDesc,
  localizedName,
} from "./_dish-card/helpers";

type DishCardProps = {
  dish: Dish;
  restaurantId: string;
  lang: Language;
  currency: string;
  placeholderGradient: string;
  menuLayout: MenuLayout;
  headingFont: string;
  bodyFont: string;
  onOpen: () => void;
};

/**
 * Single dish card. Supports three menu layouts:
 * - grid : media on top, info below
 * - row  : media on the left, info on the right (default)
 * - list : compact, no media
 *
 * Tracks dish_view, ar_view, and video_play analytics events.
 */
export function DishCard({
  dish,
  restaurantId,
  lang,
  currency,
  placeholderGradient,
  menuLayout,
  headingFont,
  bodyFont,
  onOpen,
}: DishCardProps) {
  const [hovered, setHovered] = useState(false);
  const [show360, setShow360] = useState(false);

  const name = localizedName(dish, lang);
  const desc = localizedDesc(dish, lang);
  const soldout = !dish.is_available;
  const has3d = !!dish.model_3d_url;
  const has360 = Array.isArray(dish.photos_360) && dish.photos_360.length > 0;
  const hasVideo = !!dish.video_url;
  const badgeType = computeBadgeType(dish, has3d, has360, hasVideo);
  const isGrid = menuLayout === "grid";
  const isList = menuLayout === "list";

  const openModal = () => {
    trackEvent(restaurantId, "dish_view", { dishId: dish.id, language: lang });
    onOpen();
  };

  const open360 = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent(restaurantId, "ar_view", { dishId: dish.id, language: lang });
    setShow360(true);
  };

  return (
    <>
      <article
        tabIndex={0}
        role="button"
        aria-label={name}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={openModal}
        onKeyDown={(e) => e.key === "Enter" && openModal()}
        style={{
          display: "flex",
          flexDirection: isGrid ? "column" : "row",
          direction: isGrid ? undefined : "ltr",
          gap: isList ? 12 : 16,
          background: hovered ? D.surface : D.card,
          border: `1px solid ${hovered ? D.line2 : D.line}`,
          borderRadius: 14,
          padding: isList ? "10px 14px" : isGrid ? 0 : 14,
          cursor: "pointer",
          transition: "border-color .25s, background .25s",
          position: "relative",
          outline: "none",
          opacity: soldout ? 0.62 : 1,
          alignItems: isGrid ? undefined : "center",
          overflow: isGrid ? "hidden" : undefined,
        }}
      >
        {!isList && (
          <DishMedia
            dish={dish}
            restaurantId={restaurantId}
            lang={lang}
            name={name}
            hovered={hovered}
            isGrid={isGrid}
            soldout={soldout}
            placeholderGradient={placeholderGradient}
            badgeType={badgeType}
          />
        )}

        <DishInfo
          dish={dish}
          restaurantId={restaurantId}
          lang={lang}
          name={name}
          desc={desc}
          isList={isList}
          isGrid={isGrid}
          headingFont={headingFont}
          bodyFont={bodyFont}
          soldout={soldout}
          has3d={has3d}
          has360={has360}
          onOpen360={open360}
        />

        <DishPrice
          dish={dish}
          currency={currency}
          lang={lang}
          isGrid={isGrid}
        />
      </article>

      {show360 && has360 && (
        <Photo360Viewer
          photos={dish.photos_360 as string[]}
          dishName={name}
          onClose={() => setShow360(false)}
        />
      )}
    </>
  );
}
