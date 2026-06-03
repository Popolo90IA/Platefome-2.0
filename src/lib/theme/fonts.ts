/* ─────────────────────────────────────────────────
   FONT PACKS
   ───────────────────────────────────────────────── */

export interface FontPack {
  key: string;
  label: string;
  headingFont: string;
  bodyFont: string;
  sample: string;
}

export const FONT_PACKS: FontPack[] = [
  {
    key: "elegant",
    label: "אלגנטי",
    headingFont: "'Noto Serif Hebrew', 'Cormorant Garamond', serif",
    bodyFont: "'DM Sans', 'Helvetica Neue', sans-serif",
    sample: "קורמונד",
  },
  {
    key: "modern",
    label: "מודרני",
    headingFont: "'DM Sans', 'Helvetica Neue', sans-serif",
    bodyFont: "'DM Sans', 'Helvetica Neue', sans-serif",
    sample: "DM Sans",
  },
  {
    key: "hebrew",
    label: "עברי",
    headingFont: "'Noto Serif Hebrew', serif",
    bodyFont: "'Heebo', 'Arial Hebrew', sans-serif",
    sample: "נוטו",
  },
];

export function getFontPack(key: string | null | undefined): FontPack {
  return FONT_PACKS.find((f) => f.key === (key ?? "elegant")) ?? FONT_PACKS[0]!;
}
