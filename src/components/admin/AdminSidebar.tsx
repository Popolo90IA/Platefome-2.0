"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  Home,
  Building2,
  Users,
  BarChart3,
  Sparkles,
  Settings,
  LogOut,
  ArrowRight,
} from "lucide-react";
import { LogoWordmark } from "@/components/brand";

const navItems = [
  { href: "/admin", label: "סקירה", icon: Home, exact: true },
  { href: "/admin/restaurants", label: "מסעדות", icon: Building2, exact: false },
  { href: "/admin/users", label: "משתמשים", icon: Users, exact: false },
  { href: "/admin/analytics", label: "סטטיסטיקות", icon: BarChart3, exact: false },
  { href: "/admin/plans", label: "תוכניות", icon: Sparkles, exact: false },
  { href: "/admin/settings", label: "הגדרות", icon: Settings, exact: false },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside
      className="w-56 h-screen sticky top-0 flex flex-col overflow-hidden scrollbar-none"
      style={{
        background: "hsl(var(--deep))",
        borderLeft: "1px solid hsl(var(--line))",
      }}
    >
      {/* Logo + Admin badge */}
      <div
        className="px-5 pt-6 pb-5"
        style={{ borderBottom: "1px solid hsl(var(--line))" }}
      >
        <Link href="/admin" className="block">
          <LogoWordmark width={120} />
        </Link>
        <div
          className="mt-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] tracking-[0.08em] uppercase"
          style={{
            background: "hsl(var(--accent-bright) / .12)",
            border: "1px solid hsl(var(--accent-bright) / .25)",
            color: "hsl(var(--accent-bright))",
          }}
        >
          Super Admin
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto scrollbar-none">
        <div
          className="px-3 mb-2 font-mono text-[11px] tracking-[0.12em] uppercase"
          style={{ color: "hsl(var(--dim))", paddingTop: 4 }}
        >
          ניהול
        </div>

        <div className="space-y-px">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
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
                    style={{ width: 3, height: 16, background: "hsl(var(--accent-bright))", borderRadius: 2, marginRight: -3 }}
                  />
                )}

                <Icon
                  style={{
                    width: 16, height: 16, flexShrink: 0,
                    color: isActive ? "hsl(var(--accent-bright))" : "hsl(var(--dim))",
                    transition: "color .15s",
                  }}
                  strokeWidth={1.6}
                />

                <span className="font-sans text-[13.5px] font-medium flex-1">
                  {item.label}
                </span>

                {!isActive && (
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                    style={{ background: "hsl(28 62% 42% / .06)" }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Back to dashboard */}
        <div
          className="px-3 mt-6 mb-2 font-mono text-[11px] tracking-[0.12em] uppercase"
          style={{ color: "hsl(var(--dim))" }}
        >
          ניווט
        </div>
        <Link
          href="/dashboard"
          className="group flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 relative"
          style={{ color: "hsl(var(--subtle))" }}
        >
          <ArrowRight
            style={{ width: 16, height: 16, flexShrink: 0, color: "hsl(var(--dim))", transition: "color .15s" }}
            strokeWidth={1.6}
          />
          <span className="font-sans text-[13.5px] font-medium flex-1">
            לוח בקרה
          </span>
          <div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
            style={{ background: "hsl(28 62% 42% / .06)" }}
          />
        </Link>
      </nav>

      {/* Logout */}
      <div
        className="px-2 py-4"
        style={{ borderTop: "1px solid hsl(var(--line))" }}
      >
        <button
          onClick={handleLogout}
          className="group w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-all duration-150 relative"
          style={{ color: "hsl(var(--dim))" }}
        >
          <LogOut
            className="h-[15px] w-[15px] flex-shrink-0 group-hover:text-[hsl(var(--ember))] transition-colors"
            strokeWidth={1.5}
          />
          <span className="font-sans text-[13px] group-hover:text-[hsl(var(--ember))] transition-colors">
            התנתקות
          </span>
          <div
            className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
            style={{ background: "hsl(var(--ember) / 0.06)" }}
          />
        </button>
      </div>
    </aside>
  );
}
