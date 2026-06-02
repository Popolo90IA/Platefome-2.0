import { COASTER_IDX } from "../../_lib/constants";
import type { Format } from "../../_lib/types";

/**
 * Calcule dimensions QR + couleurs texte en fonction du format/bg.
 */
export function computeStageStyling(
  format: Format,
  formatIdx: number,
  isDarkBg: boolean
) {
  const cardW = format.width;
  const cardH = format.height;
  const isLandscape = cardW > cardH;
  const isCoaster = formatIdx === COASTER_IDX;
  const qrSize = isCoaster
    ? Math.round(cardW * 0.62)
    : Math.min(cardW, cardH) * 0.5;
  const textColor = isDarkBg ? "#f6f4ef" : "hsl(28,15%,18%)";
  const subtitleColor = isDarkBg
    ? "rgba(246,244,239,.55)"
    : "hsl(28,15%,40%)";
  const accentColor = "hsl(28,62%,38%)";

  return {
    cardW,
    cardH,
    isLandscape,
    isCoaster,
    qrSize,
    textColor,
    subtitleColor,
    accentColor,
  };
}

export type StageStyling = ReturnType<typeof computeStageStyling>;
