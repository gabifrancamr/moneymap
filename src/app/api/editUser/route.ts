import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import db from '../../../../prisma/db';

export async function POST(request: Request) {
    try {
        const { email, name, password } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required to identify the user.' },
                { status: 400 }
            );
        }

        const updateData: { name?: string; password?: string } = {}
        if (name) updateData.name = name
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword
        }

        const updatedUser = await db.user.update({
            where: { email },
            data: updateData
        })

        return NextResponse.json(
            { 
                status: 200,
                message: 'User updated successfully.', 
                email: updatedUser.email 
            },
            { status: 200 }
        );



    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                status: 500,
                message: 'Failed to update user. Please try again later.'
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