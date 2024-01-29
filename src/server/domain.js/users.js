import { Prisma } from "@prisma/client"
import { authHashing, comparePassword } from "../helper.js/hashing"

export const createUserDb = async (req, res) => {
  const { username } = req.body

  const password = authHashing(req.body.password)

  const user = await Prisma.user.create({
    data: {
      username,
      password
    }
  })

  res.status(201).json({ user })
}

export const checkUsersPasswordDb = async (req, res) => {
  const { username } = req.body
  const submittedPassword = req.body.password

  const user = await getUserByNameDb(username)
  const hash = user.password
  const correctPassword = await comparePassword(submittedPassword, hash)
  return correctPassword
}


export const getUserByNameDb = async (req, res) => {
  const { username } = req.body

  const user = await Prisma.user.findUniqueOrThrow({
    where: {
      username
    }
  })

  res.json({ user })
}