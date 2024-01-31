import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const registerNewUser = async (username, passwordHash) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: passwordHash,
      },
    });
    return newUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const findUserByUsername = async (username) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    return user;
  } catch (error) {
    throw new Error(`Error finding user: ${error.message}`);
  }
};

export { registerNewUser, findUserByUsername };
