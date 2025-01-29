import { Button } from "@/components/ui/button";
import { useAdminContext } from "@/contexts/AdminContext";
import { ResultType, User } from "@/types";
import { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormDeleteUserProps {
    user: User
    setOpen: (value: SetStateAction<boolean>) => void
}

export default function FormDeleteUser({ user, setOpen }: FormDeleteUserProps) {
    const { refetchUsersAdmin } = useAdminContext()

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = useForm()

    async function handleDeleteUser() {
        try {
            const response = await fetch('/api/deleteUser', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: user.id
                })
            })

            const result: ResultType = await response.json();

            if (response.status === 200) {
                await refetchUsersAdmin()
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