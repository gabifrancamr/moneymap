import { useAppContext } from "@/contexts/AppContext"
import { Table } from "@chakra-ui/react"

export function TransactionsTable() {
    const { transactions } = useAppContext()
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
                    {transactions.map((transaction) => (
                        <Table.Row key={transaction.id}>
                            <Table.Cell>{transaction.name}</Table.Cell>
                            <Table.Cell>{transaction.value}</Table.Cell>
                            <Table.Cell>{transaction.type}</Table.Cell>
                            <Table.Cell>{transaction.createdAt.toString()}</Table.Cell>
                            <Table.Cell>{transaction.updatedAt.toString()}</Table.Cell>
                            <Table.Cell>excluir, editar</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Table.ScrollArea>
    )
}