"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { EditableText } from "@/components/editable/EditableText";
import { Marquee } from "@/components/appetite/Marquee";
import {
  Plus, ArrowRight, Check, Scan, Cuboid, Globe,
  ChevronRight, Sparkles, Star, Zap, BarChart3, Shield, Clock
} from "lucide-react";
import dynamic from "next/dynamic";

const Dish3DScene = dynamic(
  () => import("@/components/appetite/Dish3DScene").then(m => m.Dish3DScene),
  { ssr: false }
);

/* ─── Scroll reveal hook ────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-scale");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = el.dataset.delay || "0";
            setTimeout(() => el.classList.add("visible"), Number(delay));
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function HomePage() {
  useReveal();

  return (
    <div
      className="bg-grain-heavy min-h-screen overflow-x-hidden"
      style={{ background: "hsl(var(--void))" }}
    >

      {/* ═══════════════════════════════════════════════
          HEADER — glass nav bar
      ═══════════════════════════════════════════════ */}
      <header
        className="fixed top-0 inset-x-0 z-50"
        style={{
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          background: "hsl(var(--void) / 0.78)",
          borderBottom: "1px solid hsl(var(--snow)/0.06)",
        }}
      >
        <div
          className="max-w-7xl mx-auto px-6 lg:px-12"
          style={{ height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <div
              style={{
                width: 30,
                height: 30,
                border: "1px solid hsl(var(--gold)/0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 3,
                background: "hsl(var(--gold)/0.06)",
                boxShadow: "0 0 16px hsl(var(--gold)/0.12)",
              }}
            >
              <span style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "1.1rem",
                color: "hsl(var(--gold))",
                fontStyle: "italic",
                lineHeight: 1,
              }}>פ</span>
            </div>
            <span style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "1.15rem",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "hsl(var(--snow))",
            }}>פלטפורמה</span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex" style={{ gap: "36px", alignItems: "center" }}>
            {[["#features", "תכונות"], ["#pricing", "מחירים"], ["#faq", "שאלות נפוצות"]].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="hover-underline"
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "hsl(var(--subtle))",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "hsl(var(--snow))")}
                onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--subtle))")}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <span style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "hsl(var(--subtle))",
                transition: "color 0.2s",
                cursor: "pointer",
              }}>כניסה</span>
            </Link>
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <button className="btn-primary" style={{ padding: "9px 22px" }}>
                התחל
                <ArrowRight size={12} />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════
          HERO — Cinematic dark luxury
      ═══════════════════════════════════════════════ */}
      <section
        className="glow-hero"
        style={{
          paddingTop: "160px",
          paddingBottom: "120px",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Premium ambient orbs */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div className="orb-1" style={{
            position: "absolute", top: "15%", left: "8%",
            width: "600px", height: "600px",
            background: "radial-gradient(circle, hsl(var(--gold)/0.07) 0%, transparent 70%)",
            filter: "blur(60px)",
          }} />
          <div className="orb-2" style={{
            position: "absolute", top: "40%", right: "5%",
            width: "500px", height: "500px",
            background: "radial-gradient(circle, hsl(var(--sage)/0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }} />
          <div className="orb-3" style={{
            position: "absolute", bottom: "10%", left: "40%",
            width: "400px", height: "400px",
            background: "radial-gradient(circle, hsl(var(--gold)/0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
          }} />
        </div>

        {/* Subtle grid */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(hsl(var(--line)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--line)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.28,
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black 20%, transparent 100%)",
        }} />

        {/* Horizontal gold line — top center */}
        <div aria-hidden style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "800px", height: "1px",
          background: "linear-gradient(90deg, transparent, hsl(var(--gold)/0.3), transparent)",
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12" style={{ position: "relative", zIndex: 3, width: "100%", display: "flex", alignItems: "center", gap: "0" }}>

          {/* ── Col 1: Text ── */}
          <div style={{ flex: "0 0 52%", maxWidth: "52%" }}>

            {/* Eyebrow pill */}
            <div className="animate-fade-up" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              marginBottom: "40px", padding: "7px 16px",
              border: "1px solid hsl(var(--gold)/0.22)",
              borderRadius: "99px",
              background: "hsl(var(--gold)/0.05)",
              backdropFilter: "blur(12px)",
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "hsl(var(--sage))",
                boxShadow: "0 0 10px hsl(var(--sage)/0.7)",
                flexShrink: 0,
                animation: "pulseGlow 2.5s ease-in-out infinite",
              }} />
              <span className="eyebrow-gold" style={{ fontSize: "0.6rem" }}>
                תפריטים תלת-מימד · AR · VR — מסעדות כוכב מישלן
              </span>
            </div>

            {/* Main headline */}
            <div className="animate-fade-up" style={{ animationDelay: "80ms" }}>
              <h1 style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 300,
                fontSize: "clamp(56px, 5.8vw, 104px)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                margin: "0 0 8px 0",
              }}>
                {/* Line 1 — white with glint */}
                <span style={{ position: "relative", display: "block", overflow: "hidden" }}>
                  <span style={{
                    background: "linear-gradient(90deg, hsl(var(--snow)) 0%, hsl(30 20% 97%) 50%, hsl(var(--snow)) 100%)",
                    WebkitBackgroundClip: "text", backgroundClip: "text",
                    WebkitTextFillColor: "transparent", color: "transparent",
                  }}>הטלפון</span>
                  <span aria-hidden style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(108deg, transparent 35%, rgba(255,255,255,0.6) 50%, transparent 65%)",
                    backgroundSize: "200% 100%",
                    animation: "textGlint 4.5s ease-in-out infinite",
                    WebkitBackgroundClip: "text", backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    pointerEvents: "none",
                  }} />
                </span>

                {/* Line 2 — orange LV shimmer, italic */}
                <span style={{ position: "relative", display: "block", overflow: "hidden", fontStyle: "italic" }}>
                  <span style={{
                    background: "linear-gradient(135deg, hsl(24 80% 34%) 0%, hsl(var(--gold)) 30%, hsl(28 95% 72%) 52%, hsl(var(--gold)) 72%, hsl(24 80% 34%) 100%)",
                    backgroundSize: "220% 100%",
                    WebkitBackgroundClip: "text", backgroundClip: "text",
                    WebkitTextFillColor: "transparent", color: "transparent",
                    animation: "goldShimmer 3.2s ease-in-out infinite",
                    display: "inline-block", width: "100%",
                  }}>הופך</span>
                </span>

                {/* Line 3 — dim, secondary */}
                <span style={{ position: "relative", display: "block", overflow: "hidden" }}>
                  <span style={{
                    background: "linear-gradient(90deg, hsl(var(--snow)/0.38) 0%, hsl(var(--snow)/0.62) 50%, hsl(var(--snow)/0.38) 100%)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text", backgroundClip: "text",
                    WebkitTextFillColor: "transparent", color: "transparent",
                    animation: "textGlint 6s ease-in-out 1.2s infinite",
                    display: "inline-block", width: "100%",
                  }}>לצלחת</span>
                </span>
              </h1>

              <style>{`
                @keyframes goldShimmer {
                  0%   { background-position: 100% 0; }
                  50%  { background-position:   0% 0; }
                  100% { background-position: 100% 0; }
                }
                @keyframes textGlint {
                  0%, 65%, 100% { background-position: 220% 0; }
                  40%           { background-position: -50% 0; }
                }
                @keyframes pulseGlow {
                  0%,100% { opacity: 0.5; transform: scale(1); }
                  50%     { opacity: 1; transform: scale(1.1); }
                }
                @keyframes scan {
                  0%   { transform: translateY(-200%); }
                  100% { transform: translateY(200vh); }
                }
                @keyframes floatY {
                  0%,100% { transform: translateY(0px); }
                  50%     { transform: translateY(-12px); }
                }
              `}</style>
            </div>

            {/* Sub-headline */}
            <p className="animate-fade-up" style={{
              animationDelay: "160ms",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "hsl(var(--subtle))",
              maxWidth: "430px",
              marginTop: "36px",
              marginBottom: "0",
            }}>
              <EditableText
                contentKey="landing.hero.subtitle"
                defaultValue="הלקוח סורק. המנה מופיעה בתלת-מימד על השולחן. זה לא תפריט — זו חוויה גסטרונומית דיגיטלית."
                as="span"
                multiline
              />
            </p>

            {/* CTAs */}
            <div className="animate-fade-up" style={{
              animationDelay: "240ms",
              display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "52px",
            }}>
              <Link href="/signup" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ padding: "12px 28px", fontSize: "0.6875rem" }}>
                  התחל בחינם
                  <ArrowRight size={13} />
                </button>
              </Link>
              <a href="#features" style={{ textDecoration: "none" }}>
                <button className="btn-ghost" style={{ padding: "12px 28px", fontSize: "0.6875rem" }}>
                  ראה הדגמה
                </button>
              </a>
            </div>

            {/* Trust row */}
            <div className="animate-fade-up" style={{
              animationDelay: "360ms",
              display: "flex", flexWrap: "wrap", gap: "20px",
              marginTop: "52px", alignItems: "center",
            }}>
              {[
                "הגדרה תוך 5 דקות",
                "ללא אפליקציה",
                "עברית · אנגלית · צרפתית",
                "iOS ו-Android AR",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Check size={11} style={{ color: "hsl(var(--sage))", flexShrink: 0 }} />
                  <span style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.06em",
                    color: "hsl(var(--subtle))",
                  }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Col 2: 3D Dish ── */}
          <div
            className="hidden xl:flex"
            style={{
              flex: "0 0 48%", maxWidth: "48%",
              height: "620px",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Glow behind dish */}
            <div aria-hidden style={{
              position: "absolute",
              inset: "10%",
              background: "radial-gradient(circle, hsl(var(--gold)/0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }} />

            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Dish3DScene modelUrl="/models/hero-dish.glb" />
            </div>

            {/* Drag hint */}
            <div style={{
              position: "absolute", bottom: "20px", left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              display: "flex", alignItems: "center", gap: "8px",
              padding: "7px 18px",
              background: "hsl(var(--void)/0.8)",
              border: "1px solid hsl(var(--gold)/0.18)",
              borderRadius: "99px",
              backdropFilter: "blur(16px)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "hsl(var(--gold))",
                boxShadow: "0 0 8px hsl(var(--gold)/0.8)",
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.5625rem",
                letterSpacing: "0.12em",
                color: "hsl(var(--subtle))",
                textTransform: "uppercase",
              }}>גרור לסיבוב · Drag to rotate</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          opacity: 0.4,
        }}>
          <span style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.2em",
            color: "hsl(var(--subtle))",
            textTransform: "uppercase",
          }}>גלול</span>
          <div style={{
            width: 1, height: "40px",
            background: "linear-gradient(to bottom, hsl(var(--subtle)), transparent)",
            animation: "floatY 2s ease-in-out infinite",
          }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MARQUEE 1 — premium ticker
      ═══════════════════════════════════════════════ */}
      <div style={{
        borderTop: "1px solid hsl(var(--line))",
        borderBottom: "1px solid hsl(var(--line))",
        background: "hsl(var(--abyss))",
        padding: "20px 0",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Gold shimmer on ticker bg */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, transparent 0%, hsl(var(--gold)/0.02) 50%, transparent 100%)",
          pointerEvents: "none",
        }} />
        <Marquee className="">
          {[
            "בשר וגריל",
            "שלוש כוכבים",
            "מנות ים",
            "תפריט תלת-מימד",
            "סלטים טריים",
            "AR · VR",
            "יינות נבחרים",
            "סרוק וטעם",
            "פסטות",
            "QR חי",
            "קינוחים",
            "תל אביב · פריז",
          ].map((item, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: "28px",
              paddingRight: "28px",
              fontFamily: i % 3 === 0 ? "'Cormorant Garamond',serif" : i % 3 === 1 ? "'DM Mono',monospace" : "'DM Sans',sans-serif",
              fontSize: i % 3 === 0 ? "1.35rem" : "0.75rem",
              fontStyle: i % 3 === 0 ? "italic" : "normal",
              fontWeight: i % 3 === 0 ? 300 : 400,
              letterSpacing: i % 3 === 1 ? "0.14em" : "-0.01em",
              textTransform: i % 3 === 1 ? "uppercase" : "none",
              color: i % 4 === 0 ? "hsl(var(--snow))" : i % 4 === 1 ? "hsl(var(--gold))" : i % 4 === 2 ? "hsl(var(--pale))" : "hsl(var(--dim))",
              whiteSpace: "nowrap",
            }}>
              {item}
              <span style={{ color: "hsl(var(--line))", fontSize: "1.2em" }}>·</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ═══════════════════════════════════════════════
          STATS — floating numbers
      ═══════════════════════════════════════════════ */}
      <section style={{
        padding: "100px 0",
        background: "hsl(var(--void))",
        position: "relative",
        overflow: "hidden",
      }}>
        <div aria-hidden style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px", height: "400px",
          background: "radial-gradient(ellipse, hsl(var(--gold)/0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "0",
            borderTop: "1px solid hsl(var(--line))",
            borderLeft: "1px solid hsl(var(--line))",
          }}>
            {[
              { num: "+30%", label: "יותר הזמנות", sub: "שולחנות שסורקים", icon: <BarChart3 size={16} />, color: "hsl(var(--gold))" },
              { num: "3.4×", label: "יותר המרות", sub: "לעומת תפריט נייר", icon: <Zap size={16} />, color: "hsl(var(--sage))" },
              { num: "< 1s", label: "זמן פתיחה", sub: "ללא אפליקציה", icon: <Clock size={16} />, color: "hsl(var(--gold))" },
              { num: "100%", label: "תואם AR", sub: "iOS ו-Android", icon: <Shield size={16} />, color: "hsl(var(--sage))" },
            ].map((stat, i) => (
              <div
                key={i}
                className="reveal spotlight"
                data-delay={String(i * 80)}
                style={{
                  padding: "48px 36px",
                  borderRight: "1px solid hsl(var(--line))",
                  borderBottom: "1px solid hsl(var(--line))",
                  textAlign: "center",
                  position: "relative",
                  transition: "background 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "hsl(var(--abyss))")}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "")}
              >
                <div style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 36, height: 36, borderRadius: "50%",
                  background: `${stat.color}18`,
                  color: stat.color,
                  marginBottom: "20px",
                  border: `1px solid ${stat.color}30`,
                }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                  fontWeight: 200,
                  fontStyle: "italic",
                  letterSpacing: "-0.04em",
                  color: stat.color,
                  lineHeight: 1,
                  marginBottom: "8px",
                }}>{stat.num}</div>
                <div style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.9375rem",
                  color: "hsl(var(--snow))",
                  marginBottom: "4px",
                  fontWeight: 400,
                }}>{stat.label}</div>
                <div style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.625rem",
                  letterSpacing: "0.1em",
                  color: "hsl(var(--dim))",
                  textTransform: "uppercase",
                }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DEMO FLOW — 3 steps
      ═══════════════════════════════════════════════ */}
      <section style={{
        padding: "140px 0",
        background: "hsl(var(--abyss))",
        borderTop: "1px solid hsl(var(--line))",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Top gold line */}
        <div aria-hidden style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "600px", height: "1px",
          background: "linear-gradient(90deg, transparent, hsl(var(--gold)/0.35), transparent)",
        }} />
        <div aria-hidden style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "700px", height: "280px",
          background: "radial-gradient(ellipse at 50% 0%, hsl(var(--gold)/0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section label */}
          <div className="reveal" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "88px" }}>
            <span className="eyebrow">מסע הלקוח</span>
            <div style={{ flex: 1, height: "1px", background: "hsl(var(--line))" }} />
            <span className="eyebrow" style={{ color: "hsl(var(--dim))" }}>3 שלבים</span>
          </div>

          {/* Flow */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr auto 1fr",
            alignItems: "center",
            gap: "0",
          }} className="demo-flow">

            {/* Step 1 */}
            <div className="reveal" data-delay="0" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>
              <PhoneMockup type="qr" />
              <DemoLabel num="01" label="סריקה" color="hsl(var(--gold))" title="הלקוח מגיע" subtitle="הוא מניח את הטלפון על השולחן. קוד ה-QR כבר שם." />
            </div>

            <FlowArrow />

            {/* Step 2 */}
            <div className="reveal" data-delay="120" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>
              <PhoneMockup type="ar" />
              <DemoLabel num="02" label="ראייה בתלת-מימד" color="hsl(var(--sage))" title="המנה מופיעה" subtitle="המנה צצה בתלת-מימד, ישירות על השולחן הפיזי." />
            </div>

            <FlowArrow />

            {/* Step 3 */}
            <div className="reveal" data-delay="240" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>
              <PhoneMockup type="order" />
              <DemoLabel num="03" label="הזמנה" color="hsl(var(--pale))" title="הוא מזמין" subtitle="+30% המרות. הוא ראה את המנה לפני שבחר." />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .demo-flow {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURES — Bento grid premium
      ═══════════════════════════════════════════════ */}
      <section
        id="features"
        style={{
          padding: "140px 0",
          borderTop: "1px solid hsl(var(--line))",
          background: "hsl(var(--void))",
          position: "relative",
          scrollMarginTop: "80px",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <div aria-hidden style={{
          position: "absolute", top: "20%", right: "10%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, hsl(var(--gold)/0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "32px", marginBottom: "72px" }}>
            <div>
              <div className="reveal" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                <span className="eyebrow">השיטה</span>
                <div style={{ width: "80px", height: "1px", background: "hsl(var(--line))" }} />
              </div>
              <h2 className="reveal" data-delay="80" style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 300,
                fontSize: "clamp(40px, 5.5vw, 80px)",
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
                color: "hsl(var(--snow))",
                margin: 0,
              }}>
                שלושה שלבים.
                <br />
                <span style={{ fontStyle: "italic", color: "hsl(var(--gold))" }}>מהפכה גסטרונומית.</span>
              </h2>
            </div>
            <p className="reveal" data-delay="160" style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "1rem",
              color: "hsl(var(--subtle))",
              maxWidth: "340px",
              lineHeight: 1.7,
              margin: 0,
            }}>
              פלטפורמה הופכת כל מסעדה לחוויה דיגיטלית פרמיום — ללא תוכנה, ללא הורדה, ללא חיכוך.
            </p>
          </div>

          {/* Bento-style feature grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "hsl(var(--line))", border: "1px solid hsl(var(--line))" }}>
            {[
              {
                num: "01",
                icon: <Scan size={22} style={{ color: "hsl(var(--gold))" }} />,
                label: "סריקה",
                title: "הלקוח מכוון,\nהתפריט נפתח",
                body: "קוד QR אישי. תוך 0.8 שניות התפריט נפתח ישירות בדפדפן — ללא אפליקציה, ללא הורדה.",
                color: "hsl(var(--gold))",
                delay: "0",
              },
              {
                num: "02",
                icon: <Cuboid size={22} style={{ color: "hsl(var(--sage))" }} />,
                label: "תלת-מימד",
                title: "המנה על\nהשולחן, ב-AR",
                body: "iPhone ו-Android מציגים את המנה במציאות רבודה, ישירות על השולחן הפיזי. כל מנה — לפני ההזמנה.",
                color: "hsl(var(--sage))",
                delay: "100",
              },
              {
                num: "03",
                icon: <BarChart3 size={22} style={{ color: "hsl(var(--pale))" }} />,
                label: "אנליטיקה",
                title: "+30% הזמנות\nנמדדו",
                body: "שולחנות שסורקים ממירים 3.4× יותר. אנליטיקה בזמן אמת: צפיות, המרות, מנות פופולריות.",
                color: "hsl(var(--pale))",
                delay: "200",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="reveal spotlight"
                data-delay={step.delay}
                style={{
                  padding: "52px 44px 60px",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "default",
                  position: "relative",
                  background: "hsl(var(--void))",
                  transition: "background 0.35s ease",
                  overflow: "hidden",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "hsl(var(--abyss))"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "hsl(var(--void))"; }}
              >
                {/* Top color accent line */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: `linear-gradient(90deg, ${step.color}, transparent)`,
                  opacity: 0.5,
                }} />

                {/* Large background number */}
                <span style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(100px, 12vw, 168px)",
                  fontWeight: 200,
                  lineHeight: 0.82,
                  color: "hsl(var(--line))",
                  display: "block",
                  marginBottom: "28px",
                  letterSpacing: "-0.06em",
                  userSelect: "none",
                  transition: "color 0.3s ease",
                }}>{step.num}</span>

                {/* Icon + label */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: "50%",
                    background: `${step.color}12`,
                    border: `1px solid ${step.color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {step.icon}
                  </div>
                  <span className="eyebrow" style={{ color: step.color }}>{step.label}</span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(26px, 3vw, 36px)",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "hsl(var(--snow))",
                  margin: "0 0 16px 0",
                  whiteSpace: "pre-line",
                }}>{step.title}</h3>

                {/* Body */}
                <p style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                  color: "hsl(var(--subtle))",
                  margin: 0,
                  flex: 1,
                }}>{step.body}</p>

                {/* Arrow CTA */}
                <div style={{
                  marginTop: "28px",
                  display: "flex", alignItems: "center", gap: "6px",
                  color: step.color,
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.625rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}>
                  <ChevronRight size={12} />
                  <span>למד עוד</span>
                </div>
              </div>
            ))}
          </div>

          {/* Extra feature highlight row */}
          <div className="reveal" data-delay="100" style={{
            marginTop: "1px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "hsl(var(--line))",
            border: "1px solid hsl(var(--line))",
            borderTop: "none",
          }}>
            {[
              { icon: <Globe size={16} />, text: "RTL — עברית · אנגלית · צרפתית" },
              { icon: <Sparkles size={16} />, text: "מודלים 3D מקצועיים לכל מנה" },
              { icon: <Star size={16} />, text: "אנליטיקה בזמן אמת — CSV, PDF" },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "22px 36px",
                background: "hsl(var(--abyss))",
                display: "flex", alignItems: "center", gap: "14px",
              }}>
                <div style={{ color: "hsl(var(--gold)/0.6)", flexShrink: 0 }}>{item.icon}</div>
                <span style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.875rem",
                  color: "hsl(var(--pale))",
                }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          GALLERY — premium dish cards
      ═══════════════════════════════════════════════ */}
      <section
        id="gallery"
        style={{
          padding: "140px 0",
          background: "hsl(var(--abyss))",
          borderTop: "1px solid hsl(var(--line))",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap", gap: "32px", marginBottom: "72px",
          }}>
            <div>
              <span className="eyebrow reveal" style={{ display: "block", marginBottom: "18px" }}>הגלריה</span>
              <h2 className="reveal" data-delay="80" style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(40px, 5.5vw, 76px)",
                fontWeight: 300,
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
                color: "hsl(var(--snow))",
                margin: 0,
              }}>
                כל מנה,
                <br />
                <span style={{ fontStyle: "italic", color: "hsl(var(--gold))" }}>בשלושה ממדים</span>
              </h2>
            </div>
            <p className="reveal" data-delay="160" style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "1rem",
              color: "hsl(var(--subtle))",
              maxWidth: "320px",
              lineHeight: 1.7,
              margin: 0,
            }}>
              הלקוחות שלך רואים את המנה לפני שמזמינים. AR — תואם iPhone ו-Android, ללא אפליקציה.
            </p>
          </div>

          {/* Cards grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "1px",
            background: "hsl(var(--line))",
            border: "1px solid hsl(var(--line))",
          }}>
            {[
              { he: "בשר אנגוס",  sub: "אנגוס על האש",       price: "148", visual: "🥩", badge: "3D · AR",  delay: "0" },
              { he: "פסטה ים",    sub: "פסטה דגים טריים",     price: "89",  visual: "🍜", badge: "וידאו",   delay: "60" },
              { he: "סלט עונתי",  sub: "עשבי תיבול טריים",    price: "54",  visual: "🥗", badge: "3D",      delay: "120" },
              { he: "יין אדום",   sub: "בורדו · 2021",        price: "62",  visual: "🍷", badge: "360°",    delay: "180" },
              { he: "פונדאן",     sub: "שוקולד בלגי חם",      price: "44",  visual: "🍰", badge: "AR",      delay: "240" },
              { he: "אספרסו",     sub: "בלנד אתיופי",         price: "28",  visual: "☕", badge: "חי",      delay: "300" },
            ].map((dish, i) => (
              <PremiumDishCard key={i} {...dish} />
            ))}
          </div>

          <p className="reveal" style={{
            marginTop: "28px",
            textAlign: "center",
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.625rem",
            letterSpacing: "0.12em",
            color: "hsl(var(--dim))",
          }}>
            מודלים תלת-מימדיים מסופקים על ידי הצוות שלנו · פורמטים GLTF/GLB נתמכים
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MARQUEE 2 — reverse, large
      ═══════════════════════════════════════════════ */}
      <div style={{
        borderTop: "1px solid hsl(var(--line))",
        borderBottom: "1px solid hsl(var(--line))",
        background: "hsl(var(--void))",
        padding: "24px 0",
        overflow: "hidden",
      }}>
        <Marquee reverse>
          {["3D", "AR", "VR", "חי", "סריקה", "טעם", "חוויה", "מנה", "תפריט", "שולחן שחור", "פלטפורמה", "אוכל דיגיטלי"].map(
            (word, i) => (
              <span key={i} style={{
                display: "inline-block",
                paddingRight: "52px",
                fontFamily: i % 2 === 0 ? "'Cormorant Garamond',serif" : "'DM Mono',monospace",
                fontSize: i % 2 === 0 ? "2.5rem" : "0.75rem",
                fontStyle: i % 2 === 0 ? "italic" : "normal",
                fontWeight: 300,
                letterSpacing: i % 2 === 0 ? "-0.04em" : "0.18em",
                textTransform: i % 2 !== 0 ? "uppercase" : "none",
                color: i % 3 === 0 ? "hsl(var(--gold))" : i % 3 === 1 ? "hsl(var(--pale))" : "hsl(var(--dim))",
                whiteSpace: "nowrap",
              }}>{word}</span>
            )
          )}
        </Marquee>
      </div>

      {/* ═══════════════════════════════════════════════
          PRICING — premium tiers
      ═══════════════════════════════════════════════ */}
      <section
        id="pricing"
        style={{
          padding: "140px 0",
          background: "hsl(var(--void))",
          borderTop: "1px solid hsl(var(--line))",
          scrollMarginTop: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold ambient glow */}
        <div aria-hidden style={{
          position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)",
          width: "900px", height: "400px",
          background: "radial-gradient(ellipse at 50% 100%, hsl(var(--gold)/0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div style={{ marginBottom: "80px" }}>
            <span className="eyebrow reveal" style={{ display: "block", marginBottom: "20px" }}>מחירים</span>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "28px" }}>
              <h2 className="reveal" data-delay="80" style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(40px, 5.5vw, 76px)",
                fontWeight: 300,
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
                color: "hsl(var(--snow))",
                margin: 0,
              }}>
                שלוש תוכניות.
                <br />
                <span style={{ color: "hsl(var(--subtle))", fontStyle: "italic" }}>אפס הפתעות.</span>
              </h2>
              <div className="reveal" data-delay="160" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "9px 18px",
                border: "1px solid hsl(var(--sage)/0.28)",
                background: "hsl(var(--sage)/0.05)",
                borderRadius: "99px",
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "hsl(var(--sage))",
                  boxShadow: "0 0 8px hsl(var(--sage)/0.7)",
                  flexShrink: 0,
                  animation: "pulseGlow 2.5s ease-in-out infinite",
                }} />
                <span className="eyebrow" style={{ color: "hsl(var(--sage))", fontSize: "0.6rem" }}>
                  חודש ראשון מתנה
                </span>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "16px",
            alignItems: "start",
          }}>
            <PricingCard
              tier="I" name="טעימה" nameHe="כניסה לעולם" price="49"
              features={["תפריט דיגיטלי מלא","קוד QR אישי","עד 30 מנות","2 שפות","סטטיסטיקות בסיסיות"]}
            />
            <PricingCard
              tier="II" name="המנה העיקרית" nameHe="הבחירה הפופולרית" price="149" badge="מומלץ" highlight
              features={["מנות ללא הגבלה","וידאו לכל מנה","3 שפות + תרגום","סטטיסטיקות מתקדמות","ניתוח התנהגות","תמיכה מועדפת"]}
            />
            <PricingCard
              tier="III" name="דגוסטסיון" nameHe="חוויה מלאה" price="349"
              features={["כל מה שבמנה העיקרית","תלת-מימד לכל המנות","מציאות רבודה (AR)","מודלים בהתאמה אישית","ייעוץ אישי חודשי","מיתוג מותאם אישית"]}
            />
          </div>

          <p className="reveal" style={{
            marginTop: "28px",
            textAlign: "center",
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.625rem",
            letterSpacing: "0.12em",
            color: "hsl(var(--dim))",
          }}>
            כל המחירים בשקלים · לא כולל מע״מ · ללא התחייבות
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════ */}
      <section
        id="faq"
        style={{
          padding: "140px 0",
          background: "hsl(var(--abyss))",
          borderTop: "1px solid hsl(var(--line))",
          scrollMarginTop: "80px",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "80px",
            alignItems: "start",
          }} className="faq-grid">

            {/* Left sticky */}
            <div className="reveal" style={{ position: "sticky", top: "100px" }}>
              <span className="eyebrow" style={{ display: "block", marginBottom: "20px" }}>שאלות נפוצות</span>
              <h2 style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(34px, 4.5vw, 58px)",
                fontWeight: 300,
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "hsl(var(--snow))",
                margin: "0 0 24px 0",
              }}>
                שאלות
                <br />
                <span style={{ fontStyle: "italic", color: "hsl(var(--subtle))" }}>של סועדים</span>
              </h2>
              <p style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: "hsl(var(--subtle))",
                margin: "0 0 36px 0",
              }}>
                יש שאלות? הצוות שלנו זמין בעברית, צרפתית ואנגלית.
              </p>

              {/* Decorative gold line */}
              <div style={{
                width: "60px", height: "1px",
                background: "hsl(var(--gold)/0.4)",
              }} />
            </div>

            {/* Right FAQ items */}
            <div style={{ borderTop: "1px solid hsl(var(--line))" }}>
              {[
                { q: "כמה זמן לוקח להקים את התפריט?", a: "פחות מ-5 דקות. ההרשמה מיידית, ובממשק הניהול תוסיף את המסעדה, הקטגוריות והמנות במהירות. עדכונים מופיעים ללקוח באופן מיידי." },
                { q: "האם הלקוח צריך להוריד אפליקציה?", a: "לא. הכל עובד ישירות בדפדפן. הלקוח סורק את ה-QR, ומיד נפתח התפריט — כולל תלת-מימד ומציאות רבודה, ללא אפליקציה." },
                { q: "איך עובד התלת-מימד והמציאות הרבודה?", a: "אתה מעלה קובץ .glb (פורמט סטנדרטי), והלקוח יכול לראות את המנה מסתובבת ואפילו לשים אותה על השולחן שלו דרך מצלמת הטלפון." },
                { q: "אין לי מודלים תלת-מימדיים. מה לעשות?", a: "אפשר להתחיל עם תמונות ווידאו בלבד. כשתהיה מוכן לתלת-מימד, הצוות שלנו יכול להכין עבורך מודלים (תוכנית דגוסטסיון)." },
                { q: "האם המחירים כוללים מע״מ?", a: "המחירים אינם כוללים מע״מ. מע״מ יתווסף בחשבונית." },
                { q: "מה קורה אם אני רוצה לבטל?", a: "ביטול בכל עת ללא שאלות. המנוי יישאר פעיל עד סוף תקופת החיוב הנוכחית." },
              ].map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} index={i + 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA FINAL — cinematic
      ═══════════════════════════════════════════════ */}
      <section style={{
        padding: "180px 0",
        background: "hsl(var(--void))",
        borderTop: "1px solid hsl(var(--line))",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}>
        {/* Multi-layer gold glow */}
        <div aria-hidden style={{
          position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "1000px", height: "500px",
          background: "radial-gradient(ellipse at 50% 100%, hsl(var(--gold)/0.12) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div aria-hidden style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: "600px", height: "300px",
          background: "radial-gradient(ellipse, hsl(var(--gold)/0.04) 0%, transparent 70%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }} />

        {/* Horizontal lines */}
        <div aria-hidden style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "800px", height: "1px",
          background: "linear-gradient(90deg, transparent, hsl(var(--gold)/0.25), transparent)",
        }} />

        <div className="max-w-4xl mx-auto px-6 lg:px-12" style={{ position: "relative", zIndex: 1 }}>
          <span className="eyebrow reveal" style={{ display: "block", marginBottom: "36px" }}>הצטרפו לפלטפורמה</span>

          {/* Giant outline word */}
          <h2
            className="text-outline reveal"
            data-delay="80"
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(80px, 20vw, 220px)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 0.82,
              letterSpacing: "-0.06em",
              marginBottom: "72px",
              display: "block",
              userSelect: "none",
            }}
          >
            טעם
          </h2>

          <p className="reveal" data-delay="160" style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "1.125rem",
            lineHeight: 1.7,
            color: "hsl(var(--subtle))",
            maxWidth: "420px",
            margin: "0 auto 56px",
          }}>
            הצטרפו היום וקבלו חודש ראשון ללא תשלום.
            <br />
            התאמה מלאה, ביטול בכל עת.
          </p>

          <div className="reveal" data-delay="240" style={{
            display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center",
          }}>
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <button className="btn-primary" style={{ padding: "15px 36px", fontSize: "0.75rem" }}>
                שמרו את השולחן שלכם
                <ArrowRight size={14} />
              </button>
            </Link>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <button className="btn-ghost" style={{ padding: "15px 36px", fontSize: "0.75rem" }}>
                כבר לקוח
              </button>
            </Link>
          </div>

          <p className="reveal" data-delay="320" style={{
            marginTop: "28px",
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.14em",
            color: "hsl(var(--dim))",
            textTransform: "uppercase",
          }}>
            ללא כרטיס אשראי
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════ */}
      <footer style={{
        borderTop: "1px solid hsl(var(--line))",
        background: "hsl(var(--abyss))",
        padding: "64px 0 40px",
      }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div style={{
            display: "flex", flexWrap: "wrap",
            justifyContent: "space-between", gap: "48px", marginBottom: "56px",
          }}>
            {/* Brand */}
            <div style={{ maxWidth: "260px" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px",
              }}>
                <div style={{
                  width: 28, height: 28,
                  border: "1px solid hsl(var(--gold)/0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 2,
                  background: "hsl(var(--gold)/0.06)",
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "1rem",
                    color: "hsl(var(--gold))",
                    fontStyle: "italic",
                  }}>פ</span>
                </div>
                <span style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "1.25rem",
                  fontWeight: 300,
                  color: "hsl(var(--snow))",
                  letterSpacing: "-0.02em",
                }}>פלטפורמה</span>
              </div>
              <p style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.875rem",
                lineHeight: 1.65,
                color: "hsl(var(--subtle))",
                margin: 0,
              }}>
                פלטפורמת תפריטים תלת-מימד/AR למסעדות. תל אביב · פריז.
              </p>
            </div>

            {/* Links */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px" }}>
              {[
                { heading: "מוצר", links: [["#features", "תכונות"], ["#pricing", "מחירים"], ["#faq", "שאלות נפוצות"]] },
                { heading: "חברה", links: [["#", "אודות"], ["#", "צור קשר"], ["#", "עיתונות"]] },
                { heading: "משפטי", links: [["#", "תנאי שימוש"], ["#", "פרטיות"], ["#", "עוגיות"]] },
              ].map((col) => (
                <div key={col.heading}>
                  <span style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "0.625rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "hsl(var(--gold))",
                    display: "block",
                    marginBottom: "16px",
                  }}>{col.heading}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {col.links.map(([href, label]) => (
                      <a key={label} href={href} className="hover-underline" style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: "0.875rem",
                        color: "hsl(var(--subtle))",
                        textDecoration: "none",
                        transition: "color 0.2s",
                        display: "inline-block",
                      }}
                        onMouseEnter={e => (e.currentTarget.style.color = "hsl(var(--snow))")}
                        onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--subtle))")}
                      >{label}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: "1px solid hsl(var(--line))",
            paddingTop: "24px",
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: "12px",
          }}>
            <span style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.625rem",
              letterSpacing: "0.08em",
              color: "hsl(var(--dim))",
            }}>
              © {new Date().getFullYear()} פלטפורמה · כל הזכויות שמורות
            </span>
            <span style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.625rem",
              letterSpacing: "0.08em",
              color: "hsl(var(--dim))",
            }}>
              נוצר באהבה{" "}
              <span style={{ color: "hsl(var(--gold))" }}>◆</span>
              {" "}בתל אביב
            </span>
          </div>
        </div>
      </footer>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PHONE MOCKUP COMPONENTS
───────────────────────────────────────────────────────── */
function PhoneMockup({ type }: { type: "qr" | "ar" | "order" }) {
  const base: React.CSSProperties = {
    width: "100%",
    aspectRatio: "9/16",
    maxWidth: 190,
    margin: "0 auto",
    background: "hsl(var(--abyss))",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    padding: "28px 18px 22px",
    position: "relative",
    overflow: "hidden",
  };

  const notch = (
    <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 44, height: 5, background: "hsl(var(--deep))", borderRadius: 99 }} />
  );

  if (type === "qr") {
    return (
      <div style={{
        ...base,
        border: "1px solid hsl(var(--line))",
        boxShadow: "0 24px 64px -16px rgba(0,0,0,0.5)",
      }}>
        {notch}
        {/* QR grid */}
        <div style={{
          width: 84, height: 84,
          background: "hsl(var(--deep))",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 3, padding: 8,
        }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} style={{
              background: [0,1,5,6,3,4,9,15,16,20,21,18,19,24,12].includes(i) ? "hsl(var(--snow))" : "transparent",
              borderRadius: 1,
            }} />
          ))}
        </div>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.12em", color: "hsl(var(--subtle))", textTransform: "uppercase" }}>
          סרוק אותי
        </span>
        {/* Scan line */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, hsl(var(--gold)/0.85), transparent)",
          animation: "scan 2.5s linear infinite",
        }} />
      </div>
    );
  }

  if (type === "ar") {
    return (
      <div style={{
        ...base,
        border: "1px solid hsl(var(--gold)/0.28)",
        boxShadow: "0 0 0 1px hsl(var(--gold)/0.08), 0 24px 64px -16px hsl(var(--gold)/0.10)",
      }}>
        {notch}
        {/* 3D dish icon */}
        <div style={{
          width: 96, height: 96, borderRadius: "50%",
          background: "radial-gradient(ellipse at 38% 32%, hsl(var(--gold)/0.15), transparent 70%)",
          border: "1px solid hsl(var(--gold)/0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "2.8rem",
          filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.6))",
        }}>🥩</div>
        {/* AR badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "4px 12px",
          background: "hsl(var(--sage)/0.1)",
          border: "1px solid hsl(var(--sage)/0.28)",
          borderRadius: 99,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "hsl(var(--sage))", boxShadow: "0 0 6px hsl(var(--sage)/0.6)", animation: "pulseGlow 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.1em", color: "hsl(var(--sage))", textTransform: "uppercase" }}>AR חי</span>
        </div>
        {/* Dots */}
        <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: i === 1 ? "hsl(var(--gold))" : "hsl(var(--line))" }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      ...base,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      border: "1px solid hsl(var(--line))",
      boxShadow: "0 24px 64px -16px rgba(0,0,0,0.5)",
    }}>
      {notch}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
        {[
          { name: "בשר אנגוס", price: "148", active: true },
          { name: "פסטה עם ים", price: "89", active: false },
          { name: "סלט עונתי", price: "54", active: false },
        ].map((item) => (
          <div key={item.name} style={{
            width: "100%", padding: "8px 10px",
            background: item.active ? "hsl(var(--gold)/0.1)" : "transparent",
            border: `1px solid ${item.active ? "hsl(var(--gold)/0.35)" : "hsl(var(--line))"}`,
            borderRadius: 4,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontFamily: "'Noto Serif Hebrew',serif", fontSize: "0.5625rem", color: item.active ? "hsl(var(--snow))" : "hsl(var(--subtle))" }}>{item.name}</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.5rem", color: item.active ? "hsl(var(--gold))" : "hsl(var(--dim))" }}>₪{item.price}</span>
          </div>
        ))}
      </div>
      <div style={{
        position: "absolute", bottom: 16, left: 16, right: 16,
        padding: "8px 0",
        background: "hsl(var(--gold))",
        borderRadius: 4,
        textAlign: "center",
        fontFamily: "'DM Mono',monospace",
        fontSize: "0.5rem",
        fontWeight: 500,
        letterSpacing: "0.1em",
        color: "hsl(var(--void))",
        textTransform: "uppercase",
      }}>הוסף להזמנה</div>
    </div>
  );
}

function DemoLabel({ num, label, color, title, subtitle }: { num: string; label: string; color: string; title: string; subtitle: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "10px" }}>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.5625rem", letterSpacing: "0.12em", color: "hsl(var(--dim))" }}>{num}</span>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.625rem", letterSpacing: "0.12em", textTransform: "uppercase", color }}>{label}</span>
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 300, letterSpacing: "-0.02em", color: "hsl(var(--snow))", marginBottom: "8px" }}>{title}</div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8125rem", color: "hsl(var(--subtle))", lineHeight: 1.6, maxWidth: "200px", margin: "0 auto" }}>{subtitle}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   FLOW ARROW
───────────────────────────────────────────────────────── */
function FlowArrow() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 8px", marginBottom: "80px",
    }}>
      <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
        <line x1="0" y1="8" x2="32" y2="8" stroke="hsl(var(--line))" strokeWidth="1" />
        <polyline points="28,4 36,8 28,12" stroke="hsl(var(--gold)/0.5)" strokeWidth="1" fill="none" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PREMIUM DISH CARD
───────────────────────────────────────────────────────── */
function PremiumDishCard({ he, sub, price, visual, badge, delay }: {
  he: string; sub: string; price: string; visual: string; badge: string; delay: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="reveal"
      data-delay={delay}
      style={{
        background: hovered ? "hsl(var(--deep))" : "hsl(var(--abyss))",
        display: "flex", flexDirection: "column",
        cursor: "pointer",
        transition: "background 0.3s ease",
        position: "relative", overflow: "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Visual area */}
      <div style={{
        aspectRatio: "1",
        background: hovered ? "hsl(var(--surface))" : "hsl(var(--deep))",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        transition: "background 0.3s ease",
      }}>
        {/* Grid lines */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(hsl(var(--line)/0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--line)/0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: hovered ? 0.6 : 1,
          transition: "opacity 0.3s ease",
        }} />

        {/* Gold glow on hover */}
        {hovered && (
          <div aria-hidden style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 50% 50%, hsl(var(--gold)/0.07) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />
        )}

        <span style={{
          fontSize: "clamp(56px, 10vw, 80px)",
          position: "relative", zIndex: 1,
          filter: `drop-shadow(0 0 ${hovered ? "24px" : "16px"} rgba(0,0,0,0.7))`,
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), filter 0.3s ease",
          display: "block",
        }}>
          {visual}
        </span>

        {/* Badge */}
        <span style={{
          position: "absolute", top: "12px", left: "12px",
          fontFamily: "'DM Mono',monospace",
          fontSize: "0.5625rem",
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "hsl(var(--void))",
          background: "hsl(var(--gold))",
          padding: "3px 9px",
          borderRadius: "2px",
          zIndex: 2,
        }}>{badge}</span>
      </div>

      {/* Info row */}
      <div style={{
        padding: "20px",
        borderTop: "1px solid hsl(var(--line))",
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      }}>
        <div>
          <div style={{
            fontFamily: "'Noto Serif Hebrew',serif",
            fontSize: "1.125rem",
            fontWeight: 400,
            color: "hsl(var(--snow))",
            marginBottom: "2px",
          }}>{he}</div>
          <div style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontStyle: "italic",
            fontSize: "0.875rem",
            color: "hsl(var(--subtle))",
          }}>{sub}</div>
        </div>
        <span className="price-tag" style={{ fontSize: "1rem", whiteSpace: "nowrap" }}>₪{price}</span>
      </div>

      {/* Bottom hover accent */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--gold)/0.3))",
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PRICING CARD
───────────────────────────────────────────────────────── */
function PricingCard({ tier, name, nameHe, price, features, highlight = false, badge }: {
  tier: string; name: string; nameHe: string; price: string;
  features: string[]; highlight?: boolean; badge?: string;
}) {
  return (
    <div
      className={`reveal ${highlight ? "pricing-highlight" : ""}`}
      style={{
        border: highlight ? "1px solid hsl(var(--gold)/0.38)" : "1px solid hsl(var(--line))",
        background: highlight ? "hsl(var(--abyss))" : "hsl(var(--void))",
        padding: "44px 38px 48px",
        display: "flex", flexDirection: "column",
        position: "relative",
        marginTop: highlight ? "-12px" : "0",
        marginBottom: highlight ? "-12px" : "0",
        transition: "border-color 0.3s ease",
      }}
    >
      {/* Top accent line for highlight */}
      {highlight && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: "linear-gradient(90deg, hsl(var(--gold)), hsl(28 92% 70%), hsl(var(--gold)))",
        }} />
      )}

      {badge && (
        <span style={{
          position: "absolute", top: "-1px", left: "38px",
          fontFamily: "'DM Mono',monospace",
          fontSize: "0.5625rem",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "hsl(var(--void))",
          background: "hsl(var(--gold))",
          padding: "4px 12px",
        }}>{badge}</span>
      )}

      {/* Tier */}
      <div style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: "4.5rem",
        fontWeight: 200,
        fontStyle: "italic",
        lineHeight: 0.82,
        color: highlight ? "hsl(var(--gold)/0.28)" : "hsl(var(--line))",
        marginBottom: "28px",
        letterSpacing: "-0.06em",
      }}>{tier}</div>

      {/* Name */}
      <div style={{ marginBottom: "28px", paddingBottom: "28px", borderBottom: "1px solid hsl(var(--line))" }}>
        <div style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "1.625rem",
          fontWeight: 300,
          fontStyle: "italic",
          letterSpacing: "-0.02em",
          color: "hsl(var(--snow))",
          marginBottom: "4px",
        }}>{name}</div>
        <div style={{
          fontFamily: "'Noto Serif Hebrew',serif",
          fontSize: "0.9375rem",
          fontWeight: 300,
          color: "hsl(var(--subtle))",
        }}>{nameHe}</div>
      </div>

      {/* Price */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "4px" }}>
          <span style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.9rem",
            color: highlight ? "hsl(var(--gold))" : "hsl(var(--subtle))",
            marginTop: "10px",
          }}>₪</span>
          <span style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "3.75rem",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1,
            color: "hsl(var(--snow))",
            letterSpacing: "-0.04em",
          }}>{price}</span>
        </div>
        <span style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: "0.625rem",
          letterSpacing: "0.1em",
          color: "hsl(var(--dim))",
        }}>לחודש · לא כולל מע״מ</span>
      </div>

      {/* Features */}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px 0", flex: 1, display: "flex", flexDirection: "column", gap: "13px" }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <Check size={13} style={{
              color: highlight ? "hsl(var(--gold))" : "hsl(var(--sage))",
              flexShrink: 0, marginTop: "3px",
            }} />
            <span style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.9rem",
              color: "hsl(var(--pale))",
              lineHeight: 1.5,
            }}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link href="/signup" style={{ textDecoration: "none", display: "block" }}>
        <button className={highlight ? "btn-primary" : "btn-ghost"} style={{ width: "100%", justifyContent: "center" }}>
          בחרו תוכנית זו
        </button>
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────────────────────── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  return (
    <details className="group" style={{ borderBottom: "1px solid hsl(var(--line))" }}>
      <summary style={{
        padding: "30px 0",
        display: "flex", alignItems: "flex-start",
        justifyContent: "space-between", gap: "24px",
        cursor: "pointer", listStyle: "none",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", flex: 1 }}>
          <span style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.625rem",
            letterSpacing: "0.1em",
            color: "hsl(var(--gold))",
            flexShrink: 0, marginTop: "5px",
          }}>{String(index).padStart(2, "0")}</span>
          <span style={{
            fontFamily: "'Noto Serif Hebrew',serif",
            fontSize: "1.0625rem",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "hsl(var(--snow))",
          }}>{q}</span>
        </div>
        <Plus size={16} style={{
          color: "hsl(var(--subtle))",
          flexShrink: 0, marginTop: "4px",
          transition: "transform 0.25s ease",
        }} />
      </summary>

      <div style={{ paddingBottom: "30px", paddingLeft: "44px" }}>
        <p style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.9375rem",
          lineHeight: 1.75,
          color: "hsl(var(--subtle))",
          margin: 0,
        }}>{a}</p>
      </div>
    </details>
  );
}
