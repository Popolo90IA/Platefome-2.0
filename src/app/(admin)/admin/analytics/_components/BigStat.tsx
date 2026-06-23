"use client";

import { Card, CardContent } from "@/components/ui/card";

/* ── BigStat — KPI card (icon, label, value, gradient overlay) ── */
export function BigStat({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <Card className="relative overflow-hidden shadow-premium">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} pointer-events-none`}
      />
      <CardContent className="relative p-4">
        <div
          className="h-9 w-9 rounded-lg flex items-center justify-center text-white shrink-0"
          style={{
            background: "var(--grad-bronze)",
            boxShadow: "0 2px 10px hsl(28 62% 38% / .35)",
          }}
        >
          {icon}
        </div>
        <div className="mt-3">
          <div className="font-serif-display text-2xl font-bold leading-none">
            {value.toLocaleString()}
          </div>
          <div className="mt-1.5 text-[11px] font-medium text-muted-foreground">
            {label}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
