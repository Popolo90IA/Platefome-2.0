interface LogoWordmarkProps {
  width?: number;
  className?: string;
  /**
   * "auto"  — suit le thème (défaut)
   * "light" — texte clair pour fond sombre (ex. panel auth dark)
   * "dark"  — texte sombre pour fond clair
   */
  variant?: "auto" | "light" | "dark";
}

const TEXT_COLOR: Record<string, string> = {
  auto: "hsl(var(--fog))",
  light: "hsl(36,30%,88%)",
  dark: "hsl(24,18%,16%)",
};

export function LogoWordmark({
  width = 140,
  className,
  variant = "auto",
}: LogoWordmarkProps) {
  const iconSize = Math.round(width * 0.28);
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
        src="/brand/logo-mark.svg"
        width={iconSize}
        height={iconSize}
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
          color: TEXT_COLOR[variant],
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
