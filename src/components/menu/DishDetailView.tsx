"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dish, Restaurant } from "@/types/database.types";

interface DishDetailViewProps {
  dish: Dish;
  restaurant: Restaurant;
  slug: string;
}

/* ─── Allergen icons ─────────────────────────────────────── */
const ALLERGEN_ICONS: Record<string, { label: string; emoji: string }> = {
  gluten: { label: "גלוטן", emoji: "🌾" },
  dairy: { label: "חלב", emoji: "🥛" },
  eggs: { label: "ביצים", emoji: "🥚" },
  nuts: { label: "אגוזים", emoji: "🥜" },
  sesame: { label: "שומשום", emoji: "🌰" },
  fish: { label: "דגים", emoji: "🐟" },
  shellfish: { label: "פירות ים", emoji: "🦐" },
  soy: { label: "סויה", emoji: "🫘" },
};

/* ─── Badge ─────────────────────────────────────────────── */
function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 14px",
      background: bg,
      border: `1px solid ${color}`,
      borderRadius: 99,
      fontFamily: "'DM Mono',monospace",
      fontSize: ".5875rem", letterSpacing: ".14em", textTransform: "uppercase",
      color,
    }}>{label}</span>
  );
}

/* ─── KEYFRAMES ─────────────────────────────────────────── */
const KF = `
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes goldShimmer { 0%{background-position:100% 0} 50%{background-position:0% 0} 100%{background-position:100% 0} }
  .dish-fade-a { animation: fadeUp .7s cubic-bezier(.16,1,.3,1) both }
  .dish-fade-b { animation: fadeUp .7s cubic-bezier(.16,1,.3,1) .1s both }
  .dish-fade-c { animation: fadeUp .7s cubic-bezier(.16,1,.3,1) .2s both }
  .dish-fade-d { animation: fadeUp .7s cubic-bezier(.16,1,.3,1) .3s both }
  @media (max-width:900px) { .dish-layout { flex-direction: column !important } .dish-visual { width: 100% !important; max-width: 100% !important } }
`;

