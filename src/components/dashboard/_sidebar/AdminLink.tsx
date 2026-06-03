import Link from "next/link";
import { Shield } from "lucide-react";

/* ── AdminLink — super-admin-only panel entry ── */
export function AdminLink() {
  return (
    <>
      <div
        className="px-3 mt-6 mb-3 font-sans text-[11px] tracking-[0.05em] uppercase font-semibold"
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
  );
}
