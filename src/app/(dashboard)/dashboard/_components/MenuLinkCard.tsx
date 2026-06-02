"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, Plus, QrCode } from "lucide-react";
import type { Restaurant } from "../_lib/types";

interface Props {
  restaurant: Restaurant;
}

/**
 * MenuLinkCard — carte URL menu public + copy + CTA QR / Ajouter mnh.
 */
export function MenuLinkCard({ restaurant }: Props) {
  const [copied, setCopied] = useState(false);

  const menuUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/menu/${restaurant.slug}`
      : `/menu/${restaurant.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="lg:col-span-2"
      style={{
        background: "hsl(var(--deep))",
        border: "1px solid hsl(var(--line))",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "18px 24px",
          borderBottom: "1px solid hsl(var(--line))",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <h3
          className="font-display"
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "hsl(var(--fog))",
            margin: 0,
            flex: 1,
          }}
        >
          התפריט הציבורי שלך
        </h3>
        <span
          className="font-sans uppercase"
          style={{
            fontSize: "10px",
            letterSpacing: ".06em",
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: 99,
            background: "hsl(28 62% 42% / .08)",
            color: "hsl(var(--accent-bright))",
            border: "1px solid hsl(28 62% 42% / .18)",
          }}
        >
          פעיל
        </span>
        <Link href={`/menu/${restaurant.slug}`} target="_blank">
          <button
            className="flex items-center gap-1.5 text-xs transition-colors duration-150"
            style={{ color: "hsl(var(--subtle))" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "hsl(var(--accent-bright))")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "hsl(var(--subtle))")
            }
          >
            <ExternalLink style={{ width: 14, height: 14 }} strokeWidth={1.5} />
            פתח
          </button>
        </Link>
      </div>

      <div
        style={{
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 14px",
            background: "hsl(var(--abyss))",
            border: "1px solid hsl(var(--line))",
            borderRadius: "var(--radius-md)",
          }}
        >
          <code
            dir="ltr"
            className="flex-1 font-mono truncate"
            style={{ fontSize: 12, color: "hsl(var(--subtle))" }}
          >
            {menuUrl}
          </code>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 font-mono flex-shrink-0 transition-colors duration-150"
            style={{
              fontSize: 12,
              color: copied
                ? "hsl(var(--accent-bright))"
                : "hsl(var(--dim))",
            }}
            onMouseEnter={(e) => {
              if (!copied)
                (e.currentTarget as HTMLButtonElement).style.color =
                  "hsl(var(--fog))";
            }}
            onMouseLeave={(e) => {
              if (!copied)
                (e.currentTarget as HTMLButtonElement).style.color =
                  "hsl(var(--dim))";
            }}
          >
            {copied ? (
              <>
                <Check style={{ width: 13, height: 13 }} strokeWidth={1.5} />{" "}
                הועתק
              </>
            ) : (
              <>
                <Copy style={{ width: 13, height: 13 }} strokeWidth={1.5} />{" "}
                העתק
              </>
            )}
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          <Link href="/dashboard/qrcode" style={{ display: "block" }}>
            <button
              className="w-full btn-primary"
              style={{
                padding: "11px 20px",
                fontSize: "0.875rem",
                justifyContent: "center",
              }}
            >
              <QrCode style={{ width: 14, height: 14 }} strokeWidth={1.5} />
              הורד QR קוד
            </button>
          </Link>
          <Link href="/dashboard/dishes" style={{ display: "block" }}>
            <button
              className="w-full flex items-center justify-center gap-2 transition-colors duration-150"
              style={{
                padding: "11px 20px",
                fontSize: "0.875rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                background: "hsl(var(--abyss))",
                border: "1px solid hsl(var(--line))",
                borderRadius: "var(--radius-lg)",
                color: "hsl(var(--fog))",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "hsl(28 62% 42% / .4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "hsl(var(--line))";
              }}
            >
              <Plus style={{ width: 14, height: 14 }} strokeWidth={1.5} />
              הוסף מנה
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
