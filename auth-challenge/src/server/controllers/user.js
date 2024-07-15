import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { createUserDb, getUserByUsername } from "../domains/userDb.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
    if(username.length > 20) {
        return res.status(400).json({
            message: "Username too long"
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

const login = async (req, res) => {
    const {
        username,
        password
    } = req.body

    const foundUser = await getUserByUsername(username)
    const verifyPassword = await bcrypt.compare(password, foundUser.passwordHash)

    if(!verifyPassword || !foundUser) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign({ sub: foundUser.id, role: foundUser.role}, process.env.JWT_SECRET)
    res.status(200).json({
        user: token
    })
}

export {
    createUser,
    login
}