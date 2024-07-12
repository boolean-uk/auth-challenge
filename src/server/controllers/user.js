import jwt from 'jsonwebtoken'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { createUserDb, getAllUsersDb, getUserDb } from '../domains/user.js'
import bcrypt from 'bcrypt'
import { AlreadyExistsError, IncorrectPasswordError, MissingFieldsError, NotFoundError } from '../errors/error.js'

const jwtSecret = process.env.JWT_SECRET

async function register(req, res) {
    const {
        username,
        password
      } = req.body
    
      if (!username || !password) {
        throw new MissingFieldsError()
      }
    
      try {
        const createdUser = await createUserDb(username, password)
    
        return res.status(201).json({ 
            user: createdUser 
        })
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new AlreadyExistsError('Username')
          }
        }
      }
}

async function login(req, res) {
    const { username, password } = req.body
    const foundUser = await getUserDb(username)

    if(!foundUser) {
        throw new NotFoundError()
    }
    
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password)

    if(!isPasswordMatch) {
        throw new IncorrectPasswordError()
    }

    const token = jwt.sign({ sub: username }, jwtSecret)

    res.json({
        token
    })
}

async function getAllUsers(req, res) {
    const users = await getAllUsersDb()

    res.json({
        data: users
    })
}

export {
    register,
    login,
    getAllUsers
}