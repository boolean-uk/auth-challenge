import prisma from "../../utils/prisma.js";
import bcrypt from 'bcrypt'


async function registerUserDb(username, password) {
    return await prisma.user.create({
        data: {
            username: username,
            passwordHash: await bcrypt.hash(password, 8)
        }
    })
}

export { registerUserDb }