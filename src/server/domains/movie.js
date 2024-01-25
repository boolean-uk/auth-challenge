import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const getAllMoviesDb = async () => await prisma.movie.findMany()

const checkTitleExistsDb = async (title) => await prisma.movie.findUnique({
    where: {
        title
    }
})

const createMovieDb = async (title, description, runtimeMins) => await prisma.movie.create({
    data: {
        title,
        description,
        runtimeMins
    }
})

export { getAllMoviesDb, createMovieDb, checkTitleExistsDb }