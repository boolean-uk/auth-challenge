import prisma from "../../src/utils/prisma.js"
import bcrypt from 'bcrypt'

async function createUser(username, password) {
  return await prisma.user.create({
    data: {
      username: username,
      password: await bcrypt.hash(password, 10)
    },
  })
}

export default createUser