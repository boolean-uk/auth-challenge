import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { authHashing } from "../helper/hashing.js"

export const createUserDb = async (req, res) => {
  const { username } = req.body
  const password = await authHashing(req.body.password)

  const user = await prisma.user.create({
    data: {
      username,
      password
    }
  })

  return user
}

export const getUserByNameDb = async (req, res) => {
  const { username } = req.body

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      username
    }
  })

  return user
}