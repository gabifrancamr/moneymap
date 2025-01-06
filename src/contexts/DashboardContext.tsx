import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { createContext, useContext, useState } from 'react';

interface DashboardContextTypes {
    token: string | null
    handleAuthentication: (token: string) => void
    logOut: () => void
}

const DashboardContext = createContext({} as DashboardContextTypes);

interface UsersProvider {
    children: React.ReactNode
}

export function DashboardProvider({ children }: UsersProvider) {
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
        <DashboardContext.Provider value={{ handleAuthentication, logOut, token }}>
            {children}
        </DashboardContext.Provider>
    );
}

export const useDashboard = () => useContext(DashboardContext);