"use client";

import { FOOTER_COLUMNS } from "./data";

/* ── FooterLinkColumns — colonnes de liens (מוצר / חברה / משפטי) ── */
export function FooterLinkColumns() {
  return (
    <>
      {FOOTER_COLUMNS.map((col) => (
        <div key={col.title}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: ".1em",
              textTransform: "uppercase" as const,
              color: "hsl(var(--accent-bright))",
              marginBottom: 20,
            }}
          >
            {col.title}
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: 12,
            }}
          >
            {col.links.map(([href, label]) => (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: ".9rem",
                  color: "hsl(28,10%,58%)",
                  textDecoration: "none",
                  transition: "color .2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "hsl(32,28%,88%)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "hsl(28,10%,58%)")
                }
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
