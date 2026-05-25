"use client";

import type { ReactNode } from "react";

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  count: number;
}

export function FilterChip({ active, onClick, children, count }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 14px",
        borderRadius: 99,
        fontFamily: "var(--font-sans)",
        fontSize: "12.5px",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all .15s",
        background: active ? "hsl(var(--accent-bright))" : "transparent",
        color: active ? "#fff" : "hsl(var(--subtle))",
        border: active ? "1px solid transparent" : "1px solid hsl(var(--line))",
      }}
    >
      {children}
      <span
        style={{
          padding: "1px 6px",
          borderRadius: 99,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          background: active ? "rgba(255,255,255,.18)" : "hsl(var(--abyss))",
          color: active ? "#fff" : "hsl(var(--dim))",
        }}
      >
        {count}
      </span>
    </button>
  );
}
