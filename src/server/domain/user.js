import prisma from "../utils/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const verifyUsername = async (username) =>
  await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      movie: true,
    },
  })

const comparePassword = async (password, user) =>
  await bcrypt.compare(password, user.password)

const createUserDb = async (username, password) => {
  const user = await prisma.user.create({
    data: {
      username: username,
      password: await bcrypt.hash(password, 8),
    },
    include: {
      movie: true,
    },
  })

  delete user.password
  return user
}

const createTokenDb = (user) =>
  jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET)

export { createUserDb, verifyUsername, comparePassword, createTokenDb }
