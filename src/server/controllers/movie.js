const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const jwtSecret = 'mysecret'

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany()

  res.json({ data: movies })
}

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body

  let bearer = req.headers.authorization

  if (!bearer) {
    res.status(403).json({ error: 'You need to log in!' })
  }

  bearer = bearer.replace('Bearer ', '')

  try {
    const verify = jwt.verify(bearer, jwtSecret)
  } catch (err) {
    return res.status(401).json({ message: 'Wrong token' })
  }

  const createNewMovie = await prisma.movie.create({
    data: {
      title,
      description,
      runtimeMins
    }
  })

  res.status(201).json({ status: 'Great success', movie: createNewMovie })
}

module.exports = {
  getAllMovies,
  createMovie
}
