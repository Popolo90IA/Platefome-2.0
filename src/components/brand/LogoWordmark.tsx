interface LogoWordmarkProps {
  width?: number;
  className?: string;
  variant?: "auto" | "light" | "dark";
}

const TEXT_COLOR = { auto: "hsl(var(--fog))", dark: "hsl(24,18%,16%)", light: "hsl(36,30%,88%)" };
const TAGLINE_COLOR = { auto: "hsl(var(--subtle))", dark: "hsl(24,12%,38%)", light: "hsl(36,20%,55%)" };

// viewBox: 560 wide × 120 tall — icon 100px circle + 20px gap + text
export function LogoWordmark({ width = 180, className, variant = "auto" }: LogoWordmarkProps) {
  const height = Math.round(width * (120 / 560));
  const textColor = TEXT_COLOR[variant];
  const taglineColor = TAGLINE_COLOR[variant];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 560 120"
      width={width}
      height={height}
      className={className}
      style={{ display: "block", flexShrink: 0, direction: "ltr" }}
      aria-label="Plateform"
    >
      <defs>
        <linearGradient id="lw-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(38,65%,58%)" />
          <stop offset="100%" stopColor="hsl(28,62%,42%)" />
        </linearGradient>
        <linearGradient id="lw-bronze" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="hsl(28,62%,38%)" />
          <stop offset="100%" stopColor="hsl(22,70%,50%)" />
        </linearGradient>
      </defs>

      {/* Plate icon */}
      <circle cx="60" cy="60" r="54" fill="none" stroke="url(#lw-gold)" strokeWidth="4" />
      <circle cx="60" cy="60" r="42" fill="none" stroke="url(#lw-gold)" strokeWidth="1.5" opacity="0.5" />
      <text
        x="60" y="82"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="72"
        fontStyle="italic"
        fontWeight="600"
        textAnchor="middle"
        fill="url(#lw-gold)"
      >P</text>

      {/* Wordmark — starts right after icon */}
      <text
        x="132" y="74"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontWeight="500"
        fontSize="62"
        fill={textColor}
        letterSpacing="-0.02em"
      >
        Plate<tspan fontStyle="italic" fill="url(#lw-bronze)">form</tspan>
      </text>

      {/* Tagline */}
      <text
        x="134" y="98"
        fontFamily="DM Mono, ui-monospace, monospace"
        fontSize="11"
        letterSpacing="2.5"
        fill={taglineColor}
      >EVERY DISH · IN 360°</text>
    </svg>
  );
}
