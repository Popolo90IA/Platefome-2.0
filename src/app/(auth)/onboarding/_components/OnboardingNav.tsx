"use client";

import Link from "next/link";
import { LogoWordmark } from "@/components/brand";
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
      <Link href="/" className="logo-hover" style={{ display: "inline-flex", textDecoration: "none" }}>
        <LogoWordmark width={150} />
      </Link>
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
