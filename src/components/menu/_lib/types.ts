/**
 * Message payload type for live preview overrides — used by the dashboard
 * preview iframe to inject theme/layout values via window.postMessage.
 */
export interface PreviewOverride {
  theme_primary?: string;
  theme_dark_mode?: boolean;
  theme_font_pack?: string;
  menu_layout?: string;
  menu_hero_style?: string;
  menu_category_style?: string;
}
