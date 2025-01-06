"use client"
import { createNewUser, loginUser } from "@/actions";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useDashboard } from "@/contexts/DashboardContext";
import { Input, Stack } from "@chakra-ui/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import * as zod from 'zod';

const signUpSchema = zod.object({
    name: zod
        .string()
        .nonempty("Nome completo é obrigatório")
        .min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: zod
        .string()
        .nonempty("E-mail é obrigatório")
        .email("Digite um e-mail válido"),
    password: zod
        .string()
        .nonempty("Senha é obrigatória")
        .min(5, "A senha deve ter no mínimo 5 caracteres")
        .max(15, "A senha deve ter no máximo 15 caracteres"),
    confirmPassword: zod.string(),
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            path: ["confirmPassword"],
            code: zod.ZodIssueCode.custom,
            message: "As senhas não coincidem",
        });
    }
});

export type typeSignUpSchema = zod.infer<typeof signUpSchema>

export default function SignUpForm() {
    const { handleAuthentication } = useDashboard()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<typeSignUpSchema>({
        resolver: zodResolver(signUpSchema)
    })

    async function handleCreateNewUser(data: typeSignUpSchema) {
        if (data.password === data.confirmPassword) {
            const response = await createNewUser(data)

            if (response.status === 'success' && response.user) {
                const email = response.user.email
                const password = response.user.password

                const loginResponse = await loginUser(email, password);

                if (loginResponse.status === 'success' && loginResponse.token) {
                    handleAuthentication(loginResponse.token)
                } else {
                    toast.error('Erro ao autenticar usuário. Tente novamente.');
                }

            } else if (response.status === 'notNull') {
                toast.error('Usuário já cadastrado no sistema')
            } else if (response.status === 'error') {
                toast.error(
                    'Erro ao cadastrar usuário no Banco de Dados. Tente mais tarde.',
                )
            }
        } else {
            toast.error('Digite senhas iguais')
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreateNewUser)}>
            <Stack gap="4" align="center" maxW="sm">
                <Field
                    label="Nome completo"
                    required
                    invalid={!!errors.name}
                    errorText={errors.name?.message}
                >
                    <Input
                        {...register("name")}
                        maxLength={70}
                    />
                </Field>
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

                <Field
                    label="Confirmar Senha"
                    required
                    invalid={!!errors.confirmPassword}
                    errorText={errors.confirmPassword?.message}
                >
                    <PasswordInput
                        {...register("confirmPassword")}
                        visible={showConfirmPassword}
                        onVisibleChange={setShowConfirmPassword}
                        maxLength={15}
                        autoComplete="new-password"
                    />
                </Field>
                <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                >
                    Cadastrar
                </Button>
            </Stack>
        </form>
    )
}