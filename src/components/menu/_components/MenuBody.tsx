"use client";

import type { Restaurant, Category, Dish, Language } from "@/types/database.types";
import type { FontPack, MenuLayout, MenuCategoryStyle, MenuHeroStyle } from "@/lib/theme";
import { DesktopSidebarNav } from "./DesktopSidebarNav";
import { MenuSection } from "./MenuSection";
import { SearchEmpty, MenuEmpty } from "./EmptyStates";

type DishGroup = { category: Category; dishes: Dish[] };

/* ── MenuBody — main column: optional sidebar nav + dish sections / empties ── */
export function MenuBody({
  restaurant,
  categories,
  currency,
  catStyle,
  isMobile,
  isSearching,
  search,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  heroStyle,
  lang,
  dir,
  fontPack,
  menuLayout,
  filteredDishes,
  dishesByCategory,
  onOpenDish,
}: {
  restaurant: Restaurant;
  categories: Category[];
  currency: string;
  catStyle: MenuCategoryStyle;
  isMobile: boolean;
  isSearching: boolean;
  search: string;
  onSearchChange: (v: string) => void;
  activeCategory: string | null;
  onSelectCategory: (id: string) => void;
  heroStyle: MenuHeroStyle;
  lang: Language;
  dir: "ltr" | "rtl";
  fontPack: FontPack;
  menuLayout: MenuLayout;
  filteredDishes: Dish[];
  dishesByCategory: DishGroup[];
  onOpenDish: (d: Dish) => void;
}) {
  const sidebar = catStyle === "sidebar";
  let dishGlobalIdx = 0;

  return (
    <main style={sidebar && !isMobile ? { display: "flex", maxWidth: 860, margin: "0 auto" } : undefined}>
      {sidebar && !isMobile && (
        <DesktopSidebarNav
          categories={categories}
          activeCategory={activeCategory}
          isSearching={isSearching}
          onSelectCategory={onSelectCategory}
          search={search}
          onSearchChange={onSearchChange}
          heroStyle={heroStyle}
          lang={lang}
          dir={dir}
          fontPack={fontPack}
        />
      )}

      <div style={sidebar ? { flex: 1, minWidth: 0 } : undefined}>
        {isSearching && filteredDishes.length === 0 ? (
          <SearchEmpty lang={lang} onClear={() => onSearchChange("")} />
        ) : dishesByCategory.length === 0 ? (
          <MenuEmpty lang={lang} />
        ) : (
          dishesByCategory.map(({ category, dishes: catDishes }) => {
            if (isSearching && catDishes.length === 0) return null;
            const startIdx = dishGlobalIdx;
            dishGlobalIdx += catDishes.length;
            return (
              <MenuSection
                key={category.id}
                category={category}
                dishes={catDishes}
                startIdx={startIdx}
                restaurantId={restaurant.id}
                currency={currency}
                menuLayout={menuLayout}
                fontPack={fontPack}
                lang={lang}
                onOpenDish={onOpenDish}
              />
            );
          })
        )}

        <div style={{ height: 80 }} />
      </div>
    </main>
  );
}
