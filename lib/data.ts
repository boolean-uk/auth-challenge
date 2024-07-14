import { PrismaClient } from '@prisma/client'
import {
    AccountCredentials,
    MovieDetails,
    UserToSearchFor,
} from './definitions'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const registerUser = async ({
    username,
    password,
}: AccountCredentials) => {
    const usernameInUse =
        (await prisma.user.findUnique({ where: { username } })) !== null

    if (usernameInUse) {
        throw Error('Username already in use')
    }

    const newUser = await prisma.user.create({
        data: {
            username,
            passwordHash: await bcrypt.hash(password, 8),
        },
    })

    delete newUser.passwordHash

    return newUser
}

export const getUserInfo = async (query) => {
    const userToFind: UserToSearchFor = { where: {} }

    if (typeof query === 'string') {
        userToFind.where.username = query
    }

    if (typeof query === 'number') {
        userToFind.where.id = query
    }
    // @ts-ignore directive
    const user = await prisma.user.findUniqueOrThrow({ ...userToFind })

    return user
}

export const getMovies = async () => {
    const movies = await prisma.movie.findMany()

    return movies
}

export const createMovie = async ({
    title,
    description,
    runtimeMins,
}: MovieDetails) => {
    try {
        const newMovie = await prisma.movie.create({
            data: {
                title,
                description,
                runtimeMins,
            },
        })

        return newMovie
    } catch (e) {
        console.log(e)
        return e
    }
}
