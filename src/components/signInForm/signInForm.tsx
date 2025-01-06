"use client"
import { loginUser } from "@/actions";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useDashboard } from "@/contexts/DashboardContext";
import { Input, Stack } from "@chakra-ui/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import * as zod from 'zod';

const signInSchema = zod.object({
    email: zod
        .string()
        .nonempty("E-mail é obrigatório")
        .email("Digite um e-mail válido"),
    password: zod
        .string()
        .nonempty("Senha é obrigatória")
        .min(5, "A senha deve ter no mínimo 5 caracteres")
        .max(15, "A senha deve ter no máximo 15 caracteres"),
})

export type typeSignInSchema = zod.infer<typeof signInSchema>

export default function SignInForm() {
    const { handleAuthentication } = useDashboard()
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

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
            handleAuthentication(response.token)
        } else if (response.status === 'notFound') {
            toast.error('Usuário não encontrado')
        } else if (response.status === 'invalidPassword') {
            toast.error(
                'Senha incorreta'
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
                    />
                </Field>
                <Field
                    label="Senha"
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
                    />
                </Field>
                <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                >
                    Entrar
                </Button>
            </Stack>
        </form>
    )
}