interface LogoLockupProps {
  width?: number;
  className?: string;
}

/**
 * Horizontal lockup — mark + "Plateform" wordmark + tagline.
 * Use for: marketing hero, auth pages (180px), email headers (200px),
 * public page footers (140px).
 *
 * The SVG renders correctly on both light (beige) backgrounds.
 * For dark backgrounds use the `wordmark.svg` asset directly with
 * colour-adjusted text (TODO: produce logo-lockup-dark.svg variant).
 */
export function LogoLockup({ width = 180, className }: LogoLockupProps) {
  // Native aspect ratio of logo-lockup.svg is 800 × 220
  const height = Math.round(width * (220 / 800));
  return (
    <img
      src="/brand/logo-lockup.svg"
      width={width}
      height={height}
      alt="Plateform — Every dish, in 360°"
      className={className}
      draggable={false}
      style={{ display: "inline-block", flexShrink: 0 }}
    />
  );
}
