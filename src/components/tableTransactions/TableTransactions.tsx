"use client"

import { useAppContext } from "@/contexts/AppContext";
import { usePagination } from "@/hooks/usePagination";
import { dateFormatter, priceFromatter } from "@/utils/formatter";
import { Flex, Table } from "@chakra-ui/react";
import { useEffect } from "react";
import BtnDeleteTransaction from "../btnDeleteTransaction/BtnDeleteTransaction";
import BtnEditTransaction from "../btnEditTransaction/BtnEditTransaction";

export function TableTransactions() {
    const { filteredTransactions } = useAppContext()

    const { currentPage, usersPerPage, createPageURL } = usePagination()

    const sortedTransactions = [...filteredTransactions].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const startIndex = (currentPage - 1) * usersPerPage
    const endIndex = startIndex + usersPerPage
    const currentTransactions = sortedTransactions.slice(startIndex, endIndex)

    useEffect(() => {
        if(currentPage > 1 && currentTransactions.length === 0) {
            createPageURL(currentPage - 1)
        }
    }, [currentTransactions])


    return (
        <Table.ScrollArea borderWidth="1px">
            <Table.Root variant="outline" interactive showColumnBorder>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Value</Table.ColumnHeader>
                        <Table.ColumnHeader>Type</Table.ColumnHeader>
                        <Table.ColumnHeader>Created at</Table.ColumnHeader>
                        <Table.ColumnHeader>Updated at</Table.ColumnHeader>
                        <Table.ColumnHeader>Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {currentTransactions.map((transaction) => (
                        <Table.Row key={transaction.id}>
                            <Table.Cell>{transaction.name}</Table.Cell>
                            <Table.Cell>{priceFromatter.format(transaction.value)}</Table.Cell>
                            <Table.Cell>{transaction.type}</Table.Cell>
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
    )
}