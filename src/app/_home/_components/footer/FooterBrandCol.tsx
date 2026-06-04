"use client";

import Link from "next/link";
import { LogoWordmark } from "@/components/brand";
import { SOCIAL_LINKS } from "./data";

/* ── FooterBrandCol — logo, tagline, social icons ── */
export function FooterBrandCol() {
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Link href="/" className="logo-hover" style={{ display: "inline-block" }}>
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
              el.style.borderColor = "hsl(var(--accent-bright) / .4)";
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
  );
}
