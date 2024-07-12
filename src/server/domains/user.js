import prisma from "../../utils/prisma.js";
import bcrypt from "bcrypt";

async function registerUserDb(username, password) {
  return await prisma.user.create({
    data: {
      username: username,
      passwordHash: await bcrypt.hash(password, 8),
    },
  });
}

async function getUser(username) {
  return await prisma.user.findUniqueOrThrow({
    where: {
      username: username,
    },
  });
}

async function getAllUsersDb() {
  return await prisma.user.findMany()
}

async function deleteUserDb(userId) {
  return await prisma.user.delete({
    where: {
      id: userId
    }
  })
}

export { registerUserDb, getUser, getAllUsersDb, deleteUserDb };
