"use client";

import Link from "next/link";
import { LogoWordmark } from "@/components/brand";

const FOOTER_COLUMNS: ReadonlyArray<{
  title: string;
  links: ReadonlyArray<readonly [string, string]>;
}> = [
  {
    title: "מוצר",
    links: [
      ["#features", "תכונות"],
      ["#gallery", "גלריה"],
      ["#pricing", "מחירים"],
      ["#", "הדגמה"],
    ],
  },
  {
    title: "חברה",
    links: [
      ["#", "אודות"],
      ["#", "בלוג"],
      ["#", "שותפים"],
      ["mailto:hello@platforme.app", "צור קשר"],
    ],
  },
  {
    title: "משפטי",
    links: [
      ["#", "תנאי שימוש"],
      ["#", "פרטיות"],
      ["#", "נגישות"],
    ],
  },
];

const SOCIAL_LINKS = [
  {
    href: "#",
    label: "Instagram",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "LinkedIn",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <line x1="8" y1="11" x2="8" y2="16" />
        <line x1="8" y1="8" x2="8" y2="8.01" />
        <path d="M12 16v-5m4 5v-3a2 2 0 0 0-4 0" />
      </svg>
    ),
  },
  {
    href: "mailto:hello@platforme.app",
    label: "Email",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
  },
];

/**
 * SiteFooter — footer dark complet (CTA band + colonnes liens + bottom bar).
 */
export function SiteFooter() {
  return (
    <footer style={{ background: "hsl(28,22%,14%)" }}>
      {/* CTA band */}
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
              fontFamily: "'Cormorant Garamond',serif",
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
            <em style={{ color: "hsl(28,62%,42%)", fontStyle: "italic" }}>
              לחוויה תלת-מימדית?
            </em>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "1rem",
              color: "hsl(28,12%,62%)",
              lineHeight: 1.7,
              marginBottom: 36,
            }}
          >
            הצטרף ל-200+ מסעדות שכבר מגדילות את ההכנסות עם PLATFORME.
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
                background:
                  "linear-gradient(135deg, hsl(28,62%,38%), hsl(22,70%,50%))",
                borderRadius: 10,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".9375rem",
                fontWeight: 600,
                color: "#fff",
                textDecoration: "none",
                boxShadow: "0 4px 24px hsl(28,62%,42%,.3)",
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
                fontFamily: "'DM Sans',sans-serif",
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

      {/* Main footer content */}
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "64px 24px 0",
          direction: "rtl",
        }}
      >
        <div
          className="footer-links"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 56,
          }}
        >
          {/* Brand col */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <Link
                href="/"
                className="logo-hover"
                style={{ display: "inline-block" }}
              >
                <LogoWordmark width={130} />
              </Link>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".9rem",
                lineHeight: 1.75,
                color: "hsl(28,10%,55%)",
                marginBottom: 24,
              }}
            >
              פלטפורמת תפריטים תלת-מימד/AR למסעדות.
              <br />
              תל אביב · פריז.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: 34,
                    height: 34,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "hsl(28,18%,20%)",
                    border: "1px solid hsl(28,18%,28%)",
                    borderRadius: 8,
                    color: "hsl(28,10%,60%)",
                    textDecoration: "none",
                    transition: "color .2s,border-color .2s,background .2s",
                  }}
                  onMouseOver={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "hsl(28,62%,62%)";
                    el.style.borderColor = "hsl(28,62%,42%,.4)";
                    el.style.background = "hsl(28,18%,22%)";
                  }}
                  onMouseOut={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "hsl(28,10%,60%)";
                    el.style.borderColor = "hsl(28,18%,28%)";
                    el.style.background = "hsl(28,18%,20%)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links cols */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <span
                style={{
                  display: "block",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: ".1em",
                  textTransform: "uppercase" as const,
                  color: "hsl(28,62%,42%)",
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
                      fontFamily: "'DM Sans',sans-serif",
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
        </div>

        {/* Bottom bar */}
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
            נוצר באהבה <span style={{ color: "hsl(28,62%,42%)" }}>◆</span> בתל
            אביב
          </span>
        </div>
      </div>
    </footer>
  );
}
