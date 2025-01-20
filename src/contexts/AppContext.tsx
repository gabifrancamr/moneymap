"use client"

import { useAuth } from '@/hooks/useAuth';
import { Transaction } from '@/types';
import { User } from '@prisma/client';
import { jwtDecode } from 'jwt-decode';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';

interface AppContextTypes {
    user: User | null
    transactions: Transaction[]
    filteredTransactions: [] | Transaction[]
    setFilteredTransactions: Dispatch<SetStateAction<Transaction[] | []>>
    errorLoadingUser: boolean
    refetchUser: (email: string) => Promise<void>
    refetchTransactions: (userId: string) => Promise<void>
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

async function getTransactions(id: string) {
    const response = await fetch(`/api/getTransactions?id=${id}`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user data");
    }

    const data = await response.json();

    return data.transactions;
}

export function AppProvider({ children }: UsersProvider) {
    const [user, setUser] = useState<User | null>(null)
    const [errorLoadingUser, setErrorLoadingUser] = useState(false)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
    const { token } = useAuth()

    useEffect(() => {
        async function fetchUserData(token: string) {
            const decodedToken = jwtDecode<{ email: string }>(token)
            try {
                const userData = await getUserData(decodedToken.email)
                setUser(userData)

                if (userData.id) {
                    const transactionsData = await getTransactions(userData.id);
                    setTransactions(transactionsData)
                    setFilteredTransactions(transactionsData)
                }

            } catch (error) {
                console.error(error);
                setErrorLoadingUser(true)
            }
        }

        if(token) {
            fetchUserData(token)
        }
        
    }, [token])

    async function refetchUser(email: string) {
        const updatedUser = await getUserData(email);
        setUser(updatedUser); 
    }

    async function refetchTransactions(userId: string) {
        const updatedTransactions = await getTransactions(userId)
        setTransactions(updatedTransactions)
    }
    
    return (
        <AppContext.Provider value={{ user, errorLoadingUser, refetchUser, refetchTransactions, transactions, filteredTransactions, setFilteredTransactions }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)