"use client";

import { pickLocalized } from "@/lib/i18n";
import type { Category, Language } from "@/types/database.types";
import type { FontPack } from "@/lib/theme";
import { D } from "../_lib/constants";
import { CategoryTab } from "./CategoryTab";

type MobileCategoryNavProps = {
  categories: Category[];
  activeCategory: string | null;
  isSearching: boolean;
  onSelectCategory: (catId: string) => void;
  lang: Language;
  fontPack: FontPack;
};

/**
 * Horizontal scrollable category nav, used when catStyle === "sidebar"
 * on mobile (sidebar is hidden on small screens).
 */
export function MobileCategoryNav({
  categories,
  activeCategory,
  isSearching,
  onSelectCategory,
  lang,
  fontPack,
}: MobileCategoryNavProps) {
  if (categories.length === 0) return null;
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        gap: 6,
        overflowX: "auto",
        overflowY: "hidden",
        scrollbarWidth: "none",
        background: D.card,
        borderBottom: `1px solid ${D.line}`,
        padding: "10px 14px",
      }}
    >
      {categories.map((cat) => {
        const catName =
          pickLocalized(
            cat as unknown as Record<string, unknown>,
            "name",
            lang,
          ) || cat.name;
        const isActive = !isSearching && activeCategory === cat.id;
        return (
          <CategoryTab
            key={cat.id}
            label={catName}
            isActive={isActive}
            onClick={() => onSelectCategory(cat.id)}
            variant="mobile-sidebar"
            fontPack={fontPack}
          />
        );
      })}
    </nav>
  );
}
