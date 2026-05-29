import type { Format, BgSwatch, QrStyle, QrVariant } from "./types";

/**
 * CARD — style commun des cards sidebar (fond + bordure + radius).
 */
export const CARD: React.CSSProperties = {
  background: "hsl(var(--deep))",
  border: "1px solid hsl(var(--line))",
  borderRadius: 14,
  padding: 20,
};

/**
 * FORMATS — presets format d'impression.
 */
export const FORMATS: ReadonlyArray<Format> = [
  { label: "Tent · A6", ratio: "140/200", width: 280, height: 400 },
  { label: "Coaster", ratio: "1", width: 280, height: 280 },
  { label: "Card", ratio: "85/55", width: 320, height: 207 },
  { label: "Poster", ratio: "70/100", width: 240, height: 343 },
];

/**
 * Index du format Coaster (carré) — layout spécial.
 */
export const COASTER_IDX = 1;

/**
 * BG_SWATCHES — presets fond carte.
 */
export const BG_SWATCHES: ReadonlyArray<BgSwatch> = [
  {
    bg: "linear-gradient(135deg, #f6f4ef, #ede7d8)",
    label: "בז'",
    border: false,
  },
  { bg: "hsl(28,15%,12%)", label: "כהה", border: false },
  { bg: "hsl(28,62%,42%)", label: "ברונזה", border: false },
  { bg: "#ffffff", label: "לבן", border: true },
];

/**
 * Indexes BG_SWATCHES considérés comme sombres (texte clair).
 */
export const DARK_BG_INDEXES: ReadonlyArray<number> = [1, 2];

/**
 * QR_STYLES — presets couleurs QR.
 */
export const QR_STYLES: ReadonlyArray<QrStyle> = [
  { fg: "hsl(28,15%,18%)", bg: "#ffffff", label: "רגיל" },
  { fg: "hsl(28,62%,42%)", bg: "#ffffff", label: "ברונזה" },
  { fg: "#ffffff", bg: "hsl(28,15%,12%)", label: "הפוך" },
];

/**
 * QR_VARIANTS — strip 4 variantes téléchargeables (canvas bottom).
 */
export const QR_VARIANTS: ReadonlyArray<QrVariant> = [
  {
    label: "סטנדרטי",
    size: "PNG · 1024px",
    fg: "hsl(28,15%,18%)",
    bg: "white",
  },
  {
    label: "בצבע ברונזה",
    size: "SVG · vector",
    fg: "hsl(28,62%,42%)",
    bg: "white",
  },
  {
    label: "היפוך כהה",
    size: "PNG · 1024px",
    fg: "white",
    bg: "hsl(28,15%,12%)",
  },
  {
    label: "סגנון רך",
    size: "SVG · vector",
    fg: "hsl(28,15%,18%)",
    bg: "#f6f4ef",
  },
];

/**
 * CANVAS_TABS — onglets du canvas central.
 */
export const CANVAS_TABS: ReadonlyArray<string> = [
  "תצוגה תלת-מימדית",
  "קדמי",
  "אחורי",
  "פריסה להדפסה",
];

/**
 * DEFAULT_CTA — texte call-to-action initial.
 */
export const DEFAULT_CTA = "סרוק לתפריט בתלת מימד";

/**
 * DEFAULT_DESC — description initiale.
 */
export const DEFAULT_DESC = "ראה כל מנה לפני שאתה מזמין";

/**
 * DEFAULT_TABLE_COUNT — nombre de tables par défaut pour devis impression.
 */
export const DEFAULT_TABLE_COUNT = 24;

/**
 * MAX_TABLE_COUNT — limite max input number.
 */
export const MAX_TABLE_COUNT = 200;

/**
 * MAX_PRINT_GRID — nombre max QR affichés dans la grille tab "פריסה להדפסה".
 */
export const MAX_PRINT_GRID = 24;

/**
 * COPIED_TOAST_MS — durée d'affichage du toast "הועתק".
 */
export const COPIED_TOAST_MS = 2000;
