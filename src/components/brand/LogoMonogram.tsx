interface LogoMonogramProps {
  size?: number;
  className?: string;
}

/**
 * Tuile bronze — cloche dorée (vagues entrelacées) sur fond bronze.
 * SVG inline, vectoriel, fond transparent autour de la tuile.
 * Use for: card placeholder, admin avatar, push icon, app icon.
 */
export function LogoMonogram({ size = 64, className }: LogoMonogramProps) {
  const id = `mono-${size}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      aria-label="Plateform"
      role="img"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(28,62%,38%)" />
          <stop offset="1" stopColor="hsl(22,70%,50%)" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="24" fill={`url(#${id}-bg)`} />

      <g
        transform="translate(0, 10)"
        fill="none"
        stroke="hsl(38,50%,94%)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Poignée */}
        <circle cx="60" cy="20" r="3.6" />
        {/* Dôme */}
        <path d="M 22 76 Q 22 28 60 28 Q 98 28 98 76" />
        {/* Vagues entrelacées */}
        <path d="M 28 56 C 38 44, 50 70, 60 56 C 70 42, 82 70, 92 56" />
        <path d="M 28 56 C 38 70, 50 44, 60 56 C 70 70, 82 44, 92 56" />
        {/* Plateau */}
        <line x1="14" y1="80" x2="106" y2="80" />
        <path d="M 14 80 Q 60 90 106 80" />
      </g>
      <circle cx="26" cy="60" r="1.8" fill="hsl(38,50%,94%)" />
      <circle cx="38" cy="54" r="1.2" fill="hsl(38,50%,94%)" />
      <circle cx="94" cy="56" r="1.5" fill="hsl(38,50%,94%)" />
    </svg>
  );
}
