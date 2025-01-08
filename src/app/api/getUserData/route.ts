import { NextResponse } from 'next/server';
import db from '../../../../prisma/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { message: 'Email query parameter is required.' },
                { status: 400 }
            );
        }

        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { status: 404, message: 'User not found.' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { status: 200, user },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Internal server error.' },
            { status: 500 }
        );
    }
}
