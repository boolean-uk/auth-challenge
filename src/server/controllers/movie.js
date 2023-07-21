// const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const getMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({})
  return res.send({ movies })
}

const addMovie = async (req, res) => {
  const { title, desc, runtime } = req.body
  console.log(
    {title},
    {desc},
    {runtime}
  )
  const requestBodyIsComplete = (title && desc && runtime) ? true : false

  if (requestBodyIsComplete) {
    const movie = await prisma.movie.create({
      data: {
        title,
        description: desc,
        runtimeMins: Number(runtime)
      }
    })
    return res.status(201).send({movie})
  } else {
    return res.status(403)
  }


}

module.exports = { getMovies, addMovie }
