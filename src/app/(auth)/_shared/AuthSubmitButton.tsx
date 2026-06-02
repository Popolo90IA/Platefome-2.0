"use client";

import { Loader2 } from "lucide-react";

interface Props {
  loading: boolean;
  label: string;
}

export function AuthSubmitButton({ loading, label }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="font-sans"
      style={{
        width: "100%",
        padding: "13px 20px",
        background: loading
          ? "hsl(var(--line))"
          : "linear-gradient(135deg, hsl(28,62%,38%) 0%, hsl(22,70%,50%) 100%)",
        border: "none",
        borderRadius: 10,
        color: "#fff",
        fontSize: 14,
        fontWeight: 600,
        cursor: loading ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        transition: "opacity .15s",
        boxShadow: loading ? "none" : "0 4px 16px -4px hsl(28,62%,42%,.4)",
        marginTop: 4,
      }}
      onMouseEnter={(e) => {
        if (!loading) (e.currentTarget as HTMLButtonElement).style.opacity = ".9";
      }}
      onMouseLeave={(e) => {
        if (!loading) (e.currentTarget as HTMLButtonElement).style.opacity = "1";
      }}
    >
      {loading ? (
        <Loader2
          style={{ width: 18, height: 18, animation: "spin 1s linear infinite" }}
        />
      ) : (
        label
      )}
    </button>
  );
}
