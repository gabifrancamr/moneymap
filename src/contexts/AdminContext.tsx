"use client"
import { Transaction, User } from "@/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { useAppContext } from "./AppContext";


interface AdminContextTypes {
    users: User[]
    filteredUsers: User[]
    setFilteredUsers: Dispatch<SetStateAction<User[] | []>>
    loadingUsers: boolean
    transactions: Transaction[]
    filteredTransactions: [] | Transaction[]
    setFilteredTransactions: Dispatch<SetStateAction<Transaction[] | []>>
    loadingTransactions: boolean
    setLoadingTransactions: Dispatch<SetStateAction<boolean>>
    refetchUsers: () => Promise<void>
    refetchTransactions: (userId: string) => Promise<void>
}

const AdminContext = createContext({} as AdminContextTypes)

interface AdminProviderTypes {
    children: ReactNode
}

async function getAllUsers() {
    try {
        const response = await fetch('/api/getAllUsers', {
            method: 'GET'
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "Failed to fetch user data")
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error)
        return []
    }
}

async function getTransactions(id: string) {
    const response = await fetch(`/api/getTransactionsById/${id}`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user data");
    }

    const data = await response.json();

    return data.transactions;
}

export function AdminProvider({ children }: AdminProviderTypes) {
    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const [loadingUsers, setLoadingUsers] = useState(true)

    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
    const [loadingTransactions, setLoadingTransactions] = useState(true)

    const { user } = useAppContext()

    useEffect(() => {
        async function fetchUsers() {
            try {
                const usersData = await getAllUsers()
                setUsers(usersData)
                setFilteredUsers(usersData)

                if (usersData.id) {
                    const transactionsData = await getTransactions(usersData.id);
                    setTransactions(transactionsData)
                    setFilteredTransactions(transactionsData)
                }

            } catch (error) {
                console.error("Failed to fetch users", error)
            } finally {
                setLoadingUsers(false)
                setLoadingTransactions(false)
            }
        }


        if (user?.role === 'admin') {
            fetchUsers()
        }

    }, [user])

    async function refetchUsers() {
        const updatedUser = await getAllUsers();
        setUsers(updatedUser);
        setFilteredUsers(updatedUser)
    }

    async function refetchTransactions(userId: string) {
        const updatedTransactions = await getTransactions(userId)
        setTransactions(updatedTransactions)
        setFilteredTransactions(updatedTransactions)
    }

    return (
        <AdminContext.Provider value={{ users, loadingUsers, filteredUsers, setFilteredUsers, transactions, filteredTransactions, setFilteredTransactions, loadingTransactions, refetchUsers, refetchTransactions, setLoadingTransactions }}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdminContext = () => useContext(AdminContext)