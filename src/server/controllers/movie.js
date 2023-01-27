const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const jwtSecret = 'mysecret'

const getAllMovies = async (req, res) => {
  res.json({ data: movies })
}

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body
  const movies = await prisma.movie.findMany()

  let bearer = req.headers.authorization
  const token = header.split(' ')[1]
  try {
    const validToken = jwt.verify(token, jwtSecret)
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token provided.' })
  }

  const createdMovie = await prisma.movie.create({
    data: {
      title,
      description,
      runtimeMins
    }
  })

  res.status(201).json({ data: 'Great Success!', createdMovie })
}

module.exports = {
  getAllMovies,
  createMovie
}
