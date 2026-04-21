"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Eye, Shield } from "lucide-react";

export function Header() {
  const { user } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const [roleRes, restoRes] = await Promise.all([
        supabase.from("user_roles").select("role").eq("user_id", user.id).single(),
        supabase
          .from("restaurants")
          .select("slug")
          .eq("user_id", user.id)
          .maybeSingle(),
      ]);
      setRole(roleRes.data?.role ?? null);
      setSlug(restoRes.data?.slug ?? null);
    };
    fetchData();
  }, [user, supabase]);

  if (!user) return null;

  const initial = user.email?.charAt(0).toUpperCase() ?? "?";

  return (
    <header className="bg-card/80 backdrop-blur-xl border-b border-border/60 px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-40">
      {/* Client preview button */}
      {slug ? (
        <Link
          href={`/menu/${slug}`}
          target="_blank"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[hsl(var(--gold))]/10 hover:bg-[hsl(var(--gold))]/20 border border-[hsl(var(--gold))]/30 text-sm font-medium text-[hsl(var(--gold-dark))] transition-all"
        >
          <Eye className="h-4 w-4" />
          <span>תצוגת לקוח</span>
        </Link>
      ) : (
        <div />
      )}

      <div className="flex items-center gap-4">
        {role && (
          <span className="inline-flex items-center gap-1.5 text-xs bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold-dark))] px-3 py-1.5 rounded-full font-medium border border-[hsl(var(--gold))]/20">
            <Shield className="h-3 w-3" />
            {role === "super_admin" ? "מנהל מערכת" : "בעל מסעדה"}
          </span>
        )}
        <div className="flex items-center gap-3">
          <span className="text-sm text-foreground/80 hidden sm:inline" dir="ltr">
            {user.email}
          </span>
          <div className="h-9 w-9 rounded-full bg-gold-gradient text-white flex items-center justify-center font-semibold shadow-gold-glow">
            {initial}
          </div>
        </div>
      </div>
    </header>
  );
}
