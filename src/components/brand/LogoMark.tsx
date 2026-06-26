interface LogoMarkProps {
  size?: number;
  className?: string;
  variant?: "light" | "dark";
}

export function LogoMark({ size = 32, className, variant }: LogoMarkProps) {
  const stroke = variant === "light" ? "hsl(38,70%,68%)" : "hsl(28,62%,42%)";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "inline-block", flexShrink: 0 }}
      aria-label="Plateform"
    >
      <circle cx="50" cy="50" r="46" fill="none" stroke={stroke} strokeWidth="3.5"/>
      <circle cx="50" cy="50" r="38" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.5"/>
      <text
        x="50" y="68"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="58"
        fontStyle="italic"
        fontWeight="600"
        textAnchor="middle"
        fill={stroke}
      >P</text>
    </svg>
  );
}
