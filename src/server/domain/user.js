import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUserDB = async (username, hashedPassword) => {
  return await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });
};

export const findUserDB = async (username) => {
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
};
