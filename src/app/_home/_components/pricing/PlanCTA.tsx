"use client";

import Link from "next/link";

const ARROW = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

/**
 * PlanCTA — bouton "בחר תוכנית" (pilule). Architecture button-in-button :
 * la flèche vit dans sa propre pastille circulaire, qui glisse au hover.
 */
export function PlanCTA({ highlighted }: { highlighted: boolean }) {
  const hl = highlighted;

  return (
    <Link
      href="/signup"
      transitionTypes={["nav-forward"]}
      className="plan-cta"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        padding: "10px 12px 10px 22px",
        background: hl ? "var(--grad-bronze)" : "hsl(var(--white) / .04)",
        border: hl ? "none" : "1px solid hsl(var(--white) / .1)",
        borderRadius: 999,
        fontFamily: "var(--font-body)",
        fontSize: ".9rem",
        fontWeight: 600,
        color: hl ? "#fff" : "hsl(var(--subtle))",
        textDecoration: "none",
        boxShadow: hl ? "0 6px 24px hsl(var(--accent-bright) / .32)" : "none",
        transition: "transform .25s cubic-bezier(.32,.72,0,1), border-color .25s, color .25s, background .25s, box-shadow .25s",
      }}
      onMouseOver={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        if (!hl) {
          el.style.borderColor = "hsl(var(--accent-bright) / .5)";
          el.style.color = "hsl(var(--accent-bright))";
          el.style.background = "hsl(var(--accent-bright) / .08)";
        } else {
          el.style.boxShadow = "0 10px 34px hsl(var(--accent-bright) / .45)";
        }
        const dot = el.querySelector<HTMLElement>(".plan-cta-dot");
        if (dot) dot.style.transform = "translateX(-3px)";
      }}
      onMouseOut={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        if (!hl) {
          el.style.borderColor = "hsl(var(--white) / .1)";
          el.style.color = "hsl(var(--subtle))";
          el.style.background = "hsl(var(--white) / .04)";
        } else {
          el.style.boxShadow = "0 6px 24px hsl(var(--accent-bright) / .32)";
        }
        const dot = el.querySelector<HTMLElement>(".plan-cta-dot");
        if (dot) dot.style.transform = "";
      }}
      onPointerDown={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(.97)";
      }}
      onPointerUp={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "";
      }}
    >
      <span>בחר תוכנית</span>
      <span
        className="plan-cta-dot"
        aria-hidden
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: hl ? "rgba(255,255,255,.18)" : "hsl(var(--accent-bright) / .14)",
          color: hl ? "#fff" : "hsl(var(--accent-bright))",
          flexShrink: 0,
          transition: "transform .25s cubic-bezier(.32,.72,0,1)",
        }}
      >
        {ARROW}
      </span>
    </Link>
  );
}
