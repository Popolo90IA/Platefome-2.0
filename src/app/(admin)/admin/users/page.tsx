"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Search, User, Building2, Crown, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import type { AdminUser } from "@/types/database.types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const supabase = createClient();

  const loadData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_users_view")
      .select("*")
      .order("signed_up_at", { ascending: false });

    if (error) {
      console.error(error);
      setUsers([]);
    } else {
      setUsers(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        (u.email && u.email.toLowerCase().includes(q)) ||
        (u.restaurant_name && u.restaurant_name.toLowerCase().includes(q))
    );
  }, [users, search]);

  const setRole = async (
    userId: string,
    newRole: "super_admin" | "restaurant_owner"
  ) => {
    setBusy(userId);
    const { error } = await supabase.rpc("admin_set_user_role", {
      target_user_id: userId,
      new_role: newRole,
    });
    setBusy(null);
    if (error) {
      alert("שגיאה: " + error.message);
      return;
    }
    setUsers((prev) =>
      prev.map((u) => (u.user_id === userId ? { ...u, role: newRole } : u))
    );
  };

  const adminCount = users.filter((u) => u.role === "super_admin").length;
  const ownerCount = users.length - adminCount;

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="font-serif-display text-4xl font-bold">
          <span className="text-gold-gradient">משתמשים</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          {users.length} משתמשים · {adminCount} מנהלים · {ownerCount} בעלי מסעדה
        </p>
      </div>

      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="חפש לפי אימייל או שם מסעדה..."
          className="pr-10"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="shadow-premium">
          <CardContent className="py-16 text-center">
            <User className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">
              {search ? "לא נמצאו תוצאות" : "אין משתמשים"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-2">
          {filtered.map((u) => (
            <Card key={u.user_id} className="shadow-premium">
              <CardContent className="p-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="h-12 w-12 rounded-full bg-charcoal-gradient text-white flex items-center justify-center font-serif-display text-lg font-bold flex-shrink-0">
                    {(u.email ?? "?").charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium truncate" dir="ltr">
                        {u.email ?? "—"}
                      </span>
                      {u.role === "super_admin" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-[hsl(var(--gold-dark))] bg-[hsl(var(--gold))]/10 px-2 py-0.5 rounded-full border border-[hsl(var(--gold))]/20">
                          <Crown className="h-3 w-3" />
                          Super Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                          <User className="h-3 w-3" />
                          בעל מסעדה
                        </span>
                      )}
                    </div>
                    {u.restaurant_name ? (
                      <Link
                        href={`/admin/restaurants/${u.restaurant_id}`}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-1"
                      >
                        <Building2 className="h-3 w-3" />
                        {u.restaurant_name}
                      </Link>
                    ) : (
                      <span className="text-xs text-muted-foreground/60 mt-1 block">
                        אין מסעדה
                      </span>
                    )}
                    <div className="text-[11px] text-muted-foreground/70 mt-0.5">
                      נרשם {new Date(u.signed_up_at).toLocaleDateString("he-IL")}
                      {u.last_sign_in_at && (
                        <>
                          {" · "}
                          התחבר לאחרונה{" "}
                          {new Date(u.last_sign_in_at).toLocaleDateString("he-IL")}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {u.role === "super_admin" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRole(u.user_id, "restaurant_owner")}
                        disabled={busy === u.user_id}
                        className="text-amber-600 hover:bg-amber-500/10"
                      >
                        <ArrowDownCircle className="h-4 w-4" />
                        הורד הרשאות
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRole(u.user_id, "super_admin")}
                        disabled={busy === u.user_id}
                        className="text-[hsl(var(--gold-dark))] hover:bg-[hsl(var(--gold))]/10"
                      >
                        <ArrowUpCircle className="h-4 w-4" />
                        קדם למנהל
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="border-[hsl(var(--gold))]/30 bg-gradient-to-br from-[hsl(var(--gold))]/5 to-transparent shadow-premium">
        <CardContent className="p-4 flex items-start gap-3">
          <Shield className="h-5 w-5 text-[hsl(var(--gold-dark))] flex-shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <strong className="text-foreground">שים לב:</strong> קידום משתמש ל-Super
            Admin נותן לו גישה מלאה לפלטפורמה - הוא יוכל לראות, לערוך ולמחוק כל
            מסעדה. השתמש בזהירות.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
