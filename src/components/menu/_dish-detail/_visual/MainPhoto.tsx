"use client";

import Image from "next/image";
import type { Dish } from "@/types/database.types";
import { Badge } from "../Badge";
import type { DishBadge } from "../constants";

/* ── MainPhoto — hero image with badge overlay + optional video btn ── */
export function MainPhoto({
  dish,
  badges,
  currentPhoto,
  onOpenVideo,
}: {
  dish: Dish;
  badges: DishBadge[];
  currentPhoto: string;
  onOpenVideo: () => void;
}) {
  return (
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
  );
}
