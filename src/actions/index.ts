import { typeSignUpSchema } from "@/components/signUpForm/SignUpForm"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from "../../prisma/db"

const SECRET_KEY = process.env.JWT_SECRET_KEY as string

export async function createNewUser(data: typeSignUpSchema) {
    try {
        const existingUser = await db.user.findUnique({
            where: {
                email: data.email,
            },
        })

        if (existingUser) {
            return { status: 'notNull' }
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = await db.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
        })

        return { status: 'success', 
            user: { email: user.email, password: data.password }, }

    } catch (error) {
        console.log(error)
        return { status: 'error' }
    }
}

export async function loginUser(email: string, password: string) {
    try {
        const user = await db.user.findUnique({
            where: {
                email: email,
            },
        })

        if (!user) {
            return { status: 'notFound' }; 
        }

        const isPasswordValid = await bcrypt.compare(user.password, password)

        if (!isPasswordValid) {
            return { status: 'invalidPassword' }; 
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            SECRET_KEY,
            {
                expiresIn: '1h',
            },
        )

        return { status: 'success', token }

    } catch (error) {
        console.log(error)
        return { status: 'error' }
    }
}