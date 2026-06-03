"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoWordmark } from "@/components/brand";
import { navItems } from "./_lib/navItems";
import { useSidebar } from "./_lib/useSidebar";
import { NavLink } from "./_sidebar/NavLink";
import { AdminLink } from "./_sidebar/AdminLink";
import { LogoutButton } from "./_sidebar/LogoutButton";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { pathname, isAdmin, handleLogout } = useSidebar(onClose);

  return (
    <>
      {/* Mobile overlay backdrop */}
      {open && <div className="dash-sidebar-overlay open" onClick={onClose} />}

      <aside
        className={cn(
          "dash-sidebar w-56 h-screen sticky top-0 flex flex-col overflow-hidden scrollbar-none",
          open && "open"
        )}
        style={{
          background: "hsl(var(--deep))",
          borderLeft: "1px solid hsl(var(--line))",
        }}
      >
        {/* Wordmark */}
        <div className="px-5 pt-6 pb-5" style={{ borderBottom: "1px solid hsl(var(--line))" }}>
          <Link href="/dashboard" className="logo-hover">
            <LogoWordmark width={120} />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto scrollbar-none">
          <div
            className="px-3 mb-2 font-sans text-[11px] tracking-[0.05em] uppercase font-semibold"
            style={{ color: "hsl(var(--dim))", paddingTop: 4 }}
          >
            תפריט
          </div>

          <div className="space-y-px">
            {navItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return <NavLink key={item.href} item={item} isActive={isActive} />;
            })}
          </div>

          {isAdmin && <AdminLink />}
        </nav>

        <LogoutButton onLogout={handleLogout} />
      </aside>
    </>
  );
}
