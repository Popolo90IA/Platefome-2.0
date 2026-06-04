"use client";

import Link from "next/link";
import { S } from "../_lib/constants";

/* ── Top nav (logo + restaurant name + skip/exit links) ── */
export function OnboardingNav({ restaurantName }: { restaurantName: string }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "22px 36px",
        borderBottom: `1px solid ${S.line}`,
      }}
    >
      <div
        className="font-display"
        style={{
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: ".06em",
          color: S.fog,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
        dir="ltr"
      >
        <svg width="28" height="28" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="28" fill="#f6f4ef" stroke="hsl(28,15%,18%)" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="20" fill="none" stroke="hsl(28,15%,18%)" strokeWidth=".5" strokeDasharray="1.5 2" />
          <text x="40" y="49" textAnchor="middle" fontFamily="var(--font-display)" fontStyle="italic" fontWeight="500" fontSize="32" fill="hsl(28,62%,38%)">
            P
          </text>
        </svg>
        PLATE<em style={{ fontStyle: "italic", color: S.accent, fontWeight: 500 }}>FORM</em>
      </div>
      <div
        className="font-mono"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 11,
          letterSpacing: ".06em",
          textTransform: "uppercase",
          color: S.dim,
        }}
      >
        {restaurantName && <span style={{ color: S.subtle }}>{restaurantName}</span>}
        {restaurantName && <span style={{ opacity: 0.4 }}>·</span>}
        <Link href="/dashboard" style={{ color: S.subtle, textDecoration: "none" }}>
          דלג בינתיים
        </Link>
        <Link href="/login" style={{ color: S.subtle, textDecoration: "none" }}>
          צא
        </Link>
      </div>
    </nav>
  );
}
