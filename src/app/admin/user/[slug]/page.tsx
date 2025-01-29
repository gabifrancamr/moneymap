"use client"

import { TableAdminTransactions } from "@/components/admin/tableAdminTransactions/TableAdminTransactions";
import { Header } from "@/components/header/Header";
import TablePagination from "@/components/tablePagination/TablePagination";
import { useAdminContext } from "@/contexts/AdminContext";
import { usePagination } from "@/hooks/usePagination";
import { Transaction } from "@/types";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";

interface TransactionsByIdProps {
    params: {
        slug: string
    }
}


export default function TransactionsByIdPage({ params }: TransactionsByIdProps) {
    const { filteredTransactionsAdmin, loadingTransactionsAdmin, setLoadingTransactionsAdmin, refetchTransactionsAdmin } = useAdminContext()
    const { currentPage, usersPerPage, createPageURL } = usePagination()

    useEffect(() => {
        async function loadData() {
            setLoadingTransactionsAdmin(true)
            await refetchTransactionsAdmin(params.slug)
            setLoadingTransactionsAdmin(false)
        }

        if (params.slug) {
            loadData()
        }
    }, [params.slug])

    const sortedTransactions = [...filteredTransactionsAdmin].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const startIndex = (currentPage - 1) * usersPerPage
    const endIndex = startIndex + usersPerPage
    const currentTransactions: Transaction[] = sortedTransactions.slice(startIndex, endIndex)

    useEffect(() => {
        if (currentPage > 1 && currentTransactions.length === 0) {
            createPageURL(currentPage - 1)
        }
    }, [currentTransactions])

    return (
        <>
            {loadingTransactionsAdmin ? (
                <Flex gap={"0.5rem"} alignItems={"center"} justifyContent={"center"} height={"100vh"}>
                    <Spinner size="sm" />
                    <Text color={"green.500"}>Loading transactions...</Text>
                </Flex>

            ) : (
                filteredTransactionsAdmin.length > 0 ? (
                    <Box className="container" paddingX={{ base: "4", md: "8", lg: "24" }} paddingY={{ base: "2rem" }} spaceY={"6"}>
                        <Header />
                        <TableAdminTransactions currentTransactions={currentTransactions} />
                        <TablePagination />
                    </Box>
                ) : (
                    <Flex height={"100vh"} justifyContent={"center"} alignItems={"center"}>
                        <Text color={"green.500"}>Looks like there are no transactions yet.</Text>

                    </Flex>
                )
            )}
        </>
    )
}