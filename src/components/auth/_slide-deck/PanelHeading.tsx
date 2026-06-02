"use client";

type PanelHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
};

export function PanelHeading({ eyebrow, title, subtitle }: PanelHeadingProps) {
  return (
    <div style={{ marginBottom: 36, textAlign: "right" }}>
      <div
        className="font-sans uppercase"
        style={{
          fontSize: 11,
          letterSpacing: ".08em",
          fontWeight: 600,
          color: "hsl(var(--accent-bright))",
          marginBottom: 10,
        }}
      >
        {eyebrow}
      </div>
      <h1
        className="font-display"
        style={{
          fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
          fontWeight: 600,
          letterSpacing: "-.025em",
          lineHeight: 1.1,
          color: "hsl(var(--fog))",
          margin: 0,
        }}
      >
        {title}
      </h1>
      <p
        className="font-sans"
        style={{
          fontSize: 14,
          color: "hsl(var(--subtle))",
          marginTop: 10,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}
