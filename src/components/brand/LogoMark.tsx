interface LogoMarkProps {
  size?: number;
  className?: string;
  variant?: "light" | "dark";
}

/**
 * Primary icon — cloche dorée (PNG transparent, ton vrai logo).
 * Source : public/brand/cloche.png (600×378, fond transparent).
 * Use for: header (28–32px), favicon, QR coasters, tight spaces.
 */
export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <img
      src="/brand/logo-mark.svg"
      width={size}
      height={size}
      alt="Plateform"
      className={className}
      draggable={false}
      style={{ display: "inline-block", flexShrink: 0, objectFit: "contain" }}
    />
  );
}
