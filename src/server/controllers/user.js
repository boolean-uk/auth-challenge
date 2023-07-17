const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createUser = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({
      error: 'Missing fields in request body'
    })
  }
  try {
    const createdUser = await prisma.user.create({
      data: {
        username,
        password
      }
    })
    res.status(201).json({ customer: createdUser })
  } catch (e) {
    if (e instanceof PrismaClient.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return res
          .status(409)
          .json({ error: 'A user with the provided username already exists' })
      }
    }

    res.status(500).json({ error: e.message })
  }
}
module.exports = {
  createUser
}
