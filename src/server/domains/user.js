import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const create = async (username, hash) =>
  await prisma.user.create({
    data: {
      username,
      password: hash,
    },
  });

const find = async (username) => {
  return await prisma.user.findFirst({
    where: {
      username,
    },
    select: {
      username: true,
      password: true,
    },
  });
};

export { create, find };
