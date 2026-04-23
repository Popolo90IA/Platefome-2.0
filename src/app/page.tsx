"use client";

import React from "react";
import Link from "next/link";
import { EditableText } from "@/components/editable/EditableText";
import { Marquee } from "@/components/appetite/Marquee";
import { StickerRound } from "@/components/appetite/StickerRound";
import { Plus, ArrowRight, Check, Scan, Cuboid, Globe } from "lucide-react";
import dynamic from "next/dynamic";
const Dish3DScene = dynamic(
  () => import("@/components/appetite/Dish3DScene").then(m => m.Dish3DScene),
  { ssr: false }
);

export default function HomePage() {
  return (
    <div
      className="bg-grain-heavy min-h-screen overflow-x-hidden"
      style={{ background: "hsl(var(--void))" }}
    >

      {/* ───────────────────────────────────────────────────────
          HEADER
      ─────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 inset-x-0 z-50"
        style={{
          borderBottom: "1px solid hsl(var(--line))",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          background: "hsl(var(--void) / 0.82)",
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
                width: 28,
                height: 28,
                border: "1px solid hsl(var(--gold)/0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
              }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", color: "hsl(var(--gold))", fontStyle: "italic", lineHeight: 1 }}>
                פ
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "1.125rem",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "hsl(var(--snow))",
                lineHeight: 1,
              }}
            >
              פלטפורמה
            </span>
          </Link>

          {/* Nav */}
          <nav
            className="hidden md:flex"
            style={{ gap: "32px", alignItems: "center" }}
          >
            {[
              ["#features", "תכונות"],
              ["#pricing", "מחירים"],
              ["#faq", "שאלות נפוצות"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
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
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <span
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "hsl(var(--subtle))",
                  transition: "color 0.2s",
                  cursor: "pointer",
                }}
              >
                כניסה
              </span>
            </Link>
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <button className="btn-primary" style={{ padding: "9px 20px" }}>
                התחל
                <ArrowRight size={12} />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* ───────────────────────────────────────────────────────
          HERO
      ─────────────────────────────────────────────────────── */}
      <section
        className="glow-hero"
        style={{
          paddingTop: "160px",
          paddingBottom: "120px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid background */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(hsl(var(--line)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--line)) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            opacity: 0.35,
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, black 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, black 20%, transparent 100%)",
          }}
        />

        {/* Hero inner — two-column flex layout */}
        <div
          className="max-w-7xl mx-auto px-6 lg:px-12"
          style={{
            position: "relative",
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            gap: "0",
          }}
        >
          {/* ── Col 1 : Text (left) ── */}
          <div style={{ flex: "0 0 50%", maxWidth: "50%" }}>

            {/* Eyebrow */}
            <div
              className="animate-fade-up"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "40px",
                padding: "6px 14px",
                border: "1px solid hsl(var(--gold)/0.25)",
                borderRadius: "99px",
                background: "hsl(var(--gold)/0.06)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "hsl(var(--sage))",
                  boxShadow: "0 0 8px hsl(var(--sage)/0.6)",
                  flexShrink: 0,
                  animation: "pulseGlow 2.5s ease-in-out infinite",
                }}
              />
              <span className="eyebrow-gold" style={{ fontSize: "0.625rem" }}>
                תפריטים תלת-מימד · AR · VR — למסעדות
              </span>
            </div>

            {/* Main headline */}
            <div className="animate-fade-up" style={{ animationDelay: "80ms" }}>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 300,
                  fontSize: "clamp(52px, 5.5vw, 96px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.04em",
                  color: "hsl(var(--snow))",
                  margin: 0,
                  marginBottom: "8px",
                }}
              >
                הטלפון
                <br />
                <span
                  style={{
                    fontStyle: "italic",
                    background: "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(42 85% 78%) 60%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  הופך
                </span>
                <br />
                <span style={{ color: "hsl(var(--snow)/0.55)" }}>לצלחת</span>
              </h1>
            </div>

            {/* Sub-headline */}
            <p
              className="animate-fade-up"
              style={{
                animationDelay: "160ms",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "1.125rem",
                lineHeight: 1.65,
                color: "hsl(var(--subtle))",
                maxWidth: "420px",
                marginTop: "32px",
                marginBottom: "0",
              }}
            >
              <EditableText
                contentKey="landing.hero.subtitle"
                defaultValue="הלקוח סורק. המנה מופיעה בתלת-מימד על השולחן. זה לא תפריט — זו חוויה גסטרונומית דיגיטלית."
                as="span"
                multiline
              />
            </p>

            {/* CTAs */}
            <div
              className="animate-fade-up"
              style={{ animationDelay: "240ms", display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "48px" }}
            >
              <Link href="/signup" style={{ textDecoration: "none" }}>
                <button className="btn-primary">
                  התחל בחינם
                  <ArrowRight size={13} />
                </button>
              </Link>
              <a href="#features" style={{ textDecoration: "none" }}>
                <button className="btn-ghost">
                  ראה הדגמה
                </button>
              </a>
            </div>

            {/* Trust row */}
            <div
              className="animate-fade-up"
              style={{
                animationDelay: "360ms",
                display: "flex",
                flexWrap: "wrap",
                gap: "24px",
                marginTop: "56px",
                alignItems: "center",
              }}
            >
              {[
                "הגדרה תוך 5 דקות",
                "ללא אפליקציה",
                "עברית · אנגלית · צרפתית · RTL",
                "iOS ו-Android AR",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Check size={12} style={{ color: "hsl(var(--sage))", flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: "0.6875rem",
                      letterSpacing: "0.06em",
                      color: "hsl(var(--subtle))",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Col 2 : Dish (right) — desktop only ── */}
          <div
            className="hidden xl:flex"
            style={{
              flex: "0 0 50%",
              maxWidth: "50%",
              height: "600px",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Dish3DScene />
            </div>
            {/* Hint label */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                background: "hsl(var(--void)/0.75)",
                border: "1px solid hsl(var(--gold)/0.2)",
                borderRadius: "99px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "hsl(var(--gold))", boxShadow: "0 0 6px hsl(var(--gold)/0.7)", flexShrink: 0 }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.5625rem", letterSpacing: "0.12em", color: "hsl(var(--subtle))", textTransform: "uppercase" }}>
                גרור לסיבוב · Drag to rotate
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          MARQUEE 1
      ─────────────────────────────────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid hsl(var(--line))",
          borderBottom: "1px solid hsl(var(--line))",
          background: "hsl(var(--abyss))",
          padding: "18px 0",
          overflow: "hidden",
        }}
      >
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
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "28px",
                paddingRight: "28px",
                fontFamily: i % 3 === 0
                  ? "'Cormorant Garamond',serif"
                  : i % 3 === 1
                  ? "'DM Mono',monospace"
                  : "'DM Sans',sans-serif",
                fontSize: i % 3 === 0 ? "1.25rem" : "0.75rem",
                fontStyle: i % 3 === 0 ? "italic" : "normal",
                fontWeight: i % 3 === 0 ? 300 : 400,
                letterSpacing: i % 3 === 1 ? "0.12em" : "-0.01em",
                textTransform: i % 3 === 1 ? "uppercase" : "none",
                color: i % 4 === 0
                  ? "hsl(var(--snow))"
                  : i % 4 === 1
                  ? "hsl(var(--gold))"
                  : i % 4 === 2
                  ? "hsl(var(--pale))"
                  : "hsl(var(--dim))",
                whiteSpace: "nowrap",
              }}
            >
              {item}
              <span style={{ color: "hsl(var(--line))", fontSize: "1.2em" }}>·</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ───────────────────────────────────────────────────────
          DEMO VISUELLE — המסע בשלושה שלבים
      ─────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "120px 0",
          background: "hsl(var(--void))",
          borderTop: "1px solid hsl(var(--line))",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold glow top-center */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "320px",
            background: "radial-gradient(ellipse at 50% 0%, hsl(var(--gold)/0.09) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12" style={{ position: "relative", zIndex: 1 }}>
          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "72px" }}>
            <span className="eyebrow">מסע הלקוח</span>
            <div style={{ flex: 1, height: "1px", background: "hsl(var(--line))" }} />
          </div>

          {/* Flow diagram — 3 phone mockups linked by lines */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr auto 1fr",
              alignItems: "center",
              gap: "0",
            }}
            className="demo-flow"
          >
            {/* Step 1 — SCAN */}
            <DemoStep
              num="01"
              label="סריקה"
              labelColor="hsl(var(--gold))"
              title="הלקוח מגיע"
              subtitle="הוא מניח את הטלפון על השולחן. קוד ה-QR כבר שם."
              visual={
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "9/16",
                    maxWidth: 180,
                    margin: "0 auto",
                    background: "hsl(var(--abyss))",
                    border: "1px solid hsl(var(--line))",
                    borderRadius: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    padding: "24px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Phone notch */}
                  <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 48, height: 5, background: "hsl(var(--deep))", borderRadius: 99 }} />
                  {/* QR code mockup */}
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      background: "hsl(var(--deep))",
                      display: "grid",
                      gridTemplateColumns: "repeat(5, 1fr)",
                      gap: 3,
                      padding: 8,
                    }}
                  >
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          background: [0,1,5,6,3,4,9,15,16,20,21,18,19,24,12].includes(i)
                            ? "hsl(var(--snow))"
                            : "transparent",
                          borderRadius: 1,
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.5625rem", letterSpacing: "0.12em", color: "hsl(var(--subtle))", textTransform: "uppercase" }}>
                    סרוק אותי
                  </span>
                  {/* Scan line animation */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      height: 1,
                      background: "linear-gradient(90deg, transparent, hsl(var(--gold)/0.8), transparent)",
                      animation: "scan 2.5s linear infinite",
                    }}
                  />
                </div>
              }
            />

            {/* Arrow 1 */}
            <FlowArrow />

            {/* Step 2 — VOIR */}
            <DemoStep
              num="02"
              label="ראייה בתלת-מימד"
              labelColor="hsl(var(--sage))"
              title="המנה מופיעה"
              subtitle="המנה צצה בתלת-מימד, ישירות על השולחן הפיזי."
              visual={
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "9/16",
                    maxWidth: 180,
                    margin: "0 auto",
                    background: "hsl(var(--abyss))",
                    border: "1px solid hsl(var(--gold)/0.3)",
                    borderRadius: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    padding: "24px",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 0 0 1px hsl(var(--gold)/0.1), 0 24px 64px -16px hsl(var(--gold)/0.12)",
                  }}
                >
                  <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 48, height: 5, background: "hsl(var(--deep))", borderRadius: 99 }} />
                  {/* 3D dish emoji with glow */}
                  <div
                    style={{
                      width: 88,
                      height: 88,
                      borderRadius: "50%",
                      background: "radial-gradient(ellipse at 40% 35%, hsl(var(--gold)/0.15), transparent 70%)",
                      border: "1px solid hsl(var(--gold)/0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2.8rem",
                      filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.6))",
                    }}
                  >
                    🥩
                  </div>
                  {/* AR badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "4px 10px",
                      background: "hsl(var(--sage)/0.12)",
                      border: "1px solid hsl(var(--sage)/0.3)",
                      borderRadius: 99,
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "hsl(var(--sage))", boxShadow: "0 0 6px hsl(var(--sage)/0.6)" }} />
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.1em", color: "hsl(var(--sage))", textTransform: "uppercase" }}>AR חי</span>
                  </div>
                  {/* Rotation hint */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    {[0,1,2].map(i => (
                      <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: i === 1 ? "hsl(var(--gold))" : "hsl(var(--line))" }} />
                    ))}
                  </div>
                </div>
              }
            />

            {/* Arrow 2 */}
            <FlowArrow />

            {/* Step 3 — ORDER */}
            <DemoStep
              num="03"
              label="הזמנה"
              labelColor="hsl(var(--pale))"
              title="הוא מזמין"
              subtitle="+30% המרות. הוא ראה את המנה לפני שבחר."
              visual={
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "9/16",
                    maxWidth: 180,
                    margin: "0 auto",
                    background: "hsl(var(--abyss))",
                    border: "1px solid hsl(var(--line))",
                    borderRadius: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "28px 16px 20px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 48, height: 5, background: "hsl(var(--deep))", borderRadius: 99 }} />
                  {/* Menu item */}
                  {[
                    { name: "בשר אנגוס", price: "148", active: true },
                    { name: "פסטה עם ים", price: "89", active: false },
                    { name: "סלט עונתי",  price: "54", active: false },
                  ].map((item) => (
                    <div
                      key={item.name}
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        background: item.active ? "hsl(var(--gold)/0.1)" : "transparent",
                        border: `1px solid ${item.active ? "hsl(var(--gold)/0.35)" : "hsl(var(--line))"}`,
                        borderRadius: 4,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontFamily: "'Noto Serif Hebrew',serif", fontSize: "0.625rem", color: item.active ? "hsl(var(--snow))" : "hsl(var(--subtle))" }}>{item.name}</span>
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.5625rem", color: item.active ? "hsl(var(--gold))" : "hsl(var(--dim))" }}>₪{item.price}</span>
                    </div>
                  ))}
                  {/* Add to order button */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 16,
                      left: 16,
                      right: 16,
                      padding: "8px 0",
                      background: "hsl(var(--gold))",
                      borderRadius: 4,
                      textAlign: "center",
                      fontFamily: "'DM Mono',monospace",
                      fontSize: "0.5625rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      color: "hsl(var(--void))",
                      textTransform: "uppercase",
                    }}
                  >
                    הוסף להזמנה
                  </div>
                </div>
              }
            />
          </div>

          {/* Stat strip */}
          <div
            style={{
              marginTop: "80px",
              padding: "32px 40px",
              border: "1px solid hsl(var(--line))",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "32px",
              background: "hsl(var(--abyss))",
            }}
          >
            {[
              { num: "+30%", label: "יותר הזמנות", sub: "שולחנות שסורקים" },
              { num: "3.4×", label: "יותר המרות", sub: "לעומת תפריט נייר" },
              { num: "< 1s", label: "זמן פתיחה", sub: "ללא אפליקציה" },
              { num: "100%", label: "תואם AR", sub: "iOS ו-Android" },
            ].map((stat) => (
              <div key={stat.num} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "2.5rem",
                    fontWeight: 300,
                    fontStyle: "italic",
                    letterSpacing: "-0.04em",
                    color: "hsl(var(--gold))",
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}
                >
                  {stat.num}
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.875rem", color: "hsl(var(--snow))", marginBottom: "2px" }}>
                  {stat.label}
                </div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.625rem", letterSpacing: "0.08em", color: "hsl(var(--subtle))", textTransform: "uppercase" }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responsive fix */}
        <style>{`
          @media (max-width: 860px) {
            .demo-flow {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
            }
          }
        `}</style>
      </section>

      {/* ───────────────────────────────────────────────────────
          FEATURES — 3 columns with large numbers
      ─────────────────────────────────────────────────────── */}
      <section
        id="features"
        style={{
          padding: "120px 0",
          borderTop: "1px solid hsl(var(--line))",
          background: "hsl(var(--abyss))",
          position: "relative",
          scrollMarginTop: "80px",
        }}
      >
        {/* Glow top */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, hsl(var(--gold)/0.4), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "80px",
            }}
          >
            <span className="eyebrow">השיטה</span>
            <div style={{ flex: 1, height: "1px", background: "hsl(var(--line))" }} />
          </div>

          {/* 3 steps */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1px",
              background: "hsl(var(--line))",
              border: "1px solid hsl(var(--line))",
            }}
          >
            {[
              {
                num: "01",
                icon: <Scan size={20} style={{ color: "hsl(var(--gold))" }} />,
                label: "סריקה",
                title: "הלקוח מכוון,\nהתפריט נפתח",
                body: "קוד QR אישי. תוך 0.8 שניות התפריט נפתח ישירות בדפדפן — ללא אפליקציה, ללא הורדה, ללא חיכוך.",
                he: "סריקה",
                color: "hsl(var(--gold))",
              },
              {
                num: "02",
                icon: <Cuboid size={20} style={{ color: "hsl(var(--sage))" }} />,
                label: "ראייה בתלת-מימד",
                title: "המנה על\nהשולחן, ב-AR",
                body: "iPhone ו-Android מציגים את המנה במציאות רבודה, ישירות על השולחן הפיזי. כל מנה — לפני ההזמנה.",
                he: "ראייה",
                color: "hsl(var(--sage))",
              },
              {
                num: "03",
                icon: <Globe size={20} style={{ color: "hsl(var(--pale))" }} />,
                label: "טעימה",
                title: "+30% הזמנות\nנמדדו",
                body: "שולחנות שסורקים ממירים 3.4× יותר. אנליטיקה בזמן אמת: צפיות, המרות, מנות פופולריות, התנהגות לקוח.",
                he: "חוויה",
                color: "hsl(var(--pale))",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="card-surface"
                style={{
                  padding: "48px 40px 52px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0",
                  cursor: "default",
                  position: "relative",
                  border: "none",
                  background: "hsl(var(--abyss))",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "hsl(var(--deep))")}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "hsl(var(--abyss))")}
              >
                {/* Large number */}
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "clamp(96px, 12vw, 160px)",
                    fontWeight: 200,
                    lineHeight: 0.85,
                    color: "hsl(var(--line))",
                    display: "block",
                    marginBottom: "32px",
                    letterSpacing: "-0.06em",
                    userSelect: "none",
                  }}
                >
                  {step.num}
                </span>

                {/* Icon + label */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                  {step.icon}
                  <span className="eyebrow" style={{ color: step.color }}>{step.label}</span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "clamp(24px, 3vw, 34px)",
                    fontWeight: 300,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "hsl(var(--snow))",
                    margin: "0 0 16px 0",
                    whiteSpace: "pre-line",
                  }}
                >
                  {step.title}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.9375rem",
                    lineHeight: 1.65,
                    color: "hsl(var(--subtle))",
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {step.body}
                </p>

                {/* Hebrew word — bottom right */}
                <span
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "24px",
                    fontFamily: "'Noto Serif Hebrew',serif",
                    fontSize: "0.75rem",
                    fontWeight: 300,
                    color: "hsl(var(--dim))",
                    letterSpacing: "0.04em",
                  }}
                >
                  {step.he}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          DISH GALLERY — 6 cards
      ─────────────────────────────────────────────────────── */}
      <section
        id="gallery"
        style={{
          padding: "120px 0",
          background: "hsl(var(--void))",
          borderTop: "1px solid hsl(var(--line))",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "24px",
              marginBottom: "64px",
            }}
          >
            <div>
              <span className="eyebrow" style={{ display: "block", marginBottom: "16px" }}>
                הגלריה
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 300,
                  lineHeight: 0.94,
                  letterSpacing: "-0.04em",
                  color: "hsl(var(--snow))",
                  margin: 0,
                }}
              >
                כל מנה,
                <br />
                <span style={{ fontStyle: "italic", color: "hsl(var(--gold))" }}>בשלושה ממדים</span>
              </h2>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.9375rem",
                color: "hsl(var(--subtle))",
                maxWidth: "320px",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              הלקוחות שלך רואים את המנה לפני שמזמינים. פורמט AR — תואם iPhone ו-Android, ללא אפליקציה.
            </p>
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1px",
              background: "hsl(var(--line))",
            }}
          >
            {[
              { he: "בשר אנגוס",  sub: "אנגוס על האש",       price: "148", emoji: "🥩", badge: "3D · AR" },
              { he: "פסטה עם ים", sub: "פסטה דגים",           price: "89",  emoji: "🍜", badge: "וידאו" },
              { he: "סלט עונתי",  sub: "סלט עונות",           price: "54",  emoji: "🥗", badge: "3D" },
              { he: "יין אדום",   sub: "יין אדום · 2021",     price: "62",  emoji: "🍷", badge: "360°" },
              { he: "פונדו",      sub: "עוגת שוקולד חמה",     price: "44",  emoji: "🍰", badge: "AR" },
              { he: "קפה",        sub: "קפה מיוחד",           price: "28",  emoji: "☕", badge: "חי" },
            ].map((dish, i) => (
              <DishCard key={i} {...dish} />
            ))}
          </div>

          {/* Bottom note */}
          <div
            style={{
              marginTop: "32px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                color: "hsl(var(--dim))",
              }}
            >
              מודלים תלת-מימדיים מסופקים על ידי הצוות שלנו · פורמטים GLTF/GLB נתמכים
            </span>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          MARQUEE 2 — reverse
      ─────────────────────────────────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid hsl(var(--line))",
          borderBottom: "1px solid hsl(var(--line))",
          background: "hsl(var(--abyss))",
          padding: "20px 0",
          overflow: "hidden",
        }}
      >
        <Marquee reverse>
          {["3D", "AR", "VR", "חי", "סריקה", "טעם", "חוויה", "מנה", "תפריט", "שולחן שחור", "פלטפורמה", "אוכל דיגיטלי"].map(
            (word, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  paddingRight: "48px",
                  fontFamily: i % 2 === 0 ? "'Cormorant Garamond',serif" : "'DM Mono',monospace",
                  fontSize: i % 2 === 0 ? "2.25rem" : "0.75rem",
                  fontStyle: i % 2 === 0 ? "italic" : "normal",
                  fontWeight: 300,
                  letterSpacing: i % 2 === 0 ? "-0.04em" : "0.18em",
                  textTransform: i % 2 !== 0 ? "uppercase" : "none",
                  color: i % 3 === 0
                    ? "hsl(var(--gold))"
                    : i % 3 === 1
                    ? "hsl(var(--pale))"
                    : "hsl(var(--dim))",
                  whiteSpace: "nowrap",
                }}
              >
                {word}
              </span>
            )
          )}
        </Marquee>
      </div>

      {/* ───────────────────────────────────────────────────────
          PRICING
      ─────────────────────────────────────────────────────── */}
      <section
        id="pricing"
        style={{
          padding: "120px 0",
          background: "hsl(var(--void))",
          borderTop: "1px solid hsl(var(--line))",
          scrollMarginTop: "80px",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div style={{ marginBottom: "72px" }}>
            <span className="eyebrow" style={{ display: "block", marginBottom: "20px" }}>
              מחירים
            </span>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 300,
                  lineHeight: 0.94,
                  letterSpacing: "-0.04em",
                  color: "hsl(var(--snow))",
                  margin: 0,
                }}
              >
                שלוש תוכניות.
                <br />
                <span style={{ color: "hsl(var(--subtle))", fontStyle: "italic" }}>אפס הפתעות.</span>
              </h2>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 16px",
                  border: "1px solid hsl(var(--sage)/0.3)",
                  background: "hsl(var(--sage)/0.06)",
                  borderRadius: "99px",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(var(--sage))", flexShrink: 0 }} />
                <span className="eyebrow" style={{ color: "hsl(var(--sage))", fontSize: "0.625rem" }}>
                  חודש ראשון מתנה
                </span>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
              alignItems: "start",
            }}
          >
            <PricingCard
              tier="I"
              name="טעימה"
              nameHe="כניסה לעולם"
              price="49"
              features={[
                "תפריט דיגיטלי מלא",
                "קוד QR אישי",
                "עד 30 מנות",
                "2 שפות",
                "סטטיסטיקות בסיסיות",
              ]}
            />
            <PricingCard
              tier="II"
              name="המנה העיקרית"
              nameHe="הבחירה הפופולרית"
              price="149"
              badge="מומלץ"
              highlight
              features={[
                "מנות ללא הגבלה",
                "וידאו לכל מנה",
                "3 שפות + תרגום",
                "סטטיסטיקות מתקדמות",
                "ניתוח התנהגות",
                "תמיכה מועדפת",
              ]}
            />
            <PricingCard
              tier="III"
              name="דגוסטסיון"
              nameHe="חוויה מלאה"
              price="349"
              features={[
                "כל מה שבמנה העיקרית",
                "תלת-מימד לכל המנות",
                "מציאות רבודה (AR)",
                "מודלים בהתאמה אישית",
                "ייעוץ אישי חודשי",
                "מיתוג מותאם אישית",
              ]}
            />
          </div>

          <p
            style={{
              marginTop: "32px",
              textAlign: "center",
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.1em",
              color: "hsl(var(--dim))",
            }}
          >
            כל המחירים בשקלים · לא כולל מע״מ · ללא התחייבות
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          FAQ
      ─────────────────────────────────────────────────────── */}
      <section
        id="faq"
        style={{
          padding: "120px 0",
          background: "hsl(var(--abyss))",
          borderTop: "1px solid hsl(var(--line))",
          scrollMarginTop: "80px",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "80px",
              alignItems: "start",
            }}
            className="faq-grid"
          >
            {/* Left — sticky heading */}
            <div style={{ position: "sticky", top: "100px" }}>
              <span className="eyebrow" style={{ display: "block", marginBottom: "20px" }}>
                שאלות נפוצות
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 300,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "hsl(var(--snow))",
                  margin: "0 0 24px 0",
                }}
              >
                שאלות
                <br />
                <span style={{ fontStyle: "italic", color: "hsl(var(--subtle))" }}>של סועדים</span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.9375rem",
                  lineHeight: 1.65,
                  color: "hsl(var(--subtle))",
                  margin: 0,
                }}
              >
                יש שאלות? הצוות שלנו זמין בעברית, צרפתית ואנגלית.
              </p>
            </div>

            {/* Right — questions */}
            <div
              style={{
                borderTop: "1px solid hsl(var(--line))",
              }}
            >
              {[
                {
                  q: "כמה זמן לוקח להקים את התפריט?",
                  a: "פחות מ-5 דקות. ההרשמה מיידית, ובממשק הניהול תוסיף את המסעדה, הקטגוריות והמנות במהירות. עדכונים מופיעים ללקוח באופן מיידי.",
                },
                {
                  q: "האם הלקוח צריך להוריד אפליקציה?",
                  a: "לא. הכל עובד ישירות בדפדפן. הלקוח סורק את ה-QR, ומיד נפתח התפריט — כולל תלת-מימד ומציאות רבודה, ללא אפליקציה.",
                },
                {
                  q: "איך עובד התלת-מימד והמציאות הרבודה?",
                  a: "אתה מעלה קובץ .glb (פורמט סטנדרטי), והלקוח יכול לראות את המנה מסתובבת ואפילו לשים אותה על השולחן שלו דרך מצלמת הטלפון.",
                },
                {
                  q: "אין לי מודלים תלת-מימדיים. מה לעשות?",
                  a: "אפשר להתחיל עם תמונות ווידאו בלבד. כשתהיה מוכן לתלת-מימד, הצוות שלנו יכול להכין עבורך מודלים (תוכנית דגוסטסיון).",
                },
                {
                  q: "האם המחירים כוללים מע״מ?",
                  a: "המחירים אינם כוללים מע״מ. מע״מ יתווסף בחשבונית.",
                },
                {
                  q: "מה קורה אם אני רוצה לבטל?",
                  a: "ביטול בכל עת ללא שאלות. המנוי יישאר פעיל עד סוף תקופת החיוב הנוכחית.",
                },
              ].map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} index={i + 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          CTA FINAL
      ─────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "160px 0",
          background: "hsl(var(--void))",
          borderTop: "1px solid hsl(var(--line))",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Gold glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background: "radial-gradient(ellipse at 50% 100%, hsl(var(--gold)/0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="max-w-4xl mx-auto px-6 lg:px-12" style={{ position: "relative", zIndex: 1 }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: "32px" }}>
            הצטרפו לפלטפורמה
          </span>

          {/* Giant outline word */}
          <h2
            className="text-outline"
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(80px, 18vw, 200px)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 0.85,
              letterSpacing: "-0.06em",
              marginBottom: "64px",
              display: "block",
              userSelect: "none",
            }}
          >
            טעם
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "1.0625rem",
              lineHeight: 1.7,
              color: "hsl(var(--subtle))",
              maxWidth: "440px",
              margin: "0 auto 48px",
            }}
          >
            הצטרפו היום וקבלו חודש ראשון ללא תשלום.
            <br />
            התאמה מלאה, ביטול בכל עת.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <button className="btn-primary" style={{ padding: "14px 32px", fontSize: "0.75rem" }}>
                שמרו את השולחן שלכם
                <ArrowRight size={14} />
              </button>
            </Link>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <button className="btn-ghost" style={{ padding: "14px 32px", fontSize: "0.75rem" }}>
                כבר לקוח
              </button>
            </Link>
          </div>

          <p
            style={{
              marginTop: "24px",
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.625rem",
              letterSpacing: "0.12em",
              color: "hsl(var(--dim))",
              textTransform: "uppercase",
            }}
          >
            ללא כרטיס אשראי
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          FOOTER
      ─────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid hsl(var(--line))",
          background: "hsl(var(--abyss))",
          padding: "56px 0 40px",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "48px",
              marginBottom: "48px",
            }}
          >
            {/* Brand */}
            <div style={{ maxWidth: "240px" }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: "hsl(var(--snow))",
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                }}
              >
                פלטפורמה
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  color: "hsl(var(--subtle))",
                  margin: 0,
                }}
              >
                פלטפורמת תפריטים תלת-מימד/AR למסעדות. תל אביב · פריז.
              </p>
            </div>

            {/* Links */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "48px",
              }}
            >
              {[
                {
                  heading: "מוצר",
                  links: [["#features", "תכונות"], ["#pricing", "מחירים"], ["#faq", "שאלות נפוצות"]],
                },
                {
                  heading: "חברה",
                  links: [["#", "אודות"], ["#", "צור קשר"], ["#", "עיתונות"]],
                },
                {
                  heading: "משפטי",
                  links: [["#", "תנאי שימוש"], ["#", "פרטיות"], ["#", "עוגיות"]],
                },
              ].map((col) => (
                <div key={col.heading}>
                  <span
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: "0.6875rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "hsl(var(--gold))",
                      display: "block",
                      marginBottom: "16px",
                    }}
                  >
                    {col.heading}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {col.links.map(([href, label]) => (
                      <a
                        key={label}
                        href={href}
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: "0.875rem",
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
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid hsl(var(--line))",
              paddingTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.08em",
                color: "hsl(var(--dim))",
              }}
            >
              © {new Date().getFullYear()} פלטפורמה · כל הזכויות שמורות
            </span>
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.08em",
                color: "hsl(var(--dim))",
              }}
            >
              נוצר באהבה{" "}
              <span style={{ color: "hsl(var(--gold))" }}>◆</span>
              {" "}בתל אביב
            </span>
          </div>
        </div>
      </footer>

      {/* Responsive FAQ grid override */}
      <style>{`
        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   DEMO STEP
───────────────────────────────────────────────────────── */
function DemoStep({
  num,
  label,
  labelColor,
  title,
  subtitle,
  visual,
}: {
  num: string;
  label: string;
  labelColor: string;
  title: string;
  subtitle: string;
  visual: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "28px" }}>
      {/* Phone visual */}
      {visual}

      {/* Text */}
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.5625rem", letterSpacing: "0.12em", color: "hsl(var(--dim))" }}>{num}</span>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: labelColor }}>{label}</span>
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.375rem", fontWeight: 300, letterSpacing: "-0.02em", color: "hsl(var(--snow))", marginBottom: "6px" }}>
          {title}
        </div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8125rem", color: "hsl(var(--subtle))", lineHeight: 1.6, maxWidth: "200px", margin: "0 auto" }}>
          {subtitle}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   FLOW ARROW
───────────────────────────────────────────────────────── */
function FlowArrow() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 8px",
        marginBottom: "80px", /* align with phone center */
      }}
    >
      <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
        <line x1="0" y1="8" x2="32" y2="8" stroke="hsl(var(--line))" strokeWidth="1" />
        <polyline points="28,4 36,8 28,12" stroke="hsl(var(--gold)/0.5)" strokeWidth="1" fill="none" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   DISH CARD
───────────────────────────────────────────────────────── */
function DishCard({
  he,
  sub,
  price,
  emoji,
  badge,
}: {
  he: string;
  sub: string;
  price: string;
  emoji: string;
  badge: string;
}) {
  return (
    <div
      style={{
        background: "hsl(var(--abyss))",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "background 0.25s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "hsl(var(--deep))")}
      onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "hsl(var(--abyss))")}
    >
      {/* Viewport */}
      <div
        style={{
          aspectRatio: "1",
          background: "hsl(var(--deep))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid inside card */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(hsl(var(--line)/0.6) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--line)/0.6) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <span
          style={{
            fontSize: "clamp(56px, 10vw, 80px)",
            position: "relative",
            zIndex: 1,
            filter: "drop-shadow(0 0 20px rgba(0,0,0,0.8))",
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {emoji}
        </span>

        {/* Badge */}
        <span
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.5625rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "hsl(var(--void))",
            background: "hsl(var(--gold))",
            padding: "3px 8px",
            borderRadius: "2px",
            zIndex: 2,
          }}
        >
          {badge}
        </span>
      </div>

      {/* Info */}
      <div
        style={{
          padding: "20px 20px 20px",
          borderTop: "1px solid hsl(var(--line))",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Noto Serif Hebrew',serif",
              fontSize: "1.125rem",
              fontWeight: 400,
              color: "hsl(var(--snow))",
              marginBottom: "2px",
              lineHeight: 1.3,
            }}
          >
            {he}
          </div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontStyle: "italic",
              fontSize: "0.875rem",
              color: "hsl(var(--subtle))",
              lineHeight: 1.2,
            }}
          >
            {sub}
          </div>
        </div>
        <span
          className="price-tag"
          style={{ fontSize: "1rem", whiteSpace: "nowrap" }}
        >
          ₪{price}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PRICING CARD
───────────────────────────────────────────────────────── */
function PricingCard({
  tier,
  name,
  nameHe,
  price,
  features,
  highlight = false,
  badge,
}: {
  tier: string;
  name: string;
  nameHe: string;
  price: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
}) {
  return (
    <div
      style={{
        border: highlight
          ? "1px solid hsl(var(--gold)/0.4)"
          : "1px solid hsl(var(--line))",
        background: highlight ? "hsl(var(--abyss))" : "hsl(var(--void))",
        padding: "40px 36px 44px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        boxShadow: highlight
          ? "0 0 0 1px hsl(var(--gold)/0.12), 0 32px 80px -24px rgba(0,0,0,0.6)"
          : "none",
        marginTop: highlight ? "-8px" : "0",
        marginBottom: highlight ? "-8px" : "0",
        transition: "border-color 0.25s ease",
      }}
    >
      {badge && (
        <span
          style={{
            position: "absolute",
            top: "-1px",
            left: "36px",
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.5625rem",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "hsl(var(--void))",
            background: "hsl(var(--gold))",
            padding: "4px 10px",
          }}
        >
          {badge}
        </span>
      )}

      {/* Tier */}
      <div
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "4rem",
          fontWeight: 200,
          fontStyle: "italic",
          lineHeight: 0.85,
          color: highlight ? "hsl(var(--gold)/0.3)" : "hsl(var(--line))",
          marginBottom: "28px",
          letterSpacing: "-0.06em",
        }}
      >
        {tier}
      </div>

      {/* Name */}
      <div style={{ marginBottom: "28px", paddingBottom: "28px", borderBottom: "1px solid hsl(var(--line))" }}>
        <div
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "1.5rem",
            fontWeight: 300,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
            color: "hsl(var(--snow))",
            marginBottom: "4px",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "'Noto Serif Hebrew',serif",
            fontSize: "0.9375rem",
            fontWeight: 300,
            color: "hsl(var(--subtle))",
          }}
        >
          {nameHe}
        </div>
      </div>

      {/* Price */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "4px" }}>
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.875rem",
              color: highlight ? "hsl(var(--gold))" : "hsl(var(--subtle))",
              marginTop: "12px",
            }}
          >
            ₪
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "3.5rem",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1,
              color: "hsl(var(--snow))",
              letterSpacing: "-0.04em",
            }}
          >
            {price}
          </span>
        </div>
        <span
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.6875rem",
            letterSpacing: "0.08em",
            color: "hsl(var(--dim))",
          }}
        >
          לחודש · לא כולל מע״מ
        </span>
      </div>

      {/* Features */}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px 0", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <Check
              size={13}
              style={{
                color: highlight ? "hsl(var(--gold))" : "hsl(var(--sage))",
                flexShrink: 0,
                marginTop: "3px",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.9rem",
                color: "hsl(var(--pale))",
                lineHeight: 1.5,
              }}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link href="/signup" style={{ textDecoration: "none", display: "block" }}>
        <button
          className={highlight ? "btn-primary" : "btn-ghost"}
          style={{ width: "100%", justifyContent: "center" }}
        >
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
    <details
      className="group"
      style={{ borderBottom: "1px solid hsl(var(--line))" }}
    >
      <summary
        style={{
          padding: "28px 0",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "24px",
          cursor: "pointer",
          listStyle: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", flex: 1 }}>
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.625rem",
              letterSpacing: "0.1em",
              color: "hsl(var(--gold))",
              flexShrink: 0,
              marginTop: "4px",
            }}
          >
            {String(index).padStart(2, "0")}
          </span>
          <span
            style={{
              fontFamily: "'Noto Serif Hebrew',serif",
              fontSize: "1.0625rem",
              fontWeight: 400,
              lineHeight: 1.5,
              color: "hsl(var(--snow))",
            }}
          >
            {q}
          </span>
        </div>
        <Plus
          size={16}
          style={{
            color: "hsl(var(--subtle))",
            flexShrink: 0,
            marginTop: "2px",
            transition: "transform 0.2s ease",
          }}
        />
      </summary>

      <div style={{ paddingBottom: "28px", paddingLeft: "44px" }}>
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.9375rem",
            lineHeight: 1.7,
            color: "hsl(var(--subtle))",
            margin: 0,
          }}
        >
          {a}
        </p>
      </div>
    </details>
  );
}
