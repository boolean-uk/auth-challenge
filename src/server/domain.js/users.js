import { Prisma } from "@prisma/client"

export const createUserDb = async (req, res) => {
  const { username, password } = req.body

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