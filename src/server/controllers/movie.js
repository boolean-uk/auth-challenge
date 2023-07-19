const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body
  const secret = process.env.JWT_SECRET
  const authHeader = req.headers.authorization.split(' ')
  const token = authHeader[1]

  let payload
  try {
    payload = jwt.verify(token, secret)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: e.message })
    }
    return res.status(500).json({ error: e.message })
  }

  try {
    const newMovie = await prisma.movie.create({
      data: {
        title,
        description,
        runtimeMins: Number(runtimeMins)
      }
    })

    // io.emit('moviecreated', newMovie)
    return res.status(201).json({ data: newMovie })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}

const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        runtimeMins: true
      }
    })
    return res.status(200).json({ movies })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}

module.exports = {
  createMovie,
  getAllMovies
}