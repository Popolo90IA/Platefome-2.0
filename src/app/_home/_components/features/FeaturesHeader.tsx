"use client";

/**
 * FeaturesHeader — eyebrow "השיטה" + h2 "שלושה שלבים. מהפכה גסטרונומית."
 */
export function FeaturesHeader() {
  return (
    <div className="reveal" style={{ textAlign: "center", marginBottom: 72 }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "hsl(var(--accent-bright) / .08)",
          border: "1px solid hsl(var(--accent-bright) / .18)",
          borderRadius: 99,
          padding: "6px 18px",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "hsl(var(--accent-bright))",
          }}
        />
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "hsl(var(--accent-bright))",
          }}
        >
          השיטה
        </span>
      </div>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(2.2rem,4.5vw,3.5rem)",
          fontWeight: 700,
          color: "hsl(var(--fog))",
          lineHeight: 1.05,
          letterSpacing: "-.02em",
          margin: 0,
        }}
      >
        שלושה שלבים.{" "}
        <em style={{ color: "hsl(var(--accent-bright))", fontStyle: "italic" }}>
          מהפכה גסטרונומית.
        </em>
      </h2>
    </div>
  );
}
