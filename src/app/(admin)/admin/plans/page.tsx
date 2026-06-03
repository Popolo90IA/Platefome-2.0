import { Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { PLANS, groupByPlan, type PlanRestaurant } from "./_lib/plans";
import { PlanOverviewCard } from "./_components/PlanOverviewCard";
import { PlanRestaurantList } from "./_components/PlanRestaurantList";

export const dynamic = "force-dynamic";

export default async function AdminPlansPage() {
  const supabase = await createClient();

  const { data: restaurants } = await supabase
    .from("restaurants")
    .select("id, name, slug, logo_url, is_active, plan, created_at")
    .order("created_at", { ascending: false });

  const rows = (restaurants ?? []) as PlanRestaurant[];
  const { byPlan, counts } = groupByPlan(rows);

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
          return <PlanOverviewCard key={plan.key} plan={plan} count={count} pct={pct} />;
        })}
      </div>

      {/* Restaurant list per plan */}
      {PLANS.map((plan) => {
        const list = byPlan[plan.key] ?? [];
        if (list.length === 0) return null;
        return <PlanRestaurantList key={plan.key} plan={plan} list={list} />;
      })}

      {rows.length === 0 && (
        <Card className="shadow-premium">
          <CardContent className="py-16 text-center">
            <Sparkles className="h-12 w-12 text-muted-foreground/70 mx-auto mb-3" />
            <p className="text-muted-foreground">אין מסעדות עדיין</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
