import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createMovie = async (title, description, runtimeMins) => {
  return await prisma.movie.create({
    data: {
      title: title,
      description: description,
      runtimeMins: runtimeMins,
    },
  });
};
