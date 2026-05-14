"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { LogoMark } from "@/components/brand";
import { QRCode } from "@/components/ui/qr-code";
import { Download, Copy, Check, ExternalLink, Settings } from "lucide-react";
import type { Restaurant } from "@/types/database.types";

const CARD: React.CSSProperties = {
  background: "hsl(var(--deep))",
  border: "1px solid hsl(var(--line))",
  borderRadius: 14,
  padding: 20,
};

// ── Format presets ──────────────────────────────────────────────────────────
const FORMATS = [
  { label: "Tent · A6", ratio: "140/200", width: 280, height: 400 },
  { label: "Coaster",   ratio: "1",       width: 280, height: 280 },
  { label: "Card",      ratio: "85/55",   width: 320, height: 207 },
  { label: "Poster",    ratio: "70/100",  width: 240, height: 343 },
];

// ── BG color swatches ──────────────────────────────────────────────────────
const BG_SWATCHES = [
  { bg: "linear-gradient(135deg, #f6f4ef, #ede7d8)", label: "בז'",    border: false },
  { bg: "hsl(28,15%,12%)",                           label: "כהה",    border: false },
  { bg: "hsl(28,62%,42%)",                           label: "ברונזה", border: false },
  { bg: "#ffffff",                                   label: "לבן",    border: true  },
];

// ── QR style presets ───────────────────────────────────────────────────────
const QR_STYLES = [
  { fg: "hsl(28,15%,18%)", bg: "#ffffff",          label: "רגיל"  },
  { fg: "hsl(28,62%,42%)", bg: "#ffffff",          label: "ברונזה" },
  { fg: "#ffffff",          bg: "hsl(28,15%,12%)", label: "הפוך"  },
];

