"use client";

import Link from "next/link";
import { Check, Copy, Download, ExternalLink } from "lucide-react";

type Props = {
  menuUrl: string;
  copied: boolean;
  restaurantSlug: string;
  onCopy: () => void;
  onDownloadPng: () => void;
  onDownloadSvg: () => void;
};

/**
 * QrActionsBar — barre du bas : URL + boutons copy, DL PNG/SVG, preview.
 */
export function QrActionsBar({
  menuUrl,
  copied,
  restaurantSlug,
  onCopy,
  onDownloadPng,
  onDownloadSvg,
}: Props) {
  return (
    <div
      style={{
        marginTop: 24,
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          background: "hsl(var(--deep))",
          border: "1px solid hsl(var(--line))",
          borderRadius: 10,
          flex: 1,
          minWidth: 200,
        }}
      >
        <code
          dir="ltr"
          className="font-mono flex-1 truncate"
          style={{ fontSize: 12, color: "hsl(var(--subtle))" }}
        >
          {menuUrl}
        </code>
        <button
          onClick={onCopy}
          className="font-mono"
          style={{
            fontSize: 11,
            color: copied ? "hsl(var(--accent-bright))" : "hsl(var(--dim))",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {copied ? (
            <>
              <Check style={{ width: 13, height: 13 }} strokeWidth={1.5} />{" "}
              הועתק
            </>
          ) : (
            <>
              <Copy style={{ width: 13, height: 13 }} strokeWidth={1.5} /> העתק
            </>
          )}
        </button>
      </div>
      <button
        className="btn-primary"
        style={{ padding: "11px 22px", fontSize: 13 }}
        onClick={onDownloadPng}
      >
        <Download style={{ width: 14, height: 14 }} strokeWidth={1.5} />
        הורד PNG
      </button>
      <button
        className="font-sans"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "11px 22px",
          borderRadius: 10,
          background: "transparent",
          border: "1px solid hsl(var(--line))",
          color: "hsl(var(--fog))",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
        }}
        onClick={onDownloadSvg}
      >
        <Download style={{ width: 14, height: 14 }} strokeWidth={1.5} />
        הורד SVG
      </button>
      <Link href={`/menu/${restaurantSlug}`} target="_blank">
        <button
          className="font-sans"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "11px 22px",
            borderRadius: 10,
            background: "transparent",
            border: "1px solid hsl(var(--line))",
            color: "hsl(var(--fog))",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          <ExternalLink style={{ width: 14, height: 14 }} strokeWidth={1.5} />
          תצוגה מקדימה
        </button>
      </Link>
    </div>
  );
}
