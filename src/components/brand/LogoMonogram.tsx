interface LogoMonogramProps {
  size?: number;
  className?: string;
}

export function LogoMonogram({ size = 64, className }: LogoMonogramProps) {
  const inner = Math.round(size * 0.72);
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.2),
        background: "linear-gradient(135deg, hsl(28,62%,38%) 0%, hsl(22,70%,50%) 100%)",
        flexShrink: 0,
      }}
    >
      <svg
        width={inner}
        height={inner}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Plateform"
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="hsl(38,80%,82%)" strokeWidth="3.5"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="hsl(38,80%,82%)" strokeWidth="1.5" opacity="0.5"/>
        <text
          x="50" y="68"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="58"
          fontStyle="italic"
          fontWeight="600"
          textAnchor="middle"
          fill="hsl(38,80%,82%)"
        >P</text>
      </svg>
    </span>
  );
}
