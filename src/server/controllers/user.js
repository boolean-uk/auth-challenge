import { comparePassword } from "../helper/hashing.js";
import { createUserDb, getUserByNameDb } from '../domain/user.js'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"
import { generateToken, generateExpiringToken, verifyToken } from "../helper/token.js";

export const getUserByName = async (req, res) => {
  const { username } = req.body

  try {
    const user = await getUserByNameDb(req, res)

    if (user) {
      console.log("found user")
      return res.status(200).json({ result: `${username} exists`})
    }
  } catch (error) {
    return res.status(404).json({ result: `${username} does not exist`})
  }
}

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await getUserByNameDb(req, res)
    console.log(user)

    if (comparePassword(password, user.password)) {
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
  
  const usernameTaken = await getUserByNameDb(req, res)
  if (usernameTaken) {
    return res.status(409).json({ error: `Username ${username} is already taken` })
  }

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