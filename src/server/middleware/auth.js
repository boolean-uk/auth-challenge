import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken'
import { AuthorizationMissingError, NotFoundError, UnauthorizedError } from '../errors/error.js'
const jwtSecret = process.env.JWT_SECRET

async function verifyToken (req, res, next) {
    const authorization = req.headers.authorization

    if(!authorization) {
        throw new AuthorizationMissingError()
    }

    const [_, token] = authorization.split(' ')

    try {
        const decodedToken = jwt.verify(token, jwtSecret)

        const foundUser = await prisma.user.findUnique({
            where: {
                username: decodedToken.sub
            }
        })

        if(!foundUser) {
            throw new NotFoundError()
        }

        req.user = foundUser
    } catch(e) {
        throw new UnauthorizedError()
    }

    next()
}


export {
    verifyToken
}