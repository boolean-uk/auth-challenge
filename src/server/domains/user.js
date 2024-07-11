import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'


const createUserDb = async (username, password) => await prisma.user.create({
  data: {
    username,
    password: await bcrypt.hash(password, 10)
  },
  select: {
    username: true,
    id: true
  }
})

async function getUserDb(username) {
    return await prisma.user.findUnique({
        where: {
            username: username
        }
    })
}

export {
   createUserDb,
   getUserDb 
} 