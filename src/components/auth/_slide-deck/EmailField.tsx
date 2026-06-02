"use client";

import { inputStyle, inputFocus, inputBlur, labelStyle } from "./styles";

type EmailFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
};

export function EmailField({ id, value, onChange }: EmailFieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label htmlFor={id} className="font-sans uppercase" style={labelStyle}>
        אימייל
      </label>
      <input
        id={id}
        type="email"
        placeholder="you@example.com"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        dir="ltr"
        className="font-sans"
        style={inputStyle}
        onFocus={inputFocus}
        onBlur={inputBlur}
      />
    </div>
  );
}
