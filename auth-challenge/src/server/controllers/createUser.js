import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { createUserDb, getUserByUsername } from "../domains/userDb.js"

const createUser = async (req, res) => {
    const {
        username,
        password
    } = req.body

    if(!username || !password) {
        return res.status(400).json({
            message: "Username or password fields missing"
        })
    }

    const found = await getUserByUsername(username)
    if(found) {
        return res.status(409).json({
            message: "A user with that username already exists"
        })
    }
    
    try {
        const createdUser = await createUserDb(username, password)
        return res.status(201).json({
            user: createdUser
        })
    } catch(e) {
        if(e instanceof PrismaClientKnownRequestError) {
            if(e.code === "P2002") {
                return res.status(409).json({
                    message: "A user with that username already exists"
                })
            }
        }
    }
}

export {
    createUser
}