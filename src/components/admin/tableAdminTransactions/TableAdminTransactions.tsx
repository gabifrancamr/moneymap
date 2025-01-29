import BtnDeleteTransaction from "@/components/btnDeleteTransaction/BtnDeleteTransaction";
import BtnEditTransaction from "@/components/btnEditTransaction/BtnEditTransaction";
import { Transaction } from "@/types";
import { dateFormatter, priceFromatter } from "@/utils/formatter";
import { Flex, Table } from "@chakra-ui/react";

interface TableAdminTransactionsProps {
    currentTransactions: Transaction[]
}

export function TableAdminTransactions({ currentTransactions }: TableAdminTransactionsProps) {
    return (
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
                            <Table.Cell color={transaction.type === "expense" ? "red.600" : "green.500"}>{transaction.type === "expense" ? "Expense" : "Income"}</Table.Cell>
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