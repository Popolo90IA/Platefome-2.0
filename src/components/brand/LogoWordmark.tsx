interface LogoWordmarkProps {
  width?: number;
  className?: string;
  /**
   * "auto"  — suit le thème (défaut) → logo-lockup.svg
   * "light" — texte clair pour fond sombre → logo-lockup-light.svg
   * "dark"  — texte sombre pour fond clair → logo-lockup.svg
   *
   * Pour changer le logo partout : remplacer les fichiers SVG dans /public/brand/
   */
  variant?: "auto" | "light" | "dark";
}

const SVG_SRC: Record<string, string> = {
  auto: "/brand/logo-lockup.svg",
  dark: "/brand/logo-lockup.svg",
  light: "/brand/logo-lockup-light.svg",
};

export function LogoWordmark({
  width = 160,
  className,
  variant = "auto",
}: LogoWordmarkProps) {
  const height = Math.round(width * (220 / 800));

  return (
    <img
      src={SVG_SRC[variant]}
      width={width}
      height={height}
      alt="Plateform"
      draggable={false}
      className={className}
      style={{ display: "block", flexShrink: 0 }}
    />
  );
}
