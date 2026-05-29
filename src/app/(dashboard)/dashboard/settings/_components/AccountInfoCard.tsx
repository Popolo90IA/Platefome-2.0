"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Crown } from "lucide-react";
import { SectionIcon } from "./SectionIcon";

type Props = {
  userEmail: string;
  userCreatedAt: string;
};

/**
 * AccountInfoCard — email + date inscription + bannière upgrade Pro.
 */
export function AccountInfoCard({ userEmail, userCreatedAt }: Props) {
  return (
    <Card className="shadow-premium">
      <CardHeader>
        <CardTitle className="font-serif-display text-xl flex items-center gap-2.5">
          <SectionIcon>
            <User className="h-3.5 w-3.5" />
          </SectionIcon>
          חשבון
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4 py-3 border-b border-border/50">
          <div>
            <div className="text-sm font-medium">כתובת אימייל</div>
            <div className="text-xs text-muted-foreground mt-0.5" dir="ltr">
              {userEmail || "—"}
            </div>
          </div>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full text-white"
            style={{ background: "var(--grad-bronze)" }}
          >
            חינם
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 py-3 border-b border-border/50">
          <div>
            <div className="text-sm font-medium">חבר מאז</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {userCreatedAt || "—"}
            </div>
          </div>
        </div>

        {/* Plan upgrade banner */}
        <div
          className="rounded-xl p-4 flex items-center justify-between gap-3"
          style={{
            background: "hsl(var(--gold) / .08)",
            border: "1px solid hsl(var(--gold) / .2)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <Crown
              className="h-5 w-5 flex-shrink-0"
              style={{ color: "hsl(var(--gold))" }}
            />
            <div>
              <div className="text-sm font-semibold">שדרג ל-Pro</div>
              <div className="text-xs text-muted-foreground">
                תמונות 3D · אנליטיקס · QR מותאם
              </div>
            </div>
          </div>
          <Link href="/dashboard/billing">
            <Button
              size="sm"
              className="text-white text-xs hover:opacity-90 flex-shrink-0"
              style={{ background: "var(--grad-bronze)" }}
            >
              שדרג
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
