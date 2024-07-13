import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUserDb = async (username, password) => {
  return await prisma.user.create({
    data: { username, password },
  });
};

export const findUserDb = async (username) => {
  return await prisma.user.findUnique({ where: { username } });
};

export const updateUserDb = async (id, token) => {
  await prisma.user.update({
    where: { id },
    data: { token },
  });
};
