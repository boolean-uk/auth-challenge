import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getMovies = async () => {
    const movies = await prisma.movie.findMany({});
    return movies;
  };

const createMovie = async (title, description, runtimeMins) => {
  try {
    const newMovie = await prisma.movie.create({
      data: {
        title,
        description,
        runtimeMins,
      },
    });
    return newMovie;
  } catch (error) {
    throw new Error(`Error creating movie: ${error.message}`);
  }
};

export { getMovies, createMovie };
