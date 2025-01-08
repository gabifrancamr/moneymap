"use client"

import { useAuth } from "@/hooks/useAuth"
import { User } from "@/types"
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from "react"

async function getUserData(email: string) {
    const response = await fetch(`/api/getUserData?email=${email}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data.user;
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null)
    const { logOut, token } = useAuth()

    useEffect(() => {
        async function fetchUserData() {
            const decodedToken = jwtDecode<{ email: string }>(token!)
            const userData = await getUserData(decodedToken.email)
            console.log(userData)
            setUser(userData)
        }

        fetchUserData()
    }, [token])



    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.name}</h1>
                    <button onClick={logOut}>Log Out</button>
                </div>

            ) : (
                <h1>Carregando...</h1>
            )}
        </div >
    )
}