export function DishDetailView({ dish, restaurant, slug }: DishDetailViewProps) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  /* All photos: main image + 360 gallery */
  const photos: string[] = [
    ...(dish.image_url ? [dish.image_url] : []),
    ...(dish.photos_360 ?? []),
  ];
  const currentPhoto = photos[activePhoto] ?? "";

  /* Badges */
  const badges: { label: string; color: string; bg: string }[] = [
    ...(dish.is_new ? [{ label: "חדש", color: "hsl(28,88%,52%)", bg: "hsl(28,88%,52%,.08)" }] : []),
    ...(dish.is_signature ? [{ label: "מנת שף", color: "hsl(36,28%,92%)", bg: "hsl(36,28%,92%,.06)" }] : []),
    ...(dish.is_featured ? [{ label: "מובלט", color: "hsl(28,90%,58%)", bg: "hsl(28,90%,58%,.08)" }] : []),
    ...(dish.ar_enabled ? [{ label: "AR", color: "hsl(28,88%,52%)", bg: "hsl(28,88%,52%,.08)" }] : []),
    ...(dish.model_3d_url ? [{ label: "3D", color: "hsl(36,28%,92%)", bg: "hsl(36,28%,92%,.06)" }] : []),
    ...(!dish.is_available ? [{ label: "לא זמין", color: "hsl(0,60%,52%)", bg: "hsl(0,60%,52%,.08)" }] : []),
  ];

  return (
    <div style={{ background: "hsl(var(--void))", color: "hsl(var(--cream))", minHeight: "100vh", direction: "rtl" }}>
      <style>{KF}</style>

      {/* ─── HEADER ─── */}
      <header style={{ position: "sticky", top: 0, zIndex: 40, background: "hsl(220,12%,4%,.9)", backdropFilter: "blur(20px) saturate(180%)", borderBottom: "1px solid hsl(220,7%,16%,.7)", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href={`/menu/${slug}`} style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontFamily: "'DM Mono',monospace", fontSize: ".625rem", letterSpacing: ".14em",
          textTransform: "uppercase", color: "hsl(var(--subtle))", textDecoration: "none",
          transition: "color .2s",
        }}
          onMouseOver={e => (e.currentTarget.style.color = "hsl(var(--cream))")}
          onMouseOut={e => (e.currentTarget.style.color = "hsl(var(--subtle))")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          חזרה לתפריט
        </Link>
        <span style={{ fontFamily: "'Noto Serif Hebrew',serif", fontSize: ".95rem", fontWeight: 300, color: "hsl(var(--fog))" }}>{restaurant.name}</span>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".9375rem", color: "hsl(36,28%,92%)", fontWeight: 500 }}>
          {restaurant.currency || "₪"}{dish.price}
        </div>
      </header>

      {/* ─── MAIN LAYOUT ─── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px 80px" }}>
        <div className="dish-layout" style={{ display: "flex", gap: 64, alignItems: "flex-start" }}>

          {/* ─── LEFT: visual ─── */}
          <div className="dish-visual" style={{ flex: "0 0 50%", maxWidth: "50%" }}>
            {/* Main photo */}
            <div className="dish-fade-a" style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "hsl(var(--abyss))", border: "1px solid hsl(var(--line))", aspectRatio: "4/3" }}>
              {currentPhoto ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={currentPhoto}
                  alt={dish.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".625rem", letterSpacing: ".14em", color: "hsl(var(--dim))", textTransform: "uppercase" }}>אין תמונה</span>
                </div>
              )}

              {/* Badges overlay */}
              {badges.length > 0 && (
                <div style={{ position: "absolute", top: 16, right: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {badges.map(b => <Badge key={b.label} {...b} />)}
                </div>
              )}

              {/* Video button */}
              {dish.video_url && (
                <button onClick={() => setVideoOpen(true)} style={{
                  position: "absolute", bottom: 16, left: 16,
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "9px 18px",
                  background: "hsl(220,12%,4%,.85)", backdropFilter: "blur(12px)",
                  border: "1px solid hsl(36,28%,92%,.25)", borderRadius: 99,
                  cursor: "pointer", color: "hsl(36,28%,92%)",
                  fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".14em", textTransform: "uppercase",
                  transition: "border-color .2s,background .2s",
                }}
                  onMouseOver={e => { const b = e.currentTarget; b.style.borderColor = "hsl(36,28%,92%,.5)"; b.style.background = "hsl(220,12%,8%,.95)"; }}
                  onMouseOut={e => { const b = e.currentTarget; b.style.borderColor = "hsl(36,28%,92%,.25)"; b.style.background = "hsl(220,12%,4%,.85)"; }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="hsl(36,28%,92%)" stroke="none"><polygon points="5 3 19 12 5 21"/></svg>
                  סרטון
                </button>
              )}
            </div>

            {/* 360° photo strip */}
            {photos.length > 1 && (
              <div className="dish-fade-b" style={{ display: "flex", gap: 10, marginTop: 14, overflowX: "auto", paddingBottom: 4 }}>
                {photos.map((src, i) => (
                  <button key={i} onClick={() => setActivePhoto(i)} style={{
                    flexShrink: 0, width: 72, height: 72, borderRadius: 10, overflow: "hidden",
                    border: `2px solid ${i === activePhoto ? "hsl(36,28%,92%)" : "hsl(var(--line))"}`,
                    cursor: "pointer", padding: 0, background: "hsl(var(--abyss))",
                    transition: "border-color .2s",
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`תמונה ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}

            {/* AR / 3D actions */}
            {(dish.ar_enabled || dish.model_3d_url) && (
              <div className="dish-fade-b" style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
                {dish.ar_enabled && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "12px 20px",
                    background: "hsl(28,88%,52%,.07)", border: "1px solid hsl(28,88%,52%,.25)", borderRadius: 10,
                    flex: 1,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(28,88%,52%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                    </svg>
                    <div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".14em", color: "hsl(28,88%,52%)", textTransform: "uppercase", marginBottom: 2 }}>מציאות רבודה</div>
                      <div style={{ fontSize: ".8125rem", color: "hsl(var(--subtle))" }}>כוון מצלמה לשולחן</div>
                    </div>
                  </div>
                )}
                {dish.model_3d_url && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "12px 20px",
                    background: "hsl(36,28%,92%,.05)", border: "1px solid hsl(36,28%,92%,.15)", borderRadius: 10,
                    flex: 1,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(36,28%,92%,.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    </svg>
                    <div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".14em", color: "hsl(36,28%,92%,.7)", textTransform: "uppercase", marginBottom: 2 }}>תלת-מימד</div>
                      <div style={{ fontSize: ".8125rem", color: "hsl(var(--subtle))" }}>סובב וצפה בכל זווית</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ─── RIGHT: info ─── */}
          <div style={{ flex: 1 }}>
            {/* Category + badges */}
            <div className="dish-fade-a" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
              {badges.map(b => <Badge key={b.label} {...b} />)}
            </div>

            {/* Name */}
            <div className="dish-fade-a" style={{ marginBottom: 8 }}>
              <h1 style={{ fontFamily: "'Noto Serif Hebrew',serif", fontWeight: 300, fontSize: "clamp(2rem,4vw,3rem)", lineHeight: .95, letterSpacing: "-.03em", color: "hsl(var(--cream))", margin: 0 }}>
                {dish.name}
              </h1>
              {dish.name_en && (
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1.25rem", color: "hsl(var(--fog))", marginTop: 6 }}>{dish.name_en}</div>
              )}
            </div>

            {/* Price */}
            <div className="dish-fade-b" style={{ marginBottom: 28 }}>
              <span style={{
                fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
                fontSize: "2.5rem", letterSpacing: "-.04em",
                background: "linear-gradient(135deg,hsl(24,80%,32%) 0%,hsl(36,28%,92%) 40%,hsl(28,95%,72%) 60%,hsl(36,28%,92%) 80%,hsl(24,80%,32%) 100%)",
                backgroundSize: "220% 100%",
                WebkitBackgroundClip: "text", backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "goldShimmer 4s ease-in-out infinite",
              }}>
                {restaurant.currency || "₪"}{dish.price}
              </span>
            </div>

            {/* Description */}
            {dish.description && (
              <div className="dish-fade-b" style={{ marginBottom: 32, paddingBottom: 32, borderBottom: "1px solid hsl(var(--line))" }}>
                <p style={{ fontSize: "1.0625rem", color: "hsl(var(--subtle))", lineHeight: 1.8, margin: 0 }}>{dish.description}</p>
                {dish.description_en && (
                  <p style={{ fontSize: ".9375rem", color: "hsl(var(--dim))", lineHeight: 1.7, marginTop: 12, fontStyle: "italic", fontFamily: "'Cormorant Garamond',serif" }}>{dish.description_en}</p>
                )}
              </div>
            )}

            {/* Tags */}
            {dish.tags && dish.tags.length > 0 && (
              <div className="dish-fade-c" style={{ marginBottom: 28 }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".18em", color: "hsl(var(--dim))", textTransform: "uppercase", marginBottom: 12 }}>תגיות</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {dish.tags.map(tag => (
                    <span key={tag} style={{ padding: "4px 12px", background: "hsl(var(--deep))", border: "1px solid hsl(var(--line))", borderRadius: 99, fontSize: ".8125rem", color: "hsl(var(--pale))" }}>#{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Allergens */}
            {dish.allergens && dish.allergens.length > 0 && (
              <div className="dish-fade-c" style={{ marginBottom: 28, padding: "20px 24px", background: "hsl(0,60%,52%,.04)", border: "1px solid hsl(0,60%,52%,.18)", borderRadius: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(0,60%,52%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".18em", color: "hsl(0,60%,52%)", textTransform: "uppercase" }}>אלרגנים</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {dish.allergens.map(a => {
                    const info = ALLERGEN_ICONS[a] ?? { label: a, emoji: "⚠️" };
                    return (
                      <div key={a} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "hsl(0,60%,52%,.08)", border: "1px solid hsl(0,60%,52%,.22)", borderRadius: 99 }}>
                        <span>{info.emoji}</span>
                        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".1em", color: "hsl(0,60%,52%)", textTransform: "uppercase" }}>{info.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Status indicators */}
            <div className="dish-fade-d" style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 28, borderTop: "1px solid hsl(var(--line))" }}>
              <StatusRow label="זמינות" value={dish.is_available ? "זמין עכשיו" : "לא זמין"} color={dish.is_available ? "hsl(28,88%,52%)" : "hsl(0,60%,52%)"} icon={dish.is_available ? "✓" : "✗"} />
              {dish.is_new && <StatusRow label="מנה חדשה" value="נוסף לאחרונה לתפריט" color="hsl(28,88%,52%)" icon="★" />}
              {dish.is_signature && <StatusRow label="מנת שף" value="המלצה מיוחדת של השף" color="hsl(36,28%,92%)" icon="♦" />}
              {dish.ar_enabled && <StatusRow label="AR זמין" value="סרוק עם המצלמה לחוויה תלת-מימד" color="hsl(28,88%,52%)" icon="◉" />}
            </div>
          </div>
        </div>
      </div>

      {/* ─── VIDEO MODAL ─── */}
      {videoOpen && dish.video_url && (
        <div onClick={() => setVideoOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.9)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "min(90vw,900px)", background: "hsl(var(--abyss))", borderRadius: 16, overflow: "hidden", border: "1px solid hsl(var(--line))" }}>
            <video src={dish.video_url} controls autoPlay style={{ width: "100%", display: "block" }} />
          </div>
          <button onClick={() => setVideoOpen(false)} style={{ position: "absolute", top: 20, left: 20, width: 40, height: 40, borderRadius: "50%", background: "hsl(var(--deep))", border: "1px solid hsl(var(--line))", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "hsl(var(--cream))" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── StatusRow ─────────────────────────────────────────── */
function StatusRow({ label, value, color, icon }: { label: string; value: string; color: string; icon: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <span style={{ width: 28, height: 28, borderRadius: "50%", background: `${color}12`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".75rem", color, flexShrink: 0 }}>{icon}</span>
      <div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".14em", color: "hsl(var(--dim))", textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontSize: ".875rem", color: "hsl(var(--subtle))", marginTop: 1 }}>{value}</div>
      </div>
    </div>
  );
}
