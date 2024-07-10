import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

let logLevel = {
    log: ['query'],
}

if (process.env.NODE_ENV === 'test') {
    logLevel = {}
    // Connect to the user's test database instance
    process.env['DATABASE_URL'] = process.env['TEST_DATABASE_URL']
    console.log(`Connected to DB instance: ${process.env['DATABASE_URL']}`)
}


export default prisma