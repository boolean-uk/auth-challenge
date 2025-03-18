import prisma from '../utils/prisma.js'
import bcrypt from 'bcrypt'

const createUserDb = async (username, password) => await prisma.user.create({
    data: {
        username: username,
        passwordHash: await bcrypt.hash(password, 8)
    },
    include: {
        movies: true
    }
})

const getUserByUsername = async (username) => await prisma.user.findUnique({
    where:{
        username: username
    }
})

export {
    createUserDb,
    getUserByUsername
}