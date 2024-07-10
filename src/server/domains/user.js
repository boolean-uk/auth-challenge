import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createUserDb = async (username, password) =>
	await prisma.user.create({
		data: {
			username,
			password: await bcrypt.hash(password, 8),
		},
	})

export const getUserByUserNameDb = async (username) => {
    const foundUser = await prisma.user.findFirst({
        where: {
            username: username
        }
    })
    return foundUser
}