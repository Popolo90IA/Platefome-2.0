"use client";

import { LogOut } from "lucide-react";

/* ── LogoutButton — sign-out action at sidebar bottom ── */
export function LogoutButton({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="px-2 py-4" style={{ borderTop: "1px solid hsl(var(--line))" }}>
      <button
        onClick={onLogout}
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
  );
}
