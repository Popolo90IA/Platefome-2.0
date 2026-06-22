"use client";

import Link from "next/link";

export function HeroCTA() {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        justifyContent: "flex-start",
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
          background: "var(--grad-bronze)",
          color: "#fff",
          fontFamily: "var(--font-body)",
          fontSize: ".9375rem",
          fontWeight: 600,
          letterSpacing: "-.01em",
          borderRadius: 10,
          textDecoration: "none",
          boxShadow:
            "0 4px 24px hsl(var(--accent-bright) / .4), inset 0 1px 0 rgba(255,255,255,.18)",
          transition: "filter .2s,transform .18s,box-shadow .2s",
        }}
        onMouseOver={(e) => {
          if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
            return;
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.filter = "brightness(1.1)";
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow =
            "0 8px 32px hsl(var(--accent-bright) / .5), inset 0 1px 0 rgba(255,255,255,.18)";
        }}
        onMouseOut={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.filter = "";
          el.style.transform = "";
          el.style.boxShadow =
            "0 4px 24px hsl(var(--accent-bright) / .4), inset 0 1px 0 rgba(255,255,255,.18)";
        }}
        onPointerDown={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform =
            "translateY(-2px) scale(0.97)";
        }}
        onPointerUp={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.transform = e.pointerType === "mouse" ? "translateY(-2px)" : "";
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
          background: "var(--veil-soft)",
          color: "hsl(var(--subtle))",
          fontFamily: "var(--font-body)",
          fontSize: ".9375rem",
          fontWeight: 500,
          letterSpacing: "-.01em",
          border: "1px solid var(--veil-line)",
          borderRadius: 10,
          textDecoration: "none",
          backdropFilter: "blur(8px)",
          transition: "border-color .2s,color .2s,background .2s,transform .18s",
        }}
        onMouseOver={(e) => {
          if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
            return;
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = "hsl(var(--accent-bright) / .35)";
          el.style.color = "hsl(var(--cream))";
          el.style.background = "hsl(var(--accent-bright) / .08)";
        }}
        onMouseOut={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = "var(--veil-line)";
          el.style.color = "hsl(var(--subtle))";
          el.style.background = "var(--veil-soft)";
        }}
        onPointerDown={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(0.97)";
        }}
        onPointerUp={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "";
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
