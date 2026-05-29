import type { DesignForm, DeviceDim } from "./types";

/**
 * DEFAULT_THEME_PRIMARY — couleur primaire par défaut.
 */
export const DEFAULT_THEME_PRIMARY = "hsl(28,62%,42%)";

/**
 * DEFAULT_FORM — état initial du formulaire design.
 */
export const DEFAULT_FORM: DesignForm = {
  theme_primary: DEFAULT_THEME_PRIMARY,
  theme_dark_mode: true,
  theme_font_pack: "elegant",
  menu_layout: "grid",
  menu_hero_style: "default",
  menu_category_style: "pills",
  logo_url: null,
  banner_url: null,
  name: "",
  description: "",
};

/**
 * DEFAULT_PANEL_SIZE — dimensions de fallback pour le panneau preview avant
 * mesure du DOM.
 */
export const DEFAULT_PANEL_SIZE = { w: 700, h: 580 };

/**
 * MOBILE_DIM — dimensions virtuelles d'un mobile portrait (iPhone-like).
 */
export const MOBILE_DIM: DeviceDim = { w: 390, h: 844 };

/**
 * TABLET_PORTRAIT_DIM — dimensions tablette portrait (iPad).
 */
export const TABLET_PORTRAIT_DIM: DeviceDim = { w: 768, h: 1024 };

/**
 * TABLET_LANDSCAPE_DIM — dimensions tablette paysage.
 */
export const TABLET_LANDSCAPE_DIM: DeviceDim = { w: 1024, h: 768 };

/**
 * MOBILE_BORDER_W — bordure simulant un châssis mobile.
 */
export const MOBILE_BORDER_W = 10;

/**
 * TABLET_BORDER_W — bordure simulant un châssis tablette.
 */
export const TABLET_BORDER_W = 8;

/**
 * MOBILE_RADIUS — radius mobile.
 */
export const MOBILE_RADIUS = 44;

/**
 * TABLET_RADIUS — radius tablette.
 */
export const TABLET_RADIUS = 16;

/**
 * SAVED_TOAST_MS — délai d'affichage du toast "נשמר".
 */
export const SAVED_TOAST_MS = 3000;

/**
 * IFRAME_READY_FALLBACK_MS — délai après onLoad avant de forcer envoi du
 * preview si l'iframe n'a pas envoyé son ping ready.
 */
export const IFRAME_READY_FALLBACK_MS = 500;

/**
 * PREVIEW_TOOLBAR_H — hauteur de la barre toolbar (utilisée pour le calcul
 * de la zone d'aperçu disponible).
 */
export const PREVIEW_TOOLBAR_H = 44;

/**
 * PREVIEW_HEADER_OFFSET — offset entre le top window et le panneau preview.
 */
export const PREVIEW_HEADER_OFFSET = 80;

/**
 * PREVIEW_GAP_V — gap vertical entre toolbar et frame.
 */
export const PREVIEW_GAP_V = 16;

/**
 * PREVIEW_GAP_H — marge horizontale autour de la frame scaled.
 */
export const PREVIEW_GAP_H = 16;
