"use client";

import type { CSSProperties, ReactNode } from "react";
import { D } from "../../_lib/constants";

const PILL_STYLE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  fontFamily: "'DM Mono', monospace",
  fontSize: "9px",
  letterSpacing: ".14em",
  textTransform: "uppercase",
  padding: "3px 8px",
  borderRadius: 99,
  color: D.goldLt,
  background: `${D.goldLt}14`,
  border: `1px solid ${D.goldLt}2d`,
};

interface ButtonProps {
  onClick: (e: React.MouseEvent) => void;
  children: ReactNode;
}

export function MediaActionButton({ onClick, children }: ButtonProps) {
  return (
    <button type="button" onClick={onClick} style={{ ...PILL_STYLE, cursor: "pointer" }}>
      {children}
    </button>
  );
}

interface SpanProps {
  children: ReactNode;
}

export function MediaActionSpan({ children }: SpanProps) {
  return <span style={PILL_STYLE}>{children}</span>;
}
