"use client";

import { useState } from "react";
import Image from "next/image";
import { pickLocalized, t, formatCurrency } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import type { Dish, Language } from "@/types/database.types";
import type { MenuLayout } from "@/lib/theme";
import { D } from "../_lib/constants";
import { DishModelViewer } from "../DishModelViewer";
import { Photo360Viewer } from "../Photo360Viewer";
import { DishTag } from "./DishTag";

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

  const name =
    pickLocalized(dish as unknown as Record<string, unknown>, "name", lang) ||
    dish.name;
  const desc = pickLocalized(
    dish as unknown as Record<string, unknown>,
    "description",
    lang,
  );
  const soldout = !dish.is_available;
  const has3d = !!dish.model_3d_url;
  const has360 = Array.isArray(dish.photos_360) && dish.photos_360.length > 0;
  const hasVideo = !!dish.video_url;

  const badgeType: "3D" | "Video" | "AR" | "360" | null = has3d
    ? dish.ar_enabled
      ? "AR"
      : "3D"
    : hasVideo
      ? "Video"
      : has360
        ? "360"
        : null;

  const openModal = () => {
    trackEvent(restaurantId, "dish_view", { dishId: dish.id, language: lang });
    onOpen();
  };

  const open360 = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent(restaurantId, "ar_view", { dishId: dish.id, language: lang });
    setShow360(true);
  };

  const isGrid = menuLayout === "grid";
  const isList = menuLayout === "list";

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
        {/* Media — hidden in list */}
        {!isList && (
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
                    fontFamily: "'DM Mono', monospace",
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
                  fontFamily: "'DM Mono', monospace",
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
                {badgeType === "3D" || badgeType === "AR" ? (
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <ellipse cx="12" cy="12" rx="9" ry="3" />
                  </svg>
                ) : badgeType === "Video" ? (
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                ) : (
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                  </svg>
                )}
                {badgeType}
              </span>
            )}
          </div>
        )}

        {/* Info column */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            direction: "rtl",
            padding: isGrid ? "12px 12px 0" : undefined,
          }}
        >
          <h3
            style={{
              fontFamily: headingFont,
              fontWeight: 600,
              fontSize: isList ? 16 : isGrid ? 16 : 19,
              lineHeight: 1.15,
              color: D.cream,
              margin: "0 0 4px",
            }}
          >
            {name}
          </h3>

          {desc && !isList && (
            <p
              style={{
                fontFamily: bodyFont,
                fontSize: 13,
                lineHeight: 1.55,
                color: D.textDim,
                margin: "0 0 8px",
                display: "-webkit-box",
                WebkitLineClamp: isGrid ? 2 : 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {desc}
            </p>
          )}

          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {dish.is_signature && <DishTag color="gold">מנת השף</DishTag>}
            {dish.is_new && <DishTag color="orange">חדש</DishTag>}
            {dish.is_featured && <DishTag color="orange">מומלץ</DishTag>}
            {soldout && <DishTag color="muted">{t(lang, "soldout")}</DishTag>}
            {has360 && (
              <button
                type="button"
                onClick={open360}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  padding: "3px 8px",
                  borderRadius: 99,
                  color: D.goldLt,
                  background: `${D.goldLt}14`,
                  border: `1px solid ${D.goldLt}2d`,
                  cursor: "pointer",
                }}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                </svg>
                360°
              </button>
            )}
            {has3d && !has360 && (
              <DishModelViewer
                restaurantId={restaurantId}
                dishId={dish.id}
                dishName={name}
                modelUrl={dish.model_3d_url!}
                arEnabled={dish.ar_enabled}
                language={lang}
                trigger={
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      borderRadius: 99,
                      color: D.goldLt,
                      background: `${D.goldLt}14`,
                      border: `1px solid ${D.goldLt}2d`,
                    }}
                  >
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <ellipse cx="12" cy="12" rx="9" ry="3" />
                    </svg>
                    3D
                  </span>
                }
              />
            )}
          </div>
        </div>

        {/* Price */}
        <div
          style={{
            flexShrink: 0,
            alignSelf: isGrid ? undefined : "center",
            ...(isGrid
              ? {
                  padding: "0 12px 12px",
                  display: "flex",
                  justifyContent: "flex-start",
                  direction: "ltr",
                }
              : {}),
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "'DM Mono', monospace",
              fontSize: isGrid ? 13 : 13.5,
              color: D.cream,
              background: D.surface,
              borderRadius: 8,
              padding: "5px 10px",
              border: `1px solid ${D.line}`,
              letterSpacing: ".02em",
            }}
          >
            {formatCurrency(Number(dish.price), currency, lang)}
          </span>
        </div>
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
