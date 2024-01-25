import { prisma } from '../utils/prisma.js'

const registerDb = async (username, password) => 
    await prisma.user.create({
        data: { username, password }
    })

const findUserDb = async (username) => 
    await prisma.user.findUnique({
        where: {
            username
        }
    })


export { 
    registerDb, 
    findUserDb
}