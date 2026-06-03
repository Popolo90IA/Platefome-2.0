"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavItem } from "../_lib/navItems";

/* ── NavLink — single nav row with active accent + hover bg ── */
export function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 relative",
        isActive ? "" : "hover:text-[hsl(var(--fog))]"
      )}
      style={{
        color: isActive ? "hsl(var(--accent-bright))" : "hsl(var(--subtle))",
        background: isActive ? "hsl(28 62% 42% / .10)" : "transparent",
      }}
    >
      {isActive && (
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2"
          style={{
            width: 3,
            height: 16,
            background: "hsl(var(--accent-bright))",
            borderRadius: 2,
            marginRight: -3,
          }}
        />
      )}

      <Icon
        style={{
          width: 16,
          height: 16,
          flexShrink: 0,
          color: isActive ? "hsl(var(--accent-bright))" : "hsl(var(--dim))",
          transition: "color .15s",
        }}
        strokeWidth={1.6}
      />

      <span className="font-sans text-[13.5px] font-medium flex-1">{item.label}</span>

      {!isActive && (
        <div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
          style={{ background: "hsl(28 62% 42% / .06)" }}
        />
      )}
    </Link>
  );
}
