"use client"

import { useAuth } from '@/hooks/useAuth';
import { User } from '@prisma/client';
import { jwtDecode } from 'jwt-decode';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AppContextTypes {
    user: User | null
    errorLoadingUser: boolean
}

const AppContext = createContext({} as AppContextTypes);

interface UsersProvider {
    children: ReactNode
}

async function getUserData(email: string) {
    const response = await fetch(`/api/getUserData?email=${email}`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user data");
    }

    const data = await response.json();

    if (!data.user) {
        throw new Error("User not found");
    }

    return data.user;
}

export function AppProvider({ children }: UsersProvider) {
    const [user, setUser] = useState<User | null>(null)
    const [errorLoadingUser, setErrorLoadingUser] = useState(false)
    const { token } = useAuth()

    useEffect(() => {
        async function fetchUserData(token: string) {
            const decodedToken = jwtDecode<{ email: string }>(token)
            try {
                const userData = await getUserData(decodedToken.email)
                console.log(userData)
                setUser(userData)
            } catch (error) {
                console.error(error);
                setErrorLoadingUser(true)
            }
        }

        if(token) {
            fetchUserData(token)
        }
        
    }, [token])

    return (
        <AppContext.Provider value={{ user, errorLoadingUser}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)