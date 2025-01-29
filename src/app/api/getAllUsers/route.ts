import { NextResponse } from "next/server";
import db from "../../../../prisma/db";

export async function GET() {
    try {
        const users = await db.user.findMany()

        return NextResponse.json(users, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Internal server error.' },
            { status: 500 }
        );
    }
}