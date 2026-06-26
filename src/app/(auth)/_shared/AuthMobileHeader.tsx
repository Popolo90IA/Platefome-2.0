"use client";

import Link from "next/link";
import { LogoWordmark } from "@/components/brand/LogoWordmark";

export function AuthMobileHeader() {
  return (
    <div className="auth-mobile-header">
      <Link href="/">
        <LogoWordmark width={140} />
      </Link>
    </div>
  );
}
