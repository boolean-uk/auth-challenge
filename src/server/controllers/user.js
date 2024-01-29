import { Prisma } from "@prisma/client"
import { comparePassword } from "../helper/hashing"
import { createUserDb } from "../domain/user"

const getUserByName = async (req, res) => {
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

const loginUser = async (req, res) => {
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

const createUser = async (req, res) => {
  try {
    const { username } = req.body
    const usernameTaken = await getUserByName(req, res)
    
    if (usernameTaken) throw new Error(`${username} already exists`)
    const user = await createUserDb(req, res)

    res.status(201).json({ user })
  } catch (error) {
    res.status(500).json({ error: 'incorrect username or password'})
  }
}

const handleRegister = (username, password) => {
  try {
    const user = getUserByName(username)
    if (user) {
      return JSON.stringify({ error: 'username is already taken' })
    }
  } catch (error) {
    console.log(error)
  }
}

export { 
  getUserByName,
  loginUser,
  createUser,
  handleRegister
}