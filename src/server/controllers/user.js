import { comparePassword } from "../helper/hashing.js";
import { createUserDb, getUserByNameDb } from '../domain/user.js'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"
import { generateToken, generateExpiringToken, verifyToken } from "../helper/token.js";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await getUserByNameDb(req, res)
    const passwordCheck = await comparePassword(password, user.password)

    if (passwordCheck) {
      const payload = {
        sub: 'login',
        username
      }
      const token = await generateToken(payload)
      console.log(token)
      res.status(200).json({ 
          message: `logged in user ${username,
          token 
        }` 
      })
    }
  } catch (error) {
    res.status(500).json({ error: 'incorrect username or password'})
  }
}

export const createUser = async (req, res) => {
  const { username } = req.body
  
  try {
    const user = await createUserDb(req, res)
    if (user) res.status(201).json({ success: `User ${username} created`})
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(409).json({ error: `Username ${username} is already taken` })
      }
    }
    return res.status(500).json({ error: "something went wrong. Sorry." })
  }
}