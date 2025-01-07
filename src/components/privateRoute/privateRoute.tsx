"use client"

import { useAppContext } from '@/contexts/AppContext';
import { useRouter } from 'next/router';
import React from 'react';

export function PrivateRoute ({ children }: { children: React.ReactNode }) {
  const { token } = useAppContext();
  const router = useRouter();

  if (!token) {
    router.push('/'); 
    return null;
  }

  return <>{children}</>;
};
