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
import { LogoWordmark } from "@/components/brand";

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
        background: "hsl(var(--deep))",
        borderLeft: "1px solid hsl(var(--line))",
      }}
    >
      {/* Wordmark */}
      <div
        className="px-5 pt-6 pb-5"
        style={{ borderBottom: "1px solid hsl(var(--line))" }}
      >
        <Link href="/dashboard" className="block group">
          <LogoWordmark width={120} />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto scrollbar-none">
        {/* Section label */}
        <div
          className="px-3 mb-2 font-mono text-[9.5px] tracking-[0.22em] uppercase"
          style={{ color: "hsl(var(--dim))", paddingTop: 4 }}
        >
          תפריט
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
                  "group flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 relative",
                  isActive
                    ? ""
                    : "hover:text-[hsl(var(--fog))]"
                )}
                style={{
                  color: isActive ? "hsl(var(--accent-bright))" : "hsl(var(--subtle))",
                  background: isActive ? "hsl(28 62% 42% / .10)" : "transparent",
                }}
              >
                {/* Active left accent indicator */}
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

                {/* Hover state bg */}
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
