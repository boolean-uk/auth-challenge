import prisma from "../prisma/prisma.js";

const createUserDb = async (username, password) =>
  await prisma.user.create({
    data: { username, password },
  });

const getUserByUsernameDb = async (username) =>
  await prisma.user.findUnique({
    where: { username },
  });

export { createUserDb, getUserByUsernameDb };
