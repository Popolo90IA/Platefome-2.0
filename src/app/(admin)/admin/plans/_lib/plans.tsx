import { Sparkles, Crown, Zap } from "lucide-react";

export type Plan = {
  key: string;
  label: string;
  labelEn: string;
  price: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
};

export const PLANS: Plan[] = [
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

export type PlanRestaurant = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  is_active: boolean | null;
  plan: string | null;
  created_at: string;
};

/* ── groupByPlan — bucket restaurants per plan + counts ── */
export function groupByPlan(restaurants: PlanRestaurant[]) {
  const byPlan: Record<string, PlanRestaurant[]> = {
    free: [],
    pro: [],
    enterprise: [],
  };

  restaurants.forEach((r) => {
    const p = r.plan ?? "free";
    if (!byPlan[p]) byPlan[p] = [];
    byPlan[p]!.push(r);
  });

  const counts = {
    free: byPlan.free?.length ?? 0,
    pro: byPlan.pro?.length ?? 0,
    enterprise: byPlan.enterprise?.length ?? 0,
    total: restaurants.length,
  };

  return { byPlan, counts };
}
