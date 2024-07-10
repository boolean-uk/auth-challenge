import jwt from 'jsonwebtoken'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { createUserDb, getUserDb } from '../domains/user.js'
import bcrypt from 'bcrypt'

const jwtSecret = process.env.JWT_SECRET

async function register(req, res) {
    const {
        username,
        password
      } = req.body
    
      if (!username || !password) {
        return res.status(400).json({
          error: "Missing fields in request body"
        })
      }
    
      try {
        const createdUser = await createUserDb(username, password)
    
        return res.status(201).json({ user: createdUser })
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            return res.status(409).json({ error: "A user with the provided username already exists" })
          }
        }
    
        res.status(500).json({ error: e.message })
      }
}

async function login(req, res) {
    const { username, password } = req.body
    const foundUser = await getUserDb(username)
    
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password)

    if(!isPasswordMatch) {
        return res.json({
            message: 'Invalid password'
        })
    }

    const token = jwt.sign({ sub: username }, jwtSecret)

    res.json({
        token
    })
}

export {
    register,
    login
}