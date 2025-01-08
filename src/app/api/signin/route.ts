import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import db from '../../../../prisma/db';

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                {
                    status: 404,
                    message: 'User not found'
                },
                { status: 404 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    status: 401,
                    message: 'Incorrect password'
                },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        return NextResponse.json(
            {
                status: 200,
                message: 'Login successful, redirecting...',
                token,
            },
            { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                status: 500,
                message: 'Internal server error'
            },
            { status: 500 }
        );
    }
}

export function OPTIONS() {
    return NextResponse.json(null, {
        status: 200,
        headers: {
            'Allow': 'POST, OPTIONS',
        },
    });
}
