"use client";

import Link from "next/link";
import { LoginBrandContent } from "./LoginBrandContent";
import { SignupBrandContent } from "@/app/(auth)/signup/_components/SignupBrandContent";

export function BrandPanel({ panel }: { panel: "login" | "signup" }) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(160deg, hsl(28,25%,12%) 0%, hsl(28,18%,7%) 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 52px",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsl(28,62%,42%,.18) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -100,
          left: -60,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsl(22,70%,50%,.12) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,.035) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Link
          href="/"
          className="logo-hover"
          style={{ display: "inline-block" }}
        >
          <img
            src="/brand/logo-lockup-light.svg"
            width={160}
            height={44}
            alt="Plateform — Every dish, in 360°"
            draggable={false}
            style={{ display: "block" }}
          />
        </Link>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {panel === "login" ? <LoginBrandContent /> : <SignupBrandContent />}
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(255,255,255,.07)",
          paddingTop: 24,
        }}
      >
        <div
          className="font-sans"
          style={{
            fontSize: 12,
            color: "hsl(36,20%,45%)",
            letterSpacing: ".02em",
            fontWeight: 500,
          }}
        >
          {panel === "login"
            ? "מצטרפים למסעדות שכבר עברו לדיגיטל"
            : "חינמי לתמיד · ללא כרטיס אשראי"}
        </div>
      </div>
    </div>
  );
}
