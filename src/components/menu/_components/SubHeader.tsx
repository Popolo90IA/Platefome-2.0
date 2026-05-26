"use client";

import { pickLocalized } from "@/lib/i18n";
import type { Category, Language } from "@/types/database.types";
import type { MenuCategoryStyle, FontPack } from "@/lib/theme";
import { D } from "../_lib/constants";
import { CategoryTab } from "./CategoryTab";
import { SearchBar } from "./SearchBar";

type SubHeaderProps = {
  categories: Category[];
  catStyle: MenuCategoryStyle;
  activeCategory: string | null;
  isSearching: boolean;
  onSelectCategory: (catId: string) => void;
  search: string;
  onSearchChange: (v: string) => void;
  lang: Language;
  dir: "ltr" | "rtl";
  fontPack: FontPack;
};

/**
 * Sticky sub-header : category tabs (pills or underline) + search bar.
 * Hidden when catStyle === "sidebar" (sidebar renders inline elsewhere).
 */
export function SubHeader({
  categories,
  catStyle,
  activeCategory,
  isSearching,
  onSelectCategory,
  search,
  onSearchChange,
  lang,
  dir,
  fontPack,
}: SubHeaderProps) {
  if (categories.length === 0 || catStyle === "sidebar") return null;

  const variant = catStyle === "pills" ? "pills" : "underline";

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: `${D.page}ee`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${D.line}`,
      }}
    >
      <div
        style={{
          padding: "12px 24px 0",
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            display: "flex",
            gap: catStyle === "pills" ? 6 : 0,
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
                variant={variant}
                fontPack={fontPack}
              />
            );
          })}
        </div>
      </div>

      <SearchBar
        value={search}
        onChange={onSearchChange}
        lang={lang}
        dir={dir}
      />
    </nav>
  );
}
