interface LogoWordmarkProps {
  width?: number;
  className?: string;
}

/**
 * Wordmark — cloche dorée PNG (ton vrai logo) + texte "Plateform".
 * direction:ltr garantit le bon ordre Plate→form même en RTL (hébreu).
 */
export function LogoWordmark({ width = 140, className }: LogoWordmarkProps) {
  // Proportions très classe : le wordmark est compact, sur une seule ligne fine.
  // Cloche natif 800×504 → ratio 1.587. Hauteur cloche ≈ x-height du texte.
  const fontSize = Math.round(width * 0.18);
  const bellHeight = Math.round(fontSize * 0.95);
  const bellWidth = Math.round(bellHeight * 1.587);
  const gap = Math.round(width * 0.035);

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
