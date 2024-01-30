import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUserInDatabase = async (username, hash) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hash,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user in the database:", error);
    throw error;
  }
};

const findUserInDatabase = async (username) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        username: true,
        password: true,
      },
    });
    return foundUser;
  } catch (error) {
    console.error("Error finding user in the database:", error);
    throw error;
  }
};

export { createUserInDatabase, findUserInDatabase };
