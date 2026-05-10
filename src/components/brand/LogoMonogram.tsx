interface LogoMonogramProps {
  size?: number;
  className?: string;
}

/**
 * Bronze tile monogram — P on a bronze gradient square.
 * Use for: restaurant card placeholder (64px), admin avatar fallback,
 * push notification icon, any light background requiring a solid colour block.
 */
export function LogoMonogram({ size = 64, className }: LogoMonogramProps) {
  return (
    <img
      src="/brand/logo-monogram.svg"
      width={size}
      height={size}
      alt="Plateform"
      className={className}
      draggable={false}
      style={{ display: "inline-block", flexShrink: 0 }}
    />
  );
}
