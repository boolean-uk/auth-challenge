import prisma from '../utils/prisma.js'

const getMovieByTitleDb = async (title, userId) => {
  const foundMovie = await prisma.movie.findFirst({
    where: {
      title: title,
      userId: userId
    }
  })

  return foundMovie
}

const getMoviesDb = async (userId) => {
  const movies = await prisma.movie.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return movies
}

const createMovieDb = async (title, description, runTime, userId) => {
  const createdMovie = await prisma.movie.create({
    data: {
      title: title,
      description: description,
      runtimeMins: Number(runTime),
      User: {
        connect: {
          id: userId
        }
      }
    }
  })

  return createdMovie
}

export { createMovieDb, getMoviesDb, getMovieByTitleDb }
