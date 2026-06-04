"use client";

import type { ReactNode } from "react";
import { D } from "../../_lib/constants";

const STYLE = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "11px 22px",
  borderRadius: 10,
  background: D.grad,
  color: "#fff",
  fontFamily: "var(--font-body)",
  fontSize: 13.5,
  fontWeight: 600,
  cursor: "pointer",
} as const;

/**
 * DishViewerButton — bouton CTA gradient (3D / AR / 360), rendu en <span> ou
 * <button> selon usage. Icône + label fournis par le parent.
 */
export function DishViewerButton({
  as = "span",
  icon,
  label,
  onClick,
}: {
  as?: "span" | "button";
  icon: ReactNode;
  label: ReactNode;
  onClick?: () => void;
}) {
  if (as === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        style={{ ...STYLE, border: "none" }}
      >
        {icon}
        {label}
      </button>
    );
  }
  return (
    <span style={STYLE}>
      {icon}
      {label}
    </span>
  );
}
