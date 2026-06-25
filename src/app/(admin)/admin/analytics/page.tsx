"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DailyActivityChart } from "./_components/DailyActivityChart";
import { KpiGrid } from "./_components/KpiGrid";
import { RangeSelector } from "./_components/RangeSelector";
import { TopRestaurants } from "./_components/TopRestaurants";
import { useAdminAnalytics } from "./_lib/useAdminAnalytics";

/**
 * AdminAnalyticsPage — platform-wide analytics dashboard (KPIs, daily activity
 * chart, top restaurants) with a 7/30/90-day range selector.
 */
export default function AdminAnalyticsPage() {
  const [range, setRange] = useState(30);
  const { loading, totals, byDay, topRestaurants, maxDay, maxTop } =
    useAdminAnalytics(range);

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-4xl font-bold">
            <span className="text-gold-gradient">סטטיסטיקות גלובליות</span>
          </h1>
          <p className="text-muted-foreground mt-2">נתוני הפעילות בכל הפלטפורמה</p>
        </div>
        <RangeSelector range={range} onChange={setRange} />
      </div>

      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="shadow-premium">
                <CardContent className="p-4">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <Skeleton className="h-7 w-16 mt-3" />
                  <Skeleton className="h-3 w-20 mt-1.5" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="shadow-premium">
            <CardContent className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-40 w-full" />
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <KpiGrid totals={totals} />
          <DailyActivityChart byDay={byDay} maxDay={maxDay} />
          <TopRestaurants topRestaurants={topRestaurants} maxTop={maxTop} />
        </>
      )}
    </div>
  );
}
