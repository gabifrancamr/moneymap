"use client"

import cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

export function useAuth() {
    const router = useRouter();
    const token = localStorage.getItem("token") || cookie.get("token")

    function handleAuthentication(token: string) {
        localStorage.setItem('token', token);
        cookie.set('token', token, { expires: 1 / 24, path: '/' });
        router.push('/dashboard');
    };

    function logOut() {
        localStorage.removeItem('token');
        cookie.remove('token');
        router.push('/');
    }

    return {
        handleAuthentication, logOut, token
    }
}