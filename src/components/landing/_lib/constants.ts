import type { FrameCorner, MiniSpec } from "./types";

export const BRONZE_GRADIENT =
  "linear-gradient(135deg, hsl(28,62%,38%) 0%, hsl(22,70%,50%) 100%)";

export const BRONZE_GRADIENT_ICON =
  "linear-gradient(135deg, hsl(28,62%,42%) 0%, hsl(22,70%,50%) 100%)";

export const CARD_BG =
  "linear-gradient(135deg, hsl(38,34%,96%) 0%, hsl(36,26%,91%) 55%, hsl(34,22%,88%) 100%)";

export const QR_CARD_BG =
  "linear-gradient(135deg, hsl(38,34%,98%), hsl(36,26%,93%))";

export const HALO_BG =
  "radial-gradient(ellipse 60% 50% at 50% 55%, hsl(28,62%,42%,.10) 0%, transparent 60%)";

export const DECO_LINE_BG =
  "linear-gradient(90deg, transparent 0%, hsl(28,62%,42%,.35) 50%, transparent 100%)";

export const FRAME_CORNERS: FrameCorner[] = [
  { top: 6, left: 6, rot: 0 },
  { top: 6, right: 6, rot: 90 },
  { bottom: 6, right: 6, rot: 180 },
  { bottom: 6, left: 6, rot: 270 },
];

export const MINI_SPECS: MiniSpec[] = [
  { label: "טעינה", value: "<0.8s" },
  { label: "WebXR", value: "iOS · Android" },
];

export const RESPONSIVE_BREAKPOINT_PX = 900;
export const DOT_ACTIVE_W = 22;
export const DOT_W = 6;
export const QR_SIZE = 120;
export const QR_PATTERN_CELLS = 18;
