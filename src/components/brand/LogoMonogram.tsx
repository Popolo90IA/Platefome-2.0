interface LogoMonogramProps {
  size?: number;
  className?: string;
}

/**
 * Tuile bronze — cloche dorée (ton vrai logo) sur fond bronze arrondi.
 * Use for: card placeholder, admin avatar, push icon, app icon.
 */
export function LogoMonogram({ size = 64, className }: LogoMonogramProps) {
  const iconSize = Math.round(size * 0.72);
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.2),
        background: "linear-gradient(135deg, hsl(28,62%,38%) 0%, hsl(22,70%,50%) 100%)",
        flexShrink: 0,
      }}
    >
      <img
        src="/brand/logo-mark.svg"
        width={iconSize}
        height={iconSize}
        alt="Plateform"
        draggable={false}
        style={{ objectFit: "contain", filter: "brightness(1.8) saturate(0.3)" }}
      />
    </span>
  );
}
