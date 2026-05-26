"use client";

import Link from "next/link";
import { HeroShowcase } from "@/components/landing/HeroShowcase";
import type { HeroModel } from "../_lib/types";

type HeroSectionProps = {
  models: HeroModel[];
  modelIdx: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (idx: number) => void;
};

/**
 * HeroSection — section hero plein écran (titre + showcase 3D + CTA + social proof).
 * Inclut aurora background + grid lines + vignette.
 */
export function HeroSection({
  models,
  modelIdx,
  onPrev,
  onNext,
  onSelect,
}: HeroSectionProps) {
  return (
    <section
      style={{
        paddingTop: 120,
        paddingBottom: 60,
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "hsl(38,28%,94%)",
      }}
    >
      {/* Aurora background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(hsl(32,20%,100%,.045) 1px,transparent 1px),linear-gradient(90deg,hsl(32,20%,100%,.045) 1px,transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "15%",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,hsl(28,62%,42%,.15) 0%,transparent 60%)",
            filter: "blur(80px)",
            animation: "aurora1 9s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "25%",
            right: "-8%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,hsl(36,80%,55%,.12) 0%,transparent 60%)",
            filter: "blur(100px)",
            animation: "aurora2 11s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "-5%",
            width: 700,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,hsl(40,50%,80%,.1) 0%,transparent 60%)",
            filter: "blur(120px)",
            animation: "aurora3 13s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 200,
            background:
              "linear-gradient(to bottom, transparent, hsl(38,28%,94%))",
          }}
        />
      </div>

      <div
        className="page-section-inner"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 56px",
          width: "100%",
          position: "relative",
          zIndex: 3,
          direction: "rtl",
          textAlign: "center",
        }}
      >
        {/* Badge social proof */}
        <div
          className="hero-fade-a"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px 6px 12px",
            background: "hsl(28,62%,42%,.1)",
            border: "1px solid hsl(28,62%,42%,.22)",
            borderRadius: 99,
            marginBottom: 36,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "hsl(var(--sage))",
              flexShrink: 0,
              animation: "badgeDot 2.2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: ".8125rem",
              color: "hsl(28,62%,58%)",
              fontWeight: 500,
            }}
          >
            +200 מסעדות כבר משתמשות בפלטפורמה
          </span>
        </div>

        {/* Titre */}
        <div style={{ overflow: "visible", marginBottom: 20 }}>
          <div style={{ overflow: "hidden" }}>
            <h1
              className="hero-fade-b"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(48px, 7vw, 108px)",
                lineHeight: 0.92,
                letterSpacing: "-.03em",
                margin: 0,
                padding: "4px 0 6px",
                color: "hsl(24,18%,16%)",
                display: "block",
              }}
            >
              תפריט שגורם
            </h1>
          </div>

          <div style={{ overflow: "hidden" }}>
            <h1
              className="hero-fade-c"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "clamp(40px, 6vw, 92px)",
                lineHeight: 0.92,
                letterSpacing: "-.02em",
                margin: 0,
                padding: "4px 0 6px",
                background:
                  "linear-gradient(135deg, hsl(28,62%,42%), hsl(22,70%,56%), hsl(28,58%,42%))",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation:
                  "fadeUp .7s cubic-bezier(.16,1,.3,1) .3s both, goldShimmer 6s ease-in-out 1s infinite",
                display: "block",
              }}
            >
              ללקוחות להזמין יותר
            </h1>
          </div>
        </div>

        {/* Description */}
        <p
          className="hero-fade-d"
          style={{
            fontSize: "1.0625rem",
            lineHeight: 1.75,
            color: "hsl(24,12%,38%)",
            maxWidth: 480,
            margin: "0 auto 0",
          }}
        >
          הלקוח סורק QR, רואה את המנה בתלת-מימד ומזמין בביטחון.
          <br />
          ללא אפליקציה. ללא הורדה.
        </p>

        {/* Présentoir 3D */}
        <div style={{ width: "100%", marginTop: 16 }}>
          <HeroShowcase
            models={models}
            modelIdx={modelIdx}
            onPrev={onPrev}
            onNext={onNext}
            onSelect={onSelect}
          />
        </div>

        {/* CTA */}
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

        {/* Social proof */}
        <div
          className="hero-fade-f"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 28,
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex" }}>
            {[
              "hsl(28,60%,55%)",
              "hsl(200,60%,55%)",
              "hsl(140,50%,50%)",
              "hsl(280,50%,60%)",
              "hsl(0,60%,60%)",
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: c,
                  border: "2px solid hsl(38,28%,94%)",
                  marginLeft: i === 0 ? 0 : -7,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
          <div
            style={{
              width: 1,
              height: 24,
              background: "hsl(32,20%,100%,.1)",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 2,
            }}
          >
            <div style={{ display: "flex", gap: 2 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="hsl(22,70%,50%)"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".75rem",
                color: "hsl(24,12%,38%)",
              }}
            >
              מדורג 4.9/5 על ידי 200+ מסעדות
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
