import { NextResponse } from 'next/server';
import db from '../../../../prisma/db';

export async function POST(request: Request) {
    try {
        const { name, type, value, id } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: 'Id is required to identify the transaction.' },
                { status: 400 }
            );
        }

        const updatedTransaction = await db.transaction.update({
            where: { id },
            data: {name, type, value}
        })

        return NextResponse.json(
            { 
                status: 200,
                message: 'Transaction updated successfully.', 
                userId: updatedTransaction.userId 
            },
            { status: 200 }
        );



    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                status: 500,
                message: 'Failed to update transaction. Please try again later.'
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