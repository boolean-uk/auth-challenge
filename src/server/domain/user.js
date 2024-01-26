import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const registerUserDB = async (username, hash) =>
    await prisma.user.create({
        data: {
            username,
            password: hash,
        },
    });

const findUser = async (username) => {
    return await prisma.user.findFirst({
        where: {
            username,
        },
        select: {
            username: true,
            password: true,
        },
    });
};

export { registerUserDB, findUser };
