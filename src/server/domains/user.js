import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt, { genSalt } from 'bcrypt'

const registerDb = async (username, password) => {

  const saltRound = 10
  const hashedPassword = await bcrypt.hash(password, saltRound)
  return await prisma.user.create({
    data : {
      username,
      password : hashedPassword
    }
  })
}

export { registerDb }



