type ChipToggleVariant = "default" | "diet" | "allergen";

type ChipToggleProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: ChipToggleVariant;
};

const CHIP_COLORS: Record<
  ChipToggleVariant,
  {
    on: { bg: string; border: string; color: string };
    off: { bg: string; border: string; color: string };
  }
> = {
  default: {
    on: {
      bg: "hsl(28,62%,42%,.12)",
      border: "hsl(28,62%,42%,.35)",
      color: "hsl(28,62%,35%)",
    },
    off: {
      bg: "transparent",
      border: "hsl(var(--line))",
      color: "hsl(var(--dim))",
    },
  },
  diet: {
    on: {
      bg: "hsl(120,30%,40%,.1)",
      border: "hsl(120,30%,40%,.3)",
      color: "hsl(120,30%,32%)",
    },
    off: {
      bg: "transparent",
      border: "hsl(var(--line))",
      color: "hsl(var(--dim))",
    },
  },
  allergen: {
    on: {
      bg: "hsl(0,60%,50%,.1)",
      border: "hsl(0,60%,50%,.3)",
      color: "hsl(0,55%,42%)",
    },
    off: {
      bg: "transparent",
      border: "hsl(var(--line))",
      color: "hsl(var(--dim))",
    },
  },
};

export function ChipToggle({
  active,
  onClick,
  children,
  variant = "default",
}: ChipToggleProps) {
  const c = active ? CHIP_COLORS[variant].on : CHIP_COLORS[variant].off;
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-sans"
      style={{
        padding: "5px 12px",
        borderRadius: 99,
        border: `1px solid ${c.border}`,
        background: c.bg,
        color: c.color,
        fontSize: 12.5,
        cursor: "pointer",
        transition: "all .15s",
        fontWeight: active ? 500 : 400,
      }}
    >
      {children}
    </button>
  );
}
