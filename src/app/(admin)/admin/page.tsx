import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Utensils,
  Users,
  Eye,
  Scan,
  Cuboid,
  ArrowLeft,
  CircleCheck,
  CircleOff,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();

  const [
    { count: restaurantCount },
    { count: activeRestaurantCount },
    { count: dishCount },
    { count: userCount },
    { count: menuViewCount },
    { count: qrScanCount },
    { count: arViewCount },
  ] = await Promise.all([
    supabase.from("restaurants").select("*", { count: "exact", head: true }),
    supabase
      .from("restaurants")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true),
    supabase.from("dishes").select("*", { count: "exact", head: true }),
    supabase.from("user_roles").select("*", { count: "exact", head: true }),
    supabase
      .from("menu_events")
      .select("*", { count: "exact", head: true })
      .eq("event_type", "menu_view"),
    supabase
      .from("menu_events")
      .select("*", { count: "exact", head: true })
      .eq("event_type", "qr_scan"),
    supabase
      .from("menu_events")
      .select("*", { count: "exact", head: true })
      .eq("event_type", "ar_view"),
  ]);

  const { data: recentRestaurants } = await supabase
    .from("restaurants")
    .select("id, name, slug, logo_url, is_active, created_at")
    .order("created_at", { ascending: false })
    .limit(8);

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="font-serif-display text-4xl font-bold">
          <span className="text-gold-gradient">סקירה כללית</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          כל הנתונים של הפלטפורמה במבט אחד
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStat
          icon={<Building2 className="h-5 w-5" />}
          label="מסעדות"
          value={restaurantCount ?? 0}
          sub={`${activeRestaurantCount ?? 0} פעילות`}
        />
        <AdminStat
          icon={<Utensils className="h-5 w-5" />}
          label="מנות סה״כ"
          value={dishCount ?? 0}
        />
        <AdminStat
          icon={<Users className="h-5 w-5" />}
          label="משתמשים"
          value={userCount ?? 0}
        />
        <AdminStat
          icon={<Eye className="h-5 w-5" />}
          label="צפיות בתפריט"
          value={menuViewCount ?? 0}
        />
        <AdminStat
          icon={<Scan className="h-5 w-5" />}
          label="סריקות QR"
          value={qrScanCount ?? 0}
        />
        <AdminStat
          icon={<Cuboid className="h-5 w-5" />}
          label="צפיות AR"
          value={arViewCount ?? 0}
        />
      </div>

      {/* Recent restaurants */}
      <Card className="shadow-premium">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif-display text-xl font-bold">מסעדות חדשות</h2>
            <Link
              href="/admin/restaurants"
              className="text-sm text-[hsl(var(--gold-dark))] hover:text-[hsl(var(--gold))] flex items-center gap-1"
            >
              כל המסעדות
              <ArrowLeft className="h-3 w-3" />
            </Link>
          </div>

          {recentRestaurants && recentRestaurants.length > 0 ? (
            <div className="space-y-1">
              {recentRestaurants.map((r) => (
                <Link
                  key={r.id}
                  href={`/admin/restaurants/${r.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/60 transition-colors"
                >
                  {r.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.logo_url}
                      alt={r.name}
                      className="h-10 w-10 rounded-lg object-cover border border-border/60"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{r.name}</div>
                    <div className="text-xs text-muted-foreground truncate" dir="ltr">
                      /menu/{r.slug}
                    </div>
                  </div>
                  {r.is_active ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full">
                      <CircleCheck className="h-3 w-3" />
                      פעילה
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                      <CircleOff className="h-3 w-3" />
                      מושבתת
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    {new Date(r.created_at).toLocaleDateString("he-IL")}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">אין מסעדות עדיין</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function AdminStat({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub?: string;
}) {
  return (
    <Card className="group relative overflow-hidden shadow-premium hover:border-[hsl(var(--gold))]/40 transition-all">
      <div className="absolute top-0 right-0 w-24 h-24 bg-[hsl(var(--gold))]/10 rounded-full blur-2xl" />
      <CardContent className="relative p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
          <div className="h-8 w-8 rounded-lg bg-gold-gradient flex items-center justify-center text-white shadow-gold-glow">
            {icon}
          </div>
        </div>
        <div className="font-serif-display text-3xl font-bold">{value.toLocaleString()}</div>
        {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
      </CardContent>
    </Card>
  );
}
