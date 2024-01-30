import { comparePassword } from "../helper/hashing.js"
import { createUserDb } from '../domain/user.js'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"

export const getUserByName = async (req, res) => {
  const { username } = req.body

  try {
    const user = await Prisma.user.findUnique({
      where: {
        username
      }
    })
    res.json({ user })
  } catch (error) {
    console.log(error)
  }
}

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await getUserByName(req, res)
    
    if (comparePassword(password, user.password)) {
      res.status(200).json({ message: `logged in user ${username}` })
    }
  } catch (error) {
    res.status(500).json({ error: 'incorrect username or password'})
  }
}

export const createUser = async (req, res) => {
  const { username } = req.body
  
  const usernameTaken = await getUserByName(req, res)
  if (usernameTaken) res.status(409).json({ error: `Username ${username} is already taken` })
  
  try {
    const user = await createUserDb(req, res)
    if (user) res.status(201).json({ success: `User ${username} created`})
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log(error)
      if (error.code === "P2002") {
        res.status(409).json({ error: `Username ${username} is already taken` })
      }
    }
    res.status(500).json({ error })
  }
}