export default function QRCodePage() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const supabase = createClient();

  // ── Interactive state ──────────────────────────────────────────────────
  const [formatIdx, setFormatIdx]   = useState(0);
  const [bgIdx, setBgIdx]           = useState(0);
  const [qrStyleIdx, setQrStyleIdx] = useState(0);
  const [cta, setCta]               = useState("סרוק לתפריט בתלת מימד");
  const [desc, setDesc]             = useState("ראה כל מנה לפני שאתה מזמין");
  const [tableCount, setTableCount] = useState(24);
  const [orderSent, setOrderSent] = useState(false);

  const selectedFormat   = FORMATS[formatIdx];
  const selectedBg       = BG_SWATCHES[bgIdx];
  const selectedQrStyle  = QR_STYLES[qrStyleIdx];

  // Derived: card text color based on bg (dark bg = idx 1, bronze bg = idx 2)
  const isDarkBg = bgIdx === 1 || bgIdx === 2;
  const textColor       = isDarkBg ? "#f6f4ef" : "hsl(28,15%,18%)";
  const subtitleColor   = isDarkBg ? "rgba(246,244,239,.55)" : "hsl(28,15%,40%)";
  const accentColor     = "hsl(28,62%,38%)";

  // Price per format
  const pricePerUnit = tableCount <= 10 ? 28 : tableCount <= 30 ? 18 : 14;
  const totalPrice   = tableCount * pricePerUnit;

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

  const handleDownloadVariant = (fgColor: string, bgColor: string, fmt: "png" | "svg") => {
    // Create a temporary canvas/svg with this variant's colors
    if (!menuUrl) return;
    const svgNS = "http://www.w3.org/2000/svg";
    const tempSvg = document.createElementNS(svgNS, "svg");
    tempSvg.setAttribute("width", "256");
    tempSvg.setAttribute("height", "256");
    tempSvg.setAttribute("viewBox", "0 0 256 256");
    tempSvg.setAttribute("xmlns", svgNS);
    const bg = document.createElementNS(svgNS, "rect");
    bg.setAttribute("width", "256"); bg.setAttribute("height", "256");
    bg.setAttribute("fill", bgColor);
    tempSvg.appendChild(bg);
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", "128"); text.setAttribute("y", "136");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", fgColor);
    text.setAttribute("font-size", "12");
    text.textContent = menuUrl;
    tempSvg.appendChild(text);
    const data = new XMLSerializer().serializeToString(tempSvg);
    const blob = new Blob([data], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `qr-variant-${restaurant?.slug ?? "menu"}.${fmt}`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "96px 0" }}>
        <div className="h-8 w-8 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div style={{ ...CARD, maxWidth: 420, margin: "0 auto", textAlign: "center", padding: "40px 32px" }}>
        <p className="font-sans uppercase" style={{ fontSize: "12px", letterSpacing: ".05em", color: "hsl(var(--accent-bright))", marginBottom: 12 }}>
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

  // ── Card dimensions per format ─────────────────────────────────────────
  const cardW = selectedFormat.width;
  const cardH = selectedFormat.height;
  const isLandscape = cardW > cardH;
  const isCoaster   = formatIdx === 1; // square coaster — special layout
  const qrSize = isCoaster
    ? Math.round(cardW * 0.62)           // QR fills ~62% of the coaster
    : Math.min(cardW, cardH) * 0.5;

  return (
    <div dir="rtl" style={{ color: "hsl(var(--fog))" }}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, gap: 24, flexWrap: "wrap" }}>
        <div>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1, letterSpacing: "-.02em", color: "hsl(var(--fog))", margin: "0 0 8px" }}>
            QR <em style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}>שולחן</em> והדפסות
          </h1>
          <p className="font-sans" style={{ fontSize: 14, color: "hsl(var(--subtle))", lineHeight: 1.55, maxWidth: 580, margin: 0 }}>
            צור קודי QR ייחודיים לכל שולחן ישירות לחוויית 3D שלך. הזמן הדפסה בכמה לחיצות, או הורד PDF להדפסה מקומית.
          </p>
        </div>
        <div className="qr-header-actions" style={{ display: "flex", gap: 10 }}>
          <button
            className="font-sans"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: "transparent", border: "1px solid hsl(var(--line))", color: "hsl(var(--fog))", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}
            onClick={() => handleDownload("svg")}
          >
            הורד SVG
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          </button>
          <button
            className="btn-primary"
            style={{ padding: "11px 22px", fontSize: 13.5 }}
            onClick={() => handleDownload("png")}
          >
            הורד PNG
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          </button>
        </div>
      </div>

      {/* ── Layout ──────────────────────────────────────────────────────── */}
      <div className="qr-layout" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 28, alignItems: "start" }}>

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Format */}
          <div style={CARD}>
            <div className="font-sans uppercase" style={{ fontSize: "11.5px", letterSpacing: ".05em", color: "hsl(var(--subtle))", marginBottom: 14 }}>
              פורמט
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {FORMATS.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setFormatIdx(i)}
                  style={{
                    padding: 10, borderRadius: 9, cursor: "pointer", textAlign: "center",
                    border: `1px solid ${i === formatIdx ? "hsl(28,62%,42%)" : "hsl(var(--line))"}`,
                    background: i === formatIdx ? "hsl(28,62%,42%,.08)" : "transparent",
                    transition: "all .15s",
                  }}
                >
                  <div style={{ borderRadius: 6, marginBottom: 8, background: "hsl(var(--abyss))", display: "grid", placeItems: "center", padding: 10, height: 56 }}>
                    {i === 0 && (
                      /* Tent A6 — tall portrait */
                      <svg viewBox="0 0 28 40" width={28} height={40}>
                        <rect x="1" y="1" width="26" height="38" rx="2" fill="#f6f4ef" stroke="hsl(28,15%,30%)" strokeWidth=".8"/>
                        <rect x="8" y="10" width="12" height="12" rx="1" fill="hsl(28,15%,12%)"/>
                        <rect x="7" y="25" width="14" height="2" rx="1" fill="hsl(28,15%,40%)"/>
                        <rect x="10" y="29" width="8" height="1.5" rx="1" fill="hsl(28,15%,60%)"/>
                      </svg>
                    )}
                    {i === 1 && (
                      /* Coaster — square */
                      <svg viewBox="0 0 36 36" width={36} height={36}>
                        <rect x="1" y="1" width="34" height="34" rx="6" fill="#f6f4ef" stroke="hsl(28,15%,30%)" strokeWidth=".8"/>
                        <rect x="10" y="10" width="16" height="16" rx="1" fill="hsl(28,15%,12%)"/>
                      </svg>
                    )}
                    {i === 2 && (
                      /* Card — landscape */
                      <svg viewBox="0 0 40 26" width={40} height={26}>
                        <rect x="1" y="1" width="38" height="24" rx="2" fill="#f6f4ef" stroke="hsl(28,15%,30%)" strokeWidth=".8"/>
                        <rect x="5" y="6" width="14" height="14" rx="1" fill="hsl(28,15%,12%)"/>
                        <rect x="23" y="9" width="12" height="2" rx="1" fill="hsl(28,15%,40%)"/>
                        <rect x="23" y="13" width="9" height="1.5" rx="1" fill="hsl(28,15%,60%)"/>
                      </svg>
                    )}
                    {i === 3 && (
                      /* Poster — tall with logo area */
                      <svg viewBox="0 0 24 36" width={24} height={36}>
                        <rect x="1" y="1" width="22" height="34" rx="1" fill="#f6f4ef" stroke="hsl(28,15%,30%)" strokeWidth=".8"/>
                        <rect x="5" y="4" width="14" height="4" rx="1" fill="hsl(28,62%,42%)" opacity=".4"/>
                        <rect x="6" y="11" width="12" height="12" rx="1" fill="hsl(28,15%,12%)"/>
                        <rect x="5" y="26" width="14" height="2" rx="1" fill="hsl(28,15%,40%)"/>
                        <rect x="7" y="30" width="10" height="1.5" rx="1" fill="hsl(28,15%,60%)"/>
                      </svg>
                    )}
                  </div>
                  <div className="font-sans uppercase" style={{ fontSize: 11, letterSpacing: ".06em", color: i === formatIdx ? "hsl(var(--accent-bright))" : "hsl(var(--fog))" }}>
                    {item.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div style={CARD}>
            <div className="font-sans uppercase" style={{ fontSize: "11.5px", letterSpacing: ".05em", color: "hsl(var(--subtle))", marginBottom: 14 }}>
              צבעים
            </div>
            <div style={{ marginBottom: 14 }}>
              <span className="font-sans uppercase" style={{ fontSize: 11, letterSpacing: ".08em", color: "hsl(var(--dim))", display: "block", marginBottom: 6 }}>תבנית</span>
              <div style={{ display: "flex", gap: 8 }}>
                {BG_SWATCHES.map((sw, i) => (
                  <button
                    key={i}
                    onClick={() => setBgIdx(i)}
                    title={sw.label}
                    style={{
                      width: 36, height: 36, borderRadius: 9, cursor: "pointer",
                      background: sw.bg,
                      border: i === bgIdx ? "2px solid hsl(28,62%,42%)" : sw.border ? "1px solid hsl(var(--line))" : "2px solid transparent",
                      boxShadow: i === bgIdx ? "0 0 0 3px hsl(28,62%,42%,.2)" : "none",
                      transition: "all .15s",
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <span className="font-sans uppercase" style={{ fontSize: 11, letterSpacing: ".08em", color: "hsl(var(--dim))", display: "block", marginBottom: 6 }}>סגנון QR</span>
              <div style={{ display: "flex", gap: 8 }}>
                {QR_STYLES.map((qs, i) => (
                  <button
                    key={i}
                    onClick={() => setQrStyleIdx(i)}
                    title={qs.label}
                    style={{
                      width: 36, height: 36, borderRadius: 9, cursor: "pointer",
                      background: qs.bg,
                      border: i === qrStyleIdx ? "2px solid hsl(28,62%,42%)" : "2px solid transparent",
                      display: "grid", placeItems: "center",
                      transition: "all .15s",
                      boxShadow: i === qrStyleIdx ? "0 0 0 3px hsl(28,62%,42%,.25)" : "none",
                    }}
                  >
                    <svg width="22" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="6" height="6" fill={qs.fg}/>
                      <rect x="15" y="3" width="6" height="6" fill={qs.fg}/>
                      <rect x="3" y="15" width="6" height="6" fill={qs.fg}/>
                      <rect x="11" y="11" width="3" height="3" fill="hsl(28,62%,42%)"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={CARD}>
            <div className="font-sans uppercase" style={{ fontSize: "11.5px", letterSpacing: ".05em", color: "hsl(var(--subtle))", marginBottom: 14 }}>
              תוכן
            </div>
            {[
              { label: "קריאה לפעולה", value: cta, setter: setCta },
              { label: "תיאור",         value: desc, setter: setDesc },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 14 }}>
                <span className="font-sans uppercase" style={{ fontSize: 11, letterSpacing: ".08em", color: "hsl(var(--dim))", display: "block", marginBottom: 6 }}>
                  {f.label}
                </span>
                <input
                  type="text"
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  className="font-sans"
                  style={{ width: "100%", boxSizing: "border-box", fontSize: 13, padding: "9px 12px", background: "hsl(var(--void))", border: "1px solid hsl(var(--line))", borderRadius: 8, color: "hsl(var(--fog))", outline: "none" }}
                />
              </div>
            ))}
          </div>

          {/* Per-table */}
          <div style={CARD}>
            <div className="font-sans uppercase" style={{ fontSize: "11.5px", letterSpacing: ".05em", color: "hsl(var(--subtle))", marginBottom: 14 }}>
              QR ייחודי לכל שולחן
            </div>
            <div style={{ marginBottom: 14 }}>
              <span className="font-sans uppercase" style={{ fontSize: 11, letterSpacing: ".08em", color: "hsl(var(--dim))", display: "block", marginBottom: 6 }}>מספר שולחנות</span>
              <input
                type="number"
                min="1"
                max="200"
                value={tableCount}
                onChange={(e) => setTableCount(Math.max(1, Number(e.target.value)))}
                className="font-sans"
                style={{ width: "100%", boxSizing: "border-box", fontSize: 13, padding: "9px 12px", background: "hsl(var(--void))", border: "1px solid hsl(var(--line))", borderRadius: 8, color: "hsl(var(--fog))", outline: "none" }}
              />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div className="font-mono" style={{ flex: 1, padding: "10px 12px", background: "hsl(var(--abyss))", borderRadius: 8, fontSize: 12, color: "hsl(var(--accent-bright))" }}>
                {tableCount} קודים
              </div>
              <div className="font-mono" style={{ flex: 1, padding: "10px 12px", background: "hsl(var(--abyss))", borderRadius: 8, fontSize: 12, color: "hsl(var(--fog))" }}>
                מעקב נפרד
              </div>
            </div>
          </div>

          {/* Shipping card */}
          <div style={{ ...CARD, background: "linear-gradient(160deg, hsl(28,62%,42%,.08), transparent)", border: "1px solid hsl(28,62%,42%,.2)" }}>
            <div className="font-sans uppercase" style={{ fontSize: "11.5px", letterSpacing: ".05em", color: "hsl(var(--accent-bright))", marginBottom: 14 }}>
              הדפסה ומשלוח
            </div>
            <div className="font-display" style={{ fontSize: 28, fontWeight: 500, color: "hsl(var(--fog))", marginBottom: 4 }}>
              <em style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}>₪{totalPrice}</em>
            </div>
            <p className="font-sans" style={{ fontSize: 12, color: "hsl(var(--subtle))", marginBottom: 14 }}>
              {tableCount} {selectedFormat.label} · נייר ממוחזר 350gsm · משלוח חינם
            </p>
            <button
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "11px 20px", fontSize: 13 }}
              onClick={() => setOrderSent(true)}
            >
              הזמן עכשיו · 3 ימי עסקים
            </button>
            {orderSent && (
              <p className="font-sans text-sm text-center mt-3" style={{ color: "hsl(158 45% 42%)" }}>
                ההזמנה התקבלה — {tableCount} × {selectedFormat.label} · ₪{totalPrice}<br />
                <span style={{ color: "hsl(var(--subtle))", fontSize: 12 }}>נציג יצור קשר בקרוב</span>
              </p>
            )}
          </div>
        </div>

        {/* ── Main canvas ─────────────────────────────────────────────── */}
        <div className="qr-canvas-panel" style={{
          background: "linear-gradient(160deg, hsl(28,15%,15%), hsl(28,15%,9%))",
          borderRadius: 16, padding: 36, minHeight: 700, position: "relative", overflow: "hidden",
        }}>
          {/* Dot grid */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,.04) 1px, transparent 0)",
            backgroundSize: "16px 16px",
          }}/>

          {/* Canvas tabs */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28, position: "relative", zIndex: 1 }}>
          <div className="qr-tabs" style={{ display: "inline-flex", gap: 3, padding: 4, background: "rgba(255,255,255,.10)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12 }}>
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className="font-sans"
                style={{
                  padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: activeTab === i ? 600 : 400,
                  color: activeTab === i ? "hsl(28,15%,10%)" : "rgba(255,255,255,.85)",
                  background: activeTab === i ? "hsl(var(--fog))" : "transparent",
                  border: "none", cursor: "pointer", whiteSpace: "nowrap",
                  transition: "all .15s",
                  boxShadow: activeTab === i ? "0 1px 6px rgba(0,0,0,.18)" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          </div>

          {/* ── Stage ─────────────────────────────────────────────────── */}
          <div className="qr-stage" style={{ display: "grid", placeItems: "center", minHeight: 480, position: "relative", zIndex: 1 }}>

            {activeTab === 0 && (
              /* 3D table tent */
              <div style={{ perspective: 1400, width: cardW, height: cardH, position: "relative" }}>
                <div style={{
                  position: "absolute", bottom: -8, left: "8%", right: "8%", height: 16,
                  background: "radial-gradient(ellipse, rgba(0,0,0,.4), transparent 70%)",
                  filter: "blur(6px)", zIndex: -1,
                }}/>
                <div style={{
                  position: "absolute", width: cardW, height: cardH,
                  background: selectedBg.bg,
                  borderRadius: isCoaster ? "50%" : 6,
                  padding: isCoaster ? 20 : isLandscape ? "20px 24px" : "28px 24px",
                  boxSizing: "border-box",
                  boxShadow: "0 30px 60px -20px rgba(0,0,0,.5), 0 60px 120px -40px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.5)",
                  transform: "rotateY(-12deg) rotateX(2deg)",
                  transformOrigin: "bottom center",
                  display: "flex",
                  flexDirection: isLandscape ? "row" : "column",
                  alignItems: "center",
                  justifyContent: isCoaster ? "center" : "flex-start",
                  textAlign: "center",
                  gap: isLandscape ? 20 : isCoaster ? 8 : 0,
                }}>
                  {/* Coaster layout: logo top, QR centre, tagline bottom */}
                  {isCoaster && (
                    <>
                      <LogoMark size={28} variant={isDarkBg ? "dark" : "light"} />
                      <div style={{ width: qrSize, height: qrSize, background: selectedQrStyle.bg, borderRadius: 10, padding: 10, boxSizing: "border-box", flexShrink: 0 }}>
                        {menuUrl && (
                          <QRCode
                            ref={svgRef}
                            value={menuUrl}
                            size={qrSize - 20}
                            fgColor={selectedQrStyle.fg}
                            bgColor={selectedQrStyle.bg}
                            errorCorrectionLevel="H"
                          />
                        )}
                      </div>
                      <div className="font-mono" style={{ fontSize: 8, letterSpacing: ".16em", color: subtitleColor, textTransform: "uppercase" }}>
                        {cta}
                      </div>
                    </>
                  )}

                  {/* Portrait layout (Tent A6, Poster) */}
                  {!isCoaster && !isLandscape && (
                    <div style={{ marginBottom: 10 }}>
                      <LogoMark size={32} variant={isDarkBg ? "dark" : "light"} />
                    </div>
                  )}
                  {!isCoaster && !isLandscape && (
                    <div style={{ marginBottom: 14 }}>
                      <div className="font-display" style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".26em", color: textColor, marginBottom: 3 }}>
                        PLATE<em style={{ fontStyle: "italic", color: accentColor, fontWeight: 400 }}>FORM</em>
                      </div>
                      <div className="font-mono" style={{ fontSize: 8, letterSpacing: ".2em", color: subtitleColor }}>
                        EVERY DISH · IN 360°
                      </div>
                    </div>
                  )}

                  {/* QR code — portrait + landscape */}
                  {!isCoaster && (
                    <div style={{
                      width: qrSize, height: qrSize,
                      background: selectedQrStyle.bg,
                      borderRadius: 12, padding: 12, boxSizing: "border-box",
                      boxShadow: "0 6px 20px -8px rgba(0,0,0,.2)",
                      marginBottom: isLandscape ? 0 : 14,
                      flexShrink: 0,
                    }}>
                      {menuUrl && (
                        <QRCode
                          ref={svgRef}
                          value={menuUrl}
                          size={qrSize - 24}
                          fgColor={selectedQrStyle.fg}
                          bgColor={selectedQrStyle.bg}
                          errorCorrectionLevel="H"
                        />
                      )}
                    </div>
                  )}

                  {!isCoaster && (
                    <div style={{ flex: isLandscape ? 1 : "unset" }}>
                      <div className="font-display" style={{ fontStyle: "italic", fontSize: isLandscape ? 16 : 18, color: textColor, lineHeight: 1.1, marginBottom: 5 }}>
                        {cta.split(" ").map((word, wi, arr) =>
                          wi === arr.length - 1
                            ? <em key={wi} style={{ color: accentColor }}>{word}</em>
                            : <span key={wi}>{word} </span>
                        )}
                      </div>
                      <div className="font-sans" style={{ fontSize: 10.5, color: subtitleColor, lineHeight: 1.4 }}>
                        {desc}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 1 && (
              /* Front view — flat */
              <div style={{
                width: cardW, height: cardH,
                background: selectedBg.bg,
                borderRadius: isCoaster ? "50%" : 10,
                padding: isCoaster ? 18 : "24px 20px",
                boxSizing: "border-box",
                boxShadow: "0 8px 32px -8px rgba(0,0,0,.4)",
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: isCoaster ? "center" : "flex-start",
                textAlign: "center",
                gap: isCoaster ? 8 : 12,
              }}>
                <LogoMark size={isCoaster ? 26 : 34} variant={isDarkBg ? "dark" : "light"} />
                <div style={{ width: qrSize, height: qrSize, background: selectedQrStyle.bg, borderRadius: 10, padding: 10, boxSizing: "border-box", flexShrink: 0 }}>
                  {menuUrl && (
                    <QRCode value={menuUrl} size={qrSize - 20} fgColor={selectedQrStyle.fg} bgColor={selectedQrStyle.bg} errorCorrectionLevel="H" />
                  )}
                </div>
                <div className="font-display" style={{ fontStyle: "italic", fontSize: isCoaster ? 10 : 18, color: textColor, lineHeight: 1.2 }}>
                  {cta}
                </div>
                {!isCoaster && <div className="font-sans" style={{ fontSize: 11, color: subtitleColor }}>{desc}</div>}
              </div>
            )}

            {activeTab === 2 && (
              /* Back view */
              <div style={{
                width: cardW, height: cardH,
                background: selectedBg.bg,
                borderRadius: isCoaster ? "50%" : 10,
                padding: isCoaster ? 24 : "28px 24px",
                boxSizing: "border-box",
                boxShadow: "0 8px 32px -8px rgba(0,0,0,.4)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center",
                gap: isCoaster ? 10 : 16,
              }}>
                <LogoMark size={52} variant={isDarkBg ? "dark" : "light"} />
                <div className="font-display" style={{ fontSize: 20, fontWeight: 600, letterSpacing: ".3em", color: textColor }}>
                  PLATE<em style={{ fontStyle: "italic", color: accentColor }}>FORM</em>
                </div>
                <div className="font-mono" style={{ fontSize: 10, letterSpacing: ".2em", color: subtitleColor, textTransform: "uppercase" }}>
                  EVERY DISH · IN 360°
                </div>
                <div className="font-mono" style={{ fontSize: 10, color: subtitleColor, marginTop: 8, direction: "ltr" }}>
                  {restaurant.name}
                </div>
              </div>
            )}

            {activeTab === 3 && (
              /* Print layout — grid capped at 12 for display, shows all tableCount QR codes */
              <div style={{ maxHeight: 520, overflowY: "auto", width: "100%" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 12, padding: 4 }}>
                  {Array.from({ length: Math.min(tableCount, 24) }, (_, i) => i + 1).map((n) => (
                    <div key={n} style={{
                      background: selectedBg.bg,
                      borderRadius: 8, padding: 10, boxSizing: "border-box",
                      boxShadow: "0 4px 16px -4px rgba(0,0,0,.35)",
                      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 6,
                    }}>
                      <div style={{ width: 72, height: 72, background: selectedQrStyle.bg, borderRadius: 6, padding: 5, boxSizing: "border-box", flexShrink: 0 }}>
                        {menuUrl && (
                          <QRCode value={`${menuUrl}?table=${n}`} size={62} fgColor={selectedQrStyle.fg} bgColor={selectedQrStyle.bg} errorCorrectionLevel="H" />
                        )}
                      </div>
                      <div className="font-mono" style={{ fontSize: 8, letterSpacing: ".06em", color: subtitleColor }}>
                        שולחן {n}
                      </div>
                    </div>
                  ))}
                  {tableCount > 24 && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,.04)", borderRadius: 8, padding: 10, fontSize: 11, color: "rgba(255,255,255,.4)", fontFamily: "monospace" }}>
                      +{tableCount - 24} נוספים
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Meta row */}
          <div className="font-mono" style={{ display: "flex", justifyContent: "space-between", padding: "0 8px", marginTop: 24, fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase", color: "rgba(255,255,255,.4)" }}>
            <span>{selectedFormat.label}</span>
            <span>חוצץ שולחן · דו-צדדי</span>
            <span>CMYK · 350gsm</span>
          </div>

          {/* QR variants strip */}
          <div className="qr-variants" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 28, position: "relative", zIndex: 1 }}>
            {[
              { label: "סטנדרטי",    size: "PNG · 1024px", fg: "hsl(28,15%,18%)", bg: "white" },
              { label: "בצבע ברונזה", size: "SVG · vector", fg: "hsl(28,62%,42%)", bg: "white" },
              { label: "היפוך כהה",  size: "PNG · 1024px", fg: "white",           bg: "hsl(28,15%,12%)" },
              { label: "סגנון רך",   size: "SVG · vector", fg: "hsl(28,15%,18%)", bg: "#f6f4ef" },
            ].map((v, i) => (
              <button
                key={i}
                onClick={() => setQrStyleIdx(i < QR_STYLES.length ? i : QR_STYLES.length - 1)}
                title={`החל סגנון: ${v.label}`}
                style={{
                  background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 12, padding: 16, textAlign: "center", cursor: "pointer",
                  transition: "all .15s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,.09)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,.04)"; }}
              >
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
                <div className="font-mono" style={{ fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase", color: "rgba(255,255,255,.7)" }}>
                  {v.label}
                  <span style={{ display: "block", marginTop: 3, fontSize: 9, color: "rgba(255,255,255,.4)" }}>{v.size}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadVariant(v.fg, v.bg, i % 2 === 0 ? "png" : "svg");
                  }}
                  title="הורד"
                  style={{ marginTop: 8, padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.6)", fontSize: 9, cursor: "pointer", letterSpacing: ".05em" }}
                >
                  הורד
                </button>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Actions row ─────────────────────────────────────────────────── */}
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
        <button className="font-sans" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: "transparent", border: "1px solid hsl(var(--line))", color: "hsl(var(--fog))", fontSize: 13, fontWeight: 500, cursor: "pointer" }} onClick={() => handleDownload("svg")}>
          <Download style={{ width: 14, height: 14 }} strokeWidth={1.5}/>
          הורד SVG
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
