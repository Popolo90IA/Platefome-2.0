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
  UtensilsCrossed,
  BarChart3,
  Shield,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "בית", icon: LayoutDashboard },
  { href: "/dashboard/dishes", label: "מנות", icon: Utensils },
  { href: "/dashboard/categories", label: "קטגוריות", icon: FolderTree },
  { href: "/dashboard/analytics", label: "סטטיסטיקות", icon: BarChart3 },
  { href: "/dashboard/qrcode", label: "QR קוד", icon: QrCode },
  { href: "/dashboard/settings", label: "הגדרות", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
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
    <aside className="w-64 bg-card border-l border-border/60 h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border/60">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="relative h-9 w-9 rounded-lg bg-gold-gradient flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="h-5 w-5 text-white" />
          </div>
          <span className="font-serif-display font-bold text-lg">
            פלטפורמה
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-gold-gradient text-white shadow-gold-glow"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "drop-shadow")} />
              <span>{item.label}</span>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 bg-white/60 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border/60 space-y-1">
        {isAdmin && (
          <Link
            href="/admin"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-[hsl(var(--gold-dark))] bg-[hsl(var(--gold))]/5 hover:bg-[hsl(var(--gold))]/15 transition-colors border border-[hsl(var(--gold))]/20"
          >
            <Shield className="h-5 w-5" />
            פאנל מנהל
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-5 w-5" />
          התנתקות
        </button>
      </div>
    </aside>
  );
}
