"use client";

import type { Restaurant, Category, Dish } from "@/types/database.types";
import { D, GRAIN_SVG } from "./_lib/constants";
import { useMenuView } from "./_lib/hooks/useMenuView";
import { Hero } from "./_components/Hero";
import { SubHeader } from "./_components/SubHeader";
import { MobileCategoryNav } from "./_components/MobileCategoryNav";
import { MenuBody } from "./_components/MenuBody";
import { MenuFooter } from "./_components/MenuFooter";
import { DishModal } from "./_components/DishModal";

export type { PreviewOverride } from "./_lib/types";

interface MenuViewProps {
  restaurant: Restaurant;
  categories: Category[];
  dishes: Dish[];
  slug?: string;
}

/**
 * Public menu page : hero + sticky category nav (or sidebar) + sections of
 * dish cards + footer + detail modal. State and side-effects live in
 * `useMenuView`; presentation is split across `_components/`.
 */
export function MenuView({ restaurant, categories, dishes }: MenuViewProps) {
  const {
    lang,
    available,
    langOpen,
    dir,
    toggleLangOpen,
    blurLangOpen,
    selectLang,
    activeCategory,
    modalDish,
    setModalDish,
    search,
    setSearch,
    isMobile,
    isSearching,
    themeVars,
    fontPack,
    menuLayout,
    heroStyle,
    catStyle,
    filteredDishes,
    dishesByCategory,
    selectCategory,
    handleShare,
  } = useMenuView({ restaurant, categories, dishes });

  const currency = restaurant.currency || "ILS";

  return (
    <div
      dir={dir}
      style={{
        ...themeVars,
        minHeight: "100vh",
        background: D.page,
        color: D.text,
        fontFamily: fontPack.bodyFont,
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Grain texture overlay */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage: GRAIN_SVG,
          backgroundSize: "240px",
          opacity: 0.06,
          mixBlendMode: "screen",
        }}
      />

      <Hero
        restaurant={restaurant}
        heroStyle={heroStyle}
        fontPack={fontPack}
        lang={lang}
        available={available}
        langOpen={langOpen}
        onToggleLangOpen={toggleLangOpen}
        onBlurLangOpen={blurLangOpen}
        onSelectLang={selectLang}
        onShare={handleShare}
      />

      <SubHeader
        categories={categories}
        catStyle={catStyle}
        activeCategory={activeCategory}
        isSearching={isSearching}
        onSelectCategory={selectCategory}
        search={search}
        onSearchChange={setSearch}
        lang={lang}
        dir={dir}
        fontPack={fontPack}
      />

      {catStyle === "sidebar" && isMobile && (
        <MobileCategoryNav
          categories={categories}
          activeCategory={activeCategory}
          isSearching={isSearching}
          onSelectCategory={selectCategory}
          lang={lang}
          fontPack={fontPack}
        />
      )}

      <MenuBody
        restaurant={restaurant}
        categories={categories}
        currency={currency}
        catStyle={catStyle}
        isMobile={isMobile}
        isSearching={isSearching}
        search={search}
        onSearchChange={setSearch}
        activeCategory={activeCategory}
        onSelectCategory={selectCategory}
        heroStyle={heroStyle}
        lang={lang}
        dir={dir}
        fontPack={fontPack}
        menuLayout={menuLayout}
        filteredDishes={filteredDishes}
        dishesByCategory={dishesByCategory}
        onOpenDish={(d) => setModalDish(d)}
      />

      <MenuFooter lang={lang} />

      {modalDish && (
        <DishModal
          dish={modalDish}
          restaurantId={restaurant.id}
          lang={lang}
          currency={currency}
          headingFont={fontPack.headingFont}
          bodyFont={fontPack.bodyFont}
          onClose={() => setModalDish(null)}
        />
      )}
    </div>
  );
}
