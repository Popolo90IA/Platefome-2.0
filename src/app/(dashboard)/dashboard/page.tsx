"use client";

import { ChecklistCard } from "./_components/ChecklistCard";
import { DashboardLoading } from "./_components/DashboardLoading";
import { MenuLinkCard } from "./_components/MenuLinkCard";
import { NoRestaurantCard } from "./_components/NoRestaurantCard";
import { PageHeader } from "./_components/PageHeader";
import { QuickActions } from "./_components/QuickActions";
import { StatGrid } from "./_components/StatGrid";
import { useDashboardOverview } from "./_lib/hooks/useDashboardOverview";
import { buildChecklist } from "./_lib/helpers";

export default function DashboardPage() {
  const { restaurant, stats, deltas, loading } = useDashboardOverview();

  if (loading) return <DashboardLoading />;

  const checklistItems = buildChecklist(!!restaurant, stats);

  return (
    <div className="space-y-8">
      <PageHeader restaurant={restaurant} stats={stats} />

      {!restaurant && <NoRestaurantCard />}

      {restaurant && (
        <>
          <StatGrid stats={stats} deltas={deltas} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <MenuLinkCard restaurant={restaurant} />
            <ChecklistCard items={checklistItems} />
          </div>

          <QuickActions />
        </>
      )}
    </div>
  );
}
