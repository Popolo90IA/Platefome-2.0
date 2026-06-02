/** Circonférence du cercle guide (r=90 → 2πr ≈ 565.48). */
export const GUIDE_CIRCUMFERENCE = 565.48;

/** Rayon du cercle guide overlay. */
export const GUIDE_RADIUS = 90;

/** Compress image max width par défaut. */
export const COMPRESS_MAX_WIDTH = 1024;

/** Compress image JPEG quality par défaut. */
export const COMPRESS_QUALITY = 0.75;

/** Capture JPEG quality (avant compression). */
export const CAPTURE_QUALITY = 0.9;

/** Vidéo getUserMedia constraints idéal. */
export const VIDEO_CONSTRAINTS = {
  facingMode: { ideal: "environment" as const },
  width: { ideal: 1920 },
  height: { ideal: 1080 },
};

/** Durée du flash visuel après capture (ms). */
export const FLASH_DURATION_MS = 80;

/** Délai avant onComplete après done. */
export const COMPLETE_DELAY_MS = 600;
