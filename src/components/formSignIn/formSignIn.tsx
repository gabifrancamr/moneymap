"use client"
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/hooks/useAuth";
import { ResultType } from "@/types";
import { Input, Stack } from "@chakra-ui/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as zod from 'zod';

const signInSchema = zod.object({
    email: zod
        .string()
        .nonempty("E-mail is required")
        .email("Please enter a valid e-mail"),
    password: zod
        .string()
        .nonempty("Password is required")
        .min(5, "Password must have at least 5 characters")
        .max(15, "Password must have at most 15 characters"),
})

export type typeSignInSchema = zod.infer<typeof signInSchema>

export default function FormSignIn() {
    const [showPassword, setShowPassword] = useState(false)
    const { handleAuthentication } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<typeSignInSchema>({
        resolver: zodResolver(signInSchema)
    })

    async function handleLoginUser({ email, password }: typeSignInSchema) {
        try {
            const response = await fetch('/api/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            const result: ResultType = await response.json();
    
            if (response.status === 200 && result.token) {
                handleAuthentication(result.token); 
                toast.success(result.message);
            } else if (response.status === 404) {
                toast.error(result.message);
            } else if (response.status === 401) {
                toast.error(result.message);
            } else {
                toast.error(result.message || 'An unexpected error occurred.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An unexpected error occurred. Please try again.');
        }
    }
    

    return (
        <form onSubmit={handleSubmit(handleLoginUser)}>
            <Stack gap="4" align="center" maxW="sm">
                <Field
                    label="E-mail"
                    required
                    invalid={!!errors.email}
                    errorText={errors.email?.message}
                >
                    <Input
                        {...register("email")}
                        type="email"
                        maxLength={254}
                        autoComplete="email"
                        colorPalette={"green"}
                    />
                </Field>
                <Field
                    label="Password"
                    required
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
                <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    colorPalette={"green"}
                >
                    Login
                </Button>
            </Stack>
        </form>
    )
}