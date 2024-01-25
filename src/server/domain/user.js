import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const registerUserDB = async (username, hash) =>
    await prisma.user.create({
        data: {
            username,
            password: hash,
        },
    });

export default registerUserDB