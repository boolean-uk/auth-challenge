import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'

async function getAllMoviesDb() {
    return await prisma.user.findMany()
}

export {
   getAllMoviesDb
} 