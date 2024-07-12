import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const create = async (title, description, runtimeMins) =>
  await prisma.movie.create({
    data: {
      title,
      description,
      runtimeMins,
    },
  });

const all = async () => await prisma.movie.findMany();

export { create, all };
