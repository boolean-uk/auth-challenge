import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const createMovieDB = async (title, description, runtimeMins) => 
await prisma.movie.create({
    data: {
        title, 
        description, 
        runtimeMins
    }
})

const getMoviesDB = async() => await prisma.movie.findMany()

export { createMovieDB, getMoviesDB } 