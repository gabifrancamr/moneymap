"use client"

import { TableAdmin } from "@/components/admin/tableAdmin/TableAdmin"
import { Header } from "@/components/header/Header"
import TablePagination from "@/components/tablePagination/TablePagination"
import { useAdminContext } from "@/contexts/AdminContext"
import { Box, Flex, Spinner, Text } from "@chakra-ui/react"

export default function Admin() {
    const { usersAdmin, loadingUsersAdmin } = useAdminContext()


    return (
        <>
            {loadingUsersAdmin ? (
                <Flex gap={"0.5rem"} alignItems={"center"}>
                    <Spinner size="sm" />
                    <Text color={"green.500"}>Loading users...</Text>
                </Flex>
            ) : (
                usersAdmin.length > 0 ? (
                    <Box className="container" paddingX={{ base: "4", md: "8", lg: "24" }} paddingY={{ base: "2rem" }} spaceY={"6"}>
                        <Header />
                        <Box className="glassmorphism" padding="4" spaceY={"8"}>
                            <Text fontSize={"2xl"}>Users</Text>
                            <TableAdmin />
                            <TablePagination />
                        </Box>
                    </Box>
                ) : (
                    <p>Nenhum usuário encontrado.</p>
                )
            )}
        </>
    )
}