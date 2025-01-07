"use client"

import cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';

interface AppContextTypes {
    token: string | null
    handleAuthentication: (token: string) => void
    logOut: () => void
}

const AppContext = createContext({} as AppContextTypes);

interface UsersProvider {
    children: React.ReactNode
}

export function AppProvider({ children }: UsersProvider) {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    function handleAuthentication(token: string) {
        setToken(token)
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }
        cookie.set('token', token, { expires: 1 / 24, path: '/' });
        router.push('/dashboard');
    };

    function logOut() {
        setToken(null)
        localStorage.removeItem('token');
        cookie.remove('token');
        router.push('/');
    }

    return (
        <AppContext.Provider value={{ handleAuthentication, logOut, token }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);