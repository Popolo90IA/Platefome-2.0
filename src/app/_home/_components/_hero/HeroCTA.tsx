"use client";

import Link from "next/link";

export function HeroCTA() {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 32,
      }}
    >
      <Link
        href="/signup"
        transitionTypes={["nav-forward"]}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 32px",
          background:
            "linear-gradient(135deg, hsl(28,62%,38%), hsl(22,70%,50%))",
          color: "#fff",
          fontFamily: "'DM Sans',sans-serif",
          fontSize: ".9375rem",
          fontWeight: 600,
          letterSpacing: "-.01em",
          borderRadius: 10,
          textDecoration: "none",
          boxShadow:
            "0 4px 24px hsl(28,62%,38%,.4), inset 0 1px 0 rgba(255,255,255,.18)",
          transition: "filter .2s,transform .18s,box-shadow .2s",
        }}
        onMouseOver={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.filter = "brightness(1.1)";
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow =
            "0 8px 32px hsl(28,62%,38%,.5), inset 0 1px 0 rgba(255,255,255,.18)";
        }}
        onMouseOut={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.filter = "";
          el.style.transform = "";
          el.style.boxShadow =
            "0 4px 24px hsl(28,62%,38%,.4), inset 0 1px 0 rgba(255,255,255,.18)";
        }}
      >
        התחל בחינם
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </Link>

      <a
        href="#features"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 28px",
          background: "hsl(32,20%,100%,.06)",
          color: "hsl(24,12%,38%)",
          fontFamily: "'DM Sans',sans-serif",
          fontSize: ".9375rem",
          fontWeight: 500,
          letterSpacing: "-.01em",
          border: "1px solid hsl(32,20%,100%,.1)",
          borderRadius: 10,
          textDecoration: "none",
          backdropFilter: "blur(8px)",
          transition: "border-color .2s,color .2s,background .2s",
        }}
        onMouseOver={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = "hsl(28,62%,42%,.35)";
          el.style.color = "#fff";
          el.style.background = "hsl(28,62%,42%,.08)";
        }}
        onMouseOut={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = "hsl(32,20%,100%,.1)";
          el.style.color = "hsl(24,12%,38%)";
          el.style.background = "hsl(32,20%,100%,.06)";
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        ראה הדגמה
      </a>
    </div>
  );
}
