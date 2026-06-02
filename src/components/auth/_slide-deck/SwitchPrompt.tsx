"use client";

type SwitchPromptProps = {
  divider: string;
  label: string;
  onSwitch: () => void;
};

export function SwitchPrompt({ divider, label, onSwitch }: SwitchPromptProps) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          margin: "24px 0",
        }}
      >
        <div style={{ flex: 1, height: 1, background: "hsl(var(--line))" }} />
        <span
          className="font-sans"
          style={{
            fontSize: 12,
            letterSpacing: ".04em",
            fontWeight: 500,
            color: "hsl(var(--dim))",
          }}
        >
          {divider}
        </span>
        <div style={{ flex: 1, height: 1, background: "hsl(var(--line))" }} />
      </div>

      <button
        onClick={onSwitch}
        className="font-sans"
        style={{
          display: "block",
          width: "100%",
          boxSizing: "border-box",
          padding: "12px 20px",
          borderRadius: 10,
          border: "1px solid hsl(var(--line))",
          background: "transparent",
          color: "hsl(var(--fog))",
          fontSize: 14,
          fontWeight: 500,
          textAlign: "center",
          cursor: "pointer",
          transition: "border-color .15s, background .15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "hsl(28,62%,42%,.5)";
          (e.currentTarget as HTMLButtonElement).style.background =
            "hsl(28,62%,42%,.04)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "hsl(var(--line))";
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }}
      >
        {label}
      </button>
    </>
  );
}
