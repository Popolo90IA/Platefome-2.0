"use client";

import { t, formatCurrency } from "@/lib/i18n";
import type { Dish, Language } from "@/types/database.types";
import { D } from "../../_lib/constants";
import { DishModelViewer } from "../../DishModelViewer";
import { InfoRow } from "../InfoRow";
import { DishViewerButton } from "./DishViewerButton";
import type { ArTab } from "./useDishModal";

const Icon3D = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="9" />
    <ellipse cx="12" cy="12" rx="9" ry="3" />
  </svg>
);

const IconAR = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

const Icon360 = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="3" />
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
  </svg>
);

/**
 * DishModalBody — titre, prix, description, allergènes + CTA viewer (3D/AR/360)
 * selon l'onglet actif.
 */
export function DishModalBody({
  dish,
  restaurantId,
  lang,
  currency,
  headingFont,
  bodyFont,
  name,
  desc,
  has3d,
  has360,
  arTab,
  onShow360,
}: {
  dish: Dish;
  restaurantId: string;
  lang: Language;
  currency: string;
  headingFont: string;
  bodyFont: string;
  name: string;
  desc: string;
  has3d: boolean;
  has360: boolean;
  arTab: ArTab;
  onShow360: () => void;
}) {
  return (
    <div style={{ padding: "24px 28px 28px" }}>
      <h2
        style={{
          fontFamily: headingFont,
          fontWeight: 600,
          fontSize: 32,
          letterSpacing: "-.02em",
          color: D.cream,
          margin: "0 0 8px",
          lineHeight: 1.05,
        }}
      >
        {name}
      </h2>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 16,
          color: D.gold,
          letterSpacing: ".04em",
          marginBottom: 16,
        }}
      >
        {formatCurrency(Number(dish.price), currency, lang)}
      </div>
      {desc && (
        <p
          style={{
            fontFamily: bodyFont,
            fontSize: 14,
            lineHeight: 1.7,
            color: D.text,
            margin: "0 0 18px",
          }}
        >
          {desc}
        </p>
      )}

      {dish.allergens && dish.allergens.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            paddingTop: 14,
            borderTop: `1px solid ${D.line}`,
          }}
        >
          <InfoRow label="אלרגנים" value={dish.allergens.join(", ")} />
        </div>
      )}

      {arTab === "3D" && has3d && (
        <div style={{ marginTop: 20 }}>
          <DishModelViewer
            restaurantId={restaurantId}
            dishId={dish.id}
            dishName={name}
            modelUrl={dish.model_3d_url!}
            arEnabled={false}
            language={lang}
            trigger={
              <DishViewerButton icon={Icon3D} label={t(lang, "view_3d_cta")} />
            }
          />
        </div>
      )}

      {arTab === "AR" && has3d && dish.ar_enabled && (
        <div style={{ marginTop: 20 }}>
          <DishModelViewer
            restaurantId={restaurantId}
            dishId={dish.id}
            dishName={name}
            modelUrl={dish.model_3d_url!}
            arEnabled
            language={lang}
            trigger={
              <DishViewerButton icon={IconAR} label={t(lang, "view_ar")} />
            }
          />
        </div>
      )}

      {arTab === "360" && has360 && (
        <div style={{ marginTop: 20 }}>
          <DishViewerButton
            as="button"
            icon={Icon360}
            label="360°"
            onClick={onShow360}
          />
        </div>
      )}
    </div>
  );
}
