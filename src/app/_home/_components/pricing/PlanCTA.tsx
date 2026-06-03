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
          background:
            "linear-gradient(135deg, hsl(28,62%,38%), hsl(22,70%,50%))",
          borderRadius: 10,
          fontFamily: "'DM Sans',sans-serif",
          fontSize: ".9rem",
          fontWeight: 600,
          color: "#fff",
          textDecoration: "none",
          boxShadow: "0 4px 20px hsl(28,62%,42%,.3)",
          transition: "transform .2s,box-shadow .2s",
        }}
        onMouseOver={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow = "0 8px 32px hsl(28,62%,42%,.4)";
        }}
        onMouseOut={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.transform = "";
          el.style.boxShadow = "0 4px 20px hsl(28,62%,42%,.3)";
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
        border: "1px solid hsl(30,18%,78%)",
        borderRadius: 10,
        fontFamily: "'DM Sans',sans-serif",
        fontSize: ".9rem",
        fontWeight: 600,
        color: "hsl(24,12%,38%)",
        textDecoration: "none",
        transition: "border-color .2s,color .2s,background .2s",
      }}
      onMouseOver={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "hsl(28,62%,42%,.5)";
        el.style.color = "hsl(28,62%,42%)";
      }}
      onMouseOut={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "hsl(30,18%,78%)";
        el.style.color = "hsl(24,12%,38%)";
      }}
    >
      בחר תוכנית
    </Link>
  );
}
