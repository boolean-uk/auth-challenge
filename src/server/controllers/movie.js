// const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

const getMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({})
  return res.send({ movies })
}

const addMovie = async (req, res) => {
  const { title, desc, runtime } = req.body
  const token = req.header("authorization")
  const tokenIsValid = jwt.verify(token, secret)
  console.log({ tokenIsValid })

  const requestBodyIsComplete = (title && desc && runtime) ? true : false

  if (requestBodyIsComplete) {
    const createdMovie = await prisma.movie.create({
      data: {
        title,
        description: desc,
        runtimeMins: Number(runtime)
      }
    })
    return res.status(201).send({movie: createdMovie})
  } else {
    return res.status(401).send()
  }

}

module.exports = { getMovies, addMovie }
