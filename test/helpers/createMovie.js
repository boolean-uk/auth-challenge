import prisma from "../../src/utils/prisma.js"

async function createMovie(title, description, runtimeMins, user) {
    const movieData = {
        data: {
            title: title,
            description: description,
            runtimeMins: runtimeMins,
            user: {
                connect: {
                    id: user.id
                }
              }
            }
        }


    return await prisma.movie.create(movieData)
}

export default createMovie