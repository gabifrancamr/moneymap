import { useAppContext } from "@/contexts/AppContext";
import { usePagination } from "@/hooks/usePagination";
import { dateFormatter, priceFromatter } from "@/utils/formatter";
import { Table } from "@chakra-ui/react";

export function TransactionsTable() {
    const { filteredTransactions } = useAppContext()

    const { currentPage, usersPerPage } = usePagination()

    const startIndex = (currentPage - 1) * usersPerPage
    const endIndex = startIndex + usersPerPage
    const currentTransactions = filteredTransactions.slice(startIndex, endIndex)

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
                            <Table.Cell>excluir, editar</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Table.ScrollArea>
    )
}