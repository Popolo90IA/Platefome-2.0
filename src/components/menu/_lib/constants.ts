/**
 * CSS variable aliases for the client menu view.
 * The variables themselves are produced by buildMenuTheme() and applied
 * inline on the root <div> of <MenuView />.
 */
export const D = {
  page: "var(--mt-page)",
  section: "var(--mt-section)",
  card: "var(--mt-card)",
  surface: "var(--mt-surface)",
  line: "var(--mt-line)",
  line2: "var(--mt-line2)",
  textDim: "var(--mt-text-dim)",
  text: "var(--mt-text)",
  cream: "var(--mt-cream)",
  gold: "var(--mt-gold)",
  goldLt: "var(--mt-gold-lt)",
  grad: "var(--mt-grad)",
} as const;

/**
 * Inline SVG fractal-noise grain texture used as a fixed full-page overlay.
 * Inlined as a data URI so it never triggers an external request.
 */
export const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='.12'/%3E%3C/svg%3E")`;
