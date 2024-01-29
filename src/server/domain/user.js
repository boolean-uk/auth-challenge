import { Prisma } from "@prisma/client"
import { authHashing } from "../helper/hashing"

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

export const getUserByNameDb = async (req, res) => {
  const { username } = req.body

  const user = await Prisma.user.findUniqueOrThrow({
    where: {
      username
    }
  })

  res.json({ user })
}