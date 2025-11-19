"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export function ClientRedirectHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (user && pathname.startsWith('/auth')) {
      console.log('🔄 [CLIENT] Redirecting authenticated user to /financial-simulator/home');
      router.replace('/financial-simulator/home');
    } else if (!user && pathname.startsWith('/financial-simulator/')) {
      console.log('🔄 [CLIENT] Redirecting unauthenticated user to /auth');
      router.replace('/auth');
    }

  }, [user, isLoading, pathname, router]);

  return null;
}