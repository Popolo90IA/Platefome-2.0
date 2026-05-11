import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  Building2,
  Crown,
  Zap,
  CircleCheck,
  CircleOff,
} from "lucide-react";

export const dynamic = "force-dynamic";

const PLANS = [
  {
    key: "free",
    label: "חינם",
    labelEn: "Free",
    price: "₪0",
    icon: <Sparkles className="h-5 w-5" />,
    color: "hsl(var(--dim))",
    features: ["תפריט דיגיטלי בסיסי", "עד 20 מנות", "QR קוד"],
  },
  {
    key: "pro",
    label: "פרו",
    labelEn: "Pro",
    price: "₪49",
    icon: <Zap className="h-5 w-5" />,
    color: "hsl(var(--accent-bright))",
    features: ["מנות ללא הגבלה", "3D / AR", "וידאו", "אנליטיקס"],
  },
  {
    key: "enterprise",
    label: "ארגוני",
    labelEn: "Enterprise",
    price: "מותאם אישית",
    icon: <Crown className="h-5 w-5" />,
    color: "hsl(var(--gold-dark))",
    features: ["כל הפרו +", "דומיין מותאם", "SLA מועדף", "ליווי אישי"],
  },
];

export default async function AdminPlansPage() {
  const supabase = await createClient();

  const { data: restaurants } = await supabase
    .from("restaurants")
    .select("id, name, slug, logo_url, is_active, plan, created_at")
    .order("created_at", { ascending: false });

  const byPlan: Record<string, typeof restaurants> = {
    free: [],
    pro: [],
    enterprise: [],
  };

  (restaurants ?? []).forEach((r) => {
    const p = (r.plan as string | null) ?? "free";
    if (!byPlan[p]) byPlan[p] = [];
    byPlan[p]!.push(r);
  });

  const counts = {
    free: byPlan.free?.length ?? 0,
    pro: byPlan.pro?.length ?? 0,
    enterprise: byPlan.enterprise?.length ?? 0,
    total: (restaurants ?? []).length,
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="font-serif-display text-4xl font-bold">
          <span className="text-gold-gradient">תוכניות מנוי</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          ניהול תוכניות ומנויים של המסעדות בפלטפורמה
        </p>
      </div>

      {/* Plan overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => {
          const count = counts[plan.key as keyof typeof counts] as number;
          const pct = counts.total > 0 ? Math.round((count / counts.total) * 100) : 0;
          return (
            <Card key={plan.key} className="group relative overflow-hidden shadow-premium hover:border-[hsl(var(--gold))]/40 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none" style={{ background: `${plan.color} / 0.08`, opacity: 0.5 }} />
              <CardContent className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.18em] uppercase mb-1" style={{ color: "hsl(var(--dim))" }}>
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
        })}
      </div>

      {/* Restaurant list per plan */}
      {PLANS.map((plan) => {
        const list = byPlan[plan.key] ?? [];
        if (list.length === 0) return null;
        return (
          <Card key={plan.key} className="shadow-premium">
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
                    key={r!.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/60 transition-colors"
                  >
                    {r!.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={r!.logo_url}
                        alt={r!.name}
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
                      <div className="font-medium truncate">{r!.name}</div>
                      <div className="text-xs text-muted-foreground" dir="ltr">
                        /menu/{r!.slug}
                      </div>
                    </div>
                    {r!.is_active ? (
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
                      {new Date(r!.created_at).toLocaleDateString("he-IL")}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {(restaurants ?? []).length === 0 && (
        <Card className="shadow-premium">
          <CardContent className="py-16 text-center">
            <Sparkles className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">אין מסעדות עדיין</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
