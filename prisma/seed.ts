import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

const adminPassword = process.env.ADMIN_PASSWORD as string;

if (!adminPassword) {
    throw new Error('ADMIN_PASSWORD is not defined in .env');
}

async function main() {

    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    await prisma.user.upsert({
        where: { email: 'moneymap@admin.com' },
        update: {},
        create: {
            name: "Admin",
            email: "moneymap@admin.com",
            role: "admin",
            password: hashedPassword
        }
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })