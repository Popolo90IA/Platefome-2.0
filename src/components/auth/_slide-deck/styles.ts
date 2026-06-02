import type { CSSProperties, FocusEvent } from "react";

export const inputStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  fontSize: 14,
  padding: "11px 14px",
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--line))",
  borderRadius: 10,
  color: "hsl(var(--fog))",
  outline: "none",
  transition: "border-color .15s, box-shadow .15s",
};

export const inputFocus = (e: FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = "hsl(28,62%,42%,.6)";
  e.currentTarget.style.boxShadow = "0 0 0 3px hsl(28,62%,42%,.1)";
};

export const inputBlur = (e: FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = "hsl(var(--line))";
  e.currentTarget.style.boxShadow = "none";
};

export const labelStyle: CSSProperties = {
  fontSize: 12,
  letterSpacing: ".06em",
  fontWeight: 600,
  color: "hsl(var(--dim))",
};
