"use client";

import { LogoMark } from "@/components/brand";
import type { BgSwatch } from "../../_lib/types";
import type { StageStyling } from "./_styling";

interface Props {
  styling: StageStyling;
  bg: BgSwatch;
  isDarkBg: boolean;
  restaurantName: string;
}

/**
 * BackView — tab 2 : face arrière (אחורי) avec branding.
 */
export function BackView({ styling, bg, isDarkBg, restaurantName }: Props) {
  const { cardW, cardH, isCoaster, textColor, subtitleColor, accentColor } =
    styling;

  return (
    <div
      style={{
        width: cardW,
        height: cardH,
        background: bg.bg,
        borderRadius: isCoaster ? "50%" : 10,
        padding: isCoaster ? 24 : "28px 24px",
        boxSizing: "border-box",
        boxShadow: "0 8px 32px -8px rgba(0,0,0,.4)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: isCoaster ? 10 : 16,
      }}
    >
      <LogoMark size={52} variant={isDarkBg ? "dark" : "light"} />
      <div
        className="font-display"
        style={{
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: ".3em",
          color: textColor,
        }}
      >
        PLATE
        <em style={{ fontStyle: "italic", color: accentColor }}>FORM</em>
      </div>
      <div
        className="font-mono"
        style={{
          fontSize: 10,
          letterSpacing: ".2em",
          color: subtitleColor,
          textTransform: "uppercase",
        }}
      >
        EVERY DISH · IN 360°
      </div>
      <div
        className="font-mono"
        style={{
          fontSize: 10,
          color: subtitleColor,
          marginTop: 8,
          direction: "ltr",
        }}
      >
        {restaurantName}
      </div>
    </div>
  );
}
