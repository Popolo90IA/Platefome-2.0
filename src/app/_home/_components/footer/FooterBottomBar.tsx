"use client";

/* ── FooterBottomBar — copyright + crédit "נוצר באהבה בתל אביב" ── */
export function FooterBottomBar() {
  return (
    <div
      style={{
        borderTop: "1px solid hsl(28,18%,22%)",
        padding: "24px 0 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap" as const,
        gap: 12,
      }}
    >
      <span
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: ".8rem",
          color: "hsl(28,10%,48%)",
        }}
      >
        © 2025 PLATFORME · כל הזכויות שמורות
      </span>
      <span
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: ".8rem",
          color: "hsl(28,10%,48%)",
        }}
      >
        נוצר באהבה <span style={{ color: "hsl(var(--accent-bright))" }}>◆</span> בתל אביב
      </span>
    </div>
  );
}
