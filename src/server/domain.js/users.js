import { Prisma } from "@prisma/client"

export const getUserByNameDb = (req, res) => {
  const { username } = req.body

  const user = Prisma.user.findUniqueOrThrow({
    where: {
      username
    }
  })

  res.json({ user })
}