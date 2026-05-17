interface LogoWordmarkProps {
  width?: number;
  className?: string;
}

/**
 * Wordmark — cloche dorée + "Plateform" text.
 * Native aspect ratio: 540 × 120.
 */
export function LogoWordmark({ width = 140, className }: LogoWordmarkProps) {
  const height = Math.round(width * (120 / 540));
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 540 120"
      width={width}
      height={height}
      className={className}
      aria-label="Plateform"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="wm-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(38,65%,58%)"/>
          <stop offset="1" stopColor="hsl(28,62%,42%)"/>
        </linearGradient>
        <linearGradient id="wm-bronze" x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0" stopColor="hsl(28,62%,38%)"/>
          <stop offset="1" stopColor="hsl(22,70%,50%)"/>
        </linearGradient>
      </defs>

      {/* Cloche icon */}
      <g transform="translate(4, 4)">
        {/* Tray */}
        <line x1="0" y1="90" x2="76" y2="90" stroke="url(#wm-gold)" strokeWidth="4" strokeLinecap="round"/>
        <rect x="0" y="90" width="76" height="5" rx="2.5" fill="none" stroke="url(#wm-gold)" strokeWidth="4" strokeLinecap="round"/>
        {/* Dome */}
        <path d="M 3 90 Q 3 18 38 18 Q 73 18 73 90 Z" fill="none" stroke="url(#wm-gold)" strokeWidth="4" strokeLinejoin="round"/>
        {/* Handle */}
        <circle cx="38" cy="12" r="7" fill="none" stroke="url(#wm-gold)" strokeWidth="4"/>
        {/* Wave 1 */}
        <path d="M 10 66 C 20 52, 30 52, 38 66 C 46 80, 56 80, 66 66" fill="none" stroke="url(#wm-gold)" strokeWidth="4" strokeLinecap="round"/>
        {/* Wave 2 */}
        <path d="M 10 80 C 20 66, 30 66, 38 80 C 46 94, 56 94, 66 80" fill="none" stroke="url(#wm-gold)" strokeWidth="4" strokeLinecap="round"/>
        {/* Sparkle dots */}
        <circle cx="16" cy="30" r="3" fill="url(#wm-gold)"/>
        <circle cx="4"  cy="50" r="2.5" fill="url(#wm-gold)"/>
        <circle cx="64" cy="38" r="2.5" fill="url(#wm-gold)"/>
      </g>

      {/* Wordmark text */}
      <text x="92" y="82" fontFamily="Cormorant Garamond, Georgia, serif" fontWeight={500} fontSize={62} fill="hsl(24,18%,16%)" letterSpacing="-0.02em">
        Plate<tspan fontStyle="italic" fill="url(#wm-bronze)">form</tspan>
      </text>
    </svg>
  );
}
