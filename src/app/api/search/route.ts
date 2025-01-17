import { NextResponse } from 'next/server';
import db from '../../../../prisma/db';

export async function POST(request: Request) {
    const { name, type, value, day, month, year } = await request.json();

    try {
        const searchValue = value ? parseFloat(value) : undefined;

        const filters: any = {};

        if (name) {
            filters.name = { contains: name, mode: "insensitive" };
        }

        if (type) {
            filters.type = { equals: type };
        }

        if (searchValue !== undefined) {
            filters.value = { equals: searchValue };
        }

        if (day || month || year) {
            filters.date = {};

            if (day) {
                filters.date.day = parseInt(day);
            }

            if (month) {
                filters.date.month = parseInt(month); 
            }

            if (year) {
                filters.date.year = parseInt(year);
            }
        }

        const transactions = await db.transaction.findMany({
            where: filters,
        });

        return NextResponse.json(
            {
                status: 200,
                transactions
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching transactions." },
            { status: 500 }
        );
    }


}
