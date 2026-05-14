"use client";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "אישור",
  cancelLabel = "ביטול",
  onConfirm,
  onCancel,
  danger = false,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "rgba(0,0,0,.5)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--line))",
          borderRadius: 16,
          padding: "28px 28px 24px",
          maxWidth: 400,
          width: "100%",
          boxShadow: "0 24px 64px rgba(0,0,0,.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          className="font-display text-xl font-semibold mb-2"
          style={{ color: "hsl(var(--fog))" }}
        >
          {title}
        </h3>
        {description && (
          <p
            className="font-sans text-sm mb-6"
            style={{ color: "hsl(var(--subtle))" }}
          >
            {description}
          </p>
        )}
        <div className="flex gap-3 justify-end" style={{ marginTop: description ? 0 : 24 }}>
          <button
            onClick={onCancel}
            className="font-sans text-sm px-4 py-2 rounded-lg border transition-colors"
            style={{
              color: "hsl(var(--fog))",
              borderColor: "hsl(var(--line))",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="font-sans text-sm px-4 py-2 rounded-lg transition-opacity"
            style={{
              background: danger
                ? "hsl(0 72% 51%)"
                : "linear-gradient(135deg, hsl(28,62%,38%) 0%, hsl(22,70%,50%) 100%)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
