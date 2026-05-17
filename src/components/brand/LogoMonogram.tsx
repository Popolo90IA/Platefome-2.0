interface LogoMonogramProps {
  size?: number;
  className?: string;
}

/**
 * Tuile bronze — cloche dorée sur fond bronze.
 * SVG inline (pas d'<img>) pour cohérence sur toute l'app.
 * Use for: restaurant card placeholder, admin avatar fallback,
 * push notification icon, light backgrounds requiring a solid block.
 */
export function LogoMonogram({ size = 64, className }: LogoMonogramProps) {
  const id = `mono-${size}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className={className}
      aria-label="Plateform"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(28,62%,38%)" />
          <stop offset="1" stopColor="hsl(22,70%,50%)" />
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="16" fill={`url(#${id}-bg)`} />
      <g transform="translate(8, 8)" stroke="hsl(38,40%,94%)" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Tray */}
        <line x1="2" y1="50" x2="62" y2="50" />
        <rect x="2" y="50" width="60" height="4" rx="2" />
        {/* Dome */}
        <path d="M 5 50 Q 5 10 32 10 Q 59 10 59 50 Z" />
        {/* Handle */}
        <circle cx="32" cy="6" r="4.5" />
        {/* Waves */}
        <path d="M 10 36 C 16 28, 26 28, 32 36 C 38 44, 48 44, 54 36" />
      </g>
    </svg>
  );
}
