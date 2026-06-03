"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AdminUser } from "@/types/database.types";

type Role = "super_admin" | "restaurant_owner";

/**
 * Owns the admin users list: load from `admin_users_view`, search filter,
 * and role mutation via `admin_set_user_role` RPC with optimistic update.
 */
export function useAdminUsers() {
  const supabase = createClient();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

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

  const setRole = async (userId: string, newRole: Role) => {
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

  return {
    users,
    filtered,
    loading,
    search,
    setSearch,
    busy,
    setRole,
    adminCount,
    ownerCount,
  };
}
