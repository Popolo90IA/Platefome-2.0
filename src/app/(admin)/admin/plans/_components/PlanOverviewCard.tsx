import { CircleCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Plan } from "../_lib/plans";

/* ── PlanOverviewCard — count + % + features + price ── */
export function PlanOverviewCard({
  plan,
  count,
  pct,
}: {
  plan: Plan;
  count: number;
  pct: number;
}) {
  return (
    <Card className="group relative overflow-hidden shadow-premium hover:border-[hsl(var(--gold))]/40 transition-all">
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none" style={{ background: `${plan.color} / 0.08`, opacity: 0.5 }} />
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="font-sans text-[10px] tracking-[0.05em] uppercase font-semibold mb-1" style={{ color: "hsl(var(--dim))" }}>
              {plan.labelEn}
            </div>
            <div className="font-serif-display text-2xl font-bold">{plan.label}</div>
          </div>
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
            style={{ background: "var(--grad-bronze)", boxShadow: "0 2px 12px hsl(28 62% 38% / .30)" }}
          >
            {plan.icon}
          </div>
        </div>

        <div className="font-serif-display text-3xl font-bold mb-1">{count}</div>
        <div className="text-sm text-muted-foreground mb-4">
          מסעדות · {pct}% מהסה״כ
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-4">
          <div
            className="h-full rounded-full transition-all"
            style={{ background: "var(--grad-bronze)", width: `${pct}%` }}
          />
        </div>

        <div className="space-y-1.5">
          {plan.features.map((f) => (
            <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
              <CircleCheck className="h-3 w-3 flex-shrink-0" style={{ color: "hsl(var(--accent-bright))" }} />
              {f}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border/60">
          <div className="font-serif-display text-lg font-bold" style={{ color: "hsl(var(--accent-bright))" }}>
            {plan.price}
            {plan.key !== "enterprise" && (
              <span className="text-xs font-sans text-muted-foreground font-normal mr-1">/ חודש</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
