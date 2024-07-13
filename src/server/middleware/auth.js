import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import { InvalidCredentialsError } from "../errors/errors.js"
// import { getUserById } from "../controllers/user.js"
import { getUserByUserNameDb } from "../domains/user.js"

const prisma = new PrismaClient()

export const verifyToken = async (req, res, next) => {
	const token = req.headers["authorization"].split(" ")[1]

	const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
	console.log(decodedToken);
	const foundUser = await getUserByUserNameDb(decodedToken.username)

	if (!foundUser) {
		throw new InvalidCredentialsError("Invalid Credentials")
	}
	console.log("auth", foundUser)
	req.user = foundUser
	req.token = token
	next()
}
