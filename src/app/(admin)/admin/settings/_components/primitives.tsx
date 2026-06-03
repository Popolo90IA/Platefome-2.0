"use client";

import { Card, CardContent } from "@/components/ui/card";

/* ── SectionCard — titled card with bronze icon badge ── */
export function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="shadow-premium">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <div
            className="h-7 w-7 rounded-md flex items-center justify-center text-white"
            style={{ background: "var(--grad-bronze)" }}
          >
            {icon}
          </div>
          <h2 className="font-serif-display text-lg font-bold">{title}</h2>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

/* ── SettingRow — label/description + control, bottom border ── */
export function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-4 border-b border-border/50 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">{label}</div>
        {description && (
          <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
        )}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

/* ── Toggle — bronze switch ── */
export function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="relative h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none"
      style={{
        background: checked ? "var(--grad-bronze)" : "hsl(var(--line))",
      }}
    >
      <span
        className="block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
        style={{
          transform: checked ? "translateX(-1.5rem)" : "translateX(-0.25rem)",
          marginTop: "4px",
          marginRight: checked ? "0" : "auto",
          position: "absolute",
          top: 0,
          right: checked ? "0.25rem" : "auto",
          left: checked ? "auto" : "0.25rem",
        }}
      />
    </button>
  );
}
