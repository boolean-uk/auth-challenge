import prisma from "../utils/prisma.js"

const getAllMoviesDb = async () => await prisma.movie.findMany()

const verifyTitle = async (title) =>
  await prisma.movie.findUnique({
    where: {
      title: title,
    },
  })

const createMovieDb = async (title, description, runtime, req) =>
  await prisma.movie.create({
    data: {
      title: title,
      description: description,
      runtime: runtime,
      userId: req.user.id,
    },
  })

export { getAllMoviesDb, verifyTitle, createMovieDb }
