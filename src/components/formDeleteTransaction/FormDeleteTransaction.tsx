import { useAppContext } from "@/contexts/AppContext";
import { ResultType, Transaction } from "@/types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface FormDeleteTransactionProps {
    transaction: Transaction
}

export default function FormDeleteTransaction({ transaction }: FormDeleteTransactionProps) {
    const { refetchTransactions } = useAppContext()

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
                await refetchTransactions(result.userId)
                toast.success(result.message)
            }
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.');
        }
    }
    return (
        <form onSubmit={ handleSubmit(handleDeleteUser)}>
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