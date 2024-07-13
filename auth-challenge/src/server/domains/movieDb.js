import prisma from "../utils/prisma.js";

const createMovieDb = async (title, description, runtime, userID) => await prisma.movie.create({
    data: {
        title: title,
        description: description,
        runtime: runtime,
        users: {
            create: [
                {
                    userID: userID
                }
            ]
        }
    },
    include: {
        users: true
    }
})

const getAllUsersMovies = async (userID) => await prisma.usersMovies.findMany({
    where: {
        userID: userID
    },
    include: {
        movie: true
    }
})

export {
    createMovieDb,
    getAllUsersMovies
}