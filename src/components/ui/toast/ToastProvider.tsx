"use client";

import { createContext, useCallback, useState, type ReactNode } from "react";
import { X, AlertCircle, CheckCircle2 } from "lucide-react";

export type ToastVariant = "error" | "success";

type Toast = {
  id: number;
  message: string;
  variant: ToastVariant;
};

export type ToastContextValue = {
  toast: (message: string, variant?: ToastVariant) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

const AUTO_DISMISS_MS = 4000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant = "error") => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, variant }]);
      setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onClose={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const isError = toast.variant === "error";
  const Icon = isError ? AlertCircle : CheckCircle2;
  const accent = isError
    ? "hsl(var(--ember))"
    : "hsl(var(--accent-bright))";

  return (
    <div
      className="font-sans"
      style={{
        pointerEvents: "auto",
        display: "flex",
        alignItems: "center",
        gap: 12,
        minWidth: 280,
        maxWidth: 440,
        padding: "12px 14px",
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--line))",
        borderRadius: 12,
        boxShadow: "0 12px 40px rgba(0,0,0,.25)",
        animation: "toast-in .2s ease",
      }}
    >
      <span
        style={{
          width: 3,
          alignSelf: "stretch",
          borderRadius: 2,
          background: accent,
          flexShrink: 0,
        }}
      />
      <Icon style={{ width: 18, height: 18, color: accent, flexShrink: 0 }} strokeWidth={1.8} />
      <span style={{ flex: 1, fontSize: 13.5, color: "hsl(var(--fog))", lineHeight: 1.4 }}>
        {toast.message}
      </span>
      <button
        onClick={onClose}
        aria-label="סגור"
        style={{
          display: "grid",
          placeItems: "center",
          width: 22,
          height: 22,
          borderRadius: 6,
          border: "none",
          background: "transparent",
          color: "hsl(var(--dim))",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <X style={{ width: 14, height: 14 }} />
      </button>
    </div>
  );
}
