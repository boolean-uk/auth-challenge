const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const secret = process.env.JWT_SECRET
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10

const router = express.Router()
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body
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
      res.status(403).json({ error: `The username is already taken!` })
    } else {
      res.status(500).json({ error })
    }
  }
})
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    const findUser = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (!findUser) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    bcrypt.compare(password, findUser.password, (errro, result) => {
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
})

module.exports = router
