"use client";

import type { ChangeEvent } from "react";

interface Props {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  paddingLeft?: number;
}

export function AuthInput({
  id,
  type,
  label,
  value,
  onChange,
  placeholder,
  required,
  paddingLeft,
}: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label
        htmlFor={id}
        className="font-sans uppercase"
        style={{
          fontSize: 12,
          letterSpacing: ".06em",
          fontWeight: 600,
          color: "hsl(var(--dim))",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        dir="ltr"
        className="font-sans"
        style={{
          width: "100%",
          boxSizing: "border-box",
          fontSize: 14,
          padding: paddingLeft
            ? `11px ${paddingLeft}px 11px 14px`
            : "11px 14px",
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--line))",
          borderRadius: 10,
          color: "hsl(var(--fog))",
          outline: "none",
          transition: "border-color .15s, box-shadow .15s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "hsl(28,62%,42%,.6)";
          e.currentTarget.style.boxShadow = "0 0 0 3px hsl(28,62%,42%,.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "hsl(var(--line))";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}
