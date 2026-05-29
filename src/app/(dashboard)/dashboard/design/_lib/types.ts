/**
 * DesignTab — clés des 4 onglets du panneau de design.
 */
export type DesignTab = "color" | "font" | "layout" | "images";

/**
 * PreviewMode — mode d'aperçu iframe (mobile/tablet/desktop).
 */
export type PreviewMode = "mobile" | "tablet" | "desktop";

/**
 * DesignForm — état du formulaire design (couleurs, fonts, layout, médias).
 * name/description en lecture seule, utilisés pour le preview live.
 */
export type DesignForm = {
  theme_primary: string;
  theme_dark_mode: boolean;
  theme_font_pack: string;
  menu_layout: string;
  menu_hero_style: string;
  menu_category_style: string;
  logo_url: string | null;
  banner_url: string | null;
  name: string;
  description: string;
};

/**
 * PanelSize — dimensions mesurées du panneau preview.
 */
export type PanelSize = {
  w: number;
  h: number;
};

/**
 * DeviceDim — dimensions virtuelles d'un device pour le preview.
 */
export type DeviceDim = {
  w: number;
  h: number;
};

/**
 * FrameMetrics — métriques calculées pour le rendu du device scaled.
 */
export type FrameMetrics = {
  iW: number;
  iH: number;
  borderW: number;
  radius: number;
  scale: number;
  frameW: number;
  frameH: number;
};
