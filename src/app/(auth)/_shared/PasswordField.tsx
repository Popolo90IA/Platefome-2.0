"use client";

import { useState, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  id?: string;
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  showStrength?: boolean;
  labelExtra?: ReactNode;
}

export function PasswordField({
  id = "password",
  label = "סיסמה",
  value,
  onChange,
  placeholder,
  showStrength = false,
  labelExtra,
}: Props) {
  const [show, setShow] = useState(false);

  const labelEl = (
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
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {labelExtra ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {labelEl}
          {labelExtra}
        </div>
      ) : (
        labelEl
      )}
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
          style={{
            width: "100%",
            boxSizing: "border-box",
            fontSize: 14,
            padding: "11px 40px 11px 14px",
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
        <button
          type="button"
          onClick={() => setShow(!show)}
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
      {showStrength && value.length > 0 && (
        <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              style={{
                height: 3,
                flex: 1,
                borderRadius: 99,
                background:
                  value.length > i * 3
                    ? value.length < 6
                      ? "hsl(0,72%,51%)"
                      : value.length < 10
                        ? "hsl(38,92%,50%)"
                        : "hsl(158,45%,52%)"
                    : "hsl(var(--line))",
                transition: "background .2s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
