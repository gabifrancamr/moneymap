import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import db from '../../../../prisma/db';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    status: 409,
                    message: 'User already registered in the system.'
                },
                { status: 409 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.user.create({
            data: { name, email, password: hashedPassword },
        });

        return NextResponse.json(
            {
                status: 201,
                message: 'Registration completed successfully. Redirecting...'
            },
            { status: 201 }
        )

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {   status: 500,
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
