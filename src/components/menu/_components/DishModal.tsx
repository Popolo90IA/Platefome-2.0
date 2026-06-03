"use client";

import type { Dish, Language } from "@/types/database.types";
import { D } from "../_lib/constants";
import { Photo360Viewer } from "../Photo360Viewer";
import { DishMedia } from "./_dish-modal/DishMedia";
import { DishModalBody } from "./_dish-modal/DishModalBody";
import { useDishModal } from "./_dish-modal/useDishModal";

type DishModalProps = {
  dish: Dish;
  restaurantId: string;
  lang: Language;
  currency: string;
  headingFont: string;
  bodyFont: string;
  onClose: () => void;
};

/**
 * Full-screen modal showing dish art, description, allergens, and view-mode
 * tabs (2D / 3D / 360 / AR). Listens to Escape to close.
 */
export function DishModal({
  dish,
  restaurantId,
  lang,
  currency,
  headingFont,
  bodyFont,
  onClose,
}: DishModalProps) {
  const {
    name,
    desc,
    has3d,
    has360,
    hasViewTabs,
    tabs,
    dir,
    arTab,
    setArTab,
    show360,
    setShow360,
  } = useDishModal(dish, lang, onClose);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={name}
      dir={dir}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "hsl(28,18%,6%,.7)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: D.card,
          border: `1px solid ${D.line2}`,
          borderRadius: 22,
          maxWidth: 560,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 40px 100px rgba(0,0,0,.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <DishMedia
          dish={dish}
          name={name}
          hasViewTabs={hasViewTabs}
          tabs={tabs}
          arTab={arTab}
          onTab={setArTab}
          onClose={onClose}
        />

        <DishModalBody
          dish={dish}
          restaurantId={restaurantId}
          lang={lang}
          currency={currency}
          headingFont={headingFont}
          bodyFont={bodyFont}
          name={name}
          desc={desc}
          has3d={has3d}
          has360={has360}
          arTab={arTab}
          onShow360={() => setShow360(true)}
        />
      </div>

      {show360 && has360 && (
        <Photo360Viewer
          photos={dish.photos_360 as string[]}
          dishName={name}
          onClose={() => setShow360(false)}
        />
      )}
    </div>
  );
}
