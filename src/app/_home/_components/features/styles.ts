import type { CSSProperties } from "react";

export const CARD_BASE: CSSProperties = {
  background: "linear-gradient(135deg,hsl(var(--deep)),hsl(var(--abyss)))",
  border: "1px solid hsl(var(--line) / .5)",
  borderRadius: 20,
  padding: "36px 32px",
  position: "relative",
  overflow: "hidden",
};

export const NUMBER_BG: CSSProperties = {
  position: "absolute",
  top: 12,
  left: 20,
  fontFamily: "var(--font-body)",
  fontSize: 72,
  fontWeight: 800,
  color: "hsl(var(--accent-bright) / .18)",
  lineHeight: 1,
  letterSpacing: "-.04em",
  userSelect: "none",
};

export const ICON_WRAP_BASE: CSSProperties = {
  width: 52,
  height: 52,
  borderRadius: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 20,
};

export const EYEBROW_BASE: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  marginBottom: 10,
};

export const H3: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "2rem",
  fontWeight: 700,
  color: "hsl(var(--fog))",
  lineHeight: 1.1,
  marginBottom: 12,
};

export const P: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: ".9rem",
  color: "hsl(var(--subtle))",
  lineHeight: 1.65,
  marginBottom: 24,
};

export const MOCKUP: CSSProperties = {
  background: "hsl(var(--void))",
  border: "1px solid hsl(var(--line) / .3)",
  borderRadius: 12,
  padding: "14px 16px",
};
