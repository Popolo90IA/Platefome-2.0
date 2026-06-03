"use client";

import { useState } from "react";
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
        <div className="flex items-center justify-center py-24">
          <div className="h-8 w-8 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
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
