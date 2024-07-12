import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'


const createUserDb = async (username, password, role = 'USER') => await prisma.user.create({
  data: {
    username,
    password: await bcrypt.hash(password, 10),
    role: role
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

async function getAllUsersDb() {
  return await prisma.user.findMany({
    select: {
      username: true,
      id: true,
      role: true
    }
  })
}

async function deleteUserDb(userId) {
  return await prisma.user.delete({
    where: {
      id: userId
    }
  })
}

export {
   createUserDb,
   getUserDb,
   getAllUsersDb,
   deleteUserDb
} 