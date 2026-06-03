import { Building2, CircleCheck, CircleOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Plan, PlanRestaurant } from "../_lib/plans";

/* ── PlanRestaurantList — restaurants grouped under one plan ── */
export function PlanRestaurantList({
  plan,
  list,
}: {
  plan: Plan;
  list: PlanRestaurant[];
}) {
  return (
    <Card className="shadow-premium">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div
            className="h-7 w-7 rounded-md flex items-center justify-center text-white"
            style={{ background: "var(--grad-bronze)" }}
          >
            {plan.icon}
          </div>
          <h2 className="font-serif-display text-xl font-bold">
            תוכנית {plan.label}
          </h2>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              color: "hsl(var(--accent-bright))",
              background: "hsl(var(--accent-bright) / .1)",
            }}
          >
            {list.length} מסעדות
          </span>
        </div>

        <div className="space-y-1">
          {list.map((r) => (
            <div
              key={r.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/60 transition-colors"
            >
              {r.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={r.logo_url}
                  alt={r.name}
                  className="h-9 w-9 rounded-lg object-cover border border-border/60 flex-shrink-0"
                />
              ) : (
                <div
                  className="h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--grad-bronze)" }}
                >
                  <Building2 className="h-4 w-4 text-white" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{r.name}</div>
                <div className="text-xs text-muted-foreground" dir="ltr">
                  /menu/{r.slug}
                </div>
              </div>
              {r.is_active ? (
                <span
                  className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                  style={{
                    color: "hsl(var(--accent-bright))",
                    background: "hsl(var(--accent-bright) / .1)",
                  }}
                >
                  <CircleCheck className="h-3 w-3" />
                  פעילה
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-[hsl(var(--line))]/40 px-2 py-0.5 rounded-full">
                  <CircleOff className="h-3 w-3" />
                  מושבתת
                </span>
              )}
              <span className="text-xs text-muted-foreground hidden sm:block">
                {new Date(r.created_at).toLocaleDateString("he-IL")}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
