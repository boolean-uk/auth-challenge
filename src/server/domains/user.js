import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const registerNewUserdb = async (username, hash) =>
  await prisma.user.create({
    data: {
      username: username,
      password: hash,
    },
  });

export { registerNewUserdb };
