"use client";

export function PasswordStrengthBar({ value }: { value: string }) {
  if (value.length === 0) return null;

  return (
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
  );
}
