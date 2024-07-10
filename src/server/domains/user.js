import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'


const createUserDb = async (username, password) => await prisma.user.create({
  data: {
    username,
    password: await bcrypt.hash(password, 10)
  },
  select: {
    username: true
  }
})

export default createUserDb