"use client"

import cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { createContext, useContext } from 'react';

interface AppContextTypes {
    handleAuthentication: (token: string) => void
    logOut: () => void
}

const AppContext = createContext({} as AppContextTypes);

interface UsersProvider {
    children: React.ReactNode
}

export function AppProvider({ children }: UsersProvider) {
    const router = useRouter();
    
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

    return (
        <AppContext.Provider value={{ handleAuthentication, logOut }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);