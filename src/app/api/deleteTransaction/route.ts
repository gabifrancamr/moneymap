import { NextResponse } from "next/server";
import db from "../../../../prisma/db";

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: 'Id is required to identify the user.' },
                { status: 400 }
            )
        }

        const deletedTransaction = await db.transaction.delete({
            where: { id }
        })

        return NextResponse.json(
            {
                status: 200,
                message: 'Transaction deleted successfully.',
                userId: deletedTransaction.userId
            },
            { status: 200 }
        )

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