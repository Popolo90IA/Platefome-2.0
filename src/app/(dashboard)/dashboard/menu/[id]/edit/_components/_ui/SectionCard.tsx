"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type SectionCardProps = {
  title: string;
  badge?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function SectionCard({
  title,
  badge,
  children,
  defaultOpen = true,
}: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        background: "hsl(var(--deep))",
        border: "1px solid hsl(var(--line))",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 16,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          borderBottom: open ? "1px solid hsl(var(--line))" : "none",
        }}
      >
        <span
          className="font-display"
          style={{ fontSize: 19, fontWeight: 600, color: "hsl(var(--fog))" }}
        >
          {title}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {badge && (
            <span
              className="font-sans uppercase"
              style={{
                fontSize: 10,
                letterSpacing: ".06em",
                color: "hsl(var(--dim))",
              }}
            >
              {badge}
            </span>
          )}
          <ChevronDown
            style={{
              width: 16,
              height: 16,
              color: "hsl(var(--dim))",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform .2s",
            }}
          />
        </div>
      </button>
      {open && <div style={{ padding: "20px 24px" }}>{children}</div>}
    </div>
  );
}
