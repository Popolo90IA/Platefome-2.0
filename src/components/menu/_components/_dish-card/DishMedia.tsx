"use client";

import Image from "next/image";
import { t } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import type { Dish, Language } from "@/types/database.types";
import { D } from "../../_lib/constants";
import { BadgeIcon } from "./BadgeIcon";
import type { BadgeType } from "./types";

interface Props {
  dish: Dish;
  restaurantId: string;
  lang: Language;
  name: string;
  hovered: boolean;
  isGrid: boolean;
  soldout: boolean;
  placeholderGradient: string;
  badgeType: BadgeType | null;
}

export function DishMedia({
  dish,
  restaurantId,
  lang,
  name,
  hovered,
  isGrid,
  soldout,
  placeholderGradient,
  badgeType,
}: Props) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: isGrid ? 0 : 10,
        overflow: "hidden",
        width: isGrid ? "100%" : 90,
        height: isGrid ? 140 : 90,
        flexShrink: 0,
        background: dish.image_url ? undefined : placeholderGradient,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,220,170,.3), transparent 60%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {dish.video_url ? (
        <video
          src={dish.video_url}
          poster={dish.image_url ?? undefined}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform .5s",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
          muted
          loop
          playsInline
          preload="metadata"
          onMouseEnter={(e) => {
            e.currentTarget.play().catch(() => {});
            trackEvent(restaurantId, "video_play", { dishId: dish.id });
          }}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
      ) : dish.image_url ? (
        <Image
          src={dish.image_url}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          style={{
            objectFit: "cover",
            display: "block",
            transition: "transform .5s",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        />
      ) : null}

      {soldout && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: 8,
              fontFamily: "var(--font-mono)",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "#fff",
            }}
          >
            {t(lang, "soldout")}
          </span>
        </div>
      )}

      {badgeType && (
        <span
          style={{
            position: "absolute",
            bottom: 4,
            insetInlineStart: 4,
            zIndex: 3,
            fontFamily: "var(--font-mono)",
            fontSize: 8,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            padding: "2px 6px",
            borderRadius: 99,
            background: "hsl(28,18%,6%,.8)",
            backdropFilter: "blur(8px)",
            color: D.goldLt,
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <BadgeIcon type={badgeType} size={8} />
          {badgeType}
        </span>
      )}
    </div>
  );
}
