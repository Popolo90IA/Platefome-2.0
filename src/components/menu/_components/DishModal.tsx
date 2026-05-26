"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { LANGUAGE_META, pickLocalized, t, formatCurrency } from "@/lib/i18n";
import type { Dish, Language } from "@/types/database.types";
import { D } from "../_lib/constants";
import { DishModelViewer } from "../DishModelViewer";
import { Photo360Viewer } from "../Photo360Viewer";
import { InfoRow } from "./InfoRow";

type DishModalProps = {
  dish: Dish;
  restaurantId: string;
  lang: Language;
  currency: string;
  headingFont: string;
  bodyFont: string;
  onClose: () => void;
};

type ArTab = "2D" | "3D" | "360" | "AR";

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
  const name =
    pickLocalized(dish as unknown as Record<string, unknown>, "name", lang) ||
    dish.name;
  const desc = pickLocalized(
    dish as unknown as Record<string, unknown>,
    "description",
    lang,
  );
  const has3d = !!dish.model_3d_url;
  const has360 = Array.isArray(dish.photos_360) && dish.photos_360.length > 0;
  const hasVideo = !!dish.video_url;
  const [arTab, setArTab] = useState<ArTab>("2D");
  const [show360, setShow360] = useState(false);

  const dir = LANGUAGE_META[lang].dir;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const tabs: ArTab[] = [
    "2D",
    ...(has3d ? ["3D" as const] : []),
    ...(has360 ? ["360" as const] : []),
    ...(dish.ar_enabled && has3d ? ["AR" as const] : []),
  ];
  const hasViewTabs = has3d || has360 || hasVideo;

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
        {/* Art / media area */}
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
                  onClick={() => setArTab(tab)}
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

        {/* Body */}
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
              fontFamily: "'DM Mono', monospace",
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
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "11px 22px",
                      borderRadius: 10,
                      background: D.grad,
                      color: "#fff",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13.5,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <ellipse cx="12" cy="12" rx="9" ry="3" />
                    </svg>
                    {t(lang, "view_3d_cta")}
                  </span>
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
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "11px 22px",
                      borderRadius: 10,
                      background: D.grad,
                      color: "#fff",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13.5,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    </svg>
                    {t(lang, "view_ar")}
                  </span>
                }
              />
            </div>
          )}

          {arTab === "360" && has360 && (
            <button
              type="button"
              onClick={() => setShow360(true)}
              style={{
                marginTop: 20,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 22px",
                borderRadius: 10,
                background: D.grad,
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
              }}
            >
              <svg
                width="14"
                height="14"
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
        </div>
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
