"use client"

import { useDashboard } from '@/contexts/DashboardContext';
import { useRouter } from 'next/router';
import React from 'react';

export function PrivateRoute ({ children }: { children: React.ReactNode }) {
  const { token } = useDashboard();
  const router = useRouter();

  if (!token) {
    router.push('/'); 
    return null;
  }

  return <>{children}</>;
};
