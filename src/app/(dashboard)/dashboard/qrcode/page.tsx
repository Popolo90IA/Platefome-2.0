"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { QRCode } from "@/components/ui/qr-code";
import { Download, Copy, Check, ExternalLink, Settings } from "lucide-react";
import type { Restaurant } from "@/types/database.types";

const CARD: React.CSSProperties = {
  background: "hsl(var(--deep))",
  border: "1px solid hsl(var(--line))",
  borderRadius: 14,
  padding: 20,
};

export default function QRCodePage() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("restaurants").select("*").eq("user_id", user.id).maybeSingle();
      setRestaurant(data);
      setLoading(false);
    };
    load();
  }, [supabase]);

  const menuUrl = restaurant
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/menu/${restaurant.slug}`
    : "";

  const handleDownload = (format: "png" | "svg") => {
    if (!svgRef.current) return;
    if (format === "svg") {
      const data = new XMLSerializer().serializeToString(svgRef.current);
      const blob = new Blob([data], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `qr-${restaurant?.slug ?? "menu"}.svg`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      return;
    }
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    canvas.width = 1024; canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, 1024, 1024);
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `qr-${restaurant?.slug ?? "menu"}.png`;
      link.href = url;
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "96px 0" }}>
        <div style={{ width: 2, height: 32, background: "hsl(var(--line))" }} />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div style={{ ...CARD, maxWidth: 420, margin: "0 auto", textAlign: "center", padding: "40px 32px" }}>
        <p className="font-mono uppercase" style={{ fontSize: "10.5px", letterSpacing: ".22em", color: "hsl(var(--accent-bright))", marginBottom: 12 }}>
          Getting started
        </p>
        <h2 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 600, color: "hsl(var(--fog))", margin: "0 0 12px" }}>
          צור פרופיל מסעדה
        </h2>
        <p className="font-sans" style={{ fontSize: 14, color: "hsl(var(--subtle))", marginBottom: 24 }}>
          כדי לייצר QR, צור תחילה את פרופיל המסעדה שלך
        </p>
        <Link href="/dashboard/settings">
          <button className="btn-primary" style={{ padding: "11px 24px", fontSize: "0.875rem" }}>
            <Settings style={{ width: 14, height: 14 }} strokeWidth={1.5} />
            צור פרופיל
          </button>
        </Link>
      </div>
    );
  }

  const TABS = ["תצוגה תלת-מימדית", "קדמי", "אחורי", "פריסה להדפסה"];

  return (
    <div dir="rtl" style={{ color: "hsl(var(--fog))" }}>
      {/* ── Header ─────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, gap: 24, flexWrap: "wrap" }}>
        <div>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1, letterSpacing: "-.02em", color: "hsl(var(--fog))", margin: "0 0 8px" }}>
            QR <em style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}>שולחן</em> והדפסות
          </h1>
          <p className="font-sans" style={{ fontSize: 14, color: "hsl(var(--subtle))", lineHeight: 1.55, maxWidth: 580, margin: 0 }}>
            צור קודי QR ייחודיים לכל שולחן ישירות לחוויית 3D שלך. הזמן הדפסה בכמה לחיצות, או הורד PDF להדפסה מקומית.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="font-sans"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: "transparent", border: "1px solid hsl(var(--line))", color: "hsl(var(--fog))", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}
            onClick={() => handleDownload("svg")}
          >
            הורד PDF
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          </button>
          <button
            className="btn-primary"
            style={{ padding: "11px 22px", fontSize: 13.5 }}
          >
            הזמן הדפסה
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 12H5M11 5l-7 7 7 7"/></svg>
          </button>
        </div>
      </div>

      {/* ── Layout ─────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 28, alignItems: "start" }}>

        {/* ── Sidebar ──────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Format */}
          <div style={CARD}>
            <div className="font-mono uppercase" style={{ fontSize: "10.5px", letterSpacing: ".16em", color: "hsl(var(--subtle))", marginBottom: 14 }}>
              פורמט
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "Tent · A6", active: true },
                { label: "Coaster", active: false },
                { label: "Card", active: false },
                { label: "Poster", active: false },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: 10, borderRadius: 9, cursor: "pointer", textAlign: "center",
                    border: `1px solid ${item.active ? "hsl(28,62%,42%)" : "hsl(var(--line))"}`,
                    background: item.active ? "hsl(28,62%,42%,.04)" : "transparent",
                    transition: "all .15s",
                  }}
                >
                  <div style={{ aspectRatio: "1", borderRadius: 6, marginBottom: 8, background: "hsl(var(--abyss))", display: "grid", placeItems: "center", padding: 12 }}>
                    <svg viewBox="0 0 40 40" width="100%">
                      <rect x="8" y="6" width="24" height="32" rx="1" fill="#f6f4ef" stroke="hsl(28,15%,30%)" strokeWidth=".7"/>
                      <rect x="14" y="14" width="12" height="12" rx="1" fill="hsl(28,15%,12%)"/>
                    </svg>
                  </div>
                  <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".12em", color: item.active ? "hsl(var(--accent-bright))" : "hsl(var(--fog))" }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div style={CARD}>
            <div className="font-mono uppercase" style={{ fontSize: "10.5px", letterSpacing: ".16em", color: "hsl(var(--subtle))", marginBottom: 14 }}>
              צבעים
            </div>
            <div style={{ marginBottom: 14 }}>
              <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".15em", color: "hsl(var(--dim))", display: "block", marginBottom: 6 }}>תבנית</span>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { bg: "linear-gradient(135deg, #f6f4ef, #ede7d8)", active: true },
                  { bg: "hsl(28,15%,12%)",  active: false },
                  { bg: "hsl(28,62%,42%)", active: false },
                  { bg: "white",  active: false, border: true },
                ].map((sw, i) => (
                  <div key={i} style={{
                    width: 36, height: 36, borderRadius: 9, cursor: "pointer",
                    background: sw.bg,
                    border: sw.active ? "2px solid hsl(28,62%,42%)" : sw.border ? "1px solid hsl(var(--line))" : "2px solid transparent",
                    boxShadow: sw.active ? "0 0 0 3px hsl(28,62%,42%,.2)" : "none",
                    transition: "all .15s",
                  }}/>
                ))}
              </div>
            </div>
            <div>
              <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".15em", color: "hsl(var(--dim))", display: "block", marginBottom: 6 }}>סגנון QR</span>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { bg: "hsl(28,15%,12%)", active: true },
                  { bg: "hsl(28,15%,12%)", active: false },
                  { bg: "hsl(28,62%,42%)", active: false },
                ].map((sw, i) => (
                  <div key={i} style={{
                    width: 36, height: 36, borderRadius: 9, cursor: "pointer",
                    background: sw.bg,
                    border: sw.active ? "2px solid hsl(28,62%,42%)" : "2px solid transparent",
                    display: "grid", placeItems: "center",
                    transition: "all .15s",
                  }}>
                    {i === 0 && (
                      <svg width="22" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="6" height="6" fill="white"/>
                        <rect x="15" y="3" width="6" height="6" fill="white"/>
                        <rect x="3" y="15" width="6" height="6" fill="white"/>
                        <rect x="11" y="11" width="3" height="3" fill="white"/>
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={CARD}>
            <div className="font-mono uppercase" style={{ fontSize: "10.5px", letterSpacing: ".16em", color: "hsl(var(--subtle))", marginBottom: 14 }}>
              תוכן
            </div>
            {[
              { label: "קריאה לפעולה", defaultValue: "סרוק לתפריט בתלת מימד" },
              { label: "תיאור", defaultValue: "ראה כל מנה לפני שאתה מזמין" },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 14 }}>
                <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".15em", color: "hsl(var(--dim))", display: "block", marginBottom: 6 }}>
                  {f.label}
                </span>
                <input
                  type="text"
                  defaultValue={f.defaultValue}
                  className="font-sans"
                  style={{ width: "100%", boxSizing: "border-box", fontSize: 13, padding: "9px 12px", background: "hsl(var(--void))", border: "1px solid hsl(var(--line))", borderRadius: 8, color: "hsl(var(--fog))", outline: "none" }}
                />
              </div>
            ))}
          </div>

          {/* Per-table */}
          <div style={CARD}>
            <div className="font-mono uppercase" style={{ fontSize: "10.5px", letterSpacing: ".16em", color: "hsl(var(--subtle))", marginBottom: 14 }}>
              QR ייחודי לכל שולחן
            </div>
            <div style={{ marginBottom: 14 }}>
              <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".15em", color: "hsl(var(--dim))", display: "block", marginBottom: 6 }}>מספר שולחנות</span>
              <input type="text" defaultValue="24" className="font-sans" style={{ width: "100%", boxSizing: "border-box", fontSize: 13, padding: "9px 12px", background: "hsl(var(--void))", border: "1px solid hsl(var(--line))", borderRadius: 8, color: "hsl(var(--fog))", outline: "none" }}/>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div className="font-mono" style={{ flex: 1, padding: "10px 12px", background: "hsl(var(--abyss))", borderRadius: 8, fontSize: 12, color: "hsl(var(--accent-bright))" }}>
                24 קודים
              </div>
              <div className="font-mono" style={{ flex: 1, padding: "10px 12px", background: "hsl(var(--abyss))", borderRadius: 8, fontSize: 12, color: "hsl(var(--fog))" }}>
                מעקב נפרד
              </div>
            </div>
          </div>

          {/* Shipping card */}
          <div style={{ ...CARD, background: "linear-gradient(160deg, hsl(28,62%,42%,.08), transparent)", border: "1px solid hsl(28,62%,42%,.2)" }}>
            <div className="font-mono uppercase" style={{ fontSize: "10.5px", letterSpacing: ".16em", color: "hsl(var(--accent-bright))", marginBottom: 14 }}>
              הדפסה ומשלוח
            </div>
            <div className="font-display" style={{ fontSize: 28, fontWeight: 500, color: "hsl(var(--fog))", marginBottom: 4 }}>
              <em style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}>₪432</em>
            </div>
            <p className="font-sans" style={{ fontSize: 12, color: "hsl(var(--subtle))", marginBottom: 14 }}>
              24 חוצצי שולחן · נייר ממוחזר 350gsm · משלוח חינם
            </p>
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "11px 20px", fontSize: 13 }}>
              הזמן עכשיו · 3 ימי עסקים
            </button>
          </div>
        </div>

        {/* ── Main canvas ──────────────────────────────── */}
        <div style={{
          background: "linear-gradient(160deg, hsl(28,15%,15%), hsl(28,15%,9%))",
          borderRadius: 16, padding: 36, minHeight: 700, position: "relative", overflow: "hidden",
        }}>
          {/* Dot grid overlay */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,.04) 1px, transparent 0)",
            backgroundSize: "16px 16px",
          }}/>

          {/* Canvas tabs */}
          <div style={{ display: "inline-flex", gap: 4, padding: 4, background: "rgba(0,0,0,.3)", borderRadius: 10, marginBottom: 28, position: "relative", zIndex: 1 }}>
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className="font-sans"
                style={{
                  padding: "9px 18px", borderRadius: 7, fontSize: 13, fontWeight: 500,
                  color: activeTab === i ? "hsl(28,15%,12%)" : "rgba(255,255,255,.55)",
                  background: activeTab === i ? "hsl(var(--fog))" : "transparent",
                  border: "none", cursor: "pointer", whiteSpace: "nowrap",
                  transition: "all .15s",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Stage — 3D table tent */}
          <div style={{ display: "grid", placeItems: "center", minHeight: 480, position: "relative", zIndex: 1 }}>
            <div style={{ perspective: 1400, width: 320, height: 460, position: "relative" }}>
              {/* Shadow */}
              <div style={{
                position: "absolute", bottom: -8, left: "8%", right: "8%", height: 16,
                background: "radial-gradient(ellipse, rgba(0,0,0,.4), transparent 70%)",
                filter: "blur(6px)", zIndex: -1,
              }}/>
              {/* Card */}
              <div style={{
                position: "absolute", width: 320, height: 460,
                background: "linear-gradient(170deg, #f6f4ef, #ede7d8)",
                borderRadius: 6, padding: "36px 30px", boxSizing: "border-box",
                boxShadow: "0 30px 60px -20px rgba(0,0,0,.5), 0 60px 120px -40px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.5)",
                transform: "rotateY(-12deg) rotateX(2deg)",
                transformOrigin: "bottom center",
                display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
              }}>
                {/* Logo mark */}
                <svg width="38" height="38" viewBox="0 0 80 80" style={{ marginBottom: 18 }}>
                  <circle cx="40" cy="40" r="28" fill="#f6f4ef" stroke="hsl(28,15%,18%)" strokeWidth="1.5"/>
                  <circle cx="40" cy="40" r="20" fill="none" stroke="hsl(28,15%,18%)" strokeWidth=".5" strokeDasharray="1.5 2"/>
                  <text x="40" y="49" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontWeight="500" fontSize="32" fill="hsl(28,62%,38%)">P</text>
                </svg>

                <div className="font-display" style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".26em", color: "hsl(28,15%,18%)", marginBottom: 4 }}>
                  PLATE<em style={{ fontStyle: "italic", color: "hsl(28,62%,38%)", fontWeight: 400 }}>FORM</em>
                </div>
                <div className="font-mono" style={{ fontSize: 9, letterSpacing: ".2em", color: "hsl(28,15%,40%)", marginBottom: 30 }}>
                  EVERY DISH · IN 360°
                </div>

                {/* QR code */}
                <div style={{ width: 200, height: 200, background: "white", borderRadius: 12, padding: 16, boxSizing: "border-box", boxShadow: "0 6px 20px -8px rgba(0,0,0,.2)", marginBottom: 22 }}>
                  {menuUrl && (
                    <QRCode
                      ref={svgRef}
                      value={menuUrl}
                      size={168}
                      fgColor="hsl(28,15%,18%)"
                      bgColor="#ffffff"
                      errorCorrectionLevel="H"
                    />
                  )}
                </div>

                <div className="font-display" style={{ fontStyle: "italic", fontSize: 22, color: "hsl(28,15%,18%)", lineHeight: 1.1, marginBottom: 6 }}>
                  סרוק לתפריט<br/>בתלת <em style={{ color: "hsl(28,62%,38%)" }}>מימד</em>
                </div>
                <div className="font-sans" style={{ fontSize: 11.5, color: "hsl(28,15%,40%)", lineHeight: 1.4 }}>
                  ראה כל מנה לפני שאתה מזמין
                </div>
              </div>
            </div>
          </div>

          {/* Meta row */}
          <div className="font-mono" style={{ display: "flex", justifyContent: "space-between", padding: "0 8px", marginTop: 24, fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(255,255,255,.4)" }}>
            <span>105×148mm · A6</span>
            <span>חוצץ שולחן · דו-צדדי</span>
            <span>CMYK · 350gsm</span>
          </div>

          {/* QR variants strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 28, position: "relative", zIndex: 1 }}>
            {[
              { label: "סטנדרטי", size: "PNG · 1024px", bg: "white", fg: "hsl(28,15%,18%)" },
              { label: "בצבע ברונזה", size: "SVG · vector", bg: "white", fg: "hsl(28,62%,42%)" },
              { label: "היפוך כהה", size: "PNG · 1024px", bg: "hsl(28,15%,12%)", fg: "white" },
              { label: "סגנון רך", size: "SVG · vector", bg: "white", fg: "hsl(28,15%,18%)" },
            ].map((v, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 12, padding: 16, textAlign: "center",
              }}>
                <div style={{ aspectRatio: "1", background: v.bg, borderRadius: 8, padding: 10, boxSizing: "border-box", marginBottom: 10, display: "grid", placeItems: "center" }}>
                  <svg viewBox="0 0 24 24" width="100%" height="100%">
                    <rect x="2" y="2" width="6" height="6" fill={v.fg}/>
                    <rect x="16" y="2" width="6" height="6" fill={v.fg}/>
                    <rect x="2" y="16" width="6" height="6" fill={v.fg}/>
                    <rect x="10" y="2" width="2" height="2" fill={v.fg}/>
                    <rect x="14" y="6" width="2" height="2" fill={v.fg}/>
                    <rect x="10" y="10" width="3" height="3" fill="hsl(28,62%,42%)"/>
                    <rect x="16" y="10" width="2" height="2" fill={v.fg}/>
                    <rect x="20" y="10" width="2" height="2" fill={v.fg}/>
                    <rect x="10" y="16" width="2" height="2" fill={v.fg}/>
                    <rect x="14" y="14" width="2" height="2" fill={v.fg}/>
                    <rect x="18" y="16" width="2" height="2" fill={v.fg}/>
                    <rect x="14" y="20" width="2" height="2" fill={v.fg}/>
                    <rect x="20" y="20" width="2" height="2" fill={v.fg}/>
                  </svg>
                </div>
                <div className="font-mono" style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.7)" }}>
                  {v.label}
                  <span style={{ display: "block", marginTop: 3, fontSize: 9, color: "rgba(255,255,255,.4)" }}>{v.size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Actions row ────────────────────────────────── */}
      <div style={{ marginTop: 24, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "hsl(var(--deep))", border: "1px solid hsl(var(--line))", borderRadius: 10, flex: 1, minWidth: 200 }}>
          <code dir="ltr" className="font-mono flex-1 truncate" style={{ fontSize: 12, color: "hsl(var(--subtle))" }}>
            {menuUrl}
          </code>
          <button onClick={handleCopy} className="font-mono" style={{ fontSize: 11, color: copied ? "hsl(var(--accent-bright))" : "hsl(var(--dim))", flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}>
            {copied ? <><Check style={{ width: 13, height: 13 }} strokeWidth={1.5}/> הועתק</> : <><Copy style={{ width: 13, height: 13 }} strokeWidth={1.5}/> העתק</>}
          </button>
        </div>
        <button className="btn-primary" style={{ padding: "11px 22px", fontSize: 13 }} onClick={() => handleDownload("png")}>
          <Download style={{ width: 14, height: 14 }} strokeWidth={1.5}/>
          הורד PNG
        </button>
        <Link href={`/menu/${restaurant.slug}`} target="_blank">
          <button className="font-sans" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: "transparent", border: "1px solid hsl(var(--line))", color: "hsl(var(--fog))", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
            <ExternalLink style={{ width: 14, height: 14 }} strokeWidth={1.5}/>
            תצוגה מקדימה
          </button>
        </Link>
      </div>
    </div>
  );
}
