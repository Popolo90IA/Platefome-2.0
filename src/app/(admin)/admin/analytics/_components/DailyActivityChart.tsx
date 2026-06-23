"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { DayPoint } from "../_lib/types";

/* ── DailyActivityChart — stacked bar chart of daily views + scans ── */
export function DailyActivityChart({
  byDay,
  maxDay,
}: {
  byDay: DayPoint[];
  maxDay: number;
}) {
  return (
    <Card className="shadow-premium">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif-display text-xl font-bold">פעילות יומית</h2>
          <div className="flex gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div
                className="h-2 w-2 rounded-sm"
                style={{ background: "var(--grad-bronze)" }}
              />
              <span className="text-muted-foreground">צפיות</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-sm bg-[hsl(var(--gold-dark))]/60" />
              <span className="text-muted-foreground">סריקות</span>
            </div>
          </div>
        </div>

        <div className="flex items-end gap-0.5 h-40 w-full">
          {byDay.map((d, i) => {
            const total = d.views + d.scans;
            const pct = (total / maxDay) * 100;
            const viewH = total > 0 ? (d.views / total) * pct : 0;
            const scanH = total > 0 ? (d.scans / total) * pct : 0;
            return (
              <div
                key={i}
                className="flex-1 flex flex-col justify-end group relative h-full"
                title={`${d.date}: ${d.views} צפיות · ${d.scans} סריקות`}
              >
                <div
                  className="w-full bg-[hsl(var(--gold-dark))]/60 transition-all"
                  style={{ height: `${scanH}%` }}
                />
                <div
                  className="w-full transition-all"
                  style={{ background: "var(--grad-bronze)", height: `${viewH}%` }}
                />
                <div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none"
                  style={{ background: "var(--grad-bronze)" }}
                >
                  {total}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
          <span>{byDay[0]?.date.slice(5)}</span>
          <span>{byDay[byDay.length - 1]?.date.slice(5)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
