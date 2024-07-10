import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import { InvalidCredentialsError } from "../errors/errors.js"

const prisma = new PrismaClient()

// export const verifyToken = async (req, res, next) => {
// 	const [_, token] = req.get("Authorization").split(" ")

// 	// try {
// 		const decodedToken =  jwt.verify(token, process.env.JWT_SECRET)
//         console.log(token);
//         console.log(decodedToken);
// 		const foundUser = await prisma.user.findFirst({
// 			where: {
// 				id: decodedToken.sub,
// 			},
// 		})

// 		if (!foundUser) {
// 			throw new InvalidCredentialsError("Invalid Credentials")
// 		}

// 		req.user = foundUser
// 	// } catch (e) {
// 	// 	return res.status(401).json
// 	// }

// 	next()
// }

 export const verifyToken = async (req, res, next) => {
	const authorizationHeader = req.get("Authorization")

	if (!authorizationHeader) {
		return res
			.status(401)
			.json({ error: "Authorization header missing" })
	}

	const [bearer, token] = authorizationHeader.split(" ")

	if (bearer !== "Bearer" || !token) {
		return res
			.status(401)
			.json({ error: "Invalid authorization format" })
	}

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
		console.log(token)
		console.log(decodedToken)

		const foundUser = await prisma.user.findFirst({
			where: {
				id: decodedToken.sub,
			},
		})

		if (!foundUser) {
			throw new InvalidCredentialsError("Invalid credentials")
		}

		req.user = foundUser
		// next()
	} catch (error) {
		console.error(error)
		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({ error: "Invalid token" })
		}
		if (error instanceof InvalidCredentialsError) {
			return res.status(401).json({ error: error.message })
		}
		return res.status(500).json({ error: "Internal server error" })
     }
     next()
}
