"use client";

import Link from "next/link";

/**
 * PlanCTA — bouton "בחר תוכנית" du PlanCard.
 * Variante highlighted (gradient bronze) ou normale (outline).
 */
export function PlanCTA({ highlighted }: { highlighted: boolean }) {
  if (highlighted) {
    return (
      <Link
        href="/signup"
        transitionTypes={["nav-forward"]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "13px 24px",
          background: "var(--grad-bronze)",
          borderRadius: 10,
          fontFamily: "var(--font-body)",
          fontSize: ".9rem",
          fontWeight: 600,
          color: "#fff",
          textDecoration: "none",
          boxShadow: "0 4px 20px hsl(var(--accent-bright) / .3)",
          transition: "transform .2s,box-shadow .2s",
        }}
        onMouseOver={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow = "0 8px 32px hsl(var(--accent-bright) / .4)";
        }}
        onMouseOut={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.transform = "";
          el.style.boxShadow = "0 4px 20px hsl(var(--accent-bright) / .3)";
        }}
      >
        בחר תוכנית
      </Link>
    );
  }

  return (
    <Link
      href="/signup"
      transitionTypes={["nav-forward"]}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "13px 24px",
        background: "transparent",
        border: "1px solid hsl(var(--line))",
        borderRadius: 10,
        fontFamily: "var(--font-body)",
        fontSize: ".9rem",
        fontWeight: 600,
        color: "hsl(var(--subtle))",
        textDecoration: "none",
        transition: "border-color .2s,color .2s,background .2s",
      }}
      onMouseOver={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "hsl(var(--accent-bright) / .5)";
        el.style.color = "hsl(var(--accent-bright))";
      }}
      onMouseOut={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "hsl(var(--line))";
        el.style.color = "hsl(var(--subtle))";
      }}
    >
      בחר תוכנית
    </Link>
  );
}
