import prisma from "../../utils/prisma.js";

async function getMoviesDb () {
    return await prisma.movie.findMany()
}

export { getMoviesDb }