import { NextResponse } from 'next/server';
import db from '../../../../../prisma/db';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;

        if (!slug) {
            return NextResponse.json(
                { message: 'User ID is required.' },
                { status: 400 }
            );
        }

        const transactions = await db.transaction.findMany({
            where: {
                userId: slug
            }
        });

        return NextResponse.json(
            {
                status: 200,
                transactions: transactions.length > 0 ? transactions : []
            },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Internal server error.' },
            { status: 500 }
        );
    }
}