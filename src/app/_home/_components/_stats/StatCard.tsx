"use client";

import type { StatItem } from "../../_lib/types";

/* ── StatCard — single key-figure tile with hover bg + trend badge ── */
export function StatCard({ s, delay }: { s: StatItem; delay: number }) {
  return (
    <div
      className="reveal"
      data-delay={String(delay)}
      style={{
        background: "hsl(38,28%,94%)",
        padding: "40px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        position: "relative",
        overflow: "hidden",
        transition: "background .2s",
        cursor: "default",
      }}
      onMouseOver={(e) =>
        ((e.currentTarget as HTMLDivElement).style.background = "hsl(36,22%,90%)")
      }
      onMouseOut={(e) =>
        ((e.currentTarget as HTMLDivElement).style.background = "hsl(38,28%,94%)")
      }
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, hsl(28,62%,42%), hsl(22,70%,50%))",
        }}
      />
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "3.75rem",
          fontWeight: 800,
          color: "hsl(24,18%,16%)",
          lineHeight: 1,
          letterSpacing: "-.04em",
        }}
      >
        {s.num}
      </div>
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "1rem",
          fontWeight: 500,
          color: "hsl(24,18%,16%)",
        }}
      >
        {s.label}
      </div>
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: ".8125rem",
          color: "hsl(24,12%,38%)",
          lineHeight: 1.55,
          flexGrow: 1,
        }}
      >
        {s.sub}
      </div>
      <div
        style={{
          marginTop: 16,
          paddingTop: 16,
          borderTop: "1px solid hsl(30,18%,88%)",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="hsl(28,62%,42%)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: ".75rem",
            color: "hsl(28,62%,42%)",
          }}
        >
          {s.badge}
        </span>
      </div>
    </div>
  );
}
