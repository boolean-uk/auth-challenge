import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createUserDb = async (username, password) => {
	const newUser = await prisma.user.create({
		data: {
			username,
			password: await bcrypt.hash(password, 8),
		},
		select: {
			id: true,
			username: true,
			createdAt: true,
		},
	})
	return newUser
}

export const getUserByUserNameDb = async (username) => {
	const foundUser = await prisma.user.findFirst({
		where: {
			username: username,
		},
	})
	return foundUser
}

export const getUserByIdDb = async (userId) => {
	const foundUser = await prisma.user.findFirst({
		where: {
			id: userId,
		},
	})
	return foundUser
}
