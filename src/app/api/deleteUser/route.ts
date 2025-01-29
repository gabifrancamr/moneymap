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

        await db.transaction.deleteMany({
            where: {
                userId: id
            }
        })

        await db.user.delete({
            where: { id }
        })

        return NextResponse.json(
            {
                status: 200,
                message: 'User deleted successfully.',
            },
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