"use client";

/* ── GalleryHeader — eyebrow badge + h2 + paragraphe (centré RTL) ── */
export function GalleryHeader() {
  return (
    <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
      <h2
        style={{
          fontFamily: "var(--font-hebrew)",
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
          fontFamily: "var(--font-body)",
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
