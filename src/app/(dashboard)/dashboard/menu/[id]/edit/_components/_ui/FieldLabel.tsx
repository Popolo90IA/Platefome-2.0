export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-sans uppercase"
      style={{
        display: "block",
        fontSize: "10.5px",
        letterSpacing: ".16em",
        color: "hsl(var(--subtle))",
        marginBottom: 6,
      }}
    >
      {children}
    </span>
  );
}
