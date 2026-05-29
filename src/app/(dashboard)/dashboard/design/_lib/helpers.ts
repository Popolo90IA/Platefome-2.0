import type { DeviceDim, FrameMetrics, PreviewMode } from "./types";
import {
  MOBILE_BORDER_W,
  MOBILE_DIM,
  MOBILE_RADIUS,
  PREVIEW_GAP_H,
  PREVIEW_GAP_V,
  PREVIEW_HEADER_OFFSET,
  PREVIEW_TOOLBAR_H,
  TABLET_BORDER_W,
  TABLET_LANDSCAPE_DIM,
  TABLET_PORTRAIT_DIM,
  TABLET_RADIUS,
} from "./constants";

/**
 * deviceDim — dimensions virtuelles selon mode + orientation tablette.
 */
export function deviceDim(
  mode: PreviewMode,
  tabletLandscape: boolean,
): DeviceDim {
  if (mode === "mobile") return MOBILE_DIM;
  if (mode === "tablet")
    return tabletLandscape ? TABLET_LANDSCAPE_DIM : TABLET_PORTRAIT_DIM;
  return MOBILE_DIM; // not used for desktop
}

/**
 * deviceBorder — épaisseur de bordure châssis selon mode.
 */
export function deviceBorder(mode: PreviewMode): number {
  return mode === "mobile" ? MOBILE_BORDER_W : TABLET_BORDER_W;
}

/**
 * deviceRadius — radius châssis selon mode.
 */
export function deviceRadius(mode: PreviewMode): number {
  return mode === "mobile" ? MOBILE_RADIUS : TABLET_RADIUS;
}

/**
 * computeFrameMetrics — pour mobile/tablet, calcule scale + dimensions finales
 * pour faire rentrer le device virtuel dans l'espace disponible.
 *  - windowH : window.innerHeight
 *  - panelW : largeur réelle mesurée du panneau preview
 */
export function computeFrameMetrics(
  mode: PreviewMode,
  tabletLandscape: boolean,
  windowH: number,
  panelW: number,
): FrameMetrics {
  const { w: iW, h: iH } = deviceDim(mode, tabletLandscape);
  const borderW = deviceBorder(mode);
  const radius = deviceRadius(mode);
  const availH = Math.max(
    windowH - PREVIEW_HEADER_OFFSET - PREVIEW_TOOLBAR_H - PREVIEW_GAP_V,
    100,
  );
  const availW = Math.max(panelW - PREVIEW_GAP_H, 100);
  const scale = Math.min(
    (availH - borderW * 2) / iH,
    (availW - borderW * 2) / iW,
  );
  return {
    iW,
    iH,
    borderW,
    radius,
    scale,
    frameW: (iW + borderW * 2) * scale,
    frameH: (iH + borderW * 2) * scale,
  };
}

/**
 * buildPreviewUrl — URL du menu en mode preview pour l'iframe.
 */
export function buildPreviewUrl(slug: string | null | undefined): string | null {
  if (!slug) return null;
  return `/menu/${slug}?preview=1`;
}
