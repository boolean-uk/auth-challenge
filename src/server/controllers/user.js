const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const jwtSecret = 'mysecret'

const register = async (req, res) => {
  const { username, password } = req.body

  const saltrounds = 10

  bcrypt.hash(password, saltrounds, async (err, hashedPwd) => {
    try {
      const createdUser = await prisma.user.create({
        data: {
          username: username,
          password: hashedPwd
        }
      })
      delete createdUser.password

      res.status(201).json({ user: createdUser })
    } catch (error) {
      if (error) {
        res
          .status(403)
          .json({ error: `The username ${username} is already taken` })
      } else {
        res.status(500).json({ error })
      }
    }
  })
}

const login = async (req, res) => {
  const { username, password } = req.body

  const foundUser = await prisma.user.findUnique({
    where: {
      username: username
    }
  })

  if (!foundUser) {
    return res.status(401).json({ error: `Invalid ${username} or password.` })
  }

  bcrypt.compare(password, foundUser.password, (err, passwordsMatch) => {
    if (!passwordsMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' })
    } else {
      const token = jwt.sign(username, jwtSecret)
      res.json({ token: token })
    }
  })
}

module.exports = {
  register,
  login
}
