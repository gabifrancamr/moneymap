import { NextResponse } from 'next/server';
import db from '../../../../prisma/db';

export async function POST(request: Request) {
    try {
        const { name, value, type, userId } = await request.json();

        await db.transaction.create({
            data: {
                name,
                value,
                type,
                userId,
            }
        });

        return NextResponse.json(
            { status: 'success' },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
