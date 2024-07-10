import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken'
const jwtSecret = process.env.JWT_SECRET

async function verifyToken (req, res, next) {
    const authorization = req.headers.authorization

    if(!authorization) {
        return res.status(400).json({
            message: 'Authorization missing in headers'
        })
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
            throw 'User not found'
        }

        req.user = foundUser
    } catch(e) {
        return res.status(401).json({
            message: 'Must be logged in to create a movie'
        })
    }

    next()
}


export {
    verifyToken
}