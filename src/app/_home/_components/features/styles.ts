import type { CSSProperties } from "react";

export const CARD_BASE: CSSProperties = {
  background: "linear-gradient(135deg,hsl(38,30%,97%),hsl(36,22%,93%))",
  border: "1px solid hsl(30,18%,82%,.5)",
  borderRadius: 20,
  padding: "36px 32px",
  position: "relative",
  overflow: "hidden",
};

export const NUMBER_BG: CSSProperties = {
  position: "absolute",
  top: 12,
  left: 20,
  fontFamily: "'DM Sans',sans-serif",
  fontSize: 72,
  fontWeight: 800,
  color: "hsl(28,62%,42%,.18)",
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
  fontFamily: "'DM Sans',sans-serif",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  marginBottom: 10,
};

export const H3: CSSProperties = {
  fontFamily: "'Cormorant Garamond',serif",
  fontSize: "2rem",
  fontWeight: 700,
  color: "hsl(24,18%,16%)",
  lineHeight: 1.1,
  marginBottom: 12,
};

export const P: CSSProperties = {
  fontFamily: "'DM Sans',sans-serif",
  fontSize: ".9rem",
  color: "hsl(24,12%,32%)",
  lineHeight: 1.65,
  marginBottom: 24,
};

export const MOCKUP: CSSProperties = {
  background: "hsl(38,28%,94%)",
  border: "1px solid hsl(30,18%,82%,.3)",
  borderRadius: 12,
  padding: "14px 16px",
};
