"use client"
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useAppContext } from "@/contexts/AppContext";
import { ResultType } from "@/types";
import { Input, Stack } from "@chakra-ui/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import * as zod from 'zod';

const editFormSchema = zod.object({
    name: zod
        .string()
        .optional()
        .refine(
            (val) => val === "" || val && val.length >= 3,
            {
                message: "The name must have at least 3 characters",
            }
        ),
    password: zod
        .string()
        .optional()
        .refine(
            (val) => val === "" || val && val.length >= 5 && val.length <= 15,
            {
                message: "Password must be between 5 and 15 characters",
            }
        ),
    confirmPassword: zod.string(),
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            path: ["confirmPassword"],
            code: zod.ZodIssueCode.custom,
            message: "Passwords do not match",
        });
    }
});

export type typeEditFormSchema = zod.infer<typeof editFormSchema>

export default function EditProfileForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { user, refetchUser } = useAppContext()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<typeEditFormSchema>({
        resolver: zodResolver(editFormSchema)
    })

    async function handleEditUser(data: typeEditFormSchema) {
        const filteredData: Partial<typeEditFormSchema> = {};

        if (data.name && data.name.length > 0) {
            filteredData.name = data.name;
        }
        if (data.password && data.password.length > 0) {
            filteredData.password = data.password;
        }

        if (Object.keys(filteredData).length === 0) {
            toast.error('Form is empty');
            return;
        }

        const payload = { 
            ...filteredData,
            email: user?.email, 
        }

        try {
            const response = await fetch('/api/editUser', {
                method: 'POST',
                headers: {
                    'Context-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            const result: ResultType = await response.json();

            if(response.status === 200 && result.email) {
                refetchUser(result.email)
                toast.success(result.message)
            }
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.');
        }

    }

    return (
        <form onSubmit={handleSubmit(handleEditUser)}>
            <Stack gap="4" align="center" maxW="sm">
                <Field
                    label="Full name"
                    invalid={!!errors.name}
                    errorText={errors.name?.message}
                >
                    <Input
                        {...register("name")}
                        maxLength={70}
                        colorPalette={"green"}
                        placeholder={user?.name}
                    />
                </Field>
                <Field
                    label="E-mail"
                    disabled
                >
                    <Input
                        placeholder={user?.email}
                        value={user?.email}
                    />
                </Field>
                <Field
                    label="Password"
                    invalid={!!errors.password}
                    errorText={errors.password?.message}
                >
                    <PasswordInput
                        {...register("password")}
                        visible={showPassword}
                        onVisibleChange={setShowPassword}
                        maxLength={15}
                        autoComplete="new-password"
                        colorPalette={"green"}
                    />
                </Field>

                <Field
                    label="Confirm Password"
                    invalid={!!errors.confirmPassword}
                    errorText={errors.confirmPassword?.message}
                >
                    <PasswordInput
                        {...register("confirmPassword")}
                        visible={showConfirmPassword}
                        onVisibleChange={setShowConfirmPassword}
                        maxLength={15}
                        autoComplete="new-password"
                        colorPalette={"green"}
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