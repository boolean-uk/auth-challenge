import prisma from '../utils/prisma.js'

const getMovieByTitleDb = async (title) => {
  const foundMovie = await prisma.movie.findFirst({
    where: {
      title: title
    }
  })

  return foundMovie
}

const getMoviesDb = async () => {
  const movies = await prisma.movie.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return movies
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

export { createMovieDb, getMoviesDb, getMovieByTitleDb }
