"use client"
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { useAppContext } from "@/contexts/AppContext";
import { HStack, Input, Stack } from "@chakra-ui/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as zod from 'zod';

const newTransactionFormSchema = zod.object({
    name: zod
        .string()
        .min(3, "The name must have at least 3 characters")
        .nonempty("Transaction's name is required"),
    value: zod
        .number()
        .min(1, "Value is required")
        .positive("Value must be positive"),
    type: zod
        .enum(["income", "expense"],
            { errorMap: () => ({ message: "Invalid transaction type" }) })
});

export type typeNewTransactionSchema = zod.infer<typeof newTransactionFormSchema>

interface FormNewTransactionProps {
    setOpen: (value: SetStateAction<boolean>) => void
}

export default function FormNewTransaction({ setOpen }: FormNewTransactionProps) {
    const { user, refetchTransactions } = useAppContext()

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<typeNewTransactionSchema>({
        resolver: zodResolver(newTransactionFormSchema)
    })

    async function handleNewTransaction(data: typeNewTransactionSchema) {
        const userId = user?.id
        const payload = {
            ...data,
            userId
        }

        try {
            const response = await fetch('/api/newTransaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (response.status === 200) {
                await refetchTransactions(userId!)
                setOpen(false)
                toast.success("Transaction created successfully")
            }

        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.');
        }
    }

    return (
        <form onSubmit={handleSubmit(handleNewTransaction)}>
            <Stack gap="4" align="center" maxW="sm">
                <Field
                    label="Transaction's name"
                    invalid={!!errors.name}
                    errorText={errors.name?.message}
                >
                    <Input
                        {...register("name")}
                        maxLength={70}
                        colorPalette={"green"}
                    />
                </Field>
                <Field
                    label="Value"
                    invalid={!!errors.value}
                    errorText={errors.value?.message}
                >
                    <Input
                        {...register("value", {
                            setValueAs: (v) => parseFloat(v) || 0,
                        })}
                        type="number"
                        maxLength={15}
                        colorPalette={"green"}
                    />
                </Field>
                <Field
                    label="Type"
                    invalid={!!errors.type}
                    errorText={errors.type?.message}
                >
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup {...field}>
                                <HStack gap="4">
                                    <Radio colorPalette={"green"} value="income">
                                        Income
                                    </Radio>

                                    <Radio colorPalette={"red"} value="expense">
                                        Expense
                                    </Radio>
                                </HStack>
                            </RadioGroup>
                        )}
                    />

                </Field>

                <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    colorPalette={"green"}
                >
                    Create
                </Button>
            </Stack>
        </form>
    )
}