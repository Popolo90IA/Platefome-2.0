import Link from "next/link";
import { Shield, Home, Building2, Users, BarChart3, ArrowLeft } from "lucide-react";
import { AdminNavLink } from "@/components/admin/AdminNavLink";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-charcoal-gradient text-white">
        <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gold-gradient flex items-center justify-center shadow-gold-glow">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-serif-display text-lg font-bold">
                <span className="text-gold-gradient">פאנל מנהל מערכת</span>
              </div>
              <div className="text-xs text-white/60">Super Admin</div>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            חזרה ללוח הבקרה
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0 hidden md:block">
          <nav className="space-y-1 sticky top-24">
            <AdminNavLink href="/admin" icon={<Home className="h-4 w-4" />} label="סקירה" exact />
            <AdminNavLink
              href="/admin/restaurants"
              icon={<Building2 className="h-4 w-4" />}
              label="מסעדות"
            />
            <AdminNavLink
              href="/admin/users"
              icon={<Users className="h-4 w-4" />}
              label="משתמשים"
            />
            <AdminNavLink
              href="/admin/analytics"
              icon={<BarChart3 className="h-4 w-4" />}
              label="סטטיסטיקות גלובליות"
            />
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
