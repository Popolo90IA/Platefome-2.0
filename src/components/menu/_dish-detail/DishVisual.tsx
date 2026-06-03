"use client";

import Image from "next/image";
import type { Dish } from "@/types/database.types";
import { Badge } from "./Badge";
import type { DishBadge } from "./constants";

/* ─── DishVisual — main photo + badges + video btn + 360 strip + AR/3D ── */
export function DishVisual({
  dish,
  badges,
  photos,
  activePhoto,
  onPhoto,
  onOpenVideo,
}: {
  dish: Dish;
  badges: DishBadge[];
  photos: string[];
  activePhoto: number;
  onPhoto: (i: number) => void;
  onOpenVideo: () => void;
}) {
  const currentPhoto = photos[activePhoto] ?? "";

  return (
    <div className="dish-visual" style={{ flex: "0 0 50%", maxWidth: "50%" }}>
      {/* Main photo */}
      <div
        className="dish-fade-a"
        style={{
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          background: "hsl(var(--abyss))",
          border: "1px solid hsl(var(--line))",
          aspectRatio: "4/3",
        }}
      >
        {currentPhoto ? (
          <Image
            src={currentPhoto}
            alt={dish.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 320,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: ".625rem",
                letterSpacing: ".14em",
                color: "hsl(var(--dim))",
                textTransform: "uppercase",
              }}
            >
              אין תמונה
            </span>
          </div>
        )}

        {badges.length > 0 && (
          <div style={{ position: "absolute", top: 16, right: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {badges.map((b) => (
              <Badge key={b.label} {...b} />
            ))}
          </div>
        )}

        {dish.video_url && (
          <button
            onClick={onOpenVideo}
            style={{
              position: "absolute",
              bottom: 16,
              left: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 18px",
              background: "hsl(220,12%,4%,.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid hsl(36,28%,92%,.25)",
              borderRadius: 99,
              cursor: "pointer",
              color: "hsl(36,28%,92%)",
              fontFamily: "'DM Mono',monospace",
              fontSize: ".5875rem",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              transition: "border-color .2s,background .2s",
            }}
            onMouseOver={(e) => {
              const b = e.currentTarget;
              b.style.borderColor = "hsl(36,28%,92%,.5)";
              b.style.background = "hsl(220,12%,8%,.95)";
            }}
            onMouseOut={(e) => {
              const b = e.currentTarget;
              b.style.borderColor = "hsl(36,28%,92%,.25)";
              b.style.background = "hsl(220,12%,4%,.85)";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="hsl(36,28%,92%)" stroke="none">
              <polygon points="5 3 19 12 5 21" />
            </svg>
            סרטון
          </button>
        )}
      </div>

      {/* 360° photo strip */}
      {photos.length > 1 && (
        <div className="dish-fade-b" style={{ display: "flex", gap: 10, marginTop: 14, overflowX: "auto", paddingBottom: 4 }}>
          {photos.map((src, i) => (
            <button
              key={i}
              onClick={() => onPhoto(i)}
              style={{
                flexShrink: 0,
                width: 72,
                height: 72,
                borderRadius: 10,
                overflow: "hidden",
                border: `2px solid ${i === activePhoto ? "hsl(36,28%,92%)" : "hsl(var(--line))"}`,
                cursor: "pointer",
                padding: 0,
                background: "hsl(var(--abyss))",
                transition: "border-color .2s",
                position: "relative",
              }}
            >
              <Image src={src} alt={`תמונה ${i + 1}`} fill sizes="72px" style={{ objectFit: "cover" }} />
            </button>
          ))}
        </div>
      )}

      {/* AR / 3D actions */}
      {(dish.ar_enabled || dish.model_3d_url) && (
        <div className="dish-fade-b" style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
          {dish.ar_enabled && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 20px",
                background: "hsl(28,88%,52%,.07)",
                border: "1px solid hsl(28,88%,52%,.25)",
                borderRadius: 10,
                flex: 1,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(28,88%,52%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".14em", color: "hsl(28,88%,52%)", textTransform: "uppercase", marginBottom: 2 }}>
                  מציאות רבודה
                </div>
                <div style={{ fontSize: ".8125rem", color: "hsl(var(--subtle))" }}>כוון מצלמה לשולחן</div>
              </div>
            </div>
          )}
          {dish.model_3d_url && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 20px",
                background: "hsl(36,28%,92%,.05)",
                border: "1px solid hsl(36,28%,92%,.15)",
                borderRadius: 10,
                flex: 1,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(36,28%,92%,.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
              <div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".14em", color: "hsl(36,28%,92%,.7)", textTransform: "uppercase", marginBottom: 2 }}>
                  תלת-מימד
                </div>
                <div style={{ fontSize: ".8125rem", color: "hsl(var(--subtle))" }}>סובב וצפה בכל זווית</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
