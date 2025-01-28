"use client"

import { useAppContext } from '@/contexts/AppContext';
import cookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useAuth() {
    const router = useRouter();
    const { refetchUser } = useAppContext()

    const handleAuthentication = useCallback(async (token: string) => {
        localStorage.setItem('token', token);
        cookie.set('token', token, { expires: 1 / 24, path: '/' });

        const decodedToken = jwtDecode<{ email: string }>(token);
        await refetchUser(decodedToken.email)

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