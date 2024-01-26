import prisma from '../utils/prisma.js'

const getUserByUserNameDb = async (username) => {
  const foundUser = await prisma.user.findFirst({
    where: {
      username: username
    }
  })

  return foundUser
}

const createUserDb = async (username, password) => {
  const createdUser = await prisma.user.create({
    data: {
      username: username,
      password: password
    }
  })

  return createdUser
}

export { getUserByUserNameDb, createUserDb }
