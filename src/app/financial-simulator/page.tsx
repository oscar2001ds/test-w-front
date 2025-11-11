"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FinancialSimulatorPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/financial-simulator/home");
  }, [router]);

  return <></>;
}