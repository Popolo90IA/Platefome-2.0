"use client";

import Link from "next/link";
import { LogoWordmark } from "@/components/brand";

const NAV_LINKS: ReadonlyArray<readonly [string, string]> = [
  ["#features", "תכונות"],
  ["#gallery", "גלריה"],
  ["#pricing", "מחירים"],
  ["#", "הדגמה"],
];

/**
 * SiteNav — header glassmorphism (pill flottant haut centré).
 * id="site-header" est utilisé par useHeaderScroll pour effet frosted à 60px de scroll.
 */
export function SiteNav() {
  return (
    <header
      id="site-header"
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: "calc(100% - 48px)",
        maxWidth: 1100,
        animation: "navPill .6s cubic-bezier(.16,1,.3,1) both",
        direction: "rtl",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px 10px 20px",
          background: "hsl(38,28%,94%,.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid hsl(30,18%,82%,.5)",
          borderRadius: 14,
          boxShadow:
            "0 8px 32px rgba(0,0,0,.4), inset 0 1px 0 hsl(30,18%,82%,.3)",
          transition: "background .4s, border-color .4s",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="logo-hover"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <LogoWordmark width={140} />
        </Link>

        {/* Nav centre */}
        <nav
          className="home-nav-center"
          style={{ display: "flex", gap: 2, alignItems: "center" }}
        >
          {NAV_LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              style={{
                padding: "7px 14px",
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".875rem",
                fontWeight: 400,
                color: "hsl(24,12%,38%)",
                letterSpacing: "-.01em",
                borderRadius: 8,
                transition: "color .2s, background .2s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "hsl(32,20%,100%,.06)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "hsl(24,12%,38%)";
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Actions droite */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <Link
            href="/login"
            transitionTypes={["nav-forward"]}
            className="home-nav-login"
            style={{
              padding: "7px 14px",
              textDecoration: "none",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: ".875rem",
              fontWeight: 400,
              color: "hsl(24,12%,38%)",
              letterSpacing: "-.01em",
              transition: "color .2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseOut={(e) =>
              (e.currentTarget.style.color = "hsl(24,12%,38%)")
            }
          >
            כניסה
          </Link>

          <Link
            href="/signup"
            transitionTypes={["nav-forward"]}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 20px",
              background:
                "linear-gradient(135deg, hsl(28,62%,38%) 0%, hsl(22,70%,50%) 100%)",
              color: "#fff",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: ".875rem",
              fontWeight: 600,
              letterSpacing: "-.01em",
              borderRadius: 8,
              textDecoration: "none",
              boxShadow:
                "0 2px 16px hsl(28,62%,38%,.4), inset 0 1px 0 rgba(255,255,255,.18)",
              transition: "filter .2s, transform .18s, box-shadow .2s",
            }}
            onMouseOver={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.filter = "brightness(1.12)";
              el.style.transform = "translateY(-1px)";
              el.style.boxShadow =
                "0 6px 28px hsl(28,62%,38%,.5), inset 0 1px 0 rgba(255,255,255,.18)";
            }}
            onMouseOut={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.filter = "";
              el.style.transform = "";
              el.style.boxShadow =
                "0 2px 16px hsl(28,62%,38%,.4), inset 0 1px 0 rgba(255,255,255,.18)";
            }}
          >
            התחל בחינם
          </Link>
        </div>
      </div>
    </header>
  );
}
