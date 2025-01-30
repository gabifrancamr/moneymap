import { NextResponse } from "next/server";
import db from "../../../../prisma/db";

export async function GET(request: Request) {
    try {
        const users = await db.user.findMany()

        return NextResponse.json(
            {
                status: 200,
                users: users.length > 0 ? users : [],
            },
            { status: 200 }
        )
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Internal server error.' },
            { status: 500 }
        );
    }
}