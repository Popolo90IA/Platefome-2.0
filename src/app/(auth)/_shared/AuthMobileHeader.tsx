"use client";

import Link from "next/link";

export function AuthMobileHeader() {
  return (
    <div className="auth-mobile-header">
      <Link href="/">
        <img
          src="/brand/logo-lockup.svg"
          width={140}
          height={38}
          alt="Plateform"
          draggable={false}
        />
      </Link>
    </div>
  );
}
