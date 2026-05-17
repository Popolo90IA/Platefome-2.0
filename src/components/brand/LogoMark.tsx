interface LogoMarkProps {
  size?: number;
  className?: string;
  /** "light" (default) = plate on beige, "dark" = plate on dark bg */
  variant?: "light" | "dark";
}

/**
 * Primary icon — cloche dorée seule (sans texte).
 * SVG inline (pas d'<img>) pour rendu identique partout, même sur Vercel.
 * Use for: header (28–32px), favicon, app icon, QR coasters, tight spaces.
 */
export function LogoMark({ size = 32, className }: LogoMarkProps) {
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
        <linearGradient id={`lm-gold-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(38,65%,58%)" />
          <stop offset="1" stopColor="hsl(28,62%,42%)" />
        </linearGradient>
      </defs>
      <g transform="translate(4, 4)">
        {/* Tray */}
        <line x1="0" y1="62" x2="72" y2="62" stroke={`url(#lm-gold-${size})`} strokeWidth="4" strokeLinecap="round" />
        <rect x="0" y="62" width="72" height="5" rx="2.5" fill="none" stroke={`url(#lm-gold-${size})`} strokeWidth="4" strokeLinecap="round" />
        {/* Dome */}
        <path d="M 3 62 Q 3 14 36 14 Q 69 14 69 62 Z" fill="none" stroke={`url(#lm-gold-${size})`} strokeWidth="4" strokeLinejoin="round" />
        {/* Handle */}
        <circle cx="36" cy="9" r="6" fill="none" stroke={`url(#lm-gold-${size})`} strokeWidth="4" />
        {/* Waves */}
        <path d="M 10 44 C 18 32, 28 32, 36 44 C 44 56, 54 56, 62 44" fill="none" stroke={`url(#lm-gold-${size})`} strokeWidth="4" strokeLinecap="round" />
        <path d="M 10 56 C 18 44, 28 44, 36 56 C 44 68, 54 68, 62 56" fill="none" stroke={`url(#lm-gold-${size})`} strokeWidth="4" strokeLinecap="round" />
        {/* Sparkles */}
        <circle cx="14" cy="24" r="2.5" fill={`url(#lm-gold-${size})`} />
        <circle cx="4" cy="40" r="2" fill={`url(#lm-gold-${size})`} />
        <circle cx="60" cy="30" r="2" fill={`url(#lm-gold-${size})`} />
      </g>
    </svg>
  );
}
