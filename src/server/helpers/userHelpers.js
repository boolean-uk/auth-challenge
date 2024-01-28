import { getUserByUserNameDb } from '../domains/user.js'
import errorCreator from './errorCreator.js'

const getUserByUserName = async (username) => {
  const foundUser = await getUserByUserNameDb(username)

  if (!foundUser) {
    throw errorCreator('Invalid username or password', 401)
  }

  return foundUser
}

export { getUserByUserName }
