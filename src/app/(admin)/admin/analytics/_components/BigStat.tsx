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
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium text-muted-foreground">
            {label}
          </span>
          <div
            className="h-7 w-7 rounded-md flex items-center justify-center text-white"
            style={{
              background: "var(--grad-bronze)",
              boxShadow: "0 2px 10px hsl(28 62% 38% / .35)",
            }}
          >
            {icon}
          </div>
        </div>
        <div className="font-serif-display text-2xl font-bold">
          {value.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
