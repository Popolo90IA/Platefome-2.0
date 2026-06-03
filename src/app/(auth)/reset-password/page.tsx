"use client";

import { AuthShell } from "@/components/auth/AuthShell";
import { ResetForm } from "./_components/ResetForm";
import {
  LinkErrorCard,
  SuccessCard,
  WaitingCard,
} from "./_components/StatusCards";
import { useResetPassword } from "./_lib/useResetPassword";

export default function ResetPasswordPage() {
  const ctrl = useResetPassword();

  return (
    <AuthShell>
      {ctrl.done ? (
        <SuccessCard />
      ) : ctrl.linkError ? (
        <LinkErrorCard message={ctrl.linkError} />
      ) : !ctrl.ready ? (
        <WaitingCard />
      ) : (
        <ResetForm ctrl={ctrl} />
      )}
    </AuthShell>
  );
}
