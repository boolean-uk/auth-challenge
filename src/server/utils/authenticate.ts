import { NextFunction, Request, Response } from 'express'
import { jwtVerify, SignJWT } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_TOKEN)

export default async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        try {
            await jwtVerify(token, secret)
            next()
        } catch (err) {
            return res.sendStatus(403)
        }
    } else {
        return res.sendStatus(401)
    }
}

export const generateToken = async (userId: string) => {
    const token = await new SignJWT({ userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .sign(secret)
    return token
}
