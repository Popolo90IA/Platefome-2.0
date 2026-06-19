"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);

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
          background: "hsl(var(--void) / .75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid hsl(var(--line) / .5)",
          borderRadius: 14,
          boxShadow:
            "0 8px 32px rgba(0,0,0,.4), inset 0 1px 0 hsl(var(--line) / .3)",
          transition: "background .4s, border-color .4s, box-shadow .4s",
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
              className="home-nav-link"
              style={{
                padding: "7px 14px",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                fontSize: ".875rem",
                fontWeight: 400,
                color: "hsl(var(--subtle))",
                letterSpacing: "-.01em",
                borderRadius: 8,
                transition: "color .2s, background .2s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "hsl(var(--accent-bright))";
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "hsl(var(--accent-bright) / .08)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "hsl(var(--subtle))";
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
            className="home-nav-login home-nav-link"
            style={{
              padding: "7px 14px",
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              fontSize: ".875rem",
              fontWeight: 400,
              color: "hsl(var(--subtle))",
              letterSpacing: "-.01em",
              transition: "color .2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.color = "hsl(var(--accent-bright))")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.color = "hsl(var(--subtle))")
            }
          >
            כניסה
          </Link>

          <Link
            href="/signup"
            transitionTypes={["nav-forward"]}
            className="home-nav-cta-desktop home-nav-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 20px",
              background: "var(--grad-bronze)",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontSize: ".875rem",
              fontWeight: 600,
              letterSpacing: "-.01em",
              borderRadius: 8,
              textDecoration: "none",
              boxShadow:
                "0 2px 16px hsl(var(--accent-bright) / .4), inset 0 1px 0 rgba(255,255,255,.18)",
              transition: "filter .2s, transform .18s, box-shadow .2s",
            }}
            onMouseOver={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.filter = "brightness(1.12)";
              el.style.transform = "translateY(-1px)";
              el.style.boxShadow =
                "0 6px 28px hsl(var(--accent-bright) / .5), inset 0 1px 0 rgba(255,255,255,.18)";
            }}
            onMouseOut={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.filter = "";
              el.style.transform = "";
              el.style.boxShadow =
                "0 2px 16px hsl(var(--accent-bright) / .4), inset 0 1px 0 rgba(255,255,255,.18)";
            }}
          >
            התחל בחינם
          </Link>

          {/* Hamburger — mobile only (≤900px via CSS) */}
          <button
            type="button"
            className="home-nav-mobile-toggle"
            aria-label={open ? "סגור תפריט" : "פתח תפריט"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              background: "transparent",
              border: "1px solid hsl(var(--line) / .6)",
              borderRadius: 10,
              color: "hsl(var(--fog))",
              cursor: "pointer",
            }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile panel + backdrop */}
      {open && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              top: -20,
              zIndex: -1,
              border: "none",
              background: "transparent",
              cursor: "default",
            }}
          />
          <div
            className="home-nav-mobile-panel"
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              padding: 12,
              background: "hsl(var(--void) / .96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid hsl(var(--line) / .5)",
              borderRadius: 14,
              boxShadow: "0 16px 48px rgba(0,0,0,.5)",
            }}
          >
            {NAV_LINKS.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="home-nav-link"
                style={{
                  padding: "12px 14px",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: "hsl(var(--fog))",
                  borderRadius: 8,
                }}
              >
                {label}
              </a>
            ))}
            <div
              style={{
                height: 1,
                background: "hsl(var(--line) / .5)",
                margin: "6px 0",
              }}
            />
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="home-nav-link"
              style={{
                padding: "12px 14px",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "hsl(var(--subtle))",
                borderRadius: 8,
              }}
            >
              כניסה
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                padding: "13px 20px",
                background: "var(--grad-bronze)",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 10,
                textDecoration: "none",
                boxShadow:
                  "0 2px 16px hsl(var(--accent-bright) / .4), inset 0 1px 0 rgba(255,255,255,.18)",
              }}
            >
              התחל בחינם
            </Link>
          </div>
        </>
      )}
    </header>
  );
}
