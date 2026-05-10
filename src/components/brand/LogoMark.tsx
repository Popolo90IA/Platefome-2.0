interface LogoMarkProps {
  size?: number;
  className?: string;
  /** "light" (default) = plate on beige, "dark" = plate on dark bg */
  variant?: "light" | "dark";
}

/**
 * Primary icon — plate + italic P + orbit ring.
 * Use for: header (28–32px), favicon, app icon, tight spaces.
 */
export function LogoMark({ size = 32, className, variant = "light" }: LogoMarkProps) {
  return (
    <img
      src="/brand/logo-mark.svg"
      width={size}
      height={size}
      alt="Plateform"
      className={className}
      draggable={false}
      style={{ display: "inline-block", flexShrink: 0 }}
    />
  );
}
