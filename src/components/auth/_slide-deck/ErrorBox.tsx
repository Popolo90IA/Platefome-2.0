"use client";

import { AlertCircle } from "lucide-react";

export function ErrorBox({ message }: { message: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        fontSize: 13,
        color: "hsl(0,72%,51%)",
        background: "hsl(0,72%,51%,.08)",
        padding: "12px 14px",
        borderRadius: 10,
        border: "1px solid hsl(0,72%,51%,.2)",
      }}
    >
      <AlertCircle
        style={{ width: 15, height: 15, flexShrink: 0, marginTop: 1 }}
      />
      <span className="font-sans">{message}</span>
    </div>
  );
}
