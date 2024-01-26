import prisma from '../utils/prisma.js'

const getMovieByTitleDb = async (title) => {
  const foundMovie = await prisma.movie.findFirst({
    where: {
      title: title
    }
  })

  return foundMovie
}

const createMovieDb = async (title, description, runTime) => {
  const createdMovie = await prisma.movie.create({
    data: {
      title: title,
      description: description,
      runtimeMins: Number(runTime)
    }
  })

  return createdMovie
}

export { createMovieDb, getMovieByTitleDb }
