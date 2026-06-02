"use client";

import { t } from "@/lib/i18n";
import type { Dish, Language } from "@/types/database.types";
import { D } from "../../_lib/constants";
import { DishModelViewer } from "../../DishModelViewer";
import { DishTag } from "../DishTag";
import { BadgeIcon } from "./BadgeIcon";
import { MediaActionButton, MediaActionSpan } from "./MediaActionPill";

interface Props {
  dish: Dish;
  restaurantId: string;
  lang: Language;
  name: string;
  desc?: string;
  isList: boolean;
  isGrid: boolean;
  headingFont: string;
  bodyFont: string;
  soldout: boolean;
  has3d: boolean;
  has360: boolean;
  onOpen360: (e: React.MouseEvent) => void;
}

export function DishInfo({
  dish,
  restaurantId,
  lang,
  name,
  desc,
  isList,
  isGrid,
  headingFont,
  bodyFont,
  soldout,
  has3d,
  has360,
  onOpen360,
}: Props) {
  return (
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
            WebkitLineClamp: 2,
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
          <MediaActionButton onClick={onOpen360}>
            <BadgeIcon type="360" size={9} />
            360°
          </MediaActionButton>
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
              <MediaActionSpan>
                <BadgeIcon type="3D" size={9} />
                3D
              </MediaActionSpan>
            }
          />
        )}
      </div>
    </div>
  );
}
