interface LogoMonogramProps {
  size?: number;
  className?: string;
}

/**
 * Tuile bronze — cloche dorée (ton vrai logo) sur fond bronze arrondi.
 * Use for: card placeholder, admin avatar, push icon, app icon.
 */
export function LogoMonogram({ size = 64, className }: LogoMonogramProps) {
  const bellWidth = Math.round(size * 0.72);
  const bellHeight = Math.round(bellWidth / 1.587);
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
        src="/brand/cloche.png"
        width={bellWidth}
        height={bellHeight}
        alt="Plateform"
        draggable={false}
        style={{
          objectFit: "contain",
          // La cloche est dorée — sur fond bronze elle se fond.
          // On l'éclaircit avec un filter pour la faire ressortir en or clair/blanc cassé.
          filter: "brightness(1.6) saturate(0.4)",
        }}
      />
    </span>
  );
}
