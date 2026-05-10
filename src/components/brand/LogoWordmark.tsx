interface LogoWordmarkProps {
  width?: number;
  className?: string;
}

/**
 * Wordmark only — mini plate mark + "Plateform" text.
 * Use for: mobile collapsed nav, QR print PDFs, contexts where the
 * mark is already nearby and only the name is needed.
 * Native aspect ratio: 520 × 120.
 */
export function LogoWordmark({ width = 140, className }: LogoWordmarkProps) {
  const height = Math.round(width * (120 / 520));
  return (
    <img
      src="/brand/wordmark.svg"
      width={width}
      height={height}
      alt="Plateform"
      className={className}
      draggable={false}
      style={{ display: "inline-block", flexShrink: 0 }}
    />
  );
}
