import prisma from "../../src/utils/prisma";
import bcrypt from "bcrypt";


async function createUser(username, password) {
    return await prisma.user.create({
        data: {
            username: username,
            password: await bcrypt.hash(password, 8)
        }
    })
}

async function createMovie(title, description, runtimeMins, userId = null) {
    return await prisma.movie.create({
        data: {
            title: title,
            description: description,
            runtimeMins: runtimeMins,
            userId: userId
        }
    })
}

export { createUser, createMovie }