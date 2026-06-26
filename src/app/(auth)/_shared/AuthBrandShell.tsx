"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { LogoWordmark } from "@/components/brand/LogoWordmark";

interface Props {
  children: ReactNode;
  /** Bottom footer label, e.g. "חינמי לתמיד · ללא כרטיס אשראי". */
  footer?: string;
}

/**
 * AuthBrandShell — left panel commun pages auth.
 * Logo top + slot central + slot bottom + noise/glow/dot grid background.
 */
export function AuthBrandShell({ children, footer }: Props) {
  return (
    <div
      className="auth-brand-panel"
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(160deg, hsl(28,25%,12%) 0%, hsl(28,18%,7%) 100%)",
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
          top: -100,
          left: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsl(22,70%,50%,.14) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -100,
          right: -60,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsl(28,62%,42%,.12) 0%, transparent 70%)",
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
        <Link href="/" className="logo-hover" style={{ display: "inline-block" }}>
          <LogoWordmark width={160} variant="light" />
        </Link>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>

      {footer && (
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
            {footer}
          </div>
        </div>
      )}
    </div>
  );
}
