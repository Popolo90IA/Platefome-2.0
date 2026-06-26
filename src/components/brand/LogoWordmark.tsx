interface LogoWordmarkProps {
  width?: number;
  className?: string;
  variant?: "auto" | "light" | "dark"; // conservé pour rétro-compatibilité, ignoré
}

export function LogoWordmark({ width = 160, className }: LogoWordmarkProps) {
  const height = Math.round(width * (220 / 800));
  return (
    <img
      src="/brand/logo-lockup.svg"
      width={width}
      height={height}
      alt="Plateform"
      draggable={false}
      className={className}
      style={{ display: "block", flexShrink: 0 }}
    />
  );
}
