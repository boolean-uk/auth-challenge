import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Helpers functions
import { checkUserExist, checkPassword } from '../helpers/userErrorHandler.js'
import { getUserByUserName } from '../helpers/userHelpers.js'

// Domains
import { createUserDb } from '../domains/user.js'

const secret = process.env.JWT_SECRET

// Endpoints controllers
const registerUser = async (req, res) => {
  const { username, password } = req.body

  try {
    await checkUserExist(username)

    const hashedPassword = await bcrypt.hash(password, 12)
    const createdUser = await createUserDb(username, hashedPassword)

    res.status(201).json({ user: { username: createdUser.username } })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const foundUser = await getUserByUserName(username)

    await checkPassword(password, foundUser.password)

    const jwtToken = jwt.sign({ username: foundUser.username }, secret)

    res.status(201).json({ token: jwtToken })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

export { registerUser, loginUser }
