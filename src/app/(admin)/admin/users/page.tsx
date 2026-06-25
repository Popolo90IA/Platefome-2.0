"use client";

import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminUsers } from "./_lib/useAdminUsers";
import { SearchBar } from "./_components/SearchBar";
import { UserCard } from "./_components/UserCard";
import { AdminWarning } from "./_components/AdminWarning";

export default function AdminUsersPage() {
  const {
    users,
    filtered,
    loading,
    search,
    setSearch,
    busy,
    setRole,
    adminCount,
    ownerCount,
  } = useAdminUsers();

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

      <SearchBar value={search} onChange={setSearch} />

      {loading ? (
        <div className="grid gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="shadow-premium">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-8 w-28 rounded-md hidden sm:block flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="shadow-premium">
          <CardContent className="py-16 text-center">
            <User className="h-12 w-12 text-muted-foreground/70 mx-auto mb-3" />
            <p className="text-muted-foreground">
              {search ? "לא נמצאו תוצאות" : "אין משתמשים"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-2">
          {filtered.map((u) => (
            <UserCard
              key={u.user_id}
              user={u}
              busy={busy === u.user_id}
              onSetRole={setRole}
            />
          ))}
        </div>
      )}

      <AdminWarning />
    </div>
  );
}
