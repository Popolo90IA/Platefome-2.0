"use client";

import { Share2 } from "lucide-react";
import { LANGUAGE_META } from "@/lib/i18n";
import type { Language } from "@/types/database.types";
import type { MenuHeroStyle, FontPack } from "@/lib/theme";
import { D } from "../_lib/constants";

type UtilityBarProps = {
  lang: Language;
  available: Language[];
  langOpen: boolean;
  onToggleLangOpen: () => void;
  onBlurLangOpen: () => void;
  onSelectLang: (l: Language) => void;
  onShare: () => void;
  heroStyle: MenuHeroStyle;
  fontPack: FontPack;
};

/**
 * Top utility bar : language pill + share pill (positioned over the hero).
 */
export function UtilityBar({
  lang,
  available,
  langOpen,
  onToggleLangOpen,
  onBlurLangOpen,
  onSelectLang,
  onShare,
  heroStyle,
  fontPack,
}: UtilityBarProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        maxWidth: 720,
        width: "calc(100% - 48px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Language pill */}
      <div style={{ position: "relative" }}>
        <button
          type="button"
          onClick={onToggleLangOpen}
          onBlur={onBlurLangOpen}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            borderRadius: 99,
            background:
              heroStyle === "minimal" ? D.surface : "hsl(28,18%,6%,.6)",
            backdropFilter: "blur(16px)",
            border: `1px solid ${D.line}`,
            fontFamily: "var(--font-mono)",
            fontSize: "10.5px",
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: D.text,
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 14 }}>{LANGUAGE_META[lang].flag}</span>
          {lang.toUpperCase()}
          {available.length > 1 && (
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ opacity: 0.6 }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
        </button>
        {langOpen && available.length > 1 && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              insetInlineStart: 0,
              minWidth: 160,
              background: D.card,
              border: `1px solid ${D.line2}`,
              borderRadius: 12,
              overflow: "hidden",
              zIndex: 50,
              boxShadow: "0 16px 40px rgba(0,0,0,.5)",
            }}
          >
            {available.map((l) => (
              <button
                key={l}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelectLang(l);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "11px 16px",
                  background: l === lang ? `${D.gold}1a` : "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: fontPack.bodyFont,
                  fontSize: 13.5,
                  color: l === lang ? D.gold : D.text,
                  textAlign: "start",
                }}
                dir={LANGUAGE_META[l].dir}
              >
                <span style={{ fontSize: 16 }}>{LANGUAGE_META[l].flag}</span>
                {LANGUAGE_META[l].label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Share pill */}
      <button
        type="button"
        onClick={onShare}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          borderRadius: 99,
          background: heroStyle === "minimal" ? D.surface : "hsl(28,18%,6%,.6)",
          backdropFilter: "blur(16px)",
          border: `1px solid ${D.line}`,
          fontFamily: "var(--font-mono)",
          fontSize: "10.5px",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: D.text,
          cursor: "pointer",
        }}
      >
        <Share2 style={{ width: 11, height: 11 }} strokeWidth={1.6} />
        Share
      </button>
    </div>
  );
}
