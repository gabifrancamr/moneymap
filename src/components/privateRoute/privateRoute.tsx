"use client"

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/');
    }

    setLoading(false)

  }, [token])


  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>{children}</>
      )}
    </>
  );
};