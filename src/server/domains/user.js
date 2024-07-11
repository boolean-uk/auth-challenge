import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt, { genSalt } from 'bcrypt'

const registerDb = async (username, password) => {

  return await prisma.user.create({
    data : {
      username,
      password : password
    }
  })
}

const loginDb = async (username, password) => {
  
  const foundUser = await prisma.user.findFirst({
    where : {
      username
    }
  })

  if(!foundUser) {
    throw new Error('username or password invalid')
  }

  

}

export { registerDb, loginDb }



