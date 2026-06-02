"use client";

import { formatCurrency } from "@/lib/i18n";
import type { Dish, Language } from "@/types/database.types";
import { D } from "../../_lib/constants";

interface Props {
  dish: Dish;
  currency: string;
  lang: Language;
  isGrid: boolean;
}

export function DishPrice({ dish, currency, lang, isGrid }: Props) {
  return (
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
  );
}
