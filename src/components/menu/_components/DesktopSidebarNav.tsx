"use client";

import { pickLocalized } from "@/lib/i18n";
import type { Category, Language } from "@/types/database.types";
import type { MenuHeroStyle, FontPack } from "@/lib/theme";
import { D } from "../_lib/constants";

type DesktopSidebarNavProps = {
  categories: Category[];
  activeCategory: string | null;
  isSearching: boolean;
  onSelectCategory: (catId: string) => void;
  search: string;
  onSearchChange: (v: string) => void;
  heroStyle: MenuHeroStyle;
  lang: Language;
  dir: "ltr" | "rtl";
  fontPack: FontPack;
};

/**
 * Vertical sticky sidebar (desktop only, when catStyle === "sidebar").
 * Embeds its own compact search input + button list with active-bar accent.
 */
export function DesktopSidebarNav({
  categories,
  activeCategory,
  isSearching,
  onSelectCategory,
  search,
  onSearchChange,
  heroStyle,
  lang,
  dir,
  fontPack,
}: DesktopSidebarNavProps) {
  if (categories.length === 0) return null;
  const heroHeight = heroStyle === "minimal" ? 200 : 360;

  return (
    <nav
      style={{
        width: 160,
        flexShrink: 0,
        position: "sticky",
        top: heroHeight,
        alignSelf: "flex-start",
        height: `calc(100vh - ${heroHeight}px)`,
        overflowY: "auto",
        borderInlineEnd: `1px solid ${D.line}`,
        padding: "24px 0",
        scrollbarWidth: "none",
      }}
    >
      {/* Search inside sidebar */}
      <div style={{ padding: "0 12px 16px", position: "relative" }}>
        <svg
          aria-hidden
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            position: "absolute",
            top: "50%",
            insetInlineStart: 22,
            transform: "translateY(-50%)",
            color: D.textDim,
            pointerEvents: "none",
          }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="חיפוש"
          dir={dir}
          style={{
            width: "100%",
            paddingInlineStart: 28,
            paddingInlineEnd: 8,
            paddingTop: 7,
            paddingBottom: 7,
            borderRadius: 8,
            background: D.surface,
            border: `1px solid ${D.line}`,
            color: D.cream,
            fontFamily: "var(--font-body)",
            fontSize: 12,
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {categories.map((cat) => {
        const catName =
          pickLocalized(
            cat as unknown as Record<string, unknown>,
            "name",
            lang,
          ) || cat.name;
        const isActive = !isSearching && activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "start",
              padding: "9px 16px",
              paddingInlineStart: 13,
              background: isActive ? `${D.gold}18` : "transparent",
              borderTop: "none",
              borderBottom: "none",
              borderInlineEnd: "none",
              borderInlineStart: `3px solid ${isActive ? D.gold : "transparent"}`,
              color: isActive ? D.gold : D.textDim,
              fontFamily: fontPack.bodyFont,
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              cursor: "pointer",
              transition: "all .15s",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {catName}
          </button>
        );
      })}
    </nav>
  );
}
