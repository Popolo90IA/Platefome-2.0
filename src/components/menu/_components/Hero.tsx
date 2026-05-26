"use client";

import Image from "next/image";
import type { Restaurant, Language } from "@/types/database.types";
import type { MenuHeroStyle, FontPack } from "@/lib/theme";
import { D } from "../_lib/constants";
import { UtilityBar } from "./UtilityBar";
import { RestaurantMark } from "./RestaurantMark";

type HeroProps = {
  restaurant: Restaurant;
  heroStyle: MenuHeroStyle;
  fontPack: FontPack;
  lang: Language;
  available: Language[];
  langOpen: boolean;
  onToggleLangOpen: () => void;
  onBlurLangOpen: () => void;
  onSelectLang: (l: Language) => void;
  onShare: () => void;
};

/**
 * Top hero block : banner background + utility bar + restaurant mark.
 * Layout adapts to heroStyle (default / minimal / centered).
 */
export function Hero({
  restaurant,
  heroStyle,
  fontPack,
  lang,
  available,
  langOpen,
  onToggleLangOpen,
  onBlurLangOpen,
  onSelectLang,
  onShare,
}: HeroProps) {
  const restaurantName = restaurant.name;
  const centered = heroStyle === "centered";

  return (
    <>
      <header
        style={{
          position: "relative",
          height: heroStyle === "minimal" ? 200 : 360,
          overflow: "hidden",
          borderBottom: `1px solid ${D.line}`,
          background: heroStyle === "minimal" ? D.section : undefined,
        }}
      >
        {/* Background (not for minimal) */}
        {heroStyle !== "minimal" && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: restaurant.banner_url
                ? undefined
                : `radial-gradient(ellipse at 30% 50%, hsl(28,62%,30%,.6), transparent 60%),
                   radial-gradient(ellipse at 70% 30%, hsl(22,70%,40%,.5), transparent 60%),
                   linear-gradient(135deg, hsl(28,30%,14%) 0%, hsl(28,18%,6%) 100%)`,
            }}
          >
            {restaurant.banner_url && (
              <Image
                src={restaurant.banner_url}
                alt=""
                aria-hidden
                fill
                priority
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  filter: "brightness(.4) saturate(.7)",
                  transform: "scale(1.08)",
                }}
              />
            )}
          </div>
        )}
        {/* Bottom fade (not for minimal) */}
        {heroStyle !== "minimal" && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "auto 0 0",
              height: 180,
              background: `linear-gradient(180deg, transparent 0%, ${D.page} 100%)`,
              pointerEvents: "none",
            }}
          />
        )}

        <UtilityBar
          lang={lang}
          available={available}
          langOpen={langOpen}
          onToggleLangOpen={onToggleLangOpen}
          onBlurLangOpen={onBlurLangOpen}
          onSelectLang={onSelectLang}
          onShare={onShare}
          heroStyle={heroStyle}
          fontPack={fontPack}
        />

        {/* Hero content — alignment depends on heroStyle */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            maxWidth: 720,
            margin: "0 auto",
            padding:
              heroStyle === "minimal" ? "72px 24px 0" : "0 24px 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: centered
              ? "center"
              : heroStyle === "minimal"
                ? "flex-start"
                : "flex-end",
            alignItems: centered ? "center" : undefined,
            textAlign: centered ? "center" : undefined,
          }}
        >
          <RestaurantMark
            restaurant={restaurant}
            heroStyle={heroStyle}
            fontPack={fontPack}
          />
        </div>
      </header>

      {/* Restaurant name below banner — default style only */}
      {heroStyle === "default" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 24px 0" }}>
          <h1
            style={{
              fontFamily: fontPack.headingFont,
              fontWeight: 500,
              fontSize: "clamp(32px, 6vw, 52px)",
              lineHeight: 1,
              letterSpacing: "-.02em",
              color: D.text,
              margin: 0,
            }}
          >
            {restaurantName}
          </h1>
        </div>
      )}
    </>
  );
}
