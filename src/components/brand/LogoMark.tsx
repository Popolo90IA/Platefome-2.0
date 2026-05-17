interface LogoMarkProps {
  size?: number;
  className?: string;
  variant?: "light" | "dark";
}

/**
 * Primary icon — cloche dorée + vagues entrelacées (style "infini").
 * SVG inline, fond transparent, vectoriel pur.
 * Utilisé pour : header (28–32px), favicon, app icon, QR coasters.
 */
export function LogoMark({ size = 32, className }: LogoMarkProps) {
  const id = `lm-${size}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 100"
      width={size}
      height={Math.round((size * 100) / 120)}
      className={className}
      aria-label="Plateform"
      role="img"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(38,65%,62%)" />
          <stop offset="0.5" stopColor="hsl(32,68%,52%)" />
          <stop offset="1" stopColor="hsl(28,62%,42%)" />
        </linearGradient>
      </defs>

      <g
        fill="none"
        stroke={`url(#${id}-gold)`}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Handle (cercle poignée) */}
        <circle cx="60" cy="20" r="3.6" />

        {/* Dôme — demi-cercle aplati */}
        <path d="M 22 76 Q 22 28 60 28 Q 98 28 98 76" />

        {/* Vagues entrelacées (effet infini/ADN) — deux courbes sinusoïdales déphasées */}
        {/* Vague 1 — démarre en haut à gauche, descend, remonte, descend */}
        <path d="M 28 56 C 38 44, 50 70, 60 56 C 70 42, 82 70, 92 56" />
        {/* Vague 2 — miroir vertical de la vague 1, créée le croisement */}
        <path d="M 28 56 C 38 70, 50 44, 60 56 C 70 70, 82 44, 92 56" />

        {/* Plateau (trait horizontal) */}
        <line x1="14" y1="80" x2="106" y2="80" />
        {/* Plateau (barquette ovale fine) */}
        <path d="M 14 80 Q 60 90 106 80" />

        {/* Étincelles (sparkles) */}
      </g>

      {/* Points dorés pleins */}
      <circle cx="26" cy="50" r="1.8" fill={`url(#${id}-gold)`} />
      <circle cx="38" cy="44" r="1.2" fill={`url(#${id}-gold)`} />
      <circle cx="94" cy="46" r="1.5" fill={`url(#${id}-gold)`} />
    </svg>
  );
}
