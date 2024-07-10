import { PrismaClient } from '@prisma/client'
import { AccountCredentials } from './definitions'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const registerUser = async ({
    username,
    password,
}: AccountCredentials) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                passwordHash: await bcrypt.hash(password, 8),
            },
        })

        delete newUser.passwordHash

        return newUser
    } catch(e) {
        return e.message
    }
}

export const getUserInfo = async (username) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            username: username,
        },
    })

    return user
}
