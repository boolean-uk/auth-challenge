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
  deleteUserDb,
  getAllUsersDb,
  verifyUsername,
} from "../domain/user.js"

const getAllUsers = async (req, res) => {
  const users = await getAllUsersDb()

  for (let i = 0; i < users.length; i++) {
    delete users[i].password
  }

  res.json({
    users,
  })
}

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

const deleteUser = async (req, res) => {
  const id = req.body.id

  if (isNaN(id)) {
    throw new MissingFieldsError("The id provided is not a number")
  }

  const user = await deleteUserDb(id)

  if (!user) {
    throw new UserNotFoundError(`The user with id of ${id} was not found`)
  }

  console.log(id)

  res.json({
    user
  })
}

export { getAllUsers, createUser, createToken, deleteUser }
