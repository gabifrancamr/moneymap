"use client"

import cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useAuth() {
    const router = useRouter();

    const handleAuthentication = useCallback((token: string) => {
        localStorage.setItem('token', token);
        cookie.set('token', token, { expires: 1 / 24, path: '/' });
        router.push('/dashboard');
    }, [router]);

    const logOut = useCallback(() => {
        localStorage.removeItem('token');
        cookie.remove('token');
        router.push('/');
    }, [router]);

    const token = typeof window !== 'undefined' ? localStorage.getItem("token") || cookie.get("token") : null;

    return {
        handleAuthentication,
        logOut,
        token
    };
}