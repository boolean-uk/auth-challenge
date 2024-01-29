
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const findUserDb = async (username, password) => {
  try {
    return await prisma.user.findUnique({
      where: { username, password },
      select: { id: true, username: true, password: true },
    });
  } catch (error) {
    console.error("Error in findUserDb:", error);
    throw error;
  }
};

const createUserDb = async (username, password) => {
  try {
    return await prisma.user.create({
      data: {
        username,
        password,
      },
    });
  } catch (error) {
    console.error("Error in createUserDb:", error);
    throw error;
  }
};

export { findUserDb, createUserDb };
