"use client"
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { useAppContext } from "@/contexts/AppContext";
import { ResultType, Transaction } from "@/types";
import { HStack, Input, Stack } from "@chakra-ui/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from "react-hook-form";
import { toast } from 'sonner';
import * as zod from 'zod';
import { Radio, RadioGroup } from "../ui/radio";

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

interface FormEditTransactionProps {
    transaction: Transaction;
}

export default function FormEditTransaction({ transaction }: FormEditTransactionProps) {

    const { refetchTransactions } = useAppContext()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<typeNewTransactionSchema>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            name: transaction.name, 
            value: transaction.value, 
            type: transaction.type, 
        }
    })

    async function handleEditTransaction(data: typeNewTransactionSchema) {
        
        const payload = {
            ...data,
            id: transaction.id
        }

        try {
            const response = await fetch('/api/editTransaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
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
        <form onSubmit={handleSubmit(handleEditTransaction)}>
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
                            <RadioGroup {...field} defaultValue={transaction.type}>
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
                    Save
                </Button>
            </Stack>
        </form>
    )
}