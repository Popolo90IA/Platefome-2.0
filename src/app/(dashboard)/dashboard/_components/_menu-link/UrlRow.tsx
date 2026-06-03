"use client";

import { Check, Copy } from "lucide-react";

/* ── UrlRow — public menu URL + copy-to-clipboard toggle ── */
export function UrlRow({
  menuUrl,
  copied,
  onCopy,
}: {
  menuUrl: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
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
      <code dir="ltr" className="flex-1 font-mono truncate" style={{ fontSize: 12, color: "hsl(var(--subtle))" }}>
        {menuUrl}
      </code>
      <button
        onClick={onCopy}
        className="flex items-center gap-1.5 font-mono flex-shrink-0 transition-colors duration-150"
        style={{ fontSize: 12, color: copied ? "hsl(var(--accent-bright))" : "hsl(var(--dim))" }}
        onMouseEnter={(e) => {
          if (!copied) (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--fog))";
        }}
        onMouseLeave={(e) => {
          if (!copied) (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--dim))";
        }}
      >
        {copied ? (
          <>
            <Check style={{ width: 13, height: 13 }} strokeWidth={1.5} /> הועתק
          </>
        ) : (
          <>
            <Copy style={{ width: 13, height: 13 }} strokeWidth={1.5} /> העתק
          </>
        )}
      </button>
    </div>
  );
}
