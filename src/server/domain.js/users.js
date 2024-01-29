import { Prisma } from "@prisma/client"

export const getUserByNameDb = async (req, res) => {
  const { username } = req.body

  const user = await Prisma.user.findUniqueOrThrow({
    where: {
      username
    }
  })

  res.json({ user })
}