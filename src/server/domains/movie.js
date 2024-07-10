import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getAllMoviesDb() {
    return await prisma.movie.findMany()
}

async function createMovieDb(title, description, runtimeMins) {
    return await prisma.movie.create({
        data: {
            title: title,
            description: description,
            runtimeMins: runtimeMins
        }
    })
}

export {
   getAllMoviesDb,
   createMovieDb
} 