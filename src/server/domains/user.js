import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const registerNewUserdb = async (username, hash) =>
  await prisma.user.create({
    data: {
      username: username,
      password: hash,
    },
  });

const findUser = async (username) =>
  await prisma.user.findFirst({
    where: {
      username,
    }
  });
export { registerNewUserdb, findUser };
