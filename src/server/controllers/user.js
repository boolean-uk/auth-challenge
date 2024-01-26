import bcrypt from 'bcrypt'

// Helpers functions
import { checkUserExist } from '../helpers/userErrorHandler.js'

// Domains
import { createUserDb } from '../domains/user.js'

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

export { registerUser }
