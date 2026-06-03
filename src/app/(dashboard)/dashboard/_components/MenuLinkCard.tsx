"use client";

import { useState } from "react";
import type { Restaurant } from "../_lib/types";
import { CardHeader } from "./_menu-link/CardHeader";
import { UrlRow } from "./_menu-link/UrlRow";
import { CtaRow } from "./_menu-link/CtaRow";

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
      <CardHeader slug={restaurant.slug} />

      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        <UrlRow menuUrl={menuUrl} copied={copied} onCopy={handleCopyLink} />
        <CtaRow />
      </div>
    </div>
  );
}
