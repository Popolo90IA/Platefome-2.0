interface LogoWordmarkProps {
  width?: number;
  className?: string;
}

/**
 * Wordmark — cloche dorée PNG (ton vrai logo) + texte "Plateform".
 * direction:ltr garantit le bon ordre Plate→form même en RTL (hébreu).
 */
export function LogoWordmark({ width = 140, className }: LogoWordmarkProps) {
  // Largeur cloche calculée pour qu'elle prenne ~40% du wordmark total.
  // Cloche natif 600×378 → ratio 1.587. On vise une hauteur de cloche
  // proportionnelle à la cap-height du texte.
  const bellHeight = Math.round(width * 0.34);
  const bellWidth = Math.round(bellHeight * 1.587);
  const fontSize = Math.round(width * 0.32);
  const gap = Math.round(width * 0.04);

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
          color: "hsl(24,18%,16%)",
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
