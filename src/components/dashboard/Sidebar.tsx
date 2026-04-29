"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Utensils,
  FolderTree,
  QrCode,
  Settings,
  LogOut,
  BarChart3,
  Shield,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "בית", labelEn: "Home", icon: LayoutDashboard },
  { href: "/dashboard/dishes", label: "מנות", labelEn: "Dishes", icon: Utensils },
  { href: "/dashboard/categories", label: "קטגוריות", labelEn: "Categories", icon: FolderTree },
  { href: "/dashboard/analytics", label: "סטטיסטיקות", labelEn: "Analytics", icon: BarChart3 },
  { href: "/dashboard/qrcode", label: "QR קוד", labelEn: "QR Code", icon: QrCode },
  { href: "/dashboard/settings", label: "הגדרות", labelEn: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();
      setIsAdmin(data?.role === "super_admin");
    };
    checkRole();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside
      className="w-56 h-screen sticky top-0 flex flex-col overflow-hidden scrollbar-none"
      style={{
        background: "hsl(var(--abyss))",
        borderLeft: "1px solid hsl(var(--line))",
      }}
    >
      {/* Wordmark */}
      <div
        className="px-6 pt-8 pb-6"
        style={{ borderBottom: "1px solid hsl(var(--line))" }}
      >
        <Link href="/dashboard" className="block group">
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 28, height: 28, background: "linear-gradient(135deg,hsl(36,28%,92%,.12),hsl(36,28%,92%,.04))", border: "1px solid hsl(36,28%,92%,.3)", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="hsl(36,28%,92%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 19h20"/>
                <path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z"/>
                <path d="M9 19v-2a3 3 0 0 1 6 0v2"/>
              </svg>
            </div>
            <div>
              <div
                className="font-mono text-[11px] tracking-[0.2em] uppercase leading-none"
                style={{ color: "hsl(var(--cream))", fontWeight: 500 }}
              >
                PLATFORME
              </div>
              <div
                className="font-mono text-[8px] tracking-[0.18em] uppercase mt-1"
                style={{ color: "hsl(var(--subtle))" }}
              >
                Restaurant OS
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto scrollbar-none">
        {/* Section label */}
        <div
          className="px-3 mb-3 font-mono text-[9px] tracking-[0.2em] uppercase"
          style={{ color: "hsl(var(--dim))" }}
        >
          ניהול
        </div>

        <div className="space-y-px">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-all duration-150 relative",
                  isActive
                    ? "text-[hsl(var(--cream))]"
                    : "text-[hsl(var(--subtle))] hover:text-[hsl(var(--fog))]"
                )}
                style={{
                  background: isActive ? "hsl(var(--surface))" : "transparent",
                }}
              >
                {/* Active left border */}
                {isActive && (
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4"
                    style={{ background: "hsl(var(--cream))" }}
                  />
                )}

                <Icon
                  className={cn(
                    "h-[15px] w-[15px] flex-shrink-0 transition-colors duration-150",
                    isActive
                      ? "text-[hsl(var(--cream))]"
                      : "text-[hsl(var(--dim))] group-hover:text-[hsl(var(--fog))]"
                  )}
                  strokeWidth={isActive ? 1.75 : 1.5}
                />

                <span className="font-sans text-[13px] font-normal flex-1">
                  {item.label}
                </span>

                {/* Hover state bg */}
                {!isActive && (
                  <div
                    className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                    style={{ background: "hsl(var(--deep))" }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Admin section */}
        {isAdmin && (
          <>
            <div
              className="px-3 mt-6 mb-3 font-mono text-[9px] tracking-[0.2em] uppercase"
              style={{ color: "hsl(var(--dim))" }}
            >
              Admin
            </div>
            <Link
              href="/admin"
              className="group flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-all duration-150 relative"
              style={{ color: "hsl(var(--subtle))" }}
            >
              <Shield
                className="h-[15px] w-[15px] flex-shrink-0 text-[hsl(var(--dim))] group-hover:text-[hsl(var(--fog))] transition-colors"
                strokeWidth={1.5}
              />
              <span className="font-sans text-[13px]">פאנל מנהל</span>
              <div
                className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                style={{ background: "hsl(var(--deep))" }}
              />
            </Link>
          </>
        )}
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
