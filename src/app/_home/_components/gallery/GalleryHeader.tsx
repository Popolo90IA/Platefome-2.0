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
          background: "hsl(28,62%,42%,.08)",
          border: "1px solid hsl(28,62%,42%,.18)",
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
            background: "hsl(28,62%,42%)",
          }}
        />
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: ".1em",
            textTransform: "uppercase" as const,
            color: "hsl(28,62%,42%)",
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
          color: "hsl(24,18%,16%)",
          lineHeight: 1.05,
          letterSpacing: "-.02em",
          margin: "0 0 16px",
        }}
      >
        כל מנה,{" "}
        <em style={{ color: "hsl(28,62%,42%)", fontStyle: "italic" }}>
          בשלושה ממדים
        </em>
      </h2>
      <p
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "1rem",
          color: "hsl(24,12%,38%)",
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
