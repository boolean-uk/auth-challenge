import {
  ExistingUniqueFieldError,
  InvalidCredentialsError,
  MissingFieldsError,
  UserNotFoundError,
} from "../errors/APIError.js"
import {
  comparePassword,
  createTokenDb,
  createUserDb,
  verifyUsername,
} from "../domain/user.js"

const createUser = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new MissingFieldsError("Missing fields in request body")
  }

  const existingUser = await verifyUsername(username)

  if (existingUser) {
    throw new ExistingUniqueFieldError("The username provided already exists")
  }

  const user = await createUserDb(username, password)

  res.status(201).json({
    user,
  })
}

const createToken = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new MissingFieldsError("Missing fields in request body")
  }

  const user = await verifyUsername(username)

  if (!user) {
    throw new UserNotFoundError("The username provided doesn't exist")
  }

  const match = await comparePassword(password, user)

  if (!match) {
    throw new InvalidCredentialsError("The password doesn't match")
  }

  delete user.password

  const token = createTokenDb(user)

  res.status(201).json({
    user,
    token,
  })
}

export { createUser, createToken }
