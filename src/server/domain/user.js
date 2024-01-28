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
    throw error; // Re-throw the error for further handling, if necessary
  }
};

export { createUserInDatabase };
