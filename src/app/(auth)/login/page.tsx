"use client";

import { DirectionalTransition } from "@/components/transitions/DirectionalTransition";
import { AuthBrandShell } from "../_shared/AuthBrandShell";
import { LoginBrandContent } from "./_components/LoginBrandContent";
import { LoginFormPanel } from "./_components/LoginFormPanel";

export default function LoginPage() {
  return (
    <DirectionalTransition>
      <div dir="rtl" className="auth-layout">
        <AuthBrandShell footer="מצטרפים למסעדות שכבר עברו לדיגיטל">
          <LoginBrandContent />
        </AuthBrandShell>
        <LoginFormPanel />
      </div>
    </DirectionalTransition>
  );
}
