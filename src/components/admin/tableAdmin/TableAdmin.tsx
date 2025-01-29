"use client"

import { useAdminContext } from "@/contexts/AdminContext";
import { usePagination } from "@/hooks/usePagination";
import { dateFormatter } from "@/utils/formatter";
import { Flex, Spinner, Table, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { FaCircleDown } from "react-icons/fa6";
import BtnDeleteTransaction from "../../btnDeleteTransaction/BtnDeleteTransaction";
import BtnEditTransaction from "../../btnEditTransaction/BtnEditTransaction";
import { BtnNewTransaction } from "../../btnNewTransaction/BtnNewTransaction";
import { Button } from "../../ui/button";

export function TableAdmin() {
    const { filteredUsers, loadingUsers } = useAdminContext()

    const { currentPage, usersPerPage, createPageURL } = usePagination()

    const sortedUsers = [...filteredUsers].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const startIndex = (currentPage - 1) * usersPerPage
    const endIndex = startIndex + usersPerPage
    const currentUsers = sortedUsers.slice(startIndex, endIndex)

    useEffect(() => {
        if (currentPage > 1 && currentUsers.length === 0) {
            createPageURL(currentPage - 1)
        }
    }, [currentUsers])

    return (
        <>
            {loadingUsers ? (
                <Flex gap={"0.5rem"} alignItems={"center"}>
                    <Spinner size="sm" />
                    <Text color={"green.500"}>Loading transactions...</Text>
                </Flex>

            ) : (
                filteredUsers.length > 0 ? (
                    <Table.ScrollArea borderWidth="1px">
                        <Table.Root variant="line" interactive showColumnBorder colorPalette={"green"}>
                            <Table.Header>
                                <Table.Row colorPalette={"green"}>
                                    <Table.ColumnHeader backgroundColor={"green.800"}>Id</Table.ColumnHeader>
                                    <Table.ColumnHeader backgroundColor={"green.800"}>Name</Table.ColumnHeader>
                                    <Table.ColumnHeader backgroundColor={"green.800"}>Role</Table.ColumnHeader>
                                    <Table.ColumnHeader backgroundColor={"green.800"}>Email</Table.ColumnHeader>
                                    <Table.ColumnHeader backgroundColor={"green.800"}>Created at</Table.ColumnHeader>
                                    <Table.ColumnHeader backgroundColor={"green.800"}>Updated at</Table.ColumnHeader>
                                    <Table.ColumnHeader backgroundColor={"green.800"} textAlign="end">Actions</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {currentUsers.map((user) => (
                                    <Table.Row key={user.id}>
                                        <Table.Cell>{user.id}</Table.Cell>
                                        <Table.Cell>{user.name}</Table.Cell>
                                        <Table.Cell>{user.role}</Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>{dateFormatter.format(new Date(user.createdAt))}</Table.Cell>
                                        <Table.Cell>{dateFormatter.format(new Date(user.updatedAt))}</Table.Cell>
                                        <Table.Cell>
                                            <Flex gap={"0.5rem"} justifyContent={"flex-end"}>
                                                <BtnEditTransaction />
                                                <BtnDeleteTransaction />
                                                <Link href={`/admin/user/${user.id}`}><Button>
                                                    <FaCircleDown />
                                                </Button></Link>
                                            </Flex>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Table.ScrollArea>
                ) : (
                    <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={"1rem"}>
                        <Text color={"green.500"}>Looks like there are no transactions yet. Create a new one to get started!</Text>
                        <BtnNewTransaction />
                    </Flex>
                )
            )}
        </>
    )
}