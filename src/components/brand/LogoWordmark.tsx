interface LogoWordmarkProps {
  width?: number;
  className?: string;
  /** Couleur du mot "Plate". Par défaut le ton encre (fonds clairs).
   *  Sur fond sombre (footer), passer une teinte claire pour rester lisible. */
  color?: string;
}

/**
 * Wordmark — cloche dorée PNG (ton vrai logo) + texte "Plateform".
 * direction:ltr garantit le bon ordre Plate→form même en RTL (hébreu).
 */
export function LogoWordmark({
  width = 140,
  className,
  color = "hsl(24,18%,16%)",
}: LogoWordmarkProps) {
  // Proportions calées sur logo-lockup.svg (source de vérité — page login).
  // SVG: viewBox 800×220, cloche ~160px (ratio 1.587), texte font-size 84.
  // Pour un wordmark où width = largeur cloche+gap+texte (~width*0.7 du viewBox):
  const bellHeight = Math.round(width * 0.28);
  const bellWidth = Math.round(bellHeight * 1.587);
  const fontSize = Math.round(width * 0.15);
  const gap = Math.round(width * 0.075);

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap,
        lineHeight: 1,
        direction: "ltr",
        unicodeBidi: "isolate",
        whiteSpace: "nowrap",
      }}
    >
      <img
        src="/brand/cloche.png"
        width={bellWidth}
        height={bellHeight}
        alt=""
        draggable={false}
        style={{ flexShrink: 0, objectFit: "contain" }}
      />
      <span
        style={{
          fontFamily:
            "var(--font-cormorant), 'Cormorant Garamond', 'Playfair Display', Georgia, serif",
          fontWeight: 500,
          fontSize,
          color,
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        Plate
        <em
          style={{
            fontStyle: "italic",
            background: "linear-gradient(135deg, hsl(28,62%,38%) 0%, hsl(22,70%,50%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          form
        </em>
      </span>
    </span>
  );
}
