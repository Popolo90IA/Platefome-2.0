"use client";

/* ── GalleryHeader — eyebrow badge + h2 + paragraphe (centré RTL) ── */
export function GalleryHeader() {
  return (
    <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
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
            textTransform: "uppercase" as const,
            color: "hsl(var(--accent-bright))",
          }}
        >
          הגלריה
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
          margin: "0 0 16px",
        }}
      >
        כל מנה,{" "}
        <em style={{ color: "hsl(var(--accent-bright))", fontStyle: "italic" }}>
          בשלושה ממדים
        </em>
      </h2>
      <p
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "1rem",
          color: "hsl(var(--subtle))",
          maxWidth: 420,
          margin: "0 auto",
          lineHeight: 1.7,
        }}
      >
        הלקוחות רואים את המנה לפני שמזמינים. AR תואם iPhone ו-Android, ללא
        אפליקציה.
      </p>
    </div>
  );
}
