"use client"

import { Error } from "@/components/error/Error"
import { Header } from "@/components/header/Header"
import { InputSearch } from "@/components/inputSearch/InputSearch"
import { Loading } from "@/components/loading/Loading"
import { Summary } from "@/components/summary/Summary"
import TablePagination from "@/components/tablePagination/TablePagination"
import { TableTransactions } from "@/components/tableTransactions/TableTransactions"
import { Box } from "@chakra-ui/react"
import { useAppContext } from "../../contexts/AppContext"


export default function Dashboard() {
    const { user, errorLoadingUser } = useAppContext()

    if (errorLoadingUser) {
        return <Error />
    }

    return (
        <>
            {user ? (
                <Box className="container" paddingX={{ base: "4", md: "8", lg: "24" }} paddingY={{ base: "2rem" }} spaceY={"6"}>
                    <Header />
                    <Summary user={user} />
                    <Box className="glassmorphism" padding="4" spaceY={"8"}>
                        <InputSearch />
                        <TableTransactions />
                        <TablePagination />
                    </Box>
                </Box>

            ) : (
                <Loading />
            )}
        </>
    )
}