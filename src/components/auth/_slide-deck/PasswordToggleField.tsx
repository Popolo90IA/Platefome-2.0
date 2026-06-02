"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { inputStyle, inputFocus, inputBlur } from "./styles";

type PasswordToggleFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  children?: React.ReactNode;
  labelSlot: React.ReactNode;
};

export function PasswordToggleField({
  id,
  value,
  onChange,
  placeholder,
  children,
  labelSlot,
}: PasswordToggleFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {labelSlot}
      <div style={{ position: "relative" }}>
        <input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          dir="ltr"
          className="font-sans"
          style={{ ...inputStyle, padding: "11px 40px 11px 14px" }}
          onFocus={inputFocus}
          onBlur={inputBlur}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            color: "hsl(var(--dim))",
            display: "flex",
            alignItems: "center",
          }}
        >
          {show ? (
            <EyeOff style={{ width: 16, height: 16 }} />
          ) : (
            <Eye style={{ width: 16, height: 16 }} />
          )}
        </button>
      </div>
      {children}
    </div>
  );
}
