import { Prisma } from "@prisma/client"
import { comparePassword } from "../helper.js/hashing"

export const getUserByName = async (req, res) => {
  const { username, password } = req.body

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

export const createUser = async (username, password) => {
  
}

export const handleRegister = (username, password) => {
  try {
    const user = getUserByName(username)
    if (user) {
      return JSON.stringify({ error: 'username is already taken' })
    }
  } catch (error) {
    console.log(error)
  }
}