"use client";

import Link from "next/link";

/* ── FooterCTA — bande CTA "מוכן להפוך את התפריט" en haut du footer ── */
export function FooterCTA() {
  return (
    <div
      style={{
        borderBottom: "1px solid hsl(28,18%,22%)",
        padding: "80px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          textAlign: "center",
          direction: "rtl",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 700,
            color: "hsl(32,28%,92%)",
            lineHeight: 1.1,
            letterSpacing: "-.02em",
            marginBottom: 16,
          }}
        >
          מוכן להפוך את התפריט שלך
          <br />
          <em style={{ color: "hsl(var(--accent-bright))", fontStyle: "italic" }}>
            לחוויה תלת-מימדית?
          </em>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "hsl(28,12%,62%)",
            lineHeight: 1.7,
            marginBottom: 36,
          }}
        >
          הפכו את התפריט לחוויה בתלת-מימד — בלי אפליקציה, בלי קוד.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap" as const,
          }}
        >
          <Link
            href="/signup"
            transitionTypes={["nav-forward"]}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              background: "var(--grad-bronze)",
              borderRadius: 10,
              fontFamily: "var(--font-body)",
              fontSize: ".9375rem",
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
              boxShadow: "0 4px 24px hsl(var(--accent-bright) / .3)",
            }}
          >
            התחל בחינם
          </Link>
          <a
            href="mailto:hello@platforme.app"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              background: "hsl(28,18%,22%)",
              border: "1px solid hsl(28,18%,32%)",
              borderRadius: 10,
              fontFamily: "var(--font-body)",
              fontSize: ".9375rem",
              fontWeight: 500,
              color: "hsl(32,28%,88%)",
              textDecoration: "none",
            }}
          >
            דברו איתנו
          </a>
        </div>
      </div>
    </div>
  );
}
