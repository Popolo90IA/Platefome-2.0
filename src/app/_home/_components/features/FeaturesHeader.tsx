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
          background: "hsl(var(--accent-bright) / .07)",
          border: "1px solid hsl(var(--accent-bright) / .18)",
          borderRadius: 99,
          padding: "7px 20px",
          marginBottom: 26,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: ".24em",
            textTransform: "uppercase",
            color: "hsl(var(--accent-bright))",
          }}
        >
          השיטה
        </span>
      </div>
      <h2
        style={{
          fontFamily: "var(--font-hebrew)",
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
