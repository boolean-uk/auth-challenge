import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createMovieDB = async (title, description, runtimeMins) => {
  return await prisma.movie.create({
    data: {
      title: title,
      description: description,
      runtimeMins: runtimeMins,
    },
  });
};

export const findMovieDB = async (title) => {
  return await prisma.movie.findUnique({
    where: {
      title: title,
    },
  });
};
