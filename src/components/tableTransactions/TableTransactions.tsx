"use client"

import { useAppContext } from "@/contexts/AppContext";
import { usePagination } from "@/hooks/usePagination";
import { dateFormatter, priceFromatter } from "@/utils/formatter";
import { Flex, Spinner, Table, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import BtnDeleteTransaction from "../btnDeleteTransaction/BtnDeleteTransaction";
import BtnEditTransaction from "../btnEditTransaction/BtnEditTransaction";

export function TableTransactions() {
    const { filteredTransactions, loadingTransactions } = useAppContext()

    const { currentPage, usersPerPage, createPageURL } = usePagination()

    const sortedTransactions = [...filteredTransactions].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const startIndex = (currentPage - 1) * usersPerPage
    const endIndex = startIndex + usersPerPage
    const currentTransactions = sortedTransactions.slice(startIndex, endIndex)

    useEffect(() => {
        if (currentPage > 1 && currentTransactions.length === 0) {
            createPageURL(currentPage - 1)
        }
    }, [currentTransactions])

    return (
        <>
            {loadingTransactions ? (
                <Flex gap={"0.5rem"} alignItems={"center"}>
                    <Spinner size="sm" />
                    <Text color={"green.500"}>Loading transactions...</Text>
                </Flex>

            ) : (
                filteredTransactions.length > 0 ? (
                    <Table.ScrollArea borderWidth="1px">
                        <Table.Root variant="line" interactive showColumnBorder colorPalette={"green"}>
                            <Table.Header>
                                <Table.Row colorPalette={"green"}>
                                    <Table.ColumnHeader backgroundColor={"green.800"}>Name</Table.ColumnHeader>
                                    <Table.ColumnHeader backgroundColor={"green.800"}>Value</Table.ColumnHeader>
                                    <Table.ColumnHeader backgroundColor={"green.800"}>Type</Table.ColumnHeader>
                                    <Table.ColumnHeader backgroundColor={"green.800"}>Created at</Table.ColumnHeader>
                                    <Table.ColumnHeader backgroundColor={"green.800"}>Updated at</Table.ColumnHeader>
                                    <Table.ColumnHeader backgroundColor={"green.800"} textAlign="end">Actions</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {currentTransactions.map((transaction) => (
                                    <Table.Row key={transaction.id}>
                                        <Table.Cell>{transaction.name}</Table.Cell>
                                        <Table.Cell>{priceFromatter.format(transaction.value)}</Table.Cell>
                                        <Table.Cell color={transaction.type === "expense" ? "green.500" : "red.600"}>{transaction.type === "expense" ? "Expense" : "Income"}</Table.Cell>
                                        <Table.Cell>{dateFormatter.format(new Date(transaction.createdAt))}</Table.Cell>
                                        <Table.Cell>{dateFormatter.format(new Date(transaction.updatedAt))}</Table.Cell>
                                        <Table.Cell>
                                            <Flex gap={"0.5rem"} justifyContent={"flex-end"}>
                                                <BtnEditTransaction transaction={transaction} />
                                                <BtnDeleteTransaction transaction={transaction} />
                                            </Flex>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Table.ScrollArea>
                ) : (
                    <Text color={"green.500"}>No transactions were found. Create a new one.</Text>
                )
            )}
        </>
    )
}