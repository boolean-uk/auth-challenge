import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createMovieDb = async (
  title,
  description,
  runtimeMins,
  userId
) => {
  return await prisma.movie.create({
    // Here we extract the userId from req.user that we added in authenticateToken function
    data: { title, description, runtimeMins, userId },
  });
};

export const getMoviesDb = async (userId) => {
  return await prisma.movie.findMany({
    where: { userId },
  });
};

export const deleteMovieDb = async (id) => {
  return await prisma.movie.delete({
    where: { id },
  });
};
