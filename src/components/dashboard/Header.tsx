"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Eye, ChevronDown } from "lucide-react";

export function Header() {
  const { user } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const supabase = createClient();

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

  if (!user) return null;

  const initial = user.email?.charAt(0).toUpperCase() ?? "?";

  return (
    <header
      className="sticky top-0 z-40 px-8 flex items-center justify-between h-14 transition-all duration-200"
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
      {/* Left — breadcrumb / page preview */}
      <div className="flex items-center gap-4">
        {slug && (
          <Link
            href={`/menu/${slug}`}
            target="_blank"
            className="group flex items-center gap-1.5 text-[13px] transition-colors duration-150"
            style={{ color: "hsl(var(--subtle))" }}
          >
            <Eye
              className="h-3.5 w-3.5 group-hover:text-[hsl(var(--fog))] transition-colors"
              strokeWidth={1.5}
            />
            <span className="group-hover:text-[hsl(var(--fog))] transition-colors">
              תצוגת לקוח
            </span>
          </Link>
        )}
      </div>

      {/* Right — user */}
      <div className="flex items-center gap-5">
        {/* Role pill */}
        {role && (
          <span
            className="hidden sm:block font-mono text-[10px] tracking-[0.15em] uppercase"
            style={{ color: "hsl(var(--dim))" }}
          >
            {role === "super_admin" ? "Admin" : "Owner"}
          </span>
        )}

        {/* Separator */}
        <div
          className="hidden sm:block h-4 w-px"
          style={{ background: "hsl(var(--line))" }}
        />

        {/* User chip */}
        <button
          className="group flex items-center gap-2.5 transition-opacity duration-150 hover:opacity-80"
        >
          {/* Avatar */}
          <div
            className="h-7 w-7 rounded-sm flex items-center justify-center text-[11px] font-medium flex-shrink-0"
            style={{
              background: "hsl(var(--surface))",
              border: "1px solid hsl(var(--line))",
              color: "hsl(var(--fog))",
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
            className="h-3 w-3 hidden md:block"
            style={{ color: "hsl(var(--dim))" }}
            strokeWidth={1.5}
          />
        </button>
      </div>
    </header>
  );
}
