import {PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'


async function createAdmin() {
  const user = await prisma.user.create({
    data: {
        username: 'jake',
        password: await bcrypt.hash('mypassword', 10),
        role: 'ADMIN'
    }
  })

  console.log('User created', user)

  return user
}

createAdmin()