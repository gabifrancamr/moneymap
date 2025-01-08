"use client"
import { loginUser } from "@/actions";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useAppContext } from "@/contexts/AppContext";
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

export default function SignInForm() {
    const { handleAuthentication } = useAppContext()
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<typeSignInSchema>({
        resolver: zodResolver(signInSchema)
    })

    async function handleLoginUser({email, password}: typeSignInSchema) {
        const response = await loginUser(email, password)

        if (response.status === 'success' && response.token) {
            toast.success('Redirecting...')
            handleAuthentication(response.token)
        } else if (response.status === 'notFound') {
            toast.error('User not found.')
        } else if (response.status === 'invalidPassword') {
            toast.error(
                'Incorrect password.'
            )
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