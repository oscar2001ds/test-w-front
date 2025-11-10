"use client";

import { useAuth } from "@/src/core/context/AuthContext";
import { AuthSelector } from "@/src/modules/auth";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (user) {
    router.push("/");
    return null;
  }
  
  return (
    <AuthSelector />
  );
}