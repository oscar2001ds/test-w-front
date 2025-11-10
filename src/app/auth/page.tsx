"use client";

import { AuthSelector } from "@/src/modules/auth";

export default function AuthPage() {
  return (
    <div className="flex w-screen h-screen min-h-screen items-center justify-center bg-linear-to-l from-[#054c76] via-[#0c192a] to-[#471c3a]">
      <AuthSelector />
    </div>
  );
}