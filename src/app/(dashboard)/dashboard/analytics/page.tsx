"use client";

import { AnalyticsEmptyState } from "./_components/AnalyticsEmptyState";
import { AnalyticsHeader } from "./_components/AnalyticsHeader";
import { AnalyticsLoading } from "./_components/AnalyticsLoading";
import { DonutCard } from "./_components/DonutCard";
import { HeatmapCard } from "./_components/HeatmapCard";
import { InsightCard } from "./_components/InsightCard";
import { LanguagesCard } from "./_components/LanguagesCard";
import { LineChartCard } from "./_components/LineChartCard";
import { TopDishesCard } from "./_components/TopDishesCard";
import { useAnalytics } from "./_lib/hooks/useAnalytics";

/**
 * AnalyticsPage — orchestrateur : useAnalytics + composition des cartes.
 */
export default function AnalyticsPage() {
  const {
    loading,
    restaurant,
    range,
    setRange,
    totals,
    buckets,
    chart,
    heatmap,
    heatMax,
    segments,
    segmentEls,
    topDishes,
    langRows,
    deltaPct,
    dishesMissing3d,
    eventsCount,
    exportCsv,
  } = useAnalytics();

  if (loading) return <AnalyticsLoading />;
  if (!restaurant) return <AnalyticsEmptyState />;

  return (
    <div dir="rtl" style={{ color: "hsl(var(--fog))" }}>
      <AnalyticsHeader
        range={range}
        onRangeChange={setRange}
        onExport={exportCsv}
        exportDisabled={eventsCount === 0}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <LineChartCard
          totalScans={totals.scans}
          totalViews={totals.views}
          buckets={buckets}
          chart={chart}
          deltaPct={deltaPct}
          range={range}
        />
        <DonutCard
          totalEngaged={totals.engaged}
          totalViews={totals.views}
          total3d={totals.d3}
          segments={segments}
          segmentEls={segmentEls}
        />
      </div>

      <HeatmapCard heatmap={heatmap} heatMax={heatMax} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
        }}
      >
        <TopDishesCard topDishes={topDishes} />
        <LanguagesCard langRows={langRows} />
        <InsightCard dishesMissing3d={dishesMissing3d} />
      </div>
    </div>
  );
}
