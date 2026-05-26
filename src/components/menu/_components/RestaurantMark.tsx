import Image from "next/image";
import type { Restaurant } from "@/types/database.types";
import type { MenuHeroStyle, FontPack } from "@/lib/theme";
import { D } from "../_lib/constants";

type RestaurantMarkProps = {
  restaurant: Restaurant;
  heroStyle: MenuHeroStyle;
  fontPack: FontPack;
};

/**
 * Restaurant logo + name row, plus h1 title (for minimal/centered styles)
 * and meta row (phone + address).
 */
export function RestaurantMark({
  restaurant,
  heroStyle,
  fontPack,
}: RestaurantMarkProps) {
  const restaurantName = restaurant.name;
  const centered = heroStyle === "centered";

  return (
    <>
      {/* Restaurant mark row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
          justifyContent: centered ? "center" : undefined,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            background: D.grad,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            boxShadow: `0 0 32px ${D.gold}59`,
            flexShrink: 0,
          }}
        >
          {restaurant.logo_url ? (
            <Image
              src={restaurant.logo_url}
              alt={restaurantName}
              width={48}
              height={48}
              style={{ borderRadius: 12, objectFit: "cover" }}
              priority
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/brand/logo-mark.svg"
              width={48}
              height={48}
              alt="Plateform"
              style={{ borderRadius: 12, objectFit: "cover" }}
              draggable={false}
            />
          )}
        </div>
        <div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: D.textDim,
            }}
          >
            {restaurantName}
            {restaurant.address && ` · ${restaurant.address}`}
          </div>
        </div>
      </div>

      {/* Restaurant name as h1 — only inside hero for minimal/centered */}
      {(heroStyle === "minimal" || heroStyle === "centered") && (
        <h1
          style={{
            fontFamily: fontPack.headingFont,
            fontWeight: 500,
            fontSize:
              heroStyle === "minimal"
                ? "clamp(28px, 5vw, 42px)"
                : "clamp(48px, 8vw, 72px)",
            lineHeight: 0.95,
            letterSpacing: "-.02em",
            color: D.text,
            margin: "0 0 12px",
          }}
        >
          {restaurantName}
        </h1>
      )}

      {/* Meta row */}
      <div
        style={{
          display: "flex",
          gap: 18,
          flexWrap: "wrap",
          fontFamily: "'DM Mono', monospace",
          fontSize: "10.5px",
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: D.textDim,
          justifyContent: centered ? "center" : undefined,
        }}
      >
        {restaurant.phone && (
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: 99,
                background: D.gold,
                display: "inline-block",
              }}
            />
            <a
              href={`tel:${restaurant.phone}`}
              style={{ color: "inherit", textDecoration: "none" }}
              dir="ltr"
            >
              {restaurant.phone}
            </a>
          </span>
        )}
        {restaurant.address && (
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: 99,
                background: D.gold,
                display: "inline-block",
              }}
            />
            {restaurant.address}
          </span>
        )}
      </div>
    </>
  );
}
