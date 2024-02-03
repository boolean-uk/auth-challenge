import prisma from "../prisma/prisma.js";

const getAllMoviesDb = async () => await prisma.movie.findMany();

const getMovieByTitleDb = async (title) =>
  await prisma.movie.findUnique({
    where: { title },
  });

const createMovieDb = async (title, description, runtimeMins) =>
  await prisma.movie.create({
    data: { title, description, runtimeMins },
  });

export { getAllMoviesDb, getMovieByTitleDb, createMovieDb };
