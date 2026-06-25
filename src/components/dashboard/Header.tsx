"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ChevronDown, Menu, ExternalLink, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const [roleRes, restoRes] = await Promise.all([
        supabase.from("user_roles").select("role").eq("user_id", user.id).single(),
        supabase.from("restaurants").select("slug").eq("user_id", user.id).maybeSingle(),
      ]);
      setRole(roleRes.data?.role ?? null);
      setSlug(restoRes.data?.slug ?? null);
    };
    fetchData();
  }, [user, supabase]);

  useEffect(() => {
    const el = document.querySelector("main");
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 12);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Fermeture du menu user : clic en dehors + touche Échap.
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  if (!user) return null;

  const initial = user.email?.charAt(0).toUpperCase() ?? "?";
  const roleLabel = role === "super_admin" ? "Admin" : role ? "Owner" : null;

  const handleLogout = async () => {
    setMenuOpen(false);
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header
      className="dash-header sticky top-0 z-40 px-8 flex items-center justify-between h-14 transition-all duration-200"
      style={{
        background: scrolled
          ? "hsl(var(--void) / 0.96)"
          : "hsl(var(--void) / 0.0)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid hsl(var(--line))"
          : "1px solid transparent",
      }}
    >
      {/* Left — hamburger (mobile) */}
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          className="dash-hamburger"
          onClick={onMenuToggle}
          aria-label="פתח תפריט"
        >
          <Menu style={{ width: 18, height: 18 }} strokeWidth={1.6} />
        </button>
      </div>

      {/* Right — user */}
      <div className="flex items-center gap-5">
        {/* Theme toggle */}
        <ThemeToggle />

        {/* Role pill */}
        {roleLabel && (
          <span
            className="hidden sm:block font-sans text-[11px] tracking-[0.06em] uppercase font-semibold"
            style={{ color: "hsl(var(--subtle))" }}
          >
            {roleLabel}
          </span>
        )}

        {/* Separator */}
        <div
          className="hidden sm:block h-4 w-px"
          style={{ background: "hsl(var(--line))" }}
        />

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label="תפריט משתמש"
            className="group flex items-center gap-2.5 rounded-full transition-opacity duration-150 hover:opacity-80"
          >
            {/* Avatar */}
            <div
              className="h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0 text-white"
              style={{
                background: "var(--grad-bronze)",
                boxShadow: "0 2px 8px hsl(28 62% 38% / .3)",
              }}
            >
              {initial}
            </div>

            {/* Email */}
            <span
              className="hidden md:block font-sans text-[12px]"
              style={{ color: "hsl(var(--subtle))" }}
              dir="ltr"
            >
              {user.email}
            </span>

            <ChevronDown
              className="h-3 w-3 transition-transform duration-200"
              style={{
                color: "hsl(var(--subtle))",
                transform: menuOpen ? "rotate(180deg)" : "none",
              }}
              strokeWidth={1.5}
            />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div
              role="menu"
              aria-label="תפריט משתמש"
              className="absolute top-full mt-2 w-60 rounded-xl overflow-hidden z-50 animate-fade-up"
              style={{
                insetInlineEnd: 0,
                background: "hsl(var(--deep))",
                border: "1px solid hsl(var(--line))",
                boxShadow: "0 16px 48px rgba(0,0,0,.5)",
              }}
            >
              {/* Identity */}
              <div
                className="px-3.5 py-3"
                style={{ borderBottom: "1px solid hsl(var(--line))" }}
              >
                <div
                  className="font-sans text-[12.5px] truncate"
                  dir="ltr"
                  style={{ color: "hsl(var(--fog))" }}
                >
                  {user.email}
                </div>
                {roleLabel && (
                  <div
                    className="font-sans text-[11px] tracking-[0.04em] uppercase mt-0.5"
                    style={{ color: "hsl(var(--subtle))" }}
                  >
                    {roleLabel}
                  </div>
                )}
              </div>

              {/* Items */}
              <div className="p-1.5">
                {slug && (
                  <Link
                    href={`/menu/${slug}`}
                    target="_blank"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-colors hover:bg-[hsl(var(--accent-bright))]/10 hover:text-[hsl(var(--fog))]"
                    style={{ color: "hsl(var(--subtle))" }}
                  >
                    <ExternalLink className="h-4 w-4 flex-shrink-0" strokeWidth={1.6} />
                    תצוגת לקוח
                  </Link>
                )}
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-colors hover:bg-[hsl(var(--ember))]/10"
                  style={{ color: "hsl(var(--ember))" }}
                >
                  <LogOut className="h-4 w-4 flex-shrink-0" strokeWidth={1.6} />
                  התנתקות
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
