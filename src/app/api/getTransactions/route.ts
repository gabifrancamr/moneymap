import { NextResponse } from 'next/server';
import db from '../../../../prisma/db';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url); 
        const id = url.searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { message: 'Id user is required.' },
                { status: 400 }
            );
        }

        const transactions = await db.transaction.findMany({
            where: {
                userId: id
            }
        });

        return NextResponse.json(
            {
                status: 200,
                transactions: transactions.length > 0 ? transactions : []
            },
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

