"use client"

import { Header } from "@/components/header/Header"
import { useAuth } from "@/hooks/useAuth"
import { Box } from "@chakra-ui/react"
import { useAppContext } from "../contexts/AppContext"

export default function Dashboard() {
    const { user, errorLoadingUser} = useAppContext()
    const { logOut } = useAuth()

    if(errorLoadingUser) {
        return <h1>Failed to search for user</h1>
    }

    return (
        <>
            {user ? (
                <Box paddingX={{ base: "6", sm: "10", md: "14"}} paddingY={{ base: "4", sm: "8" }}>
                    <Header />
                    <h1>Welcome, {user.name}</h1>
                    <button onClick={logOut}>Log Out</button>
                </Box>

            ) : (
                <h1>Loading...</h1>
            )}
        </>
    )
}