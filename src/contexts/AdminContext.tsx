"use client"
import { Transaction, User } from "@/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { useAppContext } from "./AppContext";


interface AdminContextTypes {
    usersAdmin: User[]
    filteredUsersAdmin: User[]
    setFilteredUsersAdmin: Dispatch<SetStateAction<User[] | []>>
    loadingUsersAdmin: boolean
    transactionsAdmin: Transaction[]
    filteredTransactionsAdmin: [] | Transaction[]
    setFilteredTransactionsAdmin: Dispatch<SetStateAction<Transaction[] | []>>
    loadingTransactionsAdmin: boolean
    setLoadingTransactionsAdmin: Dispatch<SetStateAction<boolean>>
    refetchUsersAdmin: () => Promise<void>
    refetchTransactionsAdmin: (userId: string) => Promise<void>
}

const AdminContext = createContext({} as AdminContextTypes)

interface AdminProviderTypes {
    children: ReactNode
}

async function getAllUsersAdmin() {
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

async function getTransactionsAdmin(id: string) {
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
    const [usersAdmin, setUsersAdmin] = useState<User[]>([])
    const [filteredUsersAdmin, setFilteredUsersAdmin] = useState<User[]>([])
    const [loadingUsersAdmin, setLoadingUsersAdmin] = useState(true)

    const [transactionsAdmin, setTransactionsAdmin] = useState<Transaction[]>([])
    const [filteredTransactionsAdmin, setFilteredTransactionsAdmin] = useState<Transaction[]>([])
    const [loadingTransactionsAdmin, setLoadingTransactionsAdmin] = useState(true)

    const { user } = useAppContext()

    useEffect(() => {
        async function fetchUsers() {
            try {
                const usersData = await getAllUsersAdmin()
                setUsersAdmin(usersData)
                setFilteredUsersAdmin(usersData)

                if (usersData.id) {
                    const transactionsData = await getTransactionsAdmin(usersData.id);
                    setTransactionsAdmin(transactionsData)
                    setFilteredTransactionsAdmin(transactionsData)
                }

            } catch (error) {
                console.error("Failed to fetch users", error)
            } finally {
                setLoadingUsersAdmin(false)
                setLoadingTransactionsAdmin(false)
            }
        }


        if (user?.role === 'admin') {
            fetchUsers()
        }

    }, [user])

    async function refetchUsersAdmin() {
        const updatedUser = await getAllUsersAdmin();
        setUsersAdmin(updatedUser);
        setFilteredUsersAdmin(updatedUser)
    }

    async function refetchTransactionsAdmin(userId: string) {
        const updatedTransactions = await getTransactionsAdmin(userId)
        setTransactionsAdmin(updatedTransactions)
        setFilteredTransactionsAdmin(updatedTransactions)
    }

    return (
        <AdminContext.Provider value={{
            usersAdmin,
            filteredUsersAdmin,
            setFilteredUsersAdmin,
            loadingUsersAdmin,
            transactionsAdmin,
            filteredTransactionsAdmin,
            setFilteredTransactionsAdmin,
            loadingTransactionsAdmin,
            setLoadingTransactionsAdmin,
            refetchUsersAdmin,
            refetchTransactionsAdmin,
        }}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdminContext = () => useContext(AdminContext)