interface LogoWordmarkProps {
  width?: number;
  className?: string;
  variant?: "auto" | "light" | "dark";
}

const TEXT_COLOR = { auto: "hsl(var(--fog))", dark: "hsl(24,18%,16%)", light: "hsl(36,30%,88%)" };
const TAGLINE_COLOR = { auto: "hsl(var(--subtle))", dark: "hsl(24,12%,38%)", light: "hsl(36,20%,55%)" };

export function LogoWordmark({ width = 160, className, variant = "auto" }: LogoWordmarkProps) {
  const height = Math.round(width * (220 / 800));
  const textColor = TEXT_COLOR[variant];
  const taglineColor = TAGLINE_COLOR[variant];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 220"
      width={width}
      height={height}
      className={className}
      style={{ display: "block", flexShrink: 0 }}
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
      <circle cx="110" cy="110" r="100" fill="none" stroke="url(#lw-gold)" strokeWidth="5" />
      <circle cx="110" cy="110" r="84" fill="none" stroke="url(#lw-gold)" strokeWidth="2" opacity="0.5" />
      <text
        x="110" y="158"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="130"
        fontStyle="italic"
        fontWeight="600"
        textAnchor="middle"
        fill="url(#lw-gold)"
      >P</text>

      {/* Wordmark */}
      <text
        x="240" y="130"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontWeight="500"
        fontSize="84"
        fill={textColor}
        letterSpacing="-0.02em"
      >
        Plate
        <tspan fontStyle="italic" fill="url(#lw-bronze)">form</tspan>
      </text>

      {/* Tagline */}
      <text
        x="242" y="163"
        fontFamily="DM Mono, ui-monospace, monospace"
        fontSize="13"
        letterSpacing="3.5"
        fill={taglineColor}
      >EVERY DISH · IN 360°</text>
    </svg>
  );
}
