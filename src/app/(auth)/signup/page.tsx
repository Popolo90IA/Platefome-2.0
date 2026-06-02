"use client";

import { DirectionalTransition } from "@/components/transitions/DirectionalTransition";
import { AuthBrandShell } from "../_shared/AuthBrandShell";
import { SignupBrandContent } from "./_components/SignupBrandContent";
import { SignupFormPanel } from "./_components/SignupFormPanel";

export default function SignupPage() {
  return (
    <DirectionalTransition>
      <div dir="rtl" className="auth-layout">
        <AuthBrandShell footer="חינמי לתמיד · ללא כרטיס אשראי">
          <SignupBrandContent />
        </AuthBrandShell>
        <SignupFormPanel />
      </div>
    </DirectionalTransition>
  );
}
