"use client";

import Link from "next/link";
import {
  User,
  Building2,
  Crown,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AdminUser } from "@/types/database.types";

type Role = "super_admin" | "restaurant_owner";

/* ── UserCard — single admin user row: identity, role badge, role toggle ── */
export function UserCard({
  user: u,
  busy,
  onSetRole,
}: {
  user: AdminUser;
  busy: boolean;
  onSetRole: (userId: string, role: Role) => void;
}) {
  return (
    <Card className="shadow-premium">
      <CardContent className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div
            className="h-12 w-12 rounded-full text-white flex items-center justify-center font-serif-display text-lg font-bold flex-shrink-0"
            style={{ background: "var(--grad-bronze)" }}
          >
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
                onClick={() => onSetRole(u.user_id, "restaurant_owner")}
                disabled={busy}
                className="text-[hsl(var(--ember))] hover:bg-[hsl(var(--ember))]/10"
              >
                <ArrowDownCircle className="h-4 w-4" />
                הורד הרשאות
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSetRole(u.user_id, "super_admin")}
                disabled={busy}
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
  );
}
