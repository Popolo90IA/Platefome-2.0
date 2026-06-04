"use client";

import { pickLocalized, t } from "@/lib/i18n";
import type { Category, Dish, Language } from "@/types/database.types";
import type { MenuLayout, FontPack } from "@/lib/theme";
import { D } from "../_lib/constants";
import { dishPlaceholder } from "../_lib/placeholders";
import { DishCard } from "./DishCard";

type MenuSectionProps = {
  category: Category;
  dishes: Dish[];
  startIdx: number;
  restaurantId: string;
  currency: string;
  menuLayout: MenuLayout;
  fontPack: FontPack;
  lang: Language;
  onOpenDish: (dish: Dish) => void;
};

/**
 * One category section : title rule + count + grid or list of dishes.
 * `startIdx` lets each card pick a deterministic placeholder gradient
 * across the whole flattened dish list.
 */
export function MenuSection({
  category,
  dishes,
  startIdx,
  restaurantId,
  currency,
  menuLayout,
  fontPack,
  lang,
  onOpenDish,
}: MenuSectionProps) {
  const catName =
    pickLocalized(
      category as unknown as Record<string, unknown>,
      "name",
      lang,
    ) || category.name;
  const catTotal = dishes.length;

  return (
    <section
      id={`cat-${category.id}`}
      style={{ scrollMarginTop: 64 }}
    >
      {/* Section rule */}
      <div
        style={{
          margin: "56px auto 24px",
          maxWidth: 860,
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <h2
          style={{
            fontFamily: fontPack.headingFont,
            fontWeight: 500,
            fontSize: 32,
            letterSpacing: "-.02em",
            color: D.cream,
            margin: 0,
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          {catName}
        </h2>
        <div
          style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${D.line2} 50%, transparent)`,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: D.textDim,
          }}
        >
          {String(catTotal).padStart(2, "0")}
        </span>
      </div>

      {/* Dish list */}
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "0 24px",
          ...(menuLayout === "grid"
            ? { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }
            : { display: "flex", flexDirection: "column", gap: 14 }),
        }}
      >
        {dishes.length === 0 ? (
          <p
            style={{
              color: D.textDim,
              fontSize: 13,
              paddingInlineStart: 4,
              fontFamily: fontPack.bodyFont,
            }}
          >
            {t(lang, "no_dishes_in_cat")}
          </p>
        ) : (
          dishes.map((dish, i) => (
            <DishCard
              key={dish.id}
              dish={dish}
              restaurantId={restaurantId}
              lang={lang}
              currency={currency}
              placeholderGradient={dishPlaceholder(startIdx + i)}
              menuLayout={menuLayout}
              headingFont={fontPack.headingFont}
              bodyFont={fontPack.bodyFont}
              onOpen={() => onOpenDish(dish)}
            />
          ))
        )}
      </div>
    </section>
  );
}
