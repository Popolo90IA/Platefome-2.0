"use client";

import Image from "next/image";
import { X } from "lucide-react";
import type { Dish } from "@/types/database.types";
import { D } from "../../_lib/constants";
import type { ArTab } from "./useDishModal";

/**
 * DishMedia — zone art en haut du modal : image/gradient, bouton fermer,
 * barre d'onglets vue (2D/3D/360/AR).
 */
export function DishMedia({
  dish,
  name,
  hasViewTabs,
  tabs,
  arTab,
  onTab,
  onClose,
}: {
  dish: Dish;
  name: string;
  hasViewTabs: boolean;
  tabs: ArTab[];
  arTab: ArTab;
  onTab: (tab: ArTab) => void;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "1.6",
        background: dish.image_url
          ? undefined
          : "linear-gradient(135deg, hsl(28,40%,32%), hsl(28,55%,45%))",
        overflow: "hidden",
      }}
    >
      {dish.image_url && (
        <Image
          src={dish.image_url}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, 560px"
          style={{ objectFit: "cover" }}
        />
      )}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,220,170,.4), transparent 60%)",
        }}
      />

      <button
        type="button"
        onClick={onClose}
        aria-label="סגור"
        style={{
          position: "absolute",
          top: 16,
          insetInlineStart: 16,
          zIndex: 10,
          width: 36,
          height: 36,
          borderRadius: 99,
          background: "hsl(28,18%,6%,.7)",
          backdropFilter: "blur(8px)",
          border: `1px solid ${D.line}`,
          color: D.cream,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <X style={{ width: 14, height: 14 }} strokeWidth={2} />
      </button>

      {hasViewTabs && (
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 4,
            background: "hsl(28,18%,6%,.7)",
            backdropFilter: "blur(16px)",
            border: `1px solid ${D.line}`,
            borderRadius: 99,
            padding: 4,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onTab(tab)}
              style={{
                padding: "7px 14px",
                borderRadius: 99,
                fontFamily: "'DM Mono', monospace",
                fontSize: "9.5px",
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: arTab === tab ? "#fff" : D.textDim,
                border: "none",
                background: arTab === tab ? D.grad : "transparent",
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
