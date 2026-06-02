"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Eye, FolderTree, QrCode, Scan } from "lucide-react";
import type { Deltas, Stats } from "../_lib/types";

const STAT_ICON_STYLE: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: 7,
  background: "hsl(28 62% 42% / .10)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "hsl(var(--accent-bright))",
  flexShrink: 0,
};

interface StatItem {
  icon: ReactNode;
  label: string;
  value: number;
  delta: string | null;
  href: string;
}

function buildStats(stats: Stats, deltas: Deltas): StatItem[] {
  return [
    {
      icon: <Scan style={{ width: 14, height: 14 }} strokeWidth={1.8} />,
      label: "מנות",
      value: stats.dishes,
      delta:
        deltas.dishesThisWeek > 0 ? `+${deltas.dishesThisWeek} השבוע` : null,
      href: "/dashboard/dishes",
    },
    {
      icon: <FolderTree style={{ width: 14, height: 14 }} strokeWidth={1.8} />,
      label: "קטגוריות",
      value: stats.categories,
      delta: null,
      href: "/dashboard/categories",
    },
    {
      icon: <Eye style={{ width: 14, height: 14 }} strokeWidth={1.8} />,
      label: "צפיות 30י׳",
      value: stats.views,
      delta:
        deltas.viewsDelta !== null
          ? `${deltas.viewsDelta >= 0 ? "+" : ""}${deltas.viewsDelta}% vs שבוע קודם`
          : null,
      href: "/dashboard/analytics",
    },
    {
      icon: <QrCode style={{ width: 14, height: 14 }} strokeWidth={1.8} />,
      label: "סריקות QR",
      value: stats.scans,
      delta:
        deltas.scansDelta !== null
          ? `${deltas.scansDelta >= 0 ? "+" : ""}${deltas.scansDelta}% vs שבוע קודם`
          : null,
      href: "/dashboard/analytics",
    },
  ];
}

function StatCard({ s }: { s: StatItem }) {
  return (
    <Link href={s.href}>
      <div
        className="group cursor-pointer"
        style={{
          background: "hsl(var(--deep))",
          padding: "22px 24px",
          position: "relative",
          transition: "background .15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.background =
            "hsl(var(--void))";
          const bar = e.currentTarget.querySelector<HTMLDivElement>(
            "[data-accent-bar]"
          );
          if (bar) bar.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.background =
            "hsl(var(--deep))";
          const bar = e.currentTarget.querySelector<HTMLDivElement>(
            "[data-accent-bar]"
          );
          if (bar) bar.style.opacity = "0";
        }}
      >
        <div
          data-accent-bar
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "var(--grad-bronze)",
            opacity: 0,
            transition: "opacity .25s",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span
            className="font-sans uppercase"
            style={{
              fontSize: "11px",
              letterSpacing: ".05em",
              fontWeight: 600,
              color: "hsl(var(--subtle))",
            }}
          >
            {s.label}
          </span>
          <div style={STAT_ICON_STYLE}>{s.icon}</div>
        </div>
        <div
          className="font-sans"
          style={{
            fontSize: 36,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-.03em",
            color: "hsl(var(--fog))",
          }}
        >
          {s.value.toLocaleString()}
        </div>
        {s.delta && (
          <div
            className="font-mono"
            style={{
              fontSize: 12,
              color: "hsl(var(--accent-bright))",
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            ↑ {s.delta}
          </div>
        )}
      </div>
    </Link>
  );
}

interface Props {
  stats: Stats;
  deltas: Deltas;
}

/**
 * StatGrid — grille 4 cartes stats (dishes, categories, views, scans).
 */
export function StatGrid({ stats, deltas }: Props) {
  const items = buildStats(stats, deltas);
  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-px"
      style={{
        background: "hsl(var(--line))",
        border: "1px solid hsl(var(--line))",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}
    >
      {items.map((s) => (
        <StatCard key={s.href} s={s} />
      ))}
    </div>
  );
}
