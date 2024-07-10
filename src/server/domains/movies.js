import prisma from "../../utils/prisma.js";

async function getMoviesDb () {
    console.log('in')
    return await prisma.movie.findMany()
}

export { getMoviesDb }