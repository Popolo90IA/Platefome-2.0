import type { ReactNode, CSSProperties } from "react";

/* ── Section — labeled card wrapper for calibration variants ── */
export function Section({
  eyebrow,
  eyebrowColor = "hsl(28, 62%, 42%)",
  style,
  children,
}: {
  eyebrow: string;
  eyebrowColor?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <section
      style={{
        marginBottom: 32,
        padding: "24px",
        background: "white",
        borderRadius: 12,
        border: "1px solid hsl(36, 22%, 85%)",
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 12,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: eyebrowColor,
          marginBottom: 16,
          fontWeight: 700,
        }}
      >
        {eyebrow}
      </div>
      {children}
    </section>
  );
}
