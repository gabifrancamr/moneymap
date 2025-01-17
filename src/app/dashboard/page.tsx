"use client"

import { Header } from "@/components/header/Header"
import { InputSearch } from "@/components/inputSearch/InputSearch"
import { Summary } from "@/components/summary/Summary"
import TablePagination from "@/components/tablePagination/TablePagination"
import { TransactionsTable } from "@/components/transactionsTable/TransactionsTable"
import { Box } from "@chakra-ui/react"
import { useAppContext } from "../../contexts/AppContext"

export default function Dashboard() {
    const { user, errorLoadingUser } = useAppContext()

    if (errorLoadingUser) {
        return <h1>Error loading user</h1>
    }

    return (
        <>
            <Box className="container" paddingX={{ base: "4", md: "8", lg: "24" }} paddingY={{ base: "2rem" }} spaceY={"6"}>
                <Header />
                <Summary />
                <Box className="glassmorphism" padding="4" spaceY={"8"}>
                    <InputSearch />
                    <TransactionsTable />
                    <TablePagination />
                </Box>
            </Box>
            {/* {user ? (
                <Box paddingX={{ base: "6", sm: "10", md: "14"}} paddingY={{ base: "4", sm: "8" }} spaceY={"6"}>
                    <Header />
                    <Summary />
                </Box>

            ) : (
                <h1>Loading...</h1>
            )} */}
        </>
    )
}