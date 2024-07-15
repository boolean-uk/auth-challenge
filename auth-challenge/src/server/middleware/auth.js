import jwt from "jsonwebtoken"
import prisma from "../utils/prisma.js"

const verifyToken = async (req, res, next) => {
    const [_, token] = req.get('Authorization').split(' ')

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const foundUser = await prisma.user.findFirst({
            where: {
                id: decodedToken.sub
            }
        })

        if(!foundUser) {
            throw "User not found"
        }
        req.user = foundUser
    } catch(e) {
        console.log('error',e)
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
    next()
}

export {
    verifyToken
}