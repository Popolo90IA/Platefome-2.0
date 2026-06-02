"use client";

import Link from "next/link";
import {
  BarChart3,
  FolderTree,
  Settings as SettingsIcon,
  Utensils,
} from "lucide-react";

const ACTIONS = [
  {
    href: "/dashboard/dishes",
    icon: Utensils,
    label: "מנות",
    sub: "נהל מנות",
  },
  {
    href: "/dashboard/categories",
    icon: FolderTree,
    label: "קטגוריות",
    sub: "ארגן קטגוריות",
  },
  {
    href: "/dashboard/analytics",
    icon: BarChart3,
    label: "סטטיסטיקות",
    sub: "צפה בנתונים",
  },
  {
    href: "/dashboard/settings",
    icon: SettingsIcon,
    label: "הגדרות",
    sub: "עדכן פרופיל",
  },
];

/**
 * QuickActions — bandeau bas avec 4 raccourcis (mnh/cat/stats/settings).
 */
export function QuickActions() {
  return (
    <div>
      <p
        className="font-sans uppercase"
        style={{
          fontSize: "11.5px",
          letterSpacing: ".06em",
          fontWeight: 600,
          color: "hsl(var(--dim))",
          marginBottom: 16,
        }}
      >
        פעולות מהירות
      </p>
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-px"
        style={{
          background: "hsl(var(--line))",
          border: "1px solid hsl(var(--line))",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
        }}
      >
        {ACTIONS.map((action) => (
          <Link key={action.href} href={action.href}>
            <div
              className="group cursor-pointer"
              style={{
                background: "hsl(var(--deep))",
                padding: "20px 24px",
                transition: "background .15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background =
                  "hsl(var(--void))")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background =
                  "hsl(var(--deep))")
              }
            >
              <action.icon
                style={{
                  width: 16,
                  height: 16,
                  marginBottom: 16,
                  color: "hsl(var(--dim))",
                  transition: "color .15s",
                }}
                className="group-hover:text-accent"
                strokeWidth={1.5}
              />
              <p
                className="font-sans"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "hsl(var(--fog))",
                  marginBottom: 2,
                }}
              >
                {action.label}
              </p>
              <p
                className="font-sans"
                style={{ fontSize: 11, color: "hsl(var(--dim))" }}
              >
                {action.sub}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
