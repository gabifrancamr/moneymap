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
import { toast } from 'sonner';
import * as zod from 'zod';

const signUpSchema = zod.object({
    name: zod
        .string()
        .nonempty("Full name is required")
        .min(3, "The name must have at least 3 characters"),
    email: zod
        .string()
        .nonempty("E-mail is required")
        .email("Please enter a valid e-mail"),
    password: zod
        .string()
        .nonempty("Password is required")
        .min(5, "Password must have at least 5 characters")
        .max(15, "Password must have at most 15 characters"),
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

export type typeSignUpSchema = zod.infer<typeof signUpSchema>

export default function FormSignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { handleAuthentication } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<typeSignUpSchema>({
        resolver: zodResolver(signUpSchema)
    })

    async function handleCreateNewUser(data: typeSignUpSchema) {
        if (data.password !== data.confirmPassword) {
            toast.error('Please enter matching passwords.');
            return;
        }

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }),
            });

            const result: ResultType = await response.json();

            if (response.status === 201) {
                const email = data.email;
                const password = data.password;

                const loginResponse = await fetch('/api/signin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const loginResult: ResultType = await loginResponse.json();

                if (loginResponse.status === 200 && loginResult.token) {
                    handleAuthentication(loginResult.token);
                    toast.success(result.message)
                } else {
                    toast.error('Error authenticating user. Please try again.');
                }
            } else if (response.status === 409) {
                toast.error(result.message);
            } else {
                toast.error(result.message || 'Error registering user. Please try again.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An unexpected error occurred. Please try again.');
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreateNewUser)}>
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
                    />
                </Field>
                <Field
                    label="E-mail"
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
                    Register
                </Button>
            </Stack>
        </form>
    )
}