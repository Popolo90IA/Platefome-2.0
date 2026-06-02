"use client";

import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import type { ChecklistItem } from "../_lib/types";

interface Props {
  items: ChecklistItem[];
}

/**
 * ChecklistCard — carte étapes onboarding + barre progression.
 */
export function ChecklistCard({ items }: Props) {
  const doneCount = items.filter((i) => i.done).length;

  return (
    <div
      style={{
        background: "hsl(var(--deep))",
        border: "1px solid hsl(var(--line))",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "18px 24px",
          borderBottom: "1px solid hsl(var(--line))",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3
            className="font-display"
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "hsl(var(--fog))",
              margin: 0,
            }}
          >
            הצעדים הראשונים
          </h3>
          <span
            className="font-mono"
            style={{ fontSize: 12, color: "hsl(var(--dim))" }}
          >
            {doneCount}/{items.length}
          </span>
        </div>
        <div
          style={{
            marginTop: 12,
            height: 2,
            background: "hsl(var(--line))",
            borderRadius: 2,
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 2,
              width: `${(doneCount / items.length) * 100}%`,
              background: "var(--grad-bronze)",
              transition: "width .7s var(--ease-out)",
            }}
          />
        </div>
      </div>

      <div style={{ paddingTop: 4, paddingBottom: 4 }}>
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className="group flex items-center gap-3"
              style={{
                padding: "12px 24px",
                cursor: "pointer",
                transition: "background .1s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background =
                  "hsl(28 62% 42% / .04)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background =
                  "transparent")
              }
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: item.done ? "var(--grad-bronze)" : "transparent",
                  border: item.done
                    ? "none"
                    : "1.5px solid hsl(var(--line))",
                  color: "#fff",
                }}
              >
                {item.done && (
                  <Check style={{ width: 12, height: 12 }} strokeWidth={2.5} />
                )}
              </div>
              <span
                className="flex-1 font-sans"
                style={{
                  fontSize: 14,
                  color: item.done ? "hsl(var(--dim))" : "hsl(var(--fog))",
                  textDecoration: item.done ? "line-through" : "none",
                  textDecorationColor: "hsl(28 62% 42% / .4)",
                }}
              >
                {item.text}
              </span>
              <ChevronRight
                className="opacity-0 group-hover:opacity-40 transition-opacity"
                style={{
                  width: 14,
                  height: 14,
                  color: "hsl(var(--subtle))",
                }}
                strokeWidth={1.5}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
