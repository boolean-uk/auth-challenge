import { prisma } from '../utils/prisma.js'

const registerDb = async (username, password) => 
    await prisma.user.create({
        data: { username, password }
    })

export { registerDb }