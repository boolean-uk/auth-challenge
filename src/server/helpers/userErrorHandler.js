import bcrypt from 'bcrypt'

// Error handlers
import errorCreator from './errorCreator.js'

// DB
import { getUserByUserNameDb } from '../domains/user.js'

const checkUserExist = async (username) => {
  const foundUser = await getUserByUserNameDb(username)

  if (foundUser) {
    throw errorCreator('User with provided username is already exist', 403)
  }

  return foundUser
}

const checkPassword = async (providedPassword, storedPassword) => {
  const checkedPassword = await bcrypt.compare(providedPassword, storedPassword)

  if (!checkedPassword) {
    throw errorCreator('Invalid username or password', 401)
  }

  return checkPassword
}

export { checkUserExist, checkPassword }
