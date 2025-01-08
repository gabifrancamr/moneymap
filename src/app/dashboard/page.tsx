"use client"

import { getUser } from "@/actions"
import { useAppContext } from "@/contexts/AppContext"
import { User } from "@/types"
import cookie from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

async function getUserData(email: string) {
    const response = await getUser(email)
    return response
}

export default function Dashboard() {
    const { logOut } = useAppContext()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const token = localStorage.getItem("token") || cookie.get("token") 

    useEffect(() => {
        async function fetchUserData() {
            if (!token) {
                router.push('/');
            } else {
                const decodedToken = jwtDecode<{ email: string }>(token)
                const userData = await getUserData(decodedToken.email)
                console.log(userData)
                setUser(userData)
            }
            setLoading(false)
        }

        fetchUserData()
    }, [token])



    return (
        <div>
            {!loading && user ? (

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