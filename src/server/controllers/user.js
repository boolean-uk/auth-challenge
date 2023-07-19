const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const salt =10

const register = async (req, res) => {
  const { username, password } = req.body;

  const hashPassword = await bcrypt.hash(password, salt)

  try {
    const newUser = await prisma.user.create({
      data: {
          username: username,
          password: hashPassword,
      },
  });
  return res.status(201).json({ data: newUser });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return res.status(401).json({ error: `User with username '${username}' already exists`})
      }
    }
    return res.status(500).json({ error: e.message })
  }
}

const login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    const payload = { username }
    const secret = process.env.JWT_SECRET

    if (!secret) {
      return res.status(500).json({ error: 'JWT Secret is not defined' })
    }

    const token = jwt.sign(payload, secret)
    return res.status(200).json({ token })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}

module.exports = {
  register,
  login
}