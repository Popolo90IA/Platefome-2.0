export function LoadingState() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 300,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "2px solid hsl(var(--gold))",
          borderTopColor: "transparent",
          animation: "spin 1s linear infinite",
        }}
      />
    </div>
  );
}
