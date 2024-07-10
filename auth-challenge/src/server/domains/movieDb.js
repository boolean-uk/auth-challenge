import prisma from "../utils/prisma";

const createMovieDb = async (title, description, runTime) => await prisma.movie.create({
    data: {
        title: title,
        description: description,
        runtime: runTime
    },
    include: {
        users: true
    }
})

export {
    createMovieDb
}