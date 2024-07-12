import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getAllMoviesDb(foundUser) {
    return await prisma.movie.findMany({
        where: {
            userId: foundUser.id
        }
    })
}

async function createMovieDb(title, description, runtimeMins, foundUser) {
    return await prisma.movie.create({
        data: {
            title: title,
            description: description,
            runtimeMins: runtimeMins,
            user: {
                connect: foundUser
            }  
        }
    })
}

export {
   getAllMoviesDb,
   createMovieDb
} 