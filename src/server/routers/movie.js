const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const router = express.Router()
router.post('/', async (req, res) => {
  try {
    const { title, description, runtimeMins } = req.body

    const newMovie = await prisma.movie.create({
      data: {
        title: title,
        description: description,
        runtimeMins: runtimeMins
      }
    })
    res.status(201).json({ movie: newMovie })
  } catch (error) {
    if (error.code === 'P2002') {
      res
        .status(403)
        .json({ error: `A movie with the provided title already exists` })
    } else {
      res.status(500).json({ error })
    }
  }
})
router.get('/', async (req, res) => {
  try {
    const allMovies = await prisma.movie.findMany({})
    res.status(200).json({ movies: allMovies })
  } catch (error) {
    res.status(500).json({ error })
  }
})

module.exports = router
