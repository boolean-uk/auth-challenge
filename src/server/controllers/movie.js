const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body
  console.log(req.body)
  const findMovie = await prisma.movie.findFirst({
    where: {
      title: title
    }
  })
  if (findMovie) {
    return res.status(409).json({
      error: 'Missing fields in request body'
    })
  }
  if (!title || !description || !runtimeMins) {
    return res.status(400).json({
      error: 'Missing fields in request body'
    })
  }
  try {
    const createdMovie = await prisma.movie.create({
      data: {
        title: title,
        description: description,
        runtimeMins: runtimeMins
      }
    })
    res.status(201).json({ movie: createdMovie })
  } catch (e) {
    console.log(e instanceof PrismaClient.PrismaClientKnownRequestError)
    if (e instanceof PrismaClient.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return res
          .status(409)
          .json({ error: 'A movie with the provided title already exists' })
      }
    }

    res.status(500).json({ error: e.message })
  }
}
const getAll = async (req, res) => {
  const allMovies = await prisma.movie.findMany({})
  res.status(200).json({ movies: allMovies })
}
module.exports = {
  createMovie,
  getAll
}
