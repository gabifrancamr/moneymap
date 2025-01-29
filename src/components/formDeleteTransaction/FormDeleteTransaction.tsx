import { useAdminContext } from "@/contexts/AdminContext";
import { useAppContext } from "@/contexts/AppContext";
import { ResultType, Transaction } from "@/types";
import { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface FormDeleteTransactionProps {
    transaction: Transaction
    setOpen: (value: SetStateAction<boolean>) => void
}

export default function FormDeleteTransaction({ transaction, setOpen }: FormDeleteTransactionProps) {
    const { refetchTransactions, user } = useAppContext()
    const { refetchTransactionsAdmin } = useAdminContext()

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = useForm()

    async function handleDeleteUser() {
        try {
            const response = await fetch('/api/deleteTransaction', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: transaction.id
                })
            })

            const result: ResultType = await response.json();

            if (response.status === 200 && result.userId) {
                if (user?.role === 'admin') {
                    await refetchTransactionsAdmin(result.userId)
                } else {
                    await refetchTransactions(result.userId)
                }
                setOpen(false)
                toast.success(result.message)
            }
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.');
        }
    }
    return (
        <form onSubmit={handleSubmit(handleDeleteUser)}>
            <Button
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
                colorPalette={"red"}>
                Delete
            </Button>
        </form>
    )
}