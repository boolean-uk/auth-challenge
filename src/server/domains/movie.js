import { prisma } from "../utils/prisma.js";

const createMovieDb = async (title, description, runtimeMins) =>
  await prisma.movie.create({
    data: { title, description, runtimeMins },
  });

const getMoviesDb = async() => 
  await prisma.movie.findMany()

export { 
  createMovieDb, 
  getMoviesDb
 };
