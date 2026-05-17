interface LogoWordmarkProps {
  width?: number;
  className?: string;
}

/**
 * Wordmark — cloche dorée (vagues entrelacées) + "Plateform" text.
 * SVG inline, viewBox calé sur le contenu, direction:ltr pour rendu en RTL.
 */
export function LogoWordmark({ width = 140, className }: LogoWordmarkProps) {
  // viewBox : cloche (120 large × 100 haute) + gap 16 + texte (~250) = 386 large
  const VIEWBOX_W = 386;
  const VIEWBOX_H = 110;
  const height = Math.round(width * (VIEWBOX_H / VIEWBOX_W));
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
      width={width}
      height={height}
      className={className}
      aria-label="Plateform"
      role="img"
      style={{ display: "inline-block", flexShrink: 0, direction: "ltr" }}
    >
      <defs>
        <linearGradient id="wm-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(38,65%,62%)" />
          <stop offset="0.5" stopColor="hsl(32,68%,52%)" />
          <stop offset="1" stopColor="hsl(28,62%,42%)" />
        </linearGradient>
        <linearGradient id="wm-bronze" x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0" stopColor="hsl(28,62%,38%)" />
          <stop offset="1" stopColor="hsl(22,70%,50%)" />
        </linearGradient>
      </defs>

      {/* Cloche (120×100, posée à gauche, alignée verticalement) */}
      <g
        transform="translate(0, 5)"
        fill="none"
        stroke="url(#wm-gold)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Poignée */}
        <circle cx="60" cy="20" r="3.6" />
        {/* Dôme */}
        <path d="M 22 76 Q 22 28 60 28 Q 98 28 98 76" />
        {/* Vagues entrelacées (effet infini/ADN) */}
        <path d="M 28 56 C 38 44, 50 70, 60 56 C 70 42, 82 70, 92 56" />
        <path d="M 28 56 C 38 70, 50 44, 60 56 C 70 70, 82 44, 92 56" />
        {/* Plateau */}
        <line x1="14" y1="80" x2="106" y2="80" />
        <path d="M 14 80 Q 60 90 106 80" />
      </g>
      {/* Étincelles */}
      <circle cx="26" cy="55" r="1.8" fill="url(#wm-gold)" />
      <circle cx="38" cy="49" r="1.2" fill="url(#wm-gold)" />
      <circle cx="94" cy="51" r="1.5" fill="url(#wm-gold)" />

      {/* Wordmark text — direction:ltr garantit l'ordre Plate→form en RTL */}
      <text
        x="130"
        y="78"
        fontWeight={500}
        fontSize={58}
        fill="hsl(24,18%,16%)"
        letterSpacing="-0.02em"
        textAnchor="start"
        direction="ltr"
        style={{
          direction: "ltr",
          unicodeBidi: "isolate",
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', 'Playfair Display', Georgia, serif",
        }}
      >
        {"Plate"}
        <tspan fontStyle="italic" fill="url(#wm-bronze)">{"form"}</tspan>
      </text>
    </svg>
  );
}
