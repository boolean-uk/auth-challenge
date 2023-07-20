const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10
const secret = process.env.JWT_SECRET

const register = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ error: 'Invalid username or password' })
    }
    const hash = await bcrypt.hash(password, saltRounds)
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hash
      }
    })
    delete newUser.password
    res.status(201).json({ user: newUser })
  } catch (error) {
    if (error.code === 'P2002') {
      console.log(error)
      res.status(409).json({ error: error.message })
    } else {
      res.status(500).json({ error })
    }
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ error: 'Missing fields in request body' })
    }
    const foundUser = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (!foundUser) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    bcrypt.compare(password, foundUser.password, (errro, result) => {
      if (!result) {
        return res.status(401).json({ error: 'Invalid username or password' })
      }

      const token = jwt.sign({ username }, secret)

      return res.status(201).json({ token })
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  register,
  login
}
