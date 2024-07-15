import prisma from "../../src/utils/prisma";
import bcrypt from "bcrypt";


async function createUser(username, password, role) {
    return await prisma.user.create({
        data: {
            username: username,
            passwordHash: await bcrypt.hash(password, 8),
            role: role
        }
    })
}

async function deleteUser(username) {
    return await prisma.user.delete({
        where: {
            username: username
        }
    })
}

async function createMovie(title, description, runtimeMins, userId) {
    return await prisma.movie.create({
        data: {
            title: title,
            description: description,
            runtimeMins: runtimeMins,
            user: {connect: {id: userId}}
        }
    })
}

export { createUser, createMovie, deleteUser }