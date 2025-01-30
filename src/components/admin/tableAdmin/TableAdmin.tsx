"use client"

import { useAdminContext } from "@/contexts/AdminContext";
import { usePagination } from "@/hooks/usePagination";
import { dateFormatter } from "@/utils/formatter";
import { Flex, Spinner, Table, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import { BtnNewTransaction } from "../../btnNewTransaction/BtnNewTransaction";
import { Button } from "../../ui/button";
import BtnDeleteUser from "../btnDeleteUser/BtnDeleteUser";
import { BtnEditUser } from "../btnEditUser/BtnEditUser";

export function TableAdmin() {
    const { filteredUsersAdmin, loadingUsersAdmin } = useAdminContext()

    const { currentPage, usersPerPage, createPageURL } = usePagination()

    const sortedUsers = [...filteredUsersAdmin].sort(
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
            {loadingUsersAdmin ? (
                <Flex gap={"0.5rem"} alignItems={"center"}>
                    <Spinner size="sm" />
                    <Text color={"green.500"}>Loading transactions...</Text>
                </Flex>

            ) : (
                filteredUsersAdmin.length > 0 ? (
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
                                                <BtnEditUser user={user} />
                                                <BtnDeleteUser user={user} />
                                                <Link href={`/admin/user/${user.id}`}>
                                                    <Button size={"sm"}>
                                                        <FaEye />
                                                    </Button>
                                                </Link>
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