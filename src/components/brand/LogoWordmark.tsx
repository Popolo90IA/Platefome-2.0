interface LogoWordmarkProps {
  width?: number;
  className?: string;
}

/**
 * Wordmark — cloche dorée + "Plateform" text.
 * SVG inline, viewBox ajusté au contenu réel pour éviter le vide à droite.
 * direction: ltr forcé sur le <svg> pour rendu identique en RTL (hébreu).
 */
export function LogoWordmark({ width = 140, className }: LogoWordmarkProps) {
  // viewBox calé sur contenu réel : 350 × 120 (cloche 80 + gap 12 + texte ~258)
  const VIEWBOX_W = 350;
  const VIEWBOX_H = 120;
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
          <stop offset="0" stopColor="hsl(38,65%,58%)" />
          <stop offset="1" stopColor="hsl(28,62%,42%)" />
        </linearGradient>
        <linearGradient id="wm-bronze" x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0" stopColor="hsl(28,62%,38%)" />
          <stop offset="1" stopColor="hsl(22,70%,50%)" />
        </linearGradient>
      </defs>

      {/* Cloche icon (80×80 box, dans la moitié haute du viewBox 120) */}
      <g transform="translate(4, 16)">
        {/* Tray */}
        <line x1="0" y1="78" x2="76" y2="78" stroke="url(#wm-gold)" strokeWidth="4" strokeLinecap="round" />
        <rect x="0" y="78" width="76" height="5" rx="2.5" fill="none" stroke="url(#wm-gold)" strokeWidth="4" strokeLinecap="round" />
        {/* Dome */}
        <path d="M 3 78 Q 3 14 38 14 Q 73 14 73 78 Z" fill="none" stroke="url(#wm-gold)" strokeWidth="4" strokeLinejoin="round" />
        {/* Handle */}
        <circle cx="38" cy="8" r="7" fill="none" stroke="url(#wm-gold)" strokeWidth="4" />
        {/* Waves */}
        <path d="M 10 54 C 20 40, 30 40, 38 54 C 46 68, 56 68, 66 54" fill="none" stroke="url(#wm-gold)" strokeWidth="4" strokeLinecap="round" />
        <path d="M 10 68 C 20 54, 30 54, 38 68 C 46 82, 56 82, 66 68" fill="none" stroke="url(#wm-gold)" strokeWidth="4" strokeLinecap="round" />
        {/* Sparkles */}
        <circle cx="16" cy="24" r="3" fill="url(#wm-gold)" />
        <circle cx="4" cy="42" r="2.5" fill="url(#wm-gold)" />
        <circle cx="64" cy="32" r="2.5" fill="url(#wm-gold)" />
      </g>

      {/* Wordmark text — direction:ltr garantit l'ordre Plate→form même en RTL.
          font-family utilise la variable Next.js (--font-cormorant) pour
          être sûr que la police est trouvée même quand Next.js renomme l'identifiant. */}
      <text
        x="92"
        y="82"
